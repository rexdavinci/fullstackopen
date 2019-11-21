import React from 'react'
jest.mock('./services/blogs')
import { render, waitForElement } from '@testing-library/react'
import App from './App'

describe('<App /> Component Test Suite', () => {
  test('if user is not logged in, no blog is rendered', async ()=>{
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

  })
})