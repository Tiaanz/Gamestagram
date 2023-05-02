import { screen, render } from '@testing-library/react'
import GameCard from './GameCard'
import nock from 'nock'
import '@testing-library/jest-dom'

describe('ImageBanner', () => {
  it('name should be displayed', async () => {
    //Arrange
    const game = {
      apiId: '123',
      name: 'Root',
      description: 'It is a cute fun game',
      averagePlayTime: '60-90',
      playerCount: '2-6',
      photoUrl: 'www.google.com',
    }

    nock('http://localhost').get('/').reply(200, game)

    render(<GameCard key={game.name} game={game} />)

    //Act
    const heading = await screen.getByRole('heading', {
      name: 'Root',
    })

    //Assert
    expect(heading).toHaveTextContent(/root/i)
  })

  it('playtime should be displayed', async () => {
    //Arrange
    const game = {
      apiId: '123',
      name: 'Root',
      description: 'It is a cute fun game',
      averagePlayTime: '60-90',
      playerCount: '2-6',
      photoUrl: 'www.google.com',
    }

    nock('http://localhost').get('/').reply(200, game)

    render(<GameCard key={game.name} game={game} />)

    //Act

    const playTime = await screen.getByText(
      new RegExp(game.averagePlayTime, 'i')
    )

    //Assert

    expect(playTime).toHaveTextContent(/60-90 minutes/i)
  })
  it('description should be displayed', async () => {
    //Arrange
    const game = {
      apiId: '123',
      name: 'Root',
      description: 'It is a cute fun game',
      averagePlayTime: '60-90',
      playerCount: '2-6',
      photoUrl: 'www.google.com',
    }

    nock('http://localhost').get('/').reply(200, game)

    render(<GameCard key={game.name} game={game} />)

    //Act
    const description = await screen.getByText(
      new RegExp(game.description, 'i')
    )

    //Assert

    expect(description).toHaveTextContent(/it is a cute fun game/i)
  })
})
