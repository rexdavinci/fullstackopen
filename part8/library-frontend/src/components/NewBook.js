import React, { useState } from 'react';
import { useMutation, useSubscription } from '@apollo/client';
import { ADD_BOOK, ALL_BOOKS, BOOK_ADDED } from '../queries';

const NewBook = ({ setError, client, show }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [published, setPublished] = useState('');
	const [genre, setGenre] = useState('');
	const [genres, setGenres] = useState([]);

	const updateCacheWith = (addedBook) => {
		const includedIn = (set, object) =>
			set.map((b) => b.id).includes(object.id);

		const dataInStore = client.readQuery({ query: ALL_BOOKS });
		if (!includedIn(dataInStore.allBooks, addedBook)) {
			client.writeQuery({
				query: ALL_BOOKS,
				data: { allBooks: dataInStore.allBooks.concat(addedBook) },
			});
		}
	};

	useSubscription(BOOK_ADDED, {
		onSubscriptionData: ({ subscriptionData }) => {
			const addedBook = subscriptionData.data.bookAdded;
			window.alert('New Book added');
			updateCacheWith(addedBook);
		},
	});

	const [addBook] = useMutation(ADD_BOOK, {
		onError: (error) => {
			setError(error.graphQLErrors[0].message);
		},
		update: (store, response) => {
			updateCacheWith(response.data.addBook);
		},
	});

	if (!show) {
		return null;
	}

	const submit = async (event) => {
		event.preventDefault();

		addBook({
			variables: { title, author, published: Number(published), genres },
		});
		setTitle('');
		setPublished('');
		setAuthor('');
		setGenres([]);
		setGenre('');
	};

	const addGenre = () => {
		setGenres(genres.concat(genre));
		setGenre('');
	};

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					title
					<input
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					published
					<input
						type='number'
						value={published}
						onChange={({ target }) => setPublished(target.value)}
					/>
				</div>
				<div>
					<input
						value={genre}
						onChange={({ target }) => setGenre(target.value)}
					/>
					<button onClick={addGenre} type='button'>
						add genre
					</button>
				</div>
				<div>genres: {genres.join(' ')}</div>
				<button type='submit'>create book</button>
			</form>
		</div>
	);
};

export default NewBook;
