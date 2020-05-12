import React from 'react';

const Recommendations = (props) => {
	const { books } = props;
	const favorite = localStorage.getItem('user-favorite-genre');

	if (!props.show) {
		return null;
	}

	return (
		<div>
			<h2>Recommendations</h2>
			<p>
				Books in your favorite genre <b>{favorite}</b>
			</p>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books
						.filter((b) => b.genres.includes(favorite.toLowerCase()))
						.map((a) => (
							<tr key={a.title}>
								<td>{a.title}</td>
								<td>{a.author.name}</td>
								<td>{a.published}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default Recommendations;
