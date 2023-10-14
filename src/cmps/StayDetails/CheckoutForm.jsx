import React, { useEffect, useState } from "react"

import { BarndedBtn2 } from "../branded-Btn-2"

import { format, set } from "date-fns"
import { DayPicker } from "react-day-picker"

import { AiOutlineMinus } from "react-icons/ai"
import { AiOutlinePlus } from "react-icons/ai"
import { is } from "date-fns/locale"

// import { is } from 'date-fns/locale'

// const initialFrom = new Date()
// const initialTo = new Date()

// initialFrom.setUTCHours(0, 0, 0, 0)
// initialTo.setUTCHours(0, 0, 0, 0)

export function CheckoutForm({ onSubmit, price, reviews }) {
  const [isStayPage, setIsStayPage] = useState(
    location.pathname.startsWith("/stay")
  )
  const [selectedRange, setSelectedRange] = useState(
    isStayPage
      ? {
          from: new Date(),
          to: addDays(new Date(), 3),
        }
      : {
          from: null,
          to: null,
        }
  )

  const [isDatesModal, setIsDatesModal] = useState(false)
  const [isGuestsModal, setIsGuestsModal] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  const [selectedGuests, setSelectedGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  })

  const [isCheckoutSum, setIsCheckoutSum] = useState(false)
  const dateDiff =
    selectedRange.to && selectedRange.from
      ? selectedRange.to.getTime() - selectedRange.from.getTime()
      : 0
  const dateDiffDays = dateDiff / (1000 * 60 * 60 * 24)
  const totalSum = price * dateDiffDays
  const totalPlusFee = totalSum + totalSum * 0.125

  useEffect(() => {
    dateDiffDays ? setIsCheckoutSum(true) : setIsCheckoutSum(false)
  }, [selectedRange])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    const closeModals = (event) => {
      if (
        !event.target.closest(".guests-modal") &&
        !event.target.closest(".date-picker-container")
      ) {
        setIsGuestsModal(false)
        setIsDatesModal(false)
      }
    }

    window.addEventListener("resize", handleResize)
    document.addEventListener("click", closeModals)

    return () => {
      document.removeEventListener("click", closeModals)
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!selectedRange.from || !selectedRange.to) {
      isDatesModal ? setIsDatesModal(false) : setIsDatesModal(true)
    }

    // if selectedRange is not more then 1 day - show error
    if (dateDiffDays < 1) {
      alert("Please select more then 1 day")
      return
    }

    const checkInTs = selectedRange.from.getTime()
    const checkOutTs = selectedRange.to.getTime()
    const nights = dateDiffDays

    const formData = {
      checkIn: checkInTs,
      checkOut: checkOutTs,
      guests: selectedGuests,
      totalPrice: totalPlusFee,
      nights: nights,
    }

    onSubmit(formData)
  }

  function addDays(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
  }

  function calculateAverageRating(reviews) {
    if (!reviews.length) return 0

    const totalRating = reviews.reduce((sum, review) => sum + review.rate, 0)

    return totalRating / reviews.length
  }

  const avgRate = calculateAverageRating(reviews)

  return (
    <React.Fragment>
      {!isStayPage && (
        <div className="checkout-form-container flex">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="helped-container">
              <div className="form-header">
                <div className="form-header-price">
                  <span className="price">
                    ${price} <span className="per-night">night</span>
                  </span>
                </div>
              </div>
              <div className="form-header-reservation">
                <div
                  className="reservation-dates-container"
                  onClick={(ev) => {
                    ev.stopPropagation()
                    setIsDatesModal(!isDatesModal)
                  }}
                >
                  <div className="reservation-dates">
                    <label className="reservation-dates-label">CHECK-IN</label>
                    <input
                      placeholder="Add date"
                      name="check-in"
                      required
                      readOnly
                      value={
                        selectedRange.from
                          ? format(selectedRange.from, "dd/MM/yyyy")
                          : ""
                      }
                    />
                  </div>
                  <div className="reservation-dates">
                    <label className="reservation-dates-label">CHECK-OUT</label>
                    <input
                      placeholder="Add date"
                      name="check-out"
                      required
                      readOnly
                      value={
                        selectedRange.to
                          ? format(selectedRange.to, "dd/MM/yyyy")
                          : ""
                      }
                    />
                  </div>
                </div>

                {isDatesModal && (
                  <div className="date-picker-container">
                    <DayPicker
                      mode="range"
                      selected={selectedRange}
                      onDayClick={(date) => {
                        if (!selectedRange.from) {
                          setSelectedRange({ ...selectedRange, from: date })
                        } else if (!selectedRange.to) {
                          setSelectedRange({ ...selectedRange, to: date })
                          setIsDatesModal(false) // close modal
                        } else {
                          setSelectedRange({ from: date, to: null })
                        }
                      }}
                      numberOfMonths={2}
                      modifiers={{
                        disabled: [{ before: new Date() }],
                      }}
                    />
                  </div>
                )}

                <div
                  className="reservation-guests"
                  onClick={(ev) => {
                    ev.stopPropagation()
                    setIsGuestsModal(!isGuestsModal)
                  }}
                >
                  <label className="reservation-guests-label">GUESTS</label>
                  <input
                    placeholder={`${selectedGuests.adults} guests ${
                      selectedGuests.children
                        ? `, ${selectedGuests.children} children`
                        : ""
                    } ${
                      selectedGuests.infants
                        ? `, ${selectedGuests.infants} infants`
                        : ""
                    } ${
                      selectedGuests.pets ? `, ${selectedGuests.pets} pets` : ""
                    }`}
                    name="guests"
                    required
                    readOnly
                    value={`${selectedGuests.adults} guests ${
                      selectedGuests.children
                        ? `, ${selectedGuests.children} children`
                        : ""
                    } ${
                      selectedGuests.infants
                        ? `, ${selectedGuests.infants} infants`
                        : ""
                    } ${
                      selectedGuests.pets ? `, ${selectedGuests.pets} pets` : ""
                    }`}
                  />
                </div>
              </div>

              {isGuestsModal && (
                <div className="guests-modal">
                  {/* Adults */}
                  <div className="guests-options" id="adults">
                    <div className="guests-title">
                      <h3 className="guests-modal-title">Adults</h3>
                      <span className="guests-modal-subtitle">
                        Ages 13 or above
                      </span>
                    </div>
                    <div className="guests-action flex">
                      <button
                        disabled={selectedGuests.adults === 0}
                        onClick={() =>
                          setSelectedGuests({
                            ...selectedGuests,
                            adults: selectedGuests.adults - 1,
                          })
                        }
                        type="button"
                        className="guests-modal-btn"
                      >
                        <AiOutlineMinus />
                      </button>
                      <span className="guests-modal-count">
                        {selectedGuests.adults}
                      </span>
                      <button
                        type="button"
                        className="guests-modal-btn"
                        onClick={() =>
                          setSelectedGuests({
                            ...selectedGuests,
                            adults: selectedGuests.adults + 1,
                          })
                        }
                        disabled={selectedGuests.adults === 16}
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="guests-options" id="children">
                    <div className="guests-title">
                      <h3 className="guests-modal-title">Children</h3>
                      <span className="guests-modal-subtitle">Ages 2-12</span>
                    </div>
                    <div className="guests-action flex">
                      <button
                        disabled={selectedGuests.children === 0}
                        onClick={() =>
                          setSelectedGuests({
                            ...selectedGuests,
                            children: selectedGuests.children - 1,
                          })
                        }
                        type="button"
                        className="guests-modal-btn"
                      >
                        <AiOutlineMinus />
                      </button>
                      <span className="guests-modal-count">
                        {selectedGuests.children}
                      </span>
                      <button
                        type="button"
                        className="guests-modal-btn"
                        onClick={() =>
                          setSelectedGuests({
                            ...selectedGuests,
                            children: selectedGuests.children + 1,
                          })
                        }
                        disabled={selectedGuests.children === 5}
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </div>

                  {/* Infants */}
                  <div className="guests-options" id="infants">
                    <div className="guests-title">
                      <h3 className="guests-modal-title">Infants</h3>
                      <span className="guests-modal-subtitle">Under 2</span>
                    </div>
                    <div className="guests-action flex">
                      <button
                        type="button"
                        className="guests-modal-btn"
                        disabled={selectedGuests.infants === 0}
                        onClick={() =>
                          setSelectedGuests({
                            ...selectedGuests,
                            infants: selectedGuests.infants - 1,
                          })
                        }
                      >
                        <AiOutlineMinus />
                      </button>
                      <span className="guests-modal-count">
                        {selectedGuests.infants}
                      </span>
                      <button
                        type="button"
                        className="guests-modal-btn"
                        disabled={selectedGuests.infants === 5}
                        onClick={() =>
                          setSelectedGuests({
                            ...selectedGuests,
                            infants: selectedGuests.infants + 1,
                          })
                        }
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </div>

                  {/* PETS */}
                  <div className="guests-options" id="pets">
                    <div className="guests-title">
                      <h3 className="guests-modal-title">Pets</h3>
                      <span className="guests-modal-subtitle">
                        <a href="#">Bringing a service animal?</a>
                      </span>
                    </div>
                    <div className="guests-action flex">
                      <button
                        disabled={selectedGuests.pets === 0}
                        onClick={() =>
                          setSelectedGuests({
                            ...selectedGuests,
                            pets: selectedGuests.pets - 1,
                          })
                        }
                        type="button"
                        className="guests-modal-btn"
                      >
                        <AiOutlineMinus />
                      </button>
                      <span className="guests-modal-count">
                        {selectedGuests.pets}
                      </span>
                      <button
                        type="button"
                        disabled={selectedGuests.pets === 5}
                        onClick={() =>
                          setSelectedGuests({
                            ...selectedGuests,
                            pets: selectedGuests.pets + 1,
                          })
                        }
                        className="guests-modal-btn"
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <BarndedBtn2 txt="Reserve" />
              {dateDiffDays ? (
                <div className="reservation-footer">
                  <div style={{ width: "100%" }}>
                    <span>You won't be charged yet</span>
                    <div className="reservation-footer-price flex">
                      <div className="footer-price-container flex">
                        <div className="footer-price-nigts">
                          <span className="link">
                            ${price} x {dateDiffDays} nights
                          </span>
                          <span className="price">${price * dateDiffDays}</span>
                        </div>
                        <div className="footer-price-fee">
                          <span className="link">Airbnb service fee</span>
                          <span className="price">{totalSum * 0.125}</span>
                        </div>
                      </div>
                      <div className="footer-price-sum">
                        <span>Total</span>
                        <span>${totalPlusFee}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="reservation-footer"></div>
              )}
            </div>
          </form>
        </div>
      )}
      {isMobile && isStayPage && (
        <footer className="stay-footer-mobile">
          <div className="stay-footer-container flex">
            <div className="stay-footer-details">
              <span className="price">
                ${price} <span className="per-night">night</span>
              </span>
              <span className="dates">
                {selectedRange.from ? format(selectedRange.from, "dd MMM") : ""}{" "}
                - {selectedRange.to ? format(selectedRange.to, "dd MMM") : ""}
              </span>
            </div>
              <BarndedBtn2 txt="Reserve"
              className="stay-footer-btn"
               />
          </div>
        </footer>
      )}
    </React.Fragment>
  )
}
