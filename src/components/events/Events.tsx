
import Upcoming from './upcoming/upcoming'
import { PastEventsSection } from './past/PastEvents'

const Events = () => {
  return (
    <div className="space-y-16">
      <Upcoming />
      <PastEventsSection events={[]} />
    </div>
  )
}

export default Events