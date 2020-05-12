const {
	ApolloServer,
	gql,
	UserInputError,
	AuthenticationError
} = require('apollo-server');
const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(() => {
		console.log('> Connected to MongoDB');
	})
	.catch(error => {
		console.log('> Error connecting to MongoDB', error.message);
	});

let authors = [
	{
		name: 'Robert Martin',
		id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
		born: 1952
	},
	{
		name: 'Martin Fowler',
		id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
		born: 1963
	},
	{
		name: 'Fyodor Dostoevsky',
		id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
		born: 1821
	},
	{
		name: 'Joshua Kerievsky', // birthyear not known
		id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e'
	},
	{
		name: 'Sandi Metz', // birthyear not known
		id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e'
	}
];

/*
 * It would be more sensible to assosiate book and the author by saving
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
 */

let books = [
	{
		title: 'Clean Code',
		published: 2008,
		author: 'Robert Martin',
		id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring']
	},
	{
		title: 'Agile software development',
		published: 2002,
		author: 'Robert Martin',
		id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
		genres: ['agile', 'patterns', 'design']
	},
	{
		title: 'Refactoring, edition 2',
		published: 2018,
		author: 'Martin Fowler',
		id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring']
	},
	{
		title: 'Refactoring to patterns',
		published: 2008,
		author: 'Joshua Kerievsky',
		id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring', 'patterns']
	},
	{
		title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
		published: 2012,
		author: 'Sandi Metz',
		id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring', 'design']
	},
	{
		title: 'Crime and punishment',
		published: 1866,
		author: 'Fyodor Dostoevsky',
		id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
		genres: ['classic', 'crime']
	},
	{
		title: 'The Demon',
		published: 1872,
		author: 'Fyodor Dostoevsky',
		id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
		genres: ['classic', 'revolution']
	}
];

const typeDefs = gql`
	type User {
		username: String!
		password: String!
		id: ID!
	}

	type Author {
		name: String!
		born: Int
		bookCount: Int!
		id: ID!
	}

	type Book {
		title: String!
		author: Author!
		published: Int!
		genres: [String!]!
		id: ID!
	}

	type Token {
		value: String!
	}

	type Query {
		help: String!
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		me: User
		allAuthors: [Author!]!
	}

	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String!]!
		): Book!

		createUser(username: String!): User

		login(username: String!, password: String!): Token

		editAuthor(name: String!, setBornTo: Int!): Author
	}
`;

const resolvers = {
	Query: {
		help: () => 'this is the fullstackopen library application',
		bookCount: () => Book.countDocuments(),
		authorCount: () => Author.countDocuments(),
		allBooks: async (root, args) => {
			if (!args.author && !args.genre) {
				return Book.find({}).populate('author');
			}
			if (args.author && !args.genre) {
				const authorsBooks = await Author.findOne({
					name: args.author
				}).populate('books');
				return authorsBooks.books;
			}
			if (!args.author && args.genre) {
				const authorsBooks = await Book.find({
					genres: { $in: [args.genre] }
				}).populate('author');
				return authorsBooks;
			}
			if (args.author && args.genre) {
				const authorsBooks =
					(await Author.findOne({ name: args.author }).populate('books')) &&
					(await Book.find({ genres: { $in: [args.genre] } }).populate(
						'author'
					));

				return authorsBooks;
			}
		},
		allAuthors: () => {
			return Author.find({}).populate('books');
		},
		me: (root, args, context) => {
			return context.currentUser;
		}
	},

	Author: {
		bookCount: root => {
			return root.books.length;
		}
	},

	Book: {
		author: root => {
			return {
				name: root.author.name,
				born: root.author.born
			};
		}
	},
	Mutation: {
		addBook: async (root, args, context) => {
			let author;
			author = await Author.findOne({ name: args.author }).populate('books');
			const currentUser = context.currentUser;
			if (!currentUser) {
				throw new AuthenticationError('Not authenticated');
			}
			// Create a new author if it doesn't already exist
			if (!author) {
				author = new Author({ name: args.author });
			}
			const authorId = author._id.toString();

			let book = new Book({
				...args,
				author: authorId
			});

			try {
				const bookId = book._id.toString();
				await author.books.push(bookId);
				await author.save();
				await book.save();
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				});
			}
			// populate the author field and return object
			book = Book.findById(book._id).populate('author');
			return book;
		},
		editAuthor: async (root, args, context) => {
			if (!context.currentUser) {
				throw new AuthenticationError('Not authenticated');
			}
			const author = await Author.findOne({ name: args.name });
			author.born = args.setBornTo;

			try {
				await author.save();
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				});
			}
			return author;
		},

		createUser: async (root, args) => {
			const user = new User({
				username: args.username
			});

			try {
				await user.save();
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				});
			}
			return user;
		},

		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== 'secret') {
				throw new UserInputError('Credentials mismatch');
			}
			
			const userForToken = {
				username: user.username,
				id: user._id
			};
			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
		}
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null;
		if (auth && auth.toLowerCase().startsWith('bearer ')) {
			const decodedToken = jwt.verify(
				auth.substring(7),
				process.env.JWT_SECRET
			);
			const currentUser = await User.findById(decodedToken.id);
			return { currentUser };
		}
	}
});

server.listen().then(({ url }) => {
	console.log(`> Server ready at ${url}`);
	console.log('> Connecting to Database...');
});
