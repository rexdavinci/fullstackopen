import React from 'react'
import { useField } from '../hooks'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { signup } from '../reducers/userReducer'
import Button from './Button'
import { Container, Header, Form } from 'semantic-ui-react'

const SignupForm = props => {
  const { signup } = props
  const [username, bindUsername, resetUsername] = useField('')
  const [name, bindFullname, resetFullname] = useField('')
  const [password, bindPassword, resetPassword] = useField('')

  SignupForm.propTypes = {
    signup: PropTypes.func.isRequired
  }

  const handleSignup = async event => {
    event.preventDefault()
    signup({username, name, password})
    resetUsername()
    resetPassword()
    resetFullname()
  }

  return (
    <Container>
        <Header as='h2' textAlign='center' id='login-form'>Register</Header>
        <Form onSubmit={handleSignup}>
          <Form.Field>
            <label>Username</label>
            <input placeholder='Username...' {...bindUsername} />
          </Form.Field>
          <Form.Field>
            <label>Fullname</label>
            <input placeholder='Fullname...' {...bindFullname} />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input placeholder='Password...' {...bindPassword} type='password' />
          </Form.Field>
          <div className='signup-btn-row'>
            <Button color={'olive'} name={'Register'} classStyle={'signup-btn'} />
          </div>
        </Form>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    authUser: state.users.authUser
  }
}

const mapDispatchToProps = {
  signup
}

const connectedSignupForm = connect(mapStateToProps, mapDispatchToProps)(SignupForm)

export default connectedSignupForm
