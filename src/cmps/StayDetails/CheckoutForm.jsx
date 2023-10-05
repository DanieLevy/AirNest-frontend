import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { BarndedBtn } from '../barnded-btn'

export function CheckoutForm({ onSubmit }) {
  const [startDate, setStartDate] = useState(Date.now())
  const [endDate, setEndDate] = useState(Date.now())
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = {
      startDate,
      endDate,
      adults,
      children,
    }
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Start Date:
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} selectsStart startDate={startDate} endDate={endDate} />
        </label>
      </div>
      <div>
        <label>
          End Date:
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </label>
      </div>
      <div>
        <label>
          Adults:
          <select value={adults} onChange={(e) => setAdults(e.target.value)}>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Children:
          <select value={children} onChange={(e) => setChildren(e.target.value)}>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <BarndedBtn txt={'Checkout'} />
      </div>
    </form>
  )
}
