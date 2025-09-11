"use client"

import React, { useEffect, useMemo, useState } from "react"

type CountdownProps = {
  /** Target month is 1-indexed (Jan = 1). Defaults to 9 for September. */
  targetMonth?: number
  /** Target day of month. Defaults to 13. */
  targetDay?: number
  /** Optional target year. Defaults to the nearest upcoming date matching month/day. */
  targetYear?: number
  /** Optional className for outer wrapper */
  className?: string
}

const pad2 = (value: number): string => (value < 10 ? `0${value}` : String(value))

/**
 * A small, accessible countdown component that ticks every second.
 * Finds the next upcoming occurrence of the provided month/day if year not specified.
 */
export default function Countdown({
  targetMonth = 9,
  targetDay = 13,
  targetYear,
  className,
}: CountdownProps) {
  const computeTargetDate = useMemo(() => {
    const now = new Date()
    const year = targetYear ?? now.getFullYear()
    let target = new Date(year, targetMonth - 1, targetDay, 0, 0, 0)
    // If the date this year has already passed, roll to next year
    if (!targetYear && target.getTime() <= now.getTime()) {
      target = new Date(year + 1, targetMonth - 1, targetDay, 0, 0, 0)
    }
    return target
  }, [targetMonth, targetDay, targetYear])

  const getRemaining = (): {
    totalMs: number
    days: number
    hours: number
    minutes: number
    seconds: number
  } => {
    const now = new Date().getTime()
    const totalMs = computeTargetDate.getTime() - now
    const clamped = Math.max(0, totalMs)
    const days = Math.floor(clamped / (1000 * 60 * 60 * 24))
    const hours = Math.floor((clamped / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((clamped / (1000 * 60)) % 60)
    const seconds = Math.floor((clamped / 1000) % 60)
    return { totalMs: clamped, days, hours, minutes, seconds }
  }

  const [remaining, setRemaining] = useState(getRemaining())
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    const intervalId = setInterval(() => {
      setRemaining(getRemaining())
    }, 1000)
    return () => clearInterval(intervalId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [computeTargetDate])

  const isComplete = remaining.totalMs === 0

  return (
    <div
      className={
        "mx-auto mb-6 inline-flex items-center gap-4 rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white/90 " +
        (className ?? "")
      }
      role="timer"
      aria-live="polite"
    >
      <span className="text-sm text-white/60">Event starts in</span>
      {isComplete ? (
        <span className="font-semibold text-purple-300">Happening now</span>
      ) : (
        <div className="flex items-center gap-3 font-mono">
          <TimeBox label="Days" value={hasMounted ? pad2(remaining.days) : "--"} />
          <Separator />
          <TimeBox label="Hours" value={hasMounted ? pad2(remaining.hours) : "--"} />
          <Separator />
          <TimeBox label="Minutes" value={hasMounted ? pad2(remaining.minutes) : "--"} />
          <Separator />
          <TimeBox label="Seconds" value={hasMounted ? pad2(remaining.seconds) : "--"} />
        </div>
      )}
    </div>
  )
}

function TimeBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center">
      <div className="text-xl md:text-2xl font-extrabold text-purple-300 leading-none">
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-white/50">{label}</div>
    </div>
  )
}

function Separator() {
  return <span className="text-white/30">:</span>
}


