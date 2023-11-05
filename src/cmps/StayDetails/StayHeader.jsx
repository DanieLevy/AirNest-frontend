import ImageGallery from 'react-image-gallery'
import { DetailsImages } from './DetailsImages'
import { BiHeart } from 'react-icons/bi'
import { useState } from 'react'
import { useEffect } from 'react'
import React from 'react'

import { GoShare } from 'react-icons/go'
import { PiUploadSimpleLight } from 'react-icons/pi'
import { PiHeartLight } from 'react-icons/pi'
import { PiArrowLeftLight } from 'react-icons/pi'
import { useNavigate } from 'react-router'
import { store } from '../../store/store'

import { AiFillStar } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

export function StayHeader({ name, imgUrls, reviews, loc, host }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleGoBack = () => {
    // if there is back in history go back else go to home
    if (window.history.length > 2) window.history.go(-1)
    else navigate('/')
  }

  const scrollToLocation = () => {
    const element = document.querySelector('.details-map')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const sumOfRatings = reviews.reduce((acc, review) => {
    return acc + review.rate
  }, 0)

  const rawAvg = sumOfRatings / reviews.length
  const avgRating = rawAvg % 1 === 0 ? rawAvg.toFixed(1) : rawAvg.toFixed(2)

  const isSuperhost = host.isSuperhost ? 'Superhost' : ''

  return (
    <React.Fragment>
      {!isMobile && (
        <div className='stay-header-container'>
          <div className='stay-header'>
            <h1 className='name-title'>{name}</h1>
            <div className='stay-header-top flex'>
              <div className='stay-details-rating'>
                <AiFillStar />
                <span className='avg-rate'>{avgRating}</span>
                <span className='dot'>·</span>
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    store.dispatch({
                      type: 'SET_REVIEWS_MODAL',
                      reviewsModal: true,
                    })
                  }}
                >
                  {reviews.length} Reviews
                </a>
                <span className='dot'>·</span>
                {isSuperhost && (
                  <div className='superhost'>
                    <div className='superhost-icon'>󰀃</div>
                    <span className='superhost-badge'>
                      {isSuperhost}
                      <span className='dot'>·</span>
                    </span>
                  </div>
                )}
                <div className='location flex align-center' onClick={scrollToLocation}>
                  {/* {loc.street && (
                    <span className='location-text'>
                      {loc.street}
                      <span>,</span>
                    </span>
                  )}

                  {loc.streetNum && (
                    <span className='location-text'>
                      {loc.streetNum}
                      <span>,</span>
                    </span>
                  )}

                  {loc.city && <span className='location-text'>{loc.city}</span>} */}
                  <span className='location-text'>{loc.address}</span>
                </div>
              </div>
              <div className='details-action-buttons flex'>
                <div>
                  <button className='share-btn flex align-center'>
                    <GoShare /> Share
                  </button>
                </div>
                <div>
                  <button className='save-btn flex align-center'>
                    <BiHeart /> Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <DetailsImages urls={imgUrls} />
        </div>
      )}
      {isMobile && (
        <div className='stay-header-mobile'>
          <ImageGallery
            items={imgUrls.map((url) => ({ original: url, thumbnail: url }))}
            showPlayButton={false}
            showFullscreenButton={false}
            showThumbnails={false}
            showNav={true}
            autoPlay={false}
            slideDuration={500}
            slideInterval={3000}
          />
          <div className='stay-header-buttons'>
            <button className='back-btn flex align-center' onClick={handleGoBack}>
              <PiArrowLeftLight />
            </button>
            <div className='action-btns flex'>
              <button className='share-btn flex align-center'>
                <PiHeartLight />
              </button>
              <button className='save-btn flex align-center'>
                <PiUploadSimpleLight />
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

{
  /* <div className="details-action-buttons flex">
<div>
  <button className="share-btn flex align-center">
    <GoShare /> Share
  </button>
</div>
<div>
  <button className="save-btn flex align-center">
    <BiHeart /> Save
  </button>
</div>
</div> */
}
