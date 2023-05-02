import { render } from '@testing-library/react'
import { FormattedEventWithUser } from '../../../models/Event'
import { BrowserRouter as Router } from 'react-router-dom'
import EventCard from './EventCard'
import '@testing-library/jest-dom'

describe('EventCard', () => {
  const event: FormattedEventWithUser = {
    eventId: 123,
    eventName: 'Amogus Event',
    gameName: 'Amogus Game',
    gamePhoto: 'amogus.png',
    location: 'Amogus Location',
    time: '2023-05-01T13:00:00.000Z',
    hostId: 321,
    gameId: '3213',
    status: 'ongoing',
    description: 'meow',
    numberOfPeople: '3',
    createdAt: 'right meow',
    users: [
      {
        userId: 456,
        name: 'Test User',
        photoUrl: 'test-user.png',
        email: 'buh@gmail.com',
      },
    ],
  }

  it('renders the event card correctly', () => {
    const { getByText, getByAltText } = render(
      <Router>
        <EventCard event={event} />
      </Router>
    )

    expect(getByAltText('Amogus Game')).toBeInTheDocument()
    expect(getByText('Amogus Event')).toBeInTheDocument()
    expect(getByText('Amogus Game')).toBeInTheDocument()
    expect(getByText('Amogus Location...')).toBeInTheDocument()
  })
})
