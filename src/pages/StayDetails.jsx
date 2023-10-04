import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import { StayHeader } from './StayHeader.js'
// import { StayAmenities } from './StayAmenities.js'
// import { StayDescription } from './StayDescription.js'
// import { StayReviews } from './StayReviews.js'
import { stayService } from '../services/stay.service.local.js'
import { StayDescription } from '../cmps/StayDetails/StayDescription.jsx'
import { StayHeader } from '../cmps/StayDetails/StayHeader.jsx'
import { StayAmenities } from '../cmps/StayDetails/StayAmenities.jsx'
import { StayReviews } from '../cmps/StayDetails/StayReviews.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'

export function StayDetails() {
  const { stayId } = useParams()

  console.log('🚀 ~ file: StayDetails.jsx:17 ~ StayDetails ~ stayId:', stayId)

  const [currStay, setStay] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadStay()
  }, [stayId])

  async function loadStay() {
    try {
      const stay = await stayService.getById(stayId)
      setStay(stay)
    } catch (err) {
      console.log('Had issues in stay details', err)
      showErrorMsg('Cannot load stay')
      navigate('/')
    }
  }
  if (!currStay) return <div>Loading...</div>

  const { name, type, imgUrls, price, summary, capacity, amenities, labels, host, loc, reviews, likedByUsers } = currStay

  console.log(
    '🚀 ~ file: StayDetails.jsx:36 ~ StayDetails ~ name, type, imgUrls, price, summary, capacity, amenities, labels, host, loc, reviews, likedByUsers:',
    name,
    type,
    imgUrls,
    price,
    summary,
    capacity,
    amenities,
    labels,
    host,
    loc,
    reviews,
    likedByUsers
  )

  return (
    <section className='stay-details'>
      <StayHeader name={name} imgUrls={imgUrls} reviews={reviews} price={price} host={host} loc={loc} />
      <StayDescription summary={summary} />
      {/* 
      <StayAmenities data={currStay.amenities} />
      <StayReviews data={currStay.reviews} /> */}
    </section>
  )
}
