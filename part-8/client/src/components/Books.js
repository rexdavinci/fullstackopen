import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useApolloClient } from '@apollo/react-hooks'

const FIND_BOOK = gql`
	query findBookByOption($author: String, $genreType: String) {
		allBooks(author: $author, genre: $genreType) {
			title
			author
			id
		}
	}
`;

const Books = ({ result }) => {
  const client = useApolloClient()
	const [book, setBook] = useState(null);

	if (result.loading) {
		return <div>Loading...</div>;
	}

	const showBook = async (author, genre) => {
		const { data } = await client.query({
			query: FIND_BOOK,
			variables: { author, genre }
		});
		setBook(data.allBooks);
	};

	if (book) {
    console.log(book)
		return (
			<div>
				{book[0].author}
				{book.map(b => (
					<div key={b.id}>
						<p>{b.title}</p>
					</div>
				))}
				<button onClick={() => setBook(null)}>close</button>
			</div>
		);
	}

	const books = result.data.allBooks;

	return (
		<div>
			<h2>Books</h2>
			{books.map(b => (
				<div key={b.id}>
					{b.title}
					<button onClick={() => showBook(b.author)}>show author</button>
				</div>
			))}
		</div>
	);
};

export default Books;
