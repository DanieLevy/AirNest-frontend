import React, { useState } from "react"
import { BarndedBtn } from "../barnded-btn"
import DatePicker from "react-datepicker"
// import { BarndedBtn } from '../barnded-btn'
// import "react-datepicker/dist/react-datepicker.css"
import { AiFillStar } from "react-icons/ai"

export function CheckoutForm({ onSubmit, price, reviews }) {
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

  function calculateAverageRating(reviews) {
    if (!reviews.length) return 0

    const totalRating = reviews.reduce((sum, review) => sum + review.rate, 0)

    return totalRating / reviews.length
  }

  const avgRate = calculateAverageRating(reviews)

  return (
    <div className="checkout-form-container flex">
      <form onSubmit={handleSubmit} className="checkout-form">
        <div>
          <div className="form-header">
            <div className="form-header-price">
                <span className="price">${price} <span className="per-night">night</span>
                </span>
            </div>
            </div>
            <div className="form-header-reservation">
              <div className="reservation-dates-container">
              <div className="reservation-dates">
                <label className="reservation-dates-label">CHECK-IN</label>
                <input placeholder='Add date' name="check-in"/>
                </div>
                <div className="reservation-dates">
                <label className="reservation-dates-label">CHECK-OUT</label>
                <input placeholder='Add date' name="check-out"/>
                </div>
              </div>
              <div className="reservation-guests">
                <label className="reservation-guests-label">GUESTS</label>
                <input placeholder='1 guests' name="guests"/>
                </div>
            </div>
            <BarndedBtn txt={'Reserve'} />

            <div className="reservation-footer">
              <div>
              You won't be charged yet
              </div>
            </div>
        </div>
      </form>
    </div>
  )
}

// {/* <label>
// Start Date:
// <DatePicker
//   selected={startDate}
//   onChange={(date) => setStartDate(date)}
//   selectsStart
//   startDate={startDate}
//   endDate={endDate}
// />
// </label>
// </div>
// <div>
// <label>
// End Date:
// <DatePicker
//   selected={endDate}
//   onChange={(date) => setEndDate(date)}
//   selectsEnd
//   startDate={startDate}
//   endDate={endDate}
//   minDate={startDate}
// />
// </label>
// </div>
// <div>
// <label>
// Adults:
// <select value={adults} onChange={(e) => setAdults(e.target.value)}>
//   {[...Array(10)].map((_, i) => (
//     <option key={i} value={i + 1}>
//       {i + 1}
//     </option>
//   ))}
// </select>
// </label>
// </div>
// <div>
// <label>
// Children:
// <select
//   value={children}
//   onChange={(e) => setChildren(e.target.value)}
// >
//   {[...Array(10)].map((_, i) => (
//     <option key={i} value={i}>
//       {i}
//     </option>
//   ))}
// </select>
// </label>
// <button type="submit">Submit</button>
// <div>{/* <BarndedBtn txt={'Checkout'} /> */}</div> */}
