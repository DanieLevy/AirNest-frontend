import React, { useState } from 'react'
import { format } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

export function DatesModal({ isOpen, onCloseModal, onSetDates }) {
  const [range, setRange] = useState({
    startDate: null,
    endDate: null,
  })

  const initialMonth = new Date()
  initialMonth.setMonth(initialMonth.getMonth() - 6)

  function handleDayClick(day) {
    const rangeCopy = { ...range }

    if (!range.startDate || (range.startDate && range.endDate)) {
      rangeCopy.startDate = day
      rangeCopy.endDate = null
    } else {
      rangeCopy.endDate = day
    }

    setRange(rangeCopy)
  }

  // function handleSelect(day) {
  //   const rangeCopy = { ...range }

  //   if (!range.startDate) {
  //     rangeCopy.startDate = day
  //   } else {
  //     rangeCopy.endDate = day
  //     console.log('clicked date!')
  //     onSetDates(rangeCopy)
  //   }

  //   setRange(rangeCopy)
  // }
  function handleSelect(day) {
    const rangeCopy = { ...range }

    if (!range.startDate || (range.startDate && range.endDate)) {
      rangeCopy.startDate = day
      rangeCopy.endDate = null
    } else {
      rangeCopy.endDate = day
      console.log('clicked date!')
      onSetDates(rangeCopy)
    }

    setRange(rangeCopy)
  }

  function handleConfirm() {
    onSetDates(range)
  }

  return (
    <div className='dates-modal'>
      {/* <DayPicker id="dates" numberOfMonths={2} /> */}
      <DayPicker
        mode='range'
        selected={range}
        onSelect={setRange}
        onDayClick={handleDayClick}
        onDayChange={handleSelect}
        month={initialMonth}
        disabledDays={{ before: new Date() }}
        numberOfMonths={2}
      />
    </div>
  )
}
