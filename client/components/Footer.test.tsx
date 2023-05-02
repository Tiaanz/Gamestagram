import { screen, render } from '@testing-library/react'
import Footer from './Footer'
import nock from 'nock'
import '@testing-library/jest-dom'

describe('Footer', () => {
  it('correct text should be displayed', async () => {
    //Arrange

    nock('http://localhost').get('/').reply(200)

    render(<Footer />)

    //Act

    const info = await screen.getByText(/KKKCT™/i)

    //Assert

    expect(info).toBeInTheDocument()
  })
})
