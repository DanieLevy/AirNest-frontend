import { useState } from "react"

import { IoIosSearch } from "react-icons/io"

export function ExploreBar() {
  const [searchDates, setSearchDates] = useState({})
  const [searchLocation, setSearchLocation] = useState("")
  const [searchGuests, setSearchGuests] = useState({})
  const [isExpanded, setIsExpanded] = useState(false)

  function handleClick() {
    console.log("clicked")
  }

  return (
    <section className={`explore-bar ${isExpanded ? "expanded" : ""}`}>
      <div className="explore-bar-preview">
        <button type="button" className="location-btn">
          Anywhere
        </button>
        <span className="splitter"></span>
        <button type="button" className="dates-btn">
          Anyweek
        </button>
        <span className="splitter"></span>
        <button type="button" className="guests-btn">
          Add guests
        </button>
        <button type="button" className="search-btn">
          <IoIosSearch />
        </button>
      </div>
    </section>
  )
}

{
  /* <div className='bar'>
        <div className='location'>
          <p>Location</p>
          <input type='text' placeholder='Where are you going?' />
        </div>
        <div className='check-in'>
          <p>Check in</p>
          <input type='text' placeholder='Add start -dates' />
        </div>
        <div className='check-out'>
          <p>Check out</p>
          <input type='text' placeholder='Add dates' />
        </div>
        <div className='guests'>
          <p>Guests</p>
          <input type='text' placeholder='Add guests' />
          <span>
           <IoIosSearch />
          </span>
        </div>
      </div> */
}
