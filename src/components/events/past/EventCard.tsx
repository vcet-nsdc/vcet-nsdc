"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin } from "lucide-react"

interface Event {
  id: string
  title: string
  year: string
  date: string
  time: string
  venue: string
  description: string
  about: string
  highlights: string[]
  gallery: string[]
  link: string
}

interface EventCardProps {
  event: Event
  onClick: (event: Event) => void
}

export function EventCard({ event, onClick }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      className="group"
      onClick={() => onClick(event)}
    >
      <Card className="h-full bg-gradient-to-br from-purple-600/20 via-violet-600/20 to-fuchsia-600/20 backdrop-blur-sm border-2 border-purple-500/30 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 relative overflow-hidden cursor-pointer rounded-3xl">
        {/* Purple gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-sm -z-10" />
        <div className="absolute inset-[2px] bg-gradient-to-br from-purple-600/20 via-violet-600/20 to-fuchsia-600/20 rounded-3xl z-0" />

        <div className="relative z-10">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between mb-3">
              <CardTitle className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors duration-300 text-balance">
                {event.title}
              </CardTitle>
              <Badge
                variant="secondary"
                className="bg-purple-500/80 text-white border-purple-400 hover:bg-purple-500 transition-colors duration-300 backdrop-blur-sm"
              >
                Past Event
              </Badge>
            </div>

            {/* Event Details */}
            <div className="space-y-2 text-sm text-purple-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-violet-400" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-violet-400" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-violet-400" />
                <span>{event.venue}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pb-6">
            <CardDescription className="text-purple-200 leading-relaxed text-pretty">
              {event.description}
            </CardDescription>
          </CardContent>

          <CardFooter>
            <div className="w-full text-center text-sm text-purple-300">Click to view details</div>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  )
}
