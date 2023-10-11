import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { stayService } from "../services/stay.service.local.js"
import { StayDescription } from "../cmps/StayDetails/StayDescription.jsx"
import { StayHeader } from "../cmps/StayDetails/StayHeader.jsx"
import { StayAmenities } from "../cmps/StayDetails/StayAmenities.jsx"
import { StayReviews } from "../cmps/StayDetails/StayReviews.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { CheckoutForm } from "../cmps/StayDetails/CheckoutForm.jsx"
import { useDispatch, useSelector } from "react-redux"
import { userService } from "../services/user.service.js"
import {
  getActionAddOrder,
  getActionStageOrder,
} from "../store/actions/order.actions.js"
import { LOADING_DONE, LOADING_START } from "../store/reducer/system.reducer.js"
import { StayMap } from "../cmps/StayDetails/StayMap.jsx"

export function StayDetails() {
  const { stayId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isLoading = useSelector((state) => state.systemModule.isLoading)

  const [currStay, setCurrStay] = useState(null)

  useEffect(() => {
    loadStay()
  }, [stayId])
  console.log(
    "🚀 ~ file: StayDetails.jsx:20 ~ StayDetails ~ currStay:",
    currStay
  )

  async function loadStay() {
    try {
      const stay = await stayService.getById(stayId)
      setCurrStay(stay)
    } catch (err) {
      console.log("Had issues in stay details", err)
      showErrorMsg("Cannot load stay")
      navigate("/")
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
      hostId: currStay.host._id,
      hostName: currStay.host.fullname,
    }

    dispatch(getActionStageOrder(orderDetails))
    showSuccessMsg("Order staged for confirmation.")
    navigate("/order/confirm")
  }

  if (isLoading) return <div className="main-layout">Loading...</div>
  if (!currStay) return <div className="main-layout">no stay or user</div>

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
    <section className="main-layout small stay-details">
      <StayHeader name={name} imgUrls={imgUrls} />
      <div className="stay-details-desc">
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
