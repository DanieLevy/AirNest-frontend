import React, { useEffect, useRef, useState } from "react"
import { DayPicker } from "react-day-picker"

import { IoIosSearch } from "react-icons/io"
import { IoSearch } from "react-icons/io5"
import { AiOutlineMinus } from "react-icons/ai"
import { AiOutlinePlus } from "react-icons/ai"
import { CiLocationArrow1 } from "react-icons/ci"

import "animate.css"

import { BarndedBtn } from "./barnded-btn"
import { useLocation } from "react-router"


/// Dont remove! - DatesModal is used in this component
import { DatesModal } from "./DatesModal"
import { FadeIn } from "react-slide-fade-in"
import { set } from "date-fns"
/// Dont remove! - DatesModal is used in this component

export function ExploreBar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isActive, setIsActive] = useState("location")
  const [formData, setFormData] = useState({
    location: "",
    startDate: null,
    endDate: null,
  })

  const [selectedRange, setSelectedRange] = useState({
    from: null,
    to: null,
  })

  const [selectedGuests, setSelectedGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  })

  const expandedBarRef = useRef(null)

  const location = useLocation()
  const path = location.pathname
  const isStayPage = path === "/" || path.startsWith("/?")

  useEffect(() => {
    if (isExpanded) {
      window.addEventListener("scroll", handleScroll)
      document.addEventListener("click", handleDocumentClick)
    } else {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("click", handleDocumentClick)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("click", handleDocumentClick)
    }
  }, [isExpanded])

  function handleDayClick(date) {
    console.log("date", date)

    if (selectedRange.from && selectedRange.to) {
      setSelectedRange({
        from: date,
        to: null,
      })
      setIsActive("check-out")
      return
    }

    if (selectedRange.from && date < selectedRange.from) {
      // Reset range
      setSelectedRange({
        from: date,
        to: null,
      })
      // setIsActive("check-out")
      return
    }
    if (!selectedRange.from) {
      setIsActive("check-out")
      setSelectedRange({ from: date, to: null })
    }
    if (selectedRange.from && !selectedRange.to) {
      setIsActive("guests")
      setSelectedRange({ from: selectedRange.from, to: date })

      setFormData((prevState) => ({
        ...prevState,
        startDate: selectedRange.from,
        endDate: date,
      }))
    }
  }

  function handleScroll() {
    setIsExpanded(false)
    setIsActive(null)
  }

  function handleClick(ev) {
    console.log("clicked")
    ev.stopPropagation()
    setIsExpanded(!isExpanded)
  }
  function handleDocumentClick(ev) {
    console.log("clicked outside")
    if (
      expandedBarRef.current &&
      !expandedBarRef.current.contains(ev.target) &&
      isExpanded
    ) {
      setIsExpanded(false)
      setIsActive(null)
    }
  }
  function handleLocationClick(e) {
    e.stopPropagation()
    let locationText
    if (e.target.tagName === "IMG") {
      locationText = e.target.nextSibling.innerText
    } else {
      locationText = e.target.innerText
    }

    setFormData((prevState) => ({
      ...prevState,
      location: locationText,
    }))
    setIsActive("check-in")
  }

  const handleChange = (event) => {
    const { name, type, value } = event.target

    switch (name) {
      case "location":
        setFormData((prevState) => ({ ...prevState, location: value }))
        break
      default:
        break
    }
  }

  function handleSubmit(ev) {
    ev.preventDefault()

    const fromTimestamp = selectedRange.from.getTime()
    const toTimestamp = selectedRange.to.getTime()
    alert(
      `Location: ${formData.location},
       Start Date: ${fromTimestamp},
        End Date: ${toTimestamp},
         Guests: ${selectedGuests.adults} Adults,
          ${selectedGuests.children} Children,
           ${selectedGuests.infants} Infants,
            ${selectedGuests.pets} Pets`
    )
  }

  return (
    <React.Fragment>
      {!isExpanded && isStayPage && (
        <div
          className={`explore-bar-preview ${
            !isExpanded ? "animate__animated animate__fadeInUp" : ""
          }`}
          onClick={isExpanded ? null : handleClick}
        >
          <button
            type="button"
            className="location-btn"
            onClick={() => setIsActive("location")}
          >
            Anywhere
          </button>
          <span className="splitter"></span>
          <button
            type="button"
            className="dates-btn"
            onClick={() => setIsActive("check-in")}
          >
            Anyweek
          </button>
          <span className="splitter"></span>
          <button
            type="button"
            className="guests-btn"
            onClick={() => setIsActive("guests")}
          >
            Add guests
          </button>
          <button type="button" className="search-btn">
            <IoSearch />
          </button>
        </div>
      )}

      {!isExpanded && !isStayPage && (
        <div
          className={`explore-bar-preview short ${
            !isExpanded ? "animate__animated animate__fadeInUp" : ""
          }`}
          onClick={isExpanded ? null : handleClick}
        >
          <div className="title">Start your search</div>
          <button type="button" className="search-btn">
            <IoSearch />
          </button>
        </div>
      )}

      {isExpanded && (
        <React.Fragment>
          <div
            ref={expandedBarRef}
            className="white-space animate__animated animate__slideInDown"
            // onClick={handleClick}
          >
            <form
              className="explore-bar-preview expanded"
              onSubmit={handleSubmit}
            >
              <article
                className={`explore-bar location flex ${
                  isActive === "location" ? "active" : ""
                }`}
                onClick={() => setIsActive("location")}
              >
                <label htmlFor="location">Where</label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Search destination"
                  value={formData.location}
                  onChange={handleChange}
                />
                {isActive === "location" && (
                  <div className="location-modal">
                    <ul className="location-list">
                      <li
                        className="location-list-item"
                        onClick={handleLocationClick}
                      >
                        <div className="location-list-icon">
                          <CiLocationArrow1 />
                        </div>
                        <span className="location-list-text">
                          Barcelona, Spain
                        </span>
                      </li>
                      <li
                        className="location-list-item"
                        onClick={handleLocationClick}
                      >
                        <div className="location-list-icon">
                          <CiLocationArrow1 />
                        </div>
                        <span className="location-list-text">
                          Mauntain View, CA
                        </span>
                      </li>
                      <li
                        className="location-list-item"
                        onClick={handleLocationClick}
                      >
                        <div className="location-list-icon">
                          <CiLocationArrow1 />
                        </div>
                        <span className="location-list-text">
                          New York, United States
                        </span>
                      </li>
                      <li
                        className="location-list-item"
                        onClick={handleLocationClick}
                      >
                        <div className="location-list-icon">
                          <CiLocationArrow1 />
                        </div>
                        <span className="location-list-text">
                          London, United Kingdom
                        </span>
                      </li>
                      <li
                        className="location-list-item"
                        onClick={handleLocationClick}
                      >
                        <div className="location-list-icon">
                          <CiLocationArrow1 />
                        </div>
                        <span className="location-list-text">
                          Paris, France
                        </span>
                      </li>
                      <li
                        className="location-list-item"
                        onClick={handleLocationClick}
                      >
                        <div className="location-list-icon">
                          <CiLocationArrow1 />
                        </div>
                        <span className="location-list-text">Rome, Italy</span>
                      </li>
                      <li
                        className="location-list-item"
                        onClick={handleLocationClick}
                      >
                        <div className="location-list-icon">
                          <CiLocationArrow1 />
                        </div>
                        <span className="location-list-text">Tokyo, Japan</span>
                      </li>
                    </ul>
                    <section className="location-region">
                      <div className="location-region-title">
                        Search by region
                      </div>
                      <div className="location-region-list">
                        <div className="location-region-item">
                          <img src="https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg" />
                          <span className="location-region-text">
                            I'm flexible
                          </span>
                        </div>
                        <div
                          className="location-region-item"
                          onClick={handleLocationClick}
                        >
                          <img src="https://a0.muscache.com/im/pictures/66355b01-4695-4db9-b292-c149c46fb1ca.jpg?im_w=320" />
                          <span className="location-region-text">
                            Middle East
                          </span>
                        </div>
                        <div
                          className="location-region-item"
                          onClick={handleLocationClick}
                        >
                          <img src="https://a0.muscache.com/im/pictures/ea5598d7-2b07-4ed7-84da-d1eabd9f2714.jpg?im_w=320" />
                          <span className="location-region-text">Italy</span>
                        </div>
                        <div
                          className="location-region-item"
                          onClick={handleLocationClick}
                        >
                          <img src="https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320" />
                          <span className="location-region-text">
                            United States
                          </span>
                        </div>
                        <div
                          className="location-region-item"
                          onClick={handleLocationClick}
                        >
                          <img src="https://a0.muscache.com/im/pictures/f0ece7c0-d9b2-49d5-bb83-64173d29cbe3.jpg?im_w=320" />
                          <span className="location-region-text">France</span>
                        </div>
                        <div
                          className="location-region-item"
                          onClick={handleLocationClick}
                        >
                          <img src="https://a0.muscache.com/im/pictures/06a30699-aead-492e-ad08-33ec0b383399.jpg?im_w=320" />
                          <span className="location-region-text">
                            South America
                          </span>
                        </div>
                      </div>
                    </section>
                  </div>
                )}
              </article>

              <span className="splitter"></span>

              <article
                className={`explore-bar check-in ${
                  isActive === "check-in" ? "active" : ""
                }`}
                onClick={() => setIsActive("check-in")}
              >
                <div className="check-in-text flex">
                  Check-in
                  <input
                    type="text"
                    placeholder="Add dates"
                    readOnly
                    value={
                      formData.startDate
                        ? `${formData.startDate.toLocaleDateString()}`
                        : ""
                    }
                  />
                </div>
              </article>

              <span className="splitter"></span>

              <article
                className={`explore-bar check-out ${
                  isActive === "check-out" ? "active" : ""
                }`}
                onClick={() => setIsActive("check-out")}
              >
                <div className="check-out-text flex">
                  Check-out
                  <input
                    type="text"
                    placeholder="Add dates"
                    readOnly
                    value={
                      formData.endDate
                        ? `${formData.endDate.toLocaleDateString()}`
                        : ""
                    }
                  />
                </div>
              </article>

              {isActive === "check-in" || isActive === "check-out" ? (
                <React.Fragment>
                  <div
                    className="dates-modal"
                    onClick={(ev) => ev.stopPropagation()}
                  >
                    <DayPicker
                      mode="range"
                      selected={selectedRange}
                      onDayClick={handleDayClick}
                      numberOfMonths={2}
                      modifiers={{ disabled: [{ before: new Date() }] }}
                    />
                  </div>
                </React.Fragment>
              ) : null}

              <span className="splitter"></span>

              <article
                className={`explore-bar guests ${
                  isActive === "guests" ? "active" : ""
                }`}
                onClick={() => setIsActive("guests")}
              >
                <div className="guests-text flex">
                  Who
                  <input
                    type="text"
                    placeholder="Add guests"
                    className="guests-input"
                    value={`${
                      selectedGuests.adults + selectedGuests.children
                    } guests ${selectedGuests.infants} infants`}
                    readOnly
                  />
                  {isActive === "guests" && (
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
                            type="button"
                            loading={selectedGuests.adults === 0}
                            className="guests-modal-btn"
                            onClick={() => {
                              if (selectedGuests.adults > 0)
                                setSelectedGuests((prevState) => ({
                                  ...prevState,
                                  adults: prevState.adults - 1,
                                }))
                            }}
                          >
                            <AiOutlineMinus />
                          </button>
                          <span className="guests-modal-count">
                            {selectedGuests.adults}
                          </span>
                          <button
                            type="button"
                            className="guests-modal-btn"
                            onClick={() => {
                              setSelectedGuests((prevState) => ({
                                ...prevState,
                                adults: prevState.adults + 1,
                              }))
                            }}
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
                          <span className="guests-modal-subtitle">
                            Ages 2-12
                          </span>
                        </div>
                        <div className="guests-action flex">
                          <button
                            disabled={selectedGuests.children === 0}
                            type="button"
                            className="guests-modal-btn"
                            onClick={() => {
                              if (selectedGuests.children > 0)
                                setSelectedGuests((prevState) => ({
                                  ...prevState,
                                  children: prevState.children - 1,
                                }))
                            }}
                          >
                            <AiOutlineMinus />
                          </button>
                          <span className="guests-modal-count">
                            {selectedGuests.children}
                          </span>
                          <button
                            type="button"
                            className="guests-modal-btn"
                            onClick={() => {
                              setSelectedGuests((prevState) => ({
                                ...prevState,
                                children: prevState.children + 1,
                              }))
                            }}
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
                            disabled={selectedGuests.infants === 0}
                            type="button"
                            className="guests-modal-btn"
                            onClick={() => {
                              if (selectedGuests.infants > 0)
                                setSelectedGuests((prevState) => ({
                                  ...prevState,
                                  infants: prevState.infants - 1,
                                }))
                            }}
                          >
                            <AiOutlineMinus />
                          </button>
                          <span className="guests-modal-count">
                            {selectedGuests.infants}
                          </span>
                          <button
                            type="button"
                            className="guests-modal-btn"
                            onClick={() => {
                              setSelectedGuests((prevState) => ({
                                ...prevState,
                                infants: prevState.infants + 1,
                              }))
                            }}
                            disabled={selectedGuests.infants === 5}
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
                            type="button"
                            className="guests-modal-btn"
                            onClick={() => {
                              setSelectedGuests((prevState) => ({
                                ...prevState,
                                pets: prevState.pets - 1,
                              }))
                            }}
                            disabled={selectedGuests.pets === 0}
                          >
                            <AiOutlineMinus />
                          </button>
                          <span className="guests-modal-count">
                            {selectedGuests.pets}
                          </span>
                          <button
                            type="button"
                            className="guests-modal-btn"
                            onClick={() => {
                              setSelectedGuests((prevState) => ({
                                ...prevState,
                                pets: prevState.pets + 1,
                              }))
                            }}
                            disabled={selectedGuests.pets === 5}
                          >
                            <AiOutlinePlus />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <BarndedBtn
                  onClick={() => console.log("clicked")}
                  txt={isActive === "guests" ? "Search" : ""}
                  icon={<IoSearch className="search-icon" />}
                  borderRadius={isActive === "guests" ? "32px" : "50%"}
                  width={isActive === "guests" ? "112px" : "48px"}
                />
              </article>
            </form>
          </div>
          <div className="explore-bar-backdrop"></div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
