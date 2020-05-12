import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
	const result = useQuery(ALL_BOOKS, {
		pollInterval: 30000,
	});

	const { books, setBooks } = props;

	const [genres, setGenres] = useState([]);
	const [filtered, setFiltered] = useState(books);

	useEffect(() => {
		if (result.data) {
			setBooks(result.data.allBooks);
		}
	}, [result.data, setBooks]);

	useEffect(() => {
		setFiltered(books);
		if (books.length > 0) {
			let values = [];
			let uniqueValues = [];
			books.map((b) => {
				values = [...values, ...b.genres];
				return true;
			});
			for (let i = 0; i < values.length; i++) {
				if (!uniqueValues.includes(values[i])) {
					uniqueValues.push(values[i]);
				}
			}
			setGenres(uniqueValues);
		}
	}, [books]);

	if (!props.show) {
		return null;
	}

	const applyFilter = (g) => {
		if (g === 'a') {
			setFiltered(books);
		} else {
			const newArr = books.filter((b) => b.genres.includes(g));
			setFiltered(newArr);
		}
	};

	const listGenres = (arr) => {
		return arr.map((g, i) => {
			return (
				<React.Fragment key={i}>
					<button onClick={() => applyFilter(g)}>{g}</button>
				</React.Fragment>
			);
		});
	};

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{filtered.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div>
				<button onClick={() => applyFilter('a')}>all</button>
				{listGenres(genres)}
			</div>
		</div>
	);
};

export default Books;
