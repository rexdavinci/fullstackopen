import React, { useState } from 'react'
import { useField } from '../hooks'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../reducers/userReducer'
import Button from './Button'
import SignupForm from './SignupForm'
import { Header, Container, Form } from 'semantic-ui-react'

const LoginForm = props => {
  const [register, setRegister] = useState(false)
  const { login } = props
  const [username, bindUsername, resetUsername] = useField('')
  const [password, bindPassword, resetPassword] = useField('')

  LoginForm.propTypes = {
    login: PropTypes.func.isRequired
  }

  const handleLogin = async event => {
    event.preventDefault()
    login({username, password})
    resetUsername()
    resetPassword()
  }

  const toggleRegister = () => {
    setRegister(!register)
  }

  return (
    <>
    {
      !register ? <Container>
        <Header as='h2' textAlign='center' id='login-form'>Login</Header>
        <Form onSubmit={handleLogin}>
          <Form.Field>
            <label>Username</label>
            <input placeholder='Username...' {...bindUsername} />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input placeholder='Password...' {...bindPassword} type='password' />
          </Form.Field>
          <div className='login-btn-row'>
            <Button color={'olive'} name={'Login'} classStyle={'login-btn'} />
          </div>
        </Form>
      </Container> : <SignupForm setRegister={setRegister}/>
    }
    <div className='login-btn-row'>
      <Button name={ register ? 'Login' : 'Signup'} classStyle={'secondary toggle-login-btn'} method={toggleRegister}/>
    </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    authUser: state.users.authUser
  }
}

const mapDispatchToProps = {
  login
}

const connectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default connectedLoginForm
