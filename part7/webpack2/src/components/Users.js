import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Header } from 'semantic-ui-react'

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
					<td className='user-name'><Link to={`/users/${user.id}`}>{user.name} ({user.username})</Link></td>
					<td className='user-blogs'>{user.blogs.length}</td>
				</tr>
			)
		})
	}
	
	return (
		<Container className='users'>
			<Header as='h2' textAlign='center'>Users</Header>
			<div className='users-list'>
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

		</Container>
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