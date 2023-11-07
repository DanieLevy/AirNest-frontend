import React, { useEffect, useState } from "react";
import { orderService } from "../services/order.service";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrder,
  getActionClearStagedOrder,
} from "../store/actions/order.actions";
import { showErrorMsg } from "../services/event-bus.service";
import { Link, useNavigate } from "react-router-dom";

import { PiArrowLeft } from "react-icons/pi";
import { BrandedBtn } from "../cmps/BrandedBtn";
import { AiFillStar } from "react-icons/ai";
import { CiTimer } from "react-icons/ci";
import { ORDER_STATUS } from "../store/reducer/order.reducer";
import { is } from "date-fns/locale";

export function OrderConfirm() {
  const stagedOrder = useSelector((state) => state.orderModule.stagedOrder);
  const isLoading = useSelector((state) => state.systemModule.isLoading);
  const loggedUser = useSelector((state) => state.userModule.user);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const navigate = useNavigate();

  const reviews = stagedOrder.stay.reviews;

  const sumOfRatings = reviews.reduce((acc, review) => {
    return acc + review.rate;
  }, 0);
  const avgRating = (sumOfRatings / stagedOrder.stay.reviews.length).toFixed(2);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(getActionClearStagedOrder());
    };
  }, []);

  function getOrderFullPrice(mul = 1) {
    const totalPrice = stagedOrder.stay.price * stagedOrder.nights * mul;
    const roundedTotalPrice = +totalPrice.toFixed(2);
    return roundedTotalPrice;
  }

  async function handleConfirmOrder() {
    try {
      const stagedOrderWithUser = {
        ...stagedOrder,
        status: ORDER_STATUS.PENDING,
        buyer: {
          _id: loggedUser._id,
          fullname: loggedUser.fullname,
        },
      };
      addOrder(stagedOrderWithUser);
      setIsConfirmed(true);
    } catch (err) {
      console.error("Failed to confirm order:", err);
      showErrorMsg("problem saving order", err);
    }
  }

  if (isLoading) {
    return (
      // <StayLoader />
      <PropagateLoader
        color={"#ff385c"}
        //  size={150}
        className="loader"
        speedMultiplier={0.8}
      />
    );
  }

  if (!stagedOrder && !isConfirmed)
    return <div className="main-layout">No staged order found!</div>;
  if (!stagedOrder.stay)
    return <div className="main-layout">No stay found!</div>;

  return (
    <section className="main-layout order-confirm">
      <div className="order-confirm-container">
        {/* HEADER */}
        <div className="order-confirm-header flex">
          <PiArrowLeft onClick={() => navigate(-1)} />

          {isConfirmed ? ( // Use "?" to conditionally render the following content when isConfirmed is true
            <div className="order-confirm-header-confirmed flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 117.72 117.72"
              >
                <g>
                  <path
                    class="st0"
                    d="M58.86,0c9.13,0,17.77,2.08,25.49,5.79c-3.16,2.5-6.09,4.9-8.82,7.21c-5.2-1.89-10.81-2.92-16.66-2.92 c-13.47,0-25.67,5.46-34.49,14.29c-8.83,8.83-14.29,21.02-14.29,34.49c0,13.47,5.46,25.66,14.29,34.49 c8.83,8.83,21.02,14.29,34.49,14.29s25.67-5.46,34.49-14.29c8.83-8.83,14.29-21.02,14.29-34.49c0-3.2-0.31-6.34-0.9-9.37 c2.53-3.3,5.12-6.59,7.77-9.85c2.08,6.02,3.21,12.49,3.21,19.22c0,16.25-6.59,30.97-17.24,41.62 c-10.65,10.65-25.37,17.24-41.62,17.24c-16.25,0-30.97-6.59-41.62-17.24C6.59,89.83,0,75.11,0,58.86 c0-16.25,6.59-30.97,17.24-41.62S42.61,0,58.86,0L58.86,0z M31.44,49.19L45.8,49l1.07,0.28c2.9,1.67,5.63,3.58,8.18,5.74 c1.84,1.56,3.6,3.26,5.27,5.1c5.15-8.29,10.64-15.9,16.44-22.9c6.35-7.67,13.09-14.63,20.17-20.98l1.4-0.54H114l-3.16,3.51 C101.13,30,92.32,41.15,84.36,52.65C76.4,64.16,69.28,76.04,62.95,88.27l-1.97,3.8l-1.81-3.87c-3.34-7.17-7.34-13.75-12.11-19.63 c-4.77-5.88-10.32-11.1-16.79-15.54L31.44,49.19L31.44,49.19z"
                  ></path>
                </g>
              </svg>
              <h2>Your order has been confirmed!</h2>
            </div>
          ) : (
            <h2>Confirm Your Order</h2> // Render this when isConfirmed is false
          )}
        </div>
        {/* BODY */}
        <div className="order-confirm-body">
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
                        fillOpacity=".2"
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
            {!isConfirmed && (
              <section className="summary-body">
                <article className="summary-body-cancel">
                  <div className="summary-body-cancel-title">
                    Cancellation policy
                  </div>
                  Cancel before 12:00 PM on Nov 1 for a partial refund. After
                  that, your refund depends on when you cancel. Learn more
                </article>
                <div className="divider"></div>
                <article className="summary-body-cancel flex">
                  <div className="cancel-logo">
                    <svg
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <g>
                        <g stroke="none">
                          <path
                            d="M43 8v21.295L32.295 40l-10.359.001A11.971 11.971 0 0 0 26 31c0-6.627-5.373-12-12-12a12.02 12.02 0 0 0-3.001.378L11 8h32z"
                            fill-opacity=".2"
                          ></path>
                          <path d="M32 42v-8a5 5 0 0 1 4.783-4.995L37 29h8V6H34v2h-2V6H22v2h-2V6H9v14.5H7V6a2 2 0 0 1 1.85-1.995L9 4h11V2h2v2h10V2h2v2h11a2 2 0 0 1 1.995 1.85L47 6v24.953L33.953 44H15v-2h17zm12.123-11H37a3 3 0 0 0-2.995 2.824L34 34v7.122L44.123 31z"></path>
                        </g>
                        <g fill="none" stroke-width="2">
                          <path d="M14 43c.328 0 .653-.013.974-.039C21.146 42.465 26 37.299 26 31c0-6.627-5.373-12-12-12A11.995 11.995 0 0 0 2 31c0 6.627 5.373 12 12 12z"></path>
                          <path d="M23 31h-9v-9"></path>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="cancel-title">
                    Your reservation won’t be confirmed until the Host accepts
                    your request (within 24 hours).
                    <span> You won’t be charged until then.</span>
                  </div>
                </article>
                <div className="divider"></div>
                <article className="summary-body-agreement">
                  <div className="agreement-header">
                    By selecting the button below, I agree to the
                    <span> Host's House Rules</span>,
                    <span> Ground rules for guests</span>,
                    <span> Airbnb's Rebooking and Refund Policy</span>, and that
                    Airbnb can
                    <span> charge my payment method </span>
                    if I’m responsible for damage. I agree to pay the total
                    amount shown if the Host accepts my booking request.
                  </div>
                  <div className="agreement-body">
                    I also agree to the
                    <span> updated</span>
                    <span> Terms of Service</span>,
                    <span> Payments Terms of Service</span>, and I acknowledge
                    the
                    <span> Privacy Policy</span>.
                  </div>
                </article>
                <div className="divider"></div>
              </section>
            )}
            {isConfirmed && (
              <React.Fragment>
                <section className="summary-success-text">
                  <div className="success-title">
                    <div className="success-icon">
                      <CiTimer />
                    </div>
                    <h3>Thank you for your request,</h3>
                  </div>
                  <p>
                    Your host will be in touch within 24 hours to confirm your
                    reservation.
                  </p>
                </section>
                {/* <div className="divider"></div> */}
              </React.Fragment>
            )}
            {!loggedUser && !isConfirmed && (
              <React.Fragment>
                <div className="order-confirm-login">
                  Please
                  <button
                    className="order-confirm-login-link"
                    onClick={() => {
                      dispatch({ type: "SET_LOGIN_MODAL", loginModal: true });
                    }}
                  >
                    {" "}
                    Login{" "}
                  </button>
                  <div className="flex">to confirm your order</div>
                </div>
              </React.Fragment>
            )}
            <div
              className="order-confirm-btn"
              onClick={!isConfirmed && loggedUser ? handleConfirmOrder : null}
            >
              {!isConfirmed && loggedUser && (
                <BrandedBtn txt="Request to book" width={"175px"} />
              )}
              {isConfirmed && (
                <Link to="/order">
                  <BrandedBtn txt="Review your order" width={"175px"} />
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
                    <h5>{avgRating}</h5>•<span>{reviews.length} reviews</span>
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
                  <div>${getOrderFullPrice()}</div>
                </div>
                <div className="cost-details-service-fee">
                  <div className="link">Service fee</div>
                  <div>${getOrderFullPrice(0.1)}</div>
                </div>
              </div>
              <div className="divider"></div>
              <div className="cost-details-total">
                <div>Total</div>
                <div>${getOrderFullPrice(1.1)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
