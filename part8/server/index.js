require('dotenv').config();
const {
	ApolloServer,
	gql,
	UserInputError,
	AuthenticationError,
	PubSub,
} = require('apollo-server');
const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const { MONGODB_URI, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log('> Connected to MongoDB');
	})
	.catch((error) => {
		console.log('> Error connecting to MongoDB', error.message);
	});

// let authors = [
// 	{
// 		name: 'Robert Martin',
// 		id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
// 		born: 1952,
// 	},
// 	{
// 		name: 'Martin Fowler',
// 		id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
// 		born: 1963,
// 	},
// 	{
// 		name: 'Fyodor Dostoevsky',
// 		id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
// 		born: 1821,
// 	},
// 	{
// 		name: 'Joshua Kerievsky', // birthyear not known
// 		id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
// 	},
// 	{
// 		name: 'Sandi Metz', // birthyear not known
// 		id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
// 	},
// ];

// let books = [
// 	{
// 		title: 'Clean Code',
// 		published: 2008,
// 		author: 'Robert Martin',
// 		id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
// 		genres: ['refactoring'],
// 	},
// 	{
// 		title: 'Agile software development',
// 		published: 2002,
// 		author: 'Robert Martin',
// 		id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
// 		genres: ['agile', 'patterns', 'design'],
// 	},
// 	{
// 		title: 'Refactoring, edition 2',
// 		published: 2018,
// 		author: 'Martin Fowler',
// 		id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
// 		genres: ['refactoring'],
// 	},
// 	{
// 		title: 'Refactoring to patterns',
// 		published: 2008,
// 		author: 'Joshua Kerievsky',
// 		id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
// 		genres: ['refactoring', 'patterns'],
// 	},
// 	{
// 		title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
// 		published: 2012,
// 		author: 'Sandi Metz',
// 		id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
// 		genres: ['refactoring', 'design'],
// 	},
// 	{
// 		title: 'Crime and punishment',
// 		published: 1866,
// 		author: 'Fyodor Dostoevsky',
// 		id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
// 		genres: ['classic', 'crime'],
// 	},
// 	{
// 		title: 'The Demon ',
// 		published: 1872,
// 		author: 'Fyodor Dostoevsky',
// 		id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
// 		genres: ['classic', 'revolution'],
// 	},
// ];

const typeDefs = gql`
	type Book {
		title: String!
		published: Int!
		author: Author!
		id: ID!
		genres: [String!]!
	}

	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
		favorite: String!
	}

	type Author {
		name: String!
		born: Int
		id: ID!
		bookCount: Int!
	}

	type Query {
		me: User
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
	}

	type Mutation {
		createUser(username: String!, favoriteGenre: String!): User
		login(username: String!, password: String!): Token
		addBook(
			title: String!
			author: String
			published: Int!
			genres: [String!]!
		): Book!
		editAuthor(name: String!, setBornTo: Int!): Author
	}

	type Subscription {
		bookAdded: Book!
	}
`;

const pubsub = new PubSub();

const resolvers = {
	Query: {
		bookCount: () => Book.countDocuments(),
		authorCount: () => Author.countDocuments(),
		allBooks: async (root, args) => {
			if (!args.genre && args.author) {
				const foundAuthor = await Author.findOne({
					name: args.author,
				}).populate('books');
				if (foundAuthor) {
					return foundAuthor.books;
				}
			}
			if (args.genre && !args.author) {
				return Book.find({ genre: { $in: [args.genre] } }).populate('author');
			}
			if (args.genre && args.author) {
				const filteredBook = await Book.find({
					genre: { $in: [args.genre] },
				}).populate('author');
				return filteredBook.filter((b) => b.author.name === args.name);
			}
			const books = await Book.find({}).populate('author');
			return books;
		},
		allAuthors: () => {
			return Author.find({});
		},
	},

	Author: {
		bookCount: async (root) => {
			const authored = Book.find({ author: root.id });
			return authored.countDocuments();
		},
	},

	Mutation: {
		addBook: async (root, args, { currentUser }) => {
			if (!currentUser) {
				throw new AuthenticationError('You are not authenticated');
			}
			let authorExists = await Author.findOne({ name: args.author });
			if (!authorExists) {
				try {
					authorExists = await Author.create({ name: args.author });
				} catch (error) {
					throw new UserInputError(error.message, {
						invalidArgs: args,
					});
				}
			}
			const newBook = new Book({
				title: args.title,
				published: args.published,
				genres: args.genres,
			});
			newBook.author = authorExists._id.toString();
			try {
				await newBook.save();
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			}
			const book = Book.findById(newBook.id).populate('author');

			pubsub.publish('BOOK_ADDED', { bookAdded: book });
			return book;
		},
		createUser: async (root, args) => {
			let newUser = await User.findOne({ username: args.username });
			if (newUser) {
				throw new UserInputError('Login instead');
			}
			newUser = new User({
				username: args.username,
				favoriteGenre: args.favoriteGenre.toLowerCase(),
			});

			try {
				return newUser.save();
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			}
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== 'secret') {
				throw new UserInputError('wrong credentials');
			}

			const sub = {
				username: user.username,
				id: user.id,
			};

			return { value: jwt.sign(sub, JWT_SECRET), favorite: user.favoriteGenre };
		},
		editAuthor: async (root, args, { currentUser }) => {
			if (!currentUser) {
				throw new AuthenticationError('You are not authenticated');
			}
			const authorFound = await Author.findOne({ name: args.name });
			if (!authorFound) {
				return null;
			}
			authorFound.born = args.setBornTo;
			try {
				await authorFound.save();
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			}
			return authorFound;
		},
	},

	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
		},
	},
};

new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null;
		if (auth && auth.toLowerCase().startsWith('bearer ')) {
			const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
			const currentUser = await User.findById(decodedToken.id);
			return { currentUser };
		}
	},
})
	.listen()
	.then(({ url, subscriptionsUrl }) => {
		console.log(`> Server available at ${url}`);
		console.log(`> Subscription available at ${subscriptionsUrl}`);
	});
