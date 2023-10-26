import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { stayService } from '../services/stay.service.local.js'
import { StayDescription } from '../cmps/StayDetails/StayDescription.jsx'
import { StayHeader } from '../cmps/StayDetails/StayHeader.jsx'
import { StayAmenities } from '../cmps/StayDetails/StayAmenities.jsx'
import { StayReviews } from '../cmps/StayDetails/StayReviews.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { CheckoutForm } from '../cmps/StayDetails/CheckoutForm.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../services/user.service.js'
import { getActionAddOrder, getActionStageOrder } from '../store/actions/order.actions.js'
import { LOADING_DONE, LOADING_START } from '../store/reducer/system.reducer.js'
import { StayMap } from '../cmps/StayDetails/StayMap.jsx'
import { is } from 'date-fns/locale'

export function StayDetails() {
  const { stayId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [searchParams] = useSearchParams();

  const isLoading = useSelector((state) => state.systemModule.isLoading)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  const [currStay, setCurrStay] = useState(null)

  useEffect(() => {
    loadStay()

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [stayId])


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
    // console.log('🚀 ~ file: StayDetails.jsx:60 ~ handleCheckoutSubmit ~ formData:', formData)

    const orderDetails = {
      ...formData,
      stay: {
        _id: currStay._id,
        name: currStay.name,
        price: currStay.price,
        imgUrls: currStay.imgUrls,
        reviews: currStay.reviews,
        type: currStay.room_type,
        summary: currStay.summary,
        nights: formData.nights,
      },
      hostId: currStay.host._id,
      hostName: currStay.host.fullname,
    }

    dispatch(getActionStageOrder(orderDetails))
    showSuccessMsg('Order staged for confirmation.')
    navigate('/order/confirm')
  }

  if (isLoading) return <div className='main-layout'>Loading...</div>
  if (!currStay) return <div className='main-layout'>no stay or user</div>

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
    <section className={isMobile ? 'stay-details' : 'main-layout stayDetails stay-details'}>
      <StayHeader name={name} imgUrls={imgUrls} />
      <div className={isMobile ? 'main-layout small stay-details-desc' : 'stay-details-desc'}>
        <StayDescription
          type={type}
          summary={summary}
          reviews={reviews}
          price={price}
          host={host}
          loc={loc}
          bedrooms={bedrooms}
          beds={beds}
          bathrooms={bathrooms}
          capacity={capacity}
          room_type={room_type}
          name={name}
          amenities={amenities}
          onSubmit={handleCheckoutSubmit}
        />
      </div>
      <StayReviews data={currStay.reviews} />
      <StayMap loc={loc} />
    </section>
  )
}
