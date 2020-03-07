import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogService')
import App from './App'

describe('<App /> Component Test Suite', () => {
  let component

  test('if user is not logged in, no blog is rendered', async () => {
    component = render(
      <App />
    )

    component.rerender(<App />,
      await waitForElement(
        () => component.getByText('Login...'))
    )

    expect(component.container).toHaveTextContent('Login Form')

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
  })

  test('if user is logged in, blogs are shown', async () => {
    const authUser = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…AwNH0.fgoDJ5mWtR-j3ZJwp3_1GV0kc4spgx5ZZC1zFWaQsEs',
      username: 'bigman1',
      name: 'Big Small Man'
    }
    localStorage.setItem('loggedBlogger', JSON.stringify(authUser))
    component.rerender(
      <App />
    )

    const blogs = component.container.querySelector('.blogs')
    expect(blogs).toBeVisible()
  })
})