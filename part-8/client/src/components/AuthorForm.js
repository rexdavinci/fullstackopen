import React, { useState } from 'react';

const AuthorForm = props => {
	const [formData, setFormData] = useState({
    name: '',
    born: 0
  });

	const handleInput = target => {
    setFormData({...formData, [target.name]: target.value});
	};

	const handleForm = async e => {
		e.preventDefault();
		await props.editAuthor({
			variables: {
				name: formData.name,
				setBornTo: Number(formData.born),
			}
		});

		setFormData({
      name: '',
      born: 0
		});
	};

	return (
		<div>
			<form onSubmit={handleForm}>
				name{' '}
				<input
					value={formData.name}
					name='name'
					onChange={({ target }) => handleInput(target)}
				/>
				<br />
				born{' '}
				<input
					value={formData.published}
					type='number'
					name='born'
					onChange={({ target }) => handleInput(target)}
				/>
				<br />
				<button>submit</button>
			</form>
		</div>
	);
};

export default AuthorForm;
