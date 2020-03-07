import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog /> Component Test Suite', () => {

  let component

  const blog = {
    title: 'Origin of Species',
    author: 'Charles Darwin',
    likes: '230',
    url: 'www.google.com',
    user: '5dd355a2a1969d3b5c99baa8'
  }

  const mockHandler = jest.fn()

  test('component renders blog\'s title, author and likes', () => {

    component = render(
      <SimpleBlog blog={blog} onClick={mockHandler}/>
    )

    expect(component.container).toHaveTextContent(
      `Origin of Species Charles Darwinblog has ${blog.likes}`
    )
  })

  test('component button works when clicked twice', () => {

    component = render(
      <SimpleBlog blog={blog} onClick={mockHandler}/>
    )

    const button = component.container.querySelector('button')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
  })

})

