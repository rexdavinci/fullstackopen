import React, { useState } from 'react';

const BookForm = props => {
	const [formData, setFormData] = useState({
		title: '',
		published: 0,
		author: '',
		genres: []
  });

	const handleInput = target => {
		if (target.type === 'checkbox') {
			if (!target.checked) {
				const removeGenre = formData.genres.filter(g => g !== target.value);
				setFormData({ ...formData, genres: [...removeGenre] });
			} else {
				setFormData({
					...formData,
					genres: [...formData.genres, target.value]
				});
			}
		} else {
			setFormData({ ...formData, [target.name]: target.value });
		}
	};

	const handleForm = async e => {
		e.preventDefault();
		await props.addBook({
			variables: {
				title: formData.title,
				author: formData.author,
				published: Number(formData.published),
				genres: formData.genres
			}
		});

		setFormData({
			title: '',
			published: 0,
			author: '',
			genres: []
		});
	};

	return (
		<div>
			<form onSubmit={handleForm}>
				title{' '}
				<input
					value={formData.title}
					name='title'
					onChange={({ target }) => handleInput(target)}
				/>
				<br />
				published{' '}
				<input
					value={formData.published}
					type='number'
					name='published'
					onChange={({ target }) => handleInput(target)}
				/>
				<br />
				author{' '}
				<input
					value={formData.author}
					name='author'
					onChange={({ target }) => handleInput(target)}
				/>
				<br />
				<p>Genres</p>
				classic{' '}
				<input
					type='checkbox'
					name='genres'
					value='classic'
					onChange={({ target }) => handleInput(target)}
				/>
				revolution{' '}
				<input
					type='checkbox'
					name='genres'
					value='revolution'
					onChange={({ target }) => handleInput(target)}
        />
        classic{' '}
				<input
					type='checkbox'
					name='genres'
					value='classic'
					onChange={({ target }) => handleInput(target)}
        />
        crime{' '}
				<input
					type='checkbox'
					name='genres'
					value='crime'
					onChange={({ target }) => handleInput(target)}
        />
        design{' '}
				<input
					type='checkbox'
					name='genres'
					value='design'
					onChange={({ target }) => handleInput(target)}
        />
        patterns{' '}
				<input
					type='checkbox'
					name='genres'
					value='patterns'
					onChange={({ target }) => handleInput(target)}
        />
        <br />
				<button>submit</button>
			</form>
		</div>
	);
};

export default BookForm;
