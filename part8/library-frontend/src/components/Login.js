import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const Login = (props) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [login, result] = useMutation(LOGIN, {
		onError: (error) => {
			props.setError(error.graphQLErrors[0].message);
		},
	});

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value;
			console.log(result.data.login);
			props.setToken(token);
			localStorage.setItem('library-user-token', token);
			localStorage.setItem('user-favorite-genre', result.data.login.favorite);
		}
	}, [result.data]); //eslint-disable-line

	if (!props.show) {
		return null;
	}

	const submit = (e) => {
		e.preventDefault();
		login({ variables: { username, password } });
	};

	return (
		<form onSubmit={submit}>
			<div>
				<label>name</label>
				<input
					type='text'
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>

			<div>
				<label>password</label>
				<input
					type='password'
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button>login</button>
		</form>
	);
};

export default Login;
