import React, { useEffect, useState } from "react"
import { orderService } from "../services/order.service"
import { useDispatch, useSelector } from "react-redux"
import {
  addOrder,
  getActionAddOrder,
  getActionClearStagedOrder,
  loadOrders,
} from "../store/actions/order.actions"
import { showErrorMsg } from "../services/event-bus.service"
import { Link, useNavigate } from "react-router-dom"
import { userService } from "../services/user.service"
import { PiArrowLeft } from "react-icons/pi"
import { BarndedBtn } from "../cmps/barnded-btn"
import { AiFillStar } from "react-icons/ai"

export function OrderConfirm() {
  const stagedOrder = useSelector((state) => state.orderModule.stagedOrder)
  const isLoading = useSelector((state) => state.systemModule.isLoading)
  const loggedUser = useSelector((state) => state.userModule.user)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const navigate = useNavigate()

  // const loggedUser = userService.getLoggedinUser()

  console.log("stagedOrder:", stagedOrder)

  const reviews = stagedOrder.stay.reviews
  const sumOfRatings = reviews.reduce((acc, review) => {
    return acc + review.rate
  }, 0)
  const avgRating = (sumOfRatings / reviews.length).toFixed(2)

  const dispatch = useDispatch()

  useEffect(() => {
    loadOrders()

    return () => {
      dispatch(getActionClearStagedOrder())
    }
  }, [])

  async function handleConfirmOrder() {
    try {
      const stagedOrderWithUser = {
        ...stagedOrder,
        buyer: {
          _id: loggedUser._id,
          fullname: loggedUser.fullname,
        },
      }
      const confirmedOrder = await orderService.add(stagedOrderWithUser)

      dispatch(getActionAddOrder(confirmedOrder))
      setIsConfirmed(true)
    } catch (err) {
      console.error("Failed to confirm order:", err)
      showErrorMsg("problem saving order", err)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (!stagedOrder && !isConfirmed)
    return <div className="main-layout">No staged order found!</div>

  return (
    <section className="main-layout small order-confirm">
      {/* HEADER */}
      <div className="order-confirm-header flex">
        <PiArrowLeft
          onClick={() => navigate(-1)}
         />
        <h2>Confirm Your Order</h2>
      </div>

      {/* BODY */}
      <div className="order-confirm-body flex">
        {/* LEFT */}
        <div className="order-confirm-summary">
          <div className="summary-header flex">
            <div className="rare-find flex">
              <div className="rare-find-title">
                <h4>This is a rare find</h4>
                <h5 className="rare-find-subtitle">
                  This place is usually booked.
                </h5>
              </div>
              <div className="rare-find-img">
                <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <g stroke="none">
                    <path
                      d="m32.62 6 9.526 11.114-18.146 23.921-18.147-23.921 9.526-11.114z"
                      fill-opacity=".2"
                    ></path>
                    <path d="m34.4599349 2 12.8243129 14.9616983-23.2842478 30.6928721-23.28424779-30.6928721 12.82431289-14.9616983zm-17.9171827 16h-12.52799999l18.25899999 24.069zm27.441 0h-12.528l-5.73 24.069zm-14.583 0h-10.802l5.4012478 22.684zm-15.92-12.86-9.30799999 10.86h11.89399999zm19.253-1.141h-17.468l2.857 12.001h11.754zm1.784 1.141-2.586 10.86h11.894z"></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="summary-details">
              <h3>Your trip</h3>
              <div className="summary-details-dates">
                <h4 className="summary-details-title">Dates</h4>
                <h5 className="summary-details-subtitle">
                  {new Date(stagedOrder.checkIn).toLocaleDateString()}-
                  {new Date(stagedOrder.checkOut).toLocaleDateString()}
                </h5>
              </div>
              <div className="summary-details-guests">
                <h4 className="summary-details-title">Guests</h4>
                <h5 className="summary-details-subtitle">
                  {stagedOrder.guests.adults} adults,{" "}
                  {stagedOrder.guests.children} children
                </h5>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          {!loggedUser && (
            <h1 className="order-confirm-login">
              Please
              <button
                className="order-confirm-login-link"
                onClick={() => {
                  dispatch({ type: "SET_LOGIN_MODAL", loginModal: true })
                }}
              >
                {" "}
                Login{" "}
              </button>
              to confirm your order
            </h1>
          )}
          <div className="order-confirm-btn" onClick={handleConfirmOrder}>
            {!isConfirmed && loggedUser && <BarndedBtn txt="Confirm Order" />}
            {isConfirmed && (
              <Link to="/orders">
                <BarndedBtn txt="Go to Orders" />
              </Link>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="order-confirm-stay">
          <div className="stay-details">
            <div className="stay-details-img">
              <img src={stagedOrder.stay.imgUrls[0]} alt="" />
            </div>
            <div className="stay-details-title">
              <div className="stay-details-title-header">
                <h3>{stagedOrder.stay.type}</h3>
                <h4>{stagedOrder.stay.name}</h4>
              </div>
              <div className="stay-details-title-body">
                <span className="flex">
                  <AiFillStar />
                  <h5>{avgRating}</h5>
                  •
                  <span>
                    {reviews.length} reviews
                    </span>
                  </span> 
                
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <h3 className="order-confirm-price">Price Details</h3>
          <div className="order-confirm-price-details">
            <div className="cost-details">
              <div className="cost-details-nights">
                <div className="link">
                  ${stagedOrder.stay.price} x {stagedOrder.nights} nights
                </div>
                <div>${stagedOrder.stay.price * stagedOrder.nights}</div>
              </div>
              <div className="cost-details-service-fee">
                <div className="link">Service fee</div>
                <div>${stagedOrder.stay.price * stagedOrder.nights * 0.1}</div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="cost-details-total">
              <div>Total</div>
              <div>${stagedOrder.stay.price * stagedOrder.nights * 1.1.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

{
  /* <p>
  Start Date: {new Date(stagedOrder.checkIn).toLocaleDateString()}
</p>
<p>End Date: {new Date(stagedOrder.checkOut).toLocaleDateString()}</p>
<p>Adults: {stagedOrder.guests.adults}</p>
<p>Children: {stagedOrder.guests.children}</p> */
}
