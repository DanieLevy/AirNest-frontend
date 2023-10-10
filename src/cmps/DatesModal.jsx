import React, { useState } from "react"
import { format } from "date-fns"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

export function DatesModal({ onSetDates }) {
  const [datesOpen, setDatesOpen] = useState(true)
  const [selectedRange, setSelectedRange] = useState({
    from: null,
    to: null,
  })

  const handleDayClick = (date) => {
    if (!selectedRange.from) {
      setSelectedRange({ from: date, to: null })
    } else {
      setSelectedRange({ from: selectedRange.from, to: date })

      const fromTimestamp = selectedRange.from.getTime()
      const toTimestamp = date.getTime()

      onSetDates({
        from: fromTimestamp,
        to: toTimestamp,
      })
    }
  }

  return (
    <React.Fragment>
    {datesOpen && (
    <div className="dates-modal">
      <DayPicker
        mode="range"
        selected={selectedRange}
        onDayClick={handleDayClick}
        numberOfMonths={1}
        modifiers={{ disabled: [{ before: new Date() }] }}
      />
    </div>
    )}
    </React.Fragment>
  )
}

