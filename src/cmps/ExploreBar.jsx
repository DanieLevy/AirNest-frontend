import React, { useEffect, useRef, useState } from 'react'
import { DayPicker } from 'react-day-picker'

import { IoIosSearch } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { AiOutlineMinus } from 'react-icons/ai'
import { AiOutlinePlus } from 'react-icons/ai'
import { CiLocationArrow1 } from 'react-icons/ci'

import 'animate.css'

import { BarndedBtn } from './barnded-btn'
import { FadeIn } from 'react-slide-fade-in'
import { DatesModal } from './DatesModal'

export function ExploreBar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isActive, setIsActive] = useState(null)
  const [formData, setFormData] = useState({
    location: '',
    startDate: null,
    endDate: null,
  })
  const expandedBarRef = useRef(null)
  useEffect(() => {
    if (isExpanded) {
      window.addEventListener('scroll', handleScroll)
      document.addEventListener('click', handleDocumentClick)
    } else {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleDocumentClick)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [isExpanded])

  function handleScroll() {
    setIsExpanded(false)
    setIsActive(null)
  }

  function handleClick(ev) {
    console.log('clicked')
    ev.stopPropagation()
    setIsExpanded(!isExpanded)
  }
  function handleDocumentClick(ev) {
    console.log('clicked outside')
    if (expandedBarRef.current && !expandedBarRef.current.contains(ev.target) && isExpanded) {
      setIsExpanded(false)
      setIsActive(null)
    }
  }
  function handleLocationClick(e) {
    e.stopPropagation()

    let locationText
    if (e.target.tagName === 'IMG') {
      locationText = e.target.nextSibling.innerText
    } else {
      locationText = e.target.innerText
    }

    setFormData((prevState) => ({
      ...prevState,
      location: locationText,
    }))
    setIsActive('check-in')
  }
  function handleDateSelection({ startDate, endDate }) {
    setFormData((prevState) => ({
      ...prevState,
      startDate,
      endDate,
    }))
  }

  const handleChange = (event) => {
    const { name, type, value } = event.target

    switch (name) {
      case 'location':
        setFormData((prevState) => ({ ...prevState, location: value }))
        break
      default:
        break
    }
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    console.log(ev)
    console.log(ev.target.location.value)
    console.log(ev.target.name)
    console.log(ev.target)
    console.log('submitted')
  }

  return (
    <React.Fragment>
      {!isExpanded && (
        <div
          className={`explore-bar-preview ${!isExpanded ? 'animate__animated animate__fadeInUp' : ''}`}
          onClick={isExpanded ? null : handleClick}
        >
          <button type='button' className='location-btn' onClick={() => setIsActive('location')}>
            Anywhere
          </button>
          <span className='splitter'></span>
          <button type='button' className='dates-btn' onClick={() => setIsActive('check-in')}>
            Anyweek
          </button>
          <span className='splitter'></span>
          <button type='button' className='guests-btn' onClick={() => setIsActive('guests')}>
            Add guests
          </button>
          <button type='button' className='search-btn'>
            <IoSearch />
          </button>
        </div>
      )}

      {isExpanded && (
        <React.Fragment>
          <div
            ref={expandedBarRef}
            className='white-space animate__animated animate__fadeInDown'
            // onClick={handleClick}
          >
            <form className='explore-bar-preview expanded' onSubmit={handleSubmit}>
              <article
                className={`explore-bar location flex ${isActive === 'location' ? 'active' : ''}`}
                onClick={() => setIsActive('location')}
              >
                <label htmlFor='location'>Where</label>
                <input
                  type='text'
                  name='location'
                  id='location'
                  placeholder='Search destination'
                  value={formData.location}
                  onChange={handleChange}
                />
                {isActive === 'location' && (
                  <div className='location-modal'>
                    <ul className='location-list'>
                      <li className='location-list-item' onClick={handleLocationClick}>
                        <div className='location-list-icon'>
                          <CiLocationArrow1 />
                        </div>
                        <span className='location-list-text'>Barcelona, Spain</span>
                      </li>
                      <li className='location-list-item' onClick={handleLocationClick}>
                        <div className='location-list-icon'>
                          <CiLocationArrow1 />
                        </div>
                        <span className='location-list-text'>Mauntain View, CA</span>
                      </li>
                      <li className='location-list-item' onClick={handleLocationClick}>
                        <div className='location-list-icon'>
                          <CiLocationArrow1 />
                        </div>
                        <span className='location-list-text'>New York, United States</span>
                      </li>
                      <li className='location-list-item' onClick={handleLocationClick}>
                        <div className='location-list-icon'>
                          <CiLocationArrow1 />
                        </div>
                        <span className='location-list-text'>London, United Kingdom</span>
                      </li>
                      <li className='location-list-item' onClick={handleLocationClick}>
                        <div className='location-list-icon'>
                          <CiLocationArrow1 />
                        </div>
                        <span className='location-list-text'>Paris, France</span>
                      </li>
                      <li className='location-list-item' onClick={handleLocationClick}>
                        <div className='location-list-icon'>
                          <CiLocationArrow1 />
                        </div>
                        <span className='location-list-text'>Rome, Italy</span>
                      </li>
                      <li className='location-list-item' onClick={handleLocationClick}>
                        <div className='location-list-icon'>
                          <CiLocationArrow1 />
                        </div>
                        <span className='location-list-text'>Tokyo, Japan</span>
                      </li>
                    </ul>
                    <section className='location-region'>
                      <div className='location-region-title'>Search by region</div>
                      <div className='location-region-list'>
                        <div className='location-region-item'>
                          <img src='https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg' />
                          <span className='location-region-text'>I'm flexible</span>
                        </div>
                        <div className='location-region-item' onClick={handleLocationClick}>
                          <img src='https://a0.muscache.com/im/pictures/66355b01-4695-4db9-b292-c149c46fb1ca.jpg?im_w=320' />
                          <span className='location-region-text'>Middle East</span>
                        </div>
                        <div className='location-region-item' onClick={handleLocationClick}>
                          <img src='https://a0.muscache.com/im/pictures/66355b01-4695-4db9-b292-c149c46fb1ca.jpg?im_w=320' />
                          <span className='location-region-text'>Africa</span>
                        </div>
                        <div className='location-region-item' onClick={handleLocationClick}>
                          <img src='https://a0.muscache.com/im/pictures/66355b01-4695-4db9-b292-c149c46fb1ca.jpg?im_w=320' />
                          <span className='location-region-text'>Asia Pacific</span>
                        </div>
                        <div className='location-region-item' onClick={handleLocationClick}>
                          <img src='https://a0.muscache.com/im/pictures/66355b01-4695-4db9-b292-c149c46fb1ca.jpg?im_w=320' />
                          <span className='location-region-text'>Europe</span>
                        </div>
                        <div className='location-region-item' onClick={handleLocationClick}>
                          <img src='https://a0.muscache.com/im/pictures/66355b01-4695-4db9-b292-c149c46fb1ca.jpg?im_w=320' />
                          <span className='location-region-text'>North America</span>
                        </div>
                      </div>
                    </section>
                  </div>
                )}
              </article>

              <span className='splitter'></span>

              <article
                className={`explore-bar check-in ${isActive === 'check-in' ? 'active' : ''}`}
                onClick={() => setIsActive('check-in')}
              >
                <div className='check-in-text flex'>
                  Check-in
                  <span>Add dates</span>
                </div>
              </article>

              <span className='splitter'></span>

              <article
                className={`explore-bar check-out ${isActive === 'check-out' ? 'active' : ''}`}
                onClick={() => setIsActive('check-out')}
              >
                <div className='check-out-text flex'>
                  Check-out
                  <span>Add dates</span>
                </div>
              </article>

              {isActive === 'check-in' || isActive === 'check-out' ? <DatesModal onSetDates={handleDateSelection} /> : null}

              <span className='splitter'></span>

              <article className={`explore-bar guests ${isActive === 'guests' ? 'active' : ''}`} onClick={() => setIsActive('guests')}>
                <div className='guests-text flex'>
                  Who
                  <span>Add guests</span>
                  {isActive === 'guests' && (
                    <div className='guests-modal'>
                      {/* Adults */}
                      <div className='guests-options' id='adults'>
                        <div className='guests-title'>
                          <h3 className='guests-modal-title'>Adults</h3>
                          <span className='guests-modal-subtitle'>Ages 13 or above</span>
                        </div>
                        <div className='guests-action flex'>
                          <button disabled type='button' className='guests-modal-btn'>
                            <AiOutlineMinus />
                          </button>
                          <span className='guests-modal-count'>0</span>
                          <button type='button' className='guests-modal-btn'>
                            <AiOutlinePlus />
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className='guests-options' id='children'>
                        <div className='guests-title'>
                          <h3 className='guests-modal-title'>Children</h3>
                          <span className='guests-modal-subtitle'>Ages 2-12</span>
                        </div>
                        <div className='guests-action flex'>
                          <button disabled type='button' className='guests-modal-btn'>
                            <AiOutlineMinus />
                          </button>
                          <span className='guests-modal-count'>0</span>
                          <button type='button' className='guests-modal-btn'>
                            <AiOutlinePlus />
                          </button>
                        </div>
                      </div>

                      {/* Infants */}
                      <div className='guests-options' id='infants'>
                        <div className='guests-title'>
                          <h3 className='guests-modal-title'>Infants</h3>
                          <span className='guests-modal-subtitle'>Under 2</span>
                        </div>
                        <div className='guests-action flex'>
                          <button disabled type='button' className='guests-modal-btn'>
                            <AiOutlineMinus />
                          </button>
                          <span className='guests-modal-count'>0</span>
                          <button type='button' className='guests-modal-btn'>
                            <AiOutlinePlus />
                          </button>
                        </div>
                      </div>

                      {/* PETS */}
                      <div className='guests-options' id='pets'>
                        <div className='guests-title'>
                          <h3 className='guests-modal-title'>Pets</h3>
                          <span className='guests-modal-subtitle'>
                            <a href='#'>Bringing a service animal?</a>
                          </span>
                        </div>
                        <div className='guests-action flex'>
                          <button disabled type='button' className='guests-modal-btn'>
                            <AiOutlineMinus />
                          </button>
                          <span className='guests-modal-count'>0</span>
                          <button type='button' className='guests-modal-btn'>
                            <AiOutlinePlus />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <BarndedBtn
                  onClick={() => console.log('clicked')}
                  txt={isActive === 'guests' ? 'Search' : ''}
                  icon={<IoSearch className='search-icon' />}
                  borderRadius={isActive === 'guests' ? '32px' : '50%'}
                  width={isActive === 'guests' ? '112px' : '48px'}
                />
              </article>
            </form>
          </div>
          <div className='explore-bar-backdrop'></div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
