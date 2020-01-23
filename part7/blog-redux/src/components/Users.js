import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getUsers } from '../reducers/userReducer'

const Users = props => {
	const { fetchUsers, users } = props
	
	useEffect(()=>{
		fetchUsers()
	}, [fetchUsers])

	const mapUsers = arr => {
		return arr.map(user => {
			return (
				<tr key={user.id}>
					<td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
					<td>{user.blogs.length}</td>
				</tr>
			)
		})
	}
	
	return (
		<div>
			<h2>Users</h2>
			{
				users.length === 0 ? null : <table>
					<tbody>
						<tr>
							<th></th>
							<th>blogs created</th>
						</tr>
						{mapUsers(users)}
					</tbody>
				</table>
			}

		</div>
	)
}

const mapStateToProps = state => {
	return {
		users: state.users.usersList
	}
}

const mapDispatchToProps = {
	fetchUsers: getUsers
}


const connectedUsers = connect(mapStateToProps, mapDispatchToProps)(Users)
export default connectedUsers 