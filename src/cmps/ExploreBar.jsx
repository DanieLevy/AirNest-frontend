import React, { useState } from "react"
import { CSSTransition } from "react-transition-group"
import { IoIosSearch } from "react-icons/io"
import { IoSearch } from "react-icons/io5"

import { BarndedBtn } from "./barnded-btn"

export function ExploreBar() {
  const [isExpanded, setIsExpanded] = useState(false)

  function handleClick() {
    console.log("clicked")
    setIsExpanded(!isExpanded)
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    console.log("submitted")
  }

  return (
    <React.Fragment>
      {!isExpanded && (
        <div className="explore-bar-preview" onClick={handleClick}>
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
      )}

      {isExpanded && (
        <React.Fragment>
          <div
            className="white-space"
            // onClick={handleClick}
          >
            <form
              className="explore-bar-preview expanded"
              onSubmit={handleSubmit}
            >
              <article className="explore-bar location flex">
                <label htmlFor="location">Where</label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Search destination"
                />
              </article>

              <span className="splitter"></span>

              <article className="explore-bar check-in">
                <div className="check-in-text flex">
                  Check-in
                  <span>Add dates</span>
                </div>
              </article>

              <span className="splitter"></span>

              <article className="explore-bar check-out">
                <div className="check-out-text flex">
                  Check-out
                  <span>Add dates</span>
                </div>
              </article>

              <span className="splitter"></span>

              <article className="explore-bar guests">
<div className="guests-text flex">
                  Who
                  <span>Add guests</span>
</div>

<div className="aaa">
                  <BarndedBtn
                    onClick={() => console.log("clicked")}
                    txt={<IoSearch className="search-icon" />}
                    borderRadius="50%"
                    width="48px"
                  />
</div>
              </article>
            </form>
          </div>

          <div className="explore-bar-backdrop"></div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
