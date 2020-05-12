import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { useApolloClient } from '@apollo/client';
import Login from './components/Login';
import Recommendations from './components/Recommendations';

const App = () => {
	const [page, setPage] = useState('authors');
	const [error, setError] = useState('');
	const [token, setToken] = useState(null);
	const [books, setBooks] = useState([]);

	const client = useApolloClient();

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
	};

	useEffect(() => {
		const result = localStorage.getItem('library-user-token');
		if (result) {
			setToken(result);
		}
	}, []);
	if (error) {
		setTimeout(() => {
			setError('');
		}, 5000);
	}

	return (
		<div>
			{error ? <p>{error}</p> : null}
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				{token ? (
					<>
						<button onClick={() => setPage('add')}>add book</button>
						<button onClick={() => setPage('recommended')}>recommended</button>
						<button onClick={logout}>logout</button>
					</>
				) : (
					<button onClick={() => setPage('login')}>login</button>
				)}{' '}
			</div>

			<Authors show={page === 'authors'} />

			<Books show={page === 'books'} setBooks={setBooks} books={books} />

			<Recommendations show={page === 'recommended'} books={books} />
			<NewBook client={client} setError={setError} show={page === 'add'} />

			<Login setError={setError} setToken={setToken} show={page === 'login'} />
		</div>
	);
};

export default App;
