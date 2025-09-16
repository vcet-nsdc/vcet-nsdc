import React from 'react'
import Upcoming from './upcoming/upcoming'
import PastEvents from './past/PastEvents'

const Events = () => {
  return (
    <div className="space-y-16">
      <Upcoming />
      <PastEvents />
    </div>
  )
}

export default Events