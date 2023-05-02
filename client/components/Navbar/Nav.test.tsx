import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import Nav from './Nav'
import '@testing-library/jest-dom'
// import userEvent from '@testing-library/user-event'

//Checks whether there are any console errors and checks whether "container" (navbar) is in the document
describe('Nav', () => {
  test('the nav bar is rendered without errors', () => {
    const spy = jest.spyOn(console, 'error')
    const { container } = render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    )
    expect(container).toBeInTheDocument()
    expect(spy).not.toHaveBeenCalled()
    spy.mockRestore()
  })

  //Checks whether Nav component renders Events link
  test('renders "Events" link in the Navbar', () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    )
    const navLinks = screen.getAllByRole('link')
    const eventsLink = navLinks.find((link) => link.textContent === 'Events')

    expect(eventsLink).toBeInTheDocument()
  })
  //Checks whether Nav component renders Boardgames link
  test('renders "Boardgames" link in the Navbar', () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    )
    const navLinks = screen.getAllByRole('link')
    const boardgamesLink = navLinks.find(
      (link) => link.textContent === 'Boardgames'
    )
    expect(boardgamesLink).toBeInTheDocument()
  })

  //Checks whether img element contains right image
  test('the website logo img element is present in the document', () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    )
    const displayedImage = document.querySelector('img') as HTMLImageElement
    expect(displayedImage.src).toContain('/pics/temporary-logo.png')
  })

  //Checks whether img element is clickable to redirects to home
  test('the website logo img element is clickable', () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    )
    const displayedImage = document.querySelector('img') as HTMLImageElement
    expect(displayedImage.src).toContain('/pics/temporary-logo.png')

    const onClickMock = jest.fn()
    displayedImage.addEventListener('click', onClickMock)

    fireEvent.click(displayedImage)

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  //Checks whether we redirect to landing page on click
  test('the website logo img element redirects to home when clicked', () => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    )
    const displayedImage = document.querySelector('img') as HTMLImageElement
    expect(displayedImage.src).toContain('/pics/temporary-logo.png')

    const onClickMock = jest.fn()
    displayedImage.addEventListener('click', onClickMock)

    fireEvent.click(displayedImage)

    expect(onClickMock).toHaveBeenCalledTimes(1)
    expect(window.location.href).toBe('http://localhost/')
  })

  //Checks whether Nav component has boardgame logo inside
  test('image alt text is present in the navbar', () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    )

    const logoImage = screen.getByAltText('website logo')

    expect(logoImage).toBeInTheDocument()
  })
})
