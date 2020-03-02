import React from 'react'
import Button from './Button'
import { Header, Container, Form } from 'semantic-ui-react'
const NewBlog = ({ titleField, urlField,  authorField, handleSubmit }) => {
  return (
    <Container>
        <Header as='h2' textAlign='center' id='login-form'>New Blog</Header>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Author</label>
            <input placeholder='Author' {...authorField} />
          </Form.Field>
          <Form.Field>
            <label>Title</label>
            <input placeholder='Title' {...titleField} />
          </Form.Field>
          <Form.Field>
            <label>Url</label>
            <input placeholder='Url' {...urlField} />
          </Form.Field>
          <div className='signup-btn-row'>
            <Button color={'olive'} name={'Add'} classStyle={'submit-btn'} />
          </div>
        </Form>
    </Container>
  )
}

export default NewBlog