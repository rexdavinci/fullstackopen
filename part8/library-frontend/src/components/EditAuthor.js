import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_AUTHOR } from '../queries';

const EditAuthor = ({ authors }) => {
	const [name, setName] = useState('');
	const [born, setBorn] = useState('');
	const [editAuthor] = useMutation(UPDATE_AUTHOR);

	const updateAuthor = (e) => {
		e.preventDefault();

		editAuthor({ variables: { name, setBornTo: Number(born) } });
		setName('');
		setBorn('');
	};

	const authorNames = authors.map((a, i) => <option key={i}>{a.name}</option>);

	return (
		<form onSubmit={updateAuthor}>
			<div>
				<label>name: </label>
				<select>{authorNames}</select>
			</div>
			<div>
				<label>born: </label>
				<input
					type='text'
					value={born}
					onChange={({ target }) => setBorn(target.value)}
				/>
			</div>
			<button>Update Author</button>
		</form>
	);
};

export default EditAuthor;
