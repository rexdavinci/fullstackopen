import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`;

const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
		id
		title
		published
		genres
		author {
			name
			born
		}
	}
`;

export const ALL_BOOKS = gql`
	query allBooks($genre: String, $author: String) {
		allBooks(genre: $genre, author: $author) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;

export const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;

export const ADD_BOOK = gql`
	mutation addBook(
		$title: String!
		$author: String
		$published: Int!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			id
			genres
			author {
				name
				born
			}
			published
			title
		}
	}
`;

export const UPDATE_AUTHOR = gql`
	mutation updateAuthor($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			born
		}
	}
`;

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
			favorite
		}
	}
`;
