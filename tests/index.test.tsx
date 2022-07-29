import { render, screen, fireEvent } from '@testing-library/react'
import Home from '../pages/index'

global.ResizeObserver = require('resize-observer-polyfill')

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /Welcome to imgur subreddits galleries/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('default subreddit value should be pics', async () => {
    render(<Home />)
 
    expect(screen.getByRole("input")).toHaveValue("pics");
  })

  it('should change input value', async () => {
    render(<Home />)

    const inputEl = screen.getByRole("input");
    fireEvent.change(inputEl, {target: {value: 'dogs'}})
 
    expect(screen.getByRole("input")).toHaveValue("dogs");
  })
})