import type { FormattedEventWithUser } from '../../../models/Event'
import { Link } from 'react-router-dom'
import { formatTime, limitLocationLength } from '../../helper/helperFunction'
import { motion } from 'framer-motion'

function EventCard({ event }: { event: FormattedEventWithUser }) {
  const date = event.time.slice(0, 10)
  const time = event.time.slice(10)
  const location = limitLocationLength(event.location)

  const formattedTime = formatTime(date)

  return (
    <motion.div
      className="inline-block  cursor-pointer bg-slate-200 w-60 h-80 rounded-2xl shadow-2xl shadow-slate-400 mx-4 my-20"
      whileHover={{ scale: 1.2 }}
    >
      <Link to={`/events/${event.eventId}`}>
        <img
          src={`${event.gamePhoto}`}
          alt={`${event.gameName}`}
          className="h-3/5 rounded-t-2xl w-full"
        />

        <div className="p-2 text-center h-2/5 w-full">
          <h4 className="text-orange-900 mb-2">
            {formattedTime}
            {time}
          </h4>
          <p className="font-semibold mb-1 text-center">{event.eventName}</p>
          <p className="italic mb-1 ">{event.gameName}</p>
          <p className="font-thin text-ellipsis overflow-hidden ">
            {location}...
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

export default EventCard
