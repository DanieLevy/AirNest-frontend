import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { stayService } from '../services/stay.service.local.js'
import { StayDescription } from '../cmps/StayDetails/StayDescription.jsx'
import { StayHeader } from '../cmps/StayDetails/StayHeader.jsx'
import { StayAmenities } from '../cmps/StayDetails/StayAmenities.jsx'
import { StayReviews } from '../cmps/StayDetails/StayReviews.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { CheckoutForm } from '../cmps/StayDetails/CheckoutForm.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../services/user.service.js'
import { getActionStageOrder } from '../store/actions/order.actions.js'
import { loadLoggedinUser } from '../store/actions/user.actions.js'

export function StayDetails() {
  const { stayId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isLoading = useSelector((state) => state.systemModule.isLoading)
  const loggedUser = useSelector((state) => state.userModule.user)

  const [currStay, setCurrStay] = useState(null)

  useEffect(() => {
    loadStay()
    loadLoggedinUser()
  }, [stayId])

  // useEffect(() => {
  // }, [])

  async function loadStay() {
    try {
      const stay = await stayService.getById(stayId)
      setCurrStay(stay)
    } catch (err) {
      console.log('Had issues in stay details', err)
      showErrorMsg('Cannot load stay')
      navigate('/')
    }
  }

  function handleCheckoutSubmit(formData) {
    const orderDetails = {
      ...formData,
      stay: {
        _id: currStay._id,
        name: currStay.name,
        price: currStay.price,
      },
      buyer: {
        _id: loggedUser._id,
        fullname: loggedUser.fullname,
      },
      hostId: currStay.host._id,
    }

    dispatch(getActionStageOrder(orderDetails))
    showSuccessMsg('Order staged for confirmation.')
    navigate('/order')
  }

  if (isLoading) return <div>Loading...</div>
  if (!currStay) return <div>no stay or user</div>
  // if (!currStay || !loggedUser) return <div>no stay or user</div>

  const {
    name,
    type,
    bedrooms,
    beds,
    bathrooms,
    room_type,
    imgUrls,
    price,
    summary,
    capacity,
    amenities,
    labels,
    host,
    loc,
    reviews,
    likedByUsers,
  } = currStay

  return (
    <section className='stay-details'>
      <StayHeader
        name={name}
        imgUrls={imgUrls}
        type={type}
        reviews={reviews}
        price={price}
        host={host}
        loc={loc}
        bedrooms={bedrooms}
        beds={beds}
        bathrooms={bathrooms}
        capacity={capacity}
        room_type={room_type}
      />
      <StayDescription summary={summary} />
      {/* 
      <StayAmenities data={currStay.amenities} />
      <StayReviews data={currStay.reviews} /> */}
      <CheckoutForm onSubmit={handleCheckoutSubmit} />
    </section>
  )
}
