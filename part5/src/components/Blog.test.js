import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

// Blog Test
describe('<Blog /> Component Test Suite', () => {

  let component

  const blog = {
    title: 'Origin of Species',
    author: 'Charles Darwin',
    url: 'www.google.com',
    user: '5dd355a2a1969d3b5c99baa8'
  }

  const authUser = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…AwNH0.fgoDJ5mWtR-j3ZJwp3_1GV0kc4spgx5ZZC1zFWaQsEs',
    username: 'bigman1',
    name: 'Big Small Man'
  }

  const mockHandler = jest.fn()

  test('clicking the button calls event handler once', () => {

    const { getByText } = render(
      <Blog blogs={[]} authUser={{}} blog={blog} deleteBlog={mockHandler}/>
    )

    const button = getByText('Delete')
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(1)

  })

  describe('on first render', () => {
    component = render(
      <Blog blogs={[]} authUser={authUser} blog={blog} label={'Delete'}/>
    )

    test('only title and author are displayed', () => {
      component = render(
        <Blog blogs={[]} authUser={authUser} blog={blog} label={'Delete'}/>
      )
      const titleAndAuthor = component.container.querySelector('.short')
      expect(titleAndAuthor).toHaveTextContent(
        'Origin of Species - Charles Darwin'
      )
    })

    test('other information is not displayed', () => {
      component = render(
        <Blog blogs={[]} authUser={authUser} blog={blog} label={'Delete'}/>
      )
      const fullInformation = component.container.querySelector('.expanded')
      expect(fullInformation).toHaveStyle('display: none')
    })
  })


  test('when title is clicked, the other information of the blog post becomes visible', () => {
    component = render(
      <Blog blogs={[]} authUser={authUser} blog={blog} label={'Delete'}/>
    )
    const title = component.container.querySelector('.short')
    fireEvent.click(title)

    const expanded = component.container.querySelector('.expanded')
    expect(expanded).toHaveStyle('display: block')
  })

  test('renders content', () => {
    component = render (
      <Blog blogs={[]} authUser={authUser} blog={blog} label={'Delete'}/>
    )
    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'Origin of Species'
    )
  })
})

