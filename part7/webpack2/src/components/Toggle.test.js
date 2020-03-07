import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Toggle from './Toggle'

describe('<Toggle /> Component Test Suite', () => {
  let component

  beforeEach(() => {
    component = render(
      <Toggle label='expand'>
        <div className='testDiv' />
      </Toggle>
    )
  })

  test('at start, the children are not displayed', () => {
    const div = component.container.querySelector('.toggle-content')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('expand')
    fireEvent.click(button)
    const div = component.container.querySelector('.toggle-content')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled component can be closed', () => {
    const button = component.getByText('expand')
    fireEvent.click(button)

    const closeButton = component.getByText('Cancel')
    fireEvent.click(closeButton)
    const div = component.container.querySelector('.toggle-content')
    expect(div).toHaveStyle('display: none')
  })
})