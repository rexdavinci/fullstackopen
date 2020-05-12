import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Books from './components/Books';
import BookForm from './components/BookForm';
import AuthorForm from './components/AuthorForm';
// import logo from './logo.svg';
import './App.css';
const ALL_BOOKS = gql`
	{
		allBooks {
			id
			title
			author
		}
	}
`;

const ADD_BOOK = gql`
	mutation addBook(
		$title: String!
		$author: String!
		$published: Int!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			title
			author
			published
		}
	}
`;

const EDIT_AUTHOR = gql`
	mutation editAuthor($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			born
		}
	}
`;

const App = () => {
	const [errorMessage, setErrorMessage] = useState(null);
	const books = useQuery(ALL_BOOKS);

	const handleError = error => {
		setErrorMessage(error.graphQLErrors[0].message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 1000);
	};

	const [addBook] = useMutation(ADD_BOOK, {
		onError: handleError,
		refetchQueries: [{ query: ALL_BOOKS }]
	});

	const [editAuthor] = useMutation(EDIT_AUTHOR);

	return (
		<div>
			{errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
			<Books result={books} />
			<div>
				<h3>Add Book</h3>
				<BookForm addBook={addBook} />
			</div>
			<div>
				<h3>Edit Author</h3>
				<AuthorForm editAuthor={editAuthor} />
			</div>
		</div>
	);
};

export default App;
