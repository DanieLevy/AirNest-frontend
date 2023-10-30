import React, { useEffect, useRef } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { GrValidate } from 'react-icons/gr'
import { GrLocation } from 'react-icons/gr'
import { MdOutlineCleaningServices } from 'react-icons/md'
import { FiCheckCircle } from 'react-icons/fi'
import { PiMedal } from 'react-icons/pi'
import { StayAmenities } from './StayAmenities'
import { CheckoutForm } from './CheckoutForm'
import { store } from '../../store/store'
import { is } from 'date-fns/locale'

export function StayDescription({
  summary,
  reviews,
  price,
  loc,
  bedrooms,
  beds,
  host,
  bathrooms,
  capacity,
  roomType,
  name,
  amenities,
  onSubmit,
}) {
  const isSuperhost = host.isSuperhost

  return (
    <React.Fragment>
      <div className='stay-description'>
        <main className='stay-details-main'>
          <div className='stay-details-preview'>
            <div className='stay-details-title'>
              <h1>
                {roomType} hosted by {host.fullname}
              </h1>
              <span>
                {capacity} guests · {bedrooms} bedrooms · {beds} beds · {bathrooms} bathrooms
              </span>
            </div>
            <div className='user-img'>
              <img src={'https://i.ibb.co/jDy9rL4/user.png'} alt='UserImg' />
              {isSuperhost && (
                <div className='superhost-icon'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 12 14'
                    aria-hidden='true'
                    role='presentation'
                    focusable='false'
                  >
                    <linearGradient id='a' x1='8.5%' x2='92.18%' y1='17.16%' y2='17.16%'>
                      <stop offset='0' stop-color='#e61e4d'></stop>
                      <stop offset='.5' stop-color='#e31c5f'></stop>
                      <stop offset='1' stop-color='#d70466'></stop>
                    </linearGradient>
                    <path
                      fill='#fff'
                      d='M9.93 0c.88 0 1.6.67 1.66 1.52l.01.15v2.15c0 .54-.26 1.05-.7 1.36l-.13.08-3.73 2.17a3.4 3.4 0 1 1-2.48 0L.83 5.26A1.67 1.67 0 0 1 0 3.96L0 3.82V1.67C0 .79.67.07 1.52 0L1.67 0z'
                    ></path>
                    <path
                      fill='url(#a)'
                      d='M5.8 8.2a2.4 2.4 0 0 0-.16 4.8h.32a2.4 2.4 0 0 0-.16-4.8zM9.93 1H1.67a.67.67 0 0 0-.66.57l-.01.1v2.15c0 .2.1.39.25.52l.08.05L5.46 6.8c.1.06.2.09.29.1h.1l.1-.02.1-.03.09-.05 4.13-2.4c.17-.1.3-.29.32-.48l.01-.1V1.67a.67.67 0 0 0-.57-.66z'
                    ></path>
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* <div className="stay-details-host">
            <div className="host-info">
              <div className="host-img">
                {host.imgUrl ? (
                  <img src={host.imgUrl} alt="" />
                ) : (
                  <img src="https://i.ibb.co/jDy9rL4/user.png" alt="userImg" />
                )}
              </div>
              <div className="host-name">
                <span>Hosted by {host.fullname}</span>
                <span className="host-time">1 year hosting</span>
              </div>
            </div>
          </div> */}

          <div className='stay-details-advantages'>
            <div className='advantages-list'>
              {host.superHost && (
                <div className='advantage'>
                  <div className='advantage-icon'>
                    <PiMedal />
                  </div>
                  <div className='advantage-text'>
                    <span>Superhost</span>
                    <span>
                      Superhosts are experienced, highly rated hosts who are committed to providing
                      great stays for guests.
                    </span>
                  </div>
                </div>
              )}

              <div className='advantage'>
                <div className='advantage-icon'>
                  <MdOutlineCleaningServices />
                </div>
                <div className='advantage-text'>
                  <span>Enhanced Clean</span>
                  <span>This host committed to Airbnb's 5-step enhanced cleaning process.</span>
                </div>
              </div>

              <div className='advantage'>
                <div className='advantage-icon'>
                  <FiCheckCircle />
                </div>
                <div className='advantage-text'>
                  <span>Self check-in</span>
                  <span>Check yourself in with the lockbox.</span>
                </div>
              </div>

              <div className='advantage'>
                <div className='advantage-icon'>
                  <GrLocation />
                </div>
                <div className='advantage-text'>
                  <span>Great location</span>
                  <span>90% of recent guests gave the location a 5-star rating.</span>
                </div>
              </div>
            </div>
          </div>

          <div className='stay-details-description'>
            <div className='description-text'>
              <p>{summary}</p>
            </div>
          </div>

          <StayAmenities data={amenities} />
        </main>
        <aside className='stay-details-aside'>
          <CheckoutForm onSubmit={onSubmit} price={price} reviews={reviews} capacity={capacity} />
        </aside>
      </div>
    </React.Fragment>
  )
}
