import React, { lazy } from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

export function StayPreview({ stay }) {
  const stayLink = `/stay/${stay._id}`

  // const images = stay.imgUrls.length
  //   ? stay.imgUrls.map((imgUrl) => ({ original: imgUrl }))
  //   : [{ original: 'https://i.imgur.com/6XH6t3h.png' }]
  const images = stay.imgUrls.map((imgUrl) => ({ original: imgUrl }))

  const HeartOutlineIcon = () => (
    <svg
      viewBox='0 0 32 32'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      role='presentation'
      focusable='false'
      className='heart-icon'
    >
      <path d='m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z'></path>
    </svg>
  )

  return (
    <article className='stay-preview'>
      <div className='preview-img'>
        <HeartOutlineIcon />
        <ImageGallery
          items={images}
          showPlayButton={false}
          showFullscreenButton={false}
          showBullets={true}
          loading={lazy}
          showThumbnails={true}
        />
      </div>
      <a href={stayLink} target='_blank' rel='noopener noreferrer' className='stay-card'>
        <div className='stay-card-details'>
          <div className='preview-header flex'>
            <h1>{stay.name}</h1>

            <div className='preview-rating'>
              <i className='fa-solid fa-star'></i>
              <span>4.9</span>
            </div>
          </div>

          <div className='preview-summary'>
            <p>{stay.summary}</p>
          </div>
          <div className='preview-dates'>
            <p>Nov 10 - 15</p>
          </div>

          <div className='preview-price'>
            <span className='price-span'>₪{stay.price}</span>

            <span> / night</span>
          </div>
        </div>
      </a>
    </article>
  )
}
