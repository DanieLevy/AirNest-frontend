import React, { useEffect, useState } from "react";

import { BrandedBtn } from "../BrandedBtn";

import { format, set } from "date-fns";
import { DayPicker } from "react-day-picker";

import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { is } from "date-fns/locale";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";
import { QUERY_KEYS } from "../../services/util.service";

export function CheckoutForm({ onSubmit, price, reviews, capacity }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchParams] = useSearchParams();
  const [isStayPage, setIsStayPage] = useState(
    location.pathname.startsWith("/stay")
  );
  const [selectedRange, setSelectedRange] = useState({
    from: searchParams.has(QUERY_KEYS.checkin)
      ? new Date(+searchParams.get(QUERY_KEYS.checkin))
      : new Date(),
    to: searchParams.has(QUERY_KEYS.checkout)
      ? new Date(+searchParams.get(QUERY_KEYS.checkout))
      : addDays(new Date(), 7),
  });

  const [isDatesModal, setIsDatesModal] = useState(false);
  const [isGuestsModal, setIsGuestsModal] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState({
    adults: +searchParams.get(QUERY_KEYS.adults) || 1,
    children: +searchParams.get(QUERY_KEYS.children) || 0,
    infants: +searchParams.get(QUERY_KEYS.infants) || 0,
    pets: +searchParams.get(QUERY_KEYS.pets) || 0,
  });

  const [isCheckoutSum, setIsCheckoutSum] = useState(false);
  const dateDiff =
    selectedRange.to && selectedRange.from
      ? selectedRange.to.getTime() - selectedRange.from.getTime()
      : 0;
  const dateDiffDays = dateDiff / (1000 * 60 * 60 * 24);
  const totalSum = price * dateDiffDays;
  const totalPlusFee = totalSum + totalSum * 0.125;

  const [galleryInViewport, setGalleryInViewport] = useState(true);
  const [asideInViewport, setAsideInViewport] = useState(true);
  const stayDetailsAsideRef = useRef(null);
  const stayGalleryRef = useRef(null);

  useEffect(() => {
    if (!isMobile) {
      const stayDetailsAsideElement = document.querySelector(".stay-details-aside");
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAsideInViewport(true);
          } else {
            setAsideInViewport(false);
          }
        });
      });
  
      observer.observe(stayDetailsAsideElement);
  
      return () => {
        observer.unobserve(stayDetailsAsideElement);
      };
    }
  }, [isMobile]);
  
  useEffect(() => {
    if (!isMobile) {
      const stayGalleryElement = document.querySelector(".images-editor-container");
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setGalleryInViewport(true);
          } else {
            setGalleryInViewport(false);
          }
        });
      });
  
      observer.observe(stayGalleryElement);
  
      return () => {
        observer.unobserve(stayGalleryElement);
      };
    }
  }, [isMobile]);


  useEffect(() => {
    dateDiffDays ? setIsCheckoutSum(true) : setIsCheckoutSum(false);
  }, [selectedRange]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setSelectedRange({
        from: new Date(),
        to: addDays(new Date(), 3),
      });
    };

    const closeModals = (event) => {
      if (
        !event.target.closest(".guests-modal") &&
        !event.target.closest(".date-picker-container")
      ) {
        setIsGuestsModal(false);
        setIsDatesModal(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", closeModals);

    return () => {
      document.removeEventListener("click", closeModals);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedRange.from || !selectedRange.to) {
      isDatesModal ? setIsDatesModal(false) : setIsDatesModal(true);
      return;
    }

    // Check if both selectedRange.from and selectedRange.to are defined
    if (selectedRange.from && selectedRange.to) {
      // Calculate the time difference
      const checkInTs = selectedRange.from.getTime();
      const checkOutTs = selectedRange.to.getTime();
      const nights = dateDiffDays;

      const formData = {
        checkIn: checkInTs,
        checkOut: checkOutTs,
        guests: selectedGuests,
        totalPrice: totalPlusFee,
        nights: nights,
      };

      onSubmit(formData);
    } else {
      // Handle the case when either selectedRange.from or selectedRange.to is not defined
      alert("Please select both check-in and check-out dates.");
    }
  };

  function addDays(date, days) {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  }

  function calculateAverageRating(reviews) {
    if (!reviews.length) return 0;

    const totalRating = reviews.reduce((sum, review) => sum + review.rate, 0);

    return totalRating / reviews.length;
  }

  function scrollToElement(className) {
    const elements = document.getElementsByClassName(className);

    if (elements.length > 0) {
      elements[0].scrollIntoView({ behavior: "smooth" });
    }
  }

  const avgRate = calculateAverageRating(reviews);

  const getGuestsPlaceholder = () => {
    const { adults, children, infants, pets } = selectedGuests;
    let placeholder = "Add guests";

    if (adults > 0) {
      placeholder = `${adults} ${adults === 1 ? "guest" : "guests"}`;
      if (children > 0) {
        placeholder += `, ${children} ${children === 1 ? "child" : "children"}`;
      }
      if (infants > 0) {
        placeholder += `, ${infants} ${infants === 1 ? "infant" : "infants"}`;
      }
      if (pets > 0) {
        placeholder += `, ${pets} ${pets === 1 ? "pet" : "pets"}`;
      }
    } else {
      placeholder = "Add guests";
    }

    return placeholder;
  };

  return (
    <React.Fragment>
      {isStayPage && !isMobile && (
        <div className="checkout-form-container flex" ref={stayDetailsAsideRef}>
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="helped-container">
              <div className="form-header">
                <div className="form-header-price">
                  <span className="price">
                    ${price} <span className="per-night">night</span>
                  </span>
                </div>
              </div>
              <div className="form-header-reservation">
                <div
                  className="reservation-dates-container"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    setIsDatesModal(!isDatesModal);
                    setIsGuestsModal(false);
                  }}
                >
                  <div className="reservation-dates">
                    <label className="reservation-dates-label">CHECK-IN</label>
                    <input
                      placeholder="Add date"
                      name="check-in"
                      required
                      readOnly
                      value={
                        selectedRange.from
                          ? format(selectedRange.from, "dd/MM/yyyy")
                          : ""
                      }
                    />
                  </div>
                  <div className="reservation-dates">
                    <label className="reservation-dates-label">CHECKOUT</label>
                    <input
                      placeholder="Add date"
                      name="check-out"
                      required
                      readOnly
                      value={
                        selectedRange.to
                          ? format(selectedRange.to, "dd/MM/yyyy")
                          : ""
                      }
                    />
                  </div>
                </div>

                {isDatesModal && (
                  <div className="date-picker-container">
                    <DayPicker
                      mode="range"
                      selected={selectedRange}
                      onDayClick={(date) => {
                        if (!selectedRange.from) {
                          setSelectedRange({ ...selectedRange, from: date });
                        } else if (!selectedRange.to) {
                          setSelectedRange({ ...selectedRange, to: date });
                          setIsDatesModal(false); // close modal
                        } else {
                          setSelectedRange({ from: date, to: null });
                        }
                      }}
                      numberOfMonths={2}
                      modifiers={{
                        disabled: [{ before: new Date() }],
                      }}
                    />
                  </div>
                )}

                <div
                  className="reservation-guests"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    setIsGuestsModal(!isGuestsModal);
                  }}
                >
                  <label className="reservation-guests-label">GUESTS</label>
                  <input
                    placeholder={getGuestsPlaceholder()}
                    name="guests"
                    required
                    readOnly
                    value={getGuestsPlaceholder()}
                  />
                </div>
              </div>

              {isGuestsModal && (
                <div className="guests-modal">
                  {/* Adults */}
                  <div className="guests-options" id="adults">
                    <div className="guests-title">
                      <h3 className="guests-modal-title">Adults</h3>
                      <span className="guests-modal-subtitle">
                        Ages 13 or above
                      </span>
                    </div>
                    <div className="guests-action flex">
                      <button
                        disabled={selectedGuests.adults === 1}
                        onClick={() =>
                          setSelectedGuests({
                            ...selectedGuests,
                            adults: selectedGuests.adults - 1,
                          })
                        }
                        type="button"
                        className="guests-modal-btn"
                      >
                        <AiOutlineMinus />
                      </button>
                      <span className="guests-modal-count">
                        {selectedGuests.adults}
                      </span>
                      <button
                        type="button"
                        className="guests-modal-btn"
                        onClick={() =>
                          setSelectedGuests({
                            ...selectedGuests,
                            adults: selectedGuests.adults + 1,
                          })
                        }
                        disabled={
                          selectedGuests.adults === 16 ||
                          selectedGuests.adults + selectedGuests.children ===
                            capacity
                        }
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="guests-options" id="children">
                    <div className="guests-title">
                      <h3 className="guests-modal-title">Children</h3>
                      <span className="guests-modal-subtitle">Ages 2-12</span>
                    </div>
                    <div className="guests-action flex">
                      <button
                        disabled={selectedGuests.children === 0}
                        onClick={() =>
                          setSelectedGuests({
                            ...selectedGuests,
                            children: selectedGuests.children - 1,
                          })
                        }
                        type="button"
                        className="guests-modal-btn"
                      >
                        <AiOutlineMinus />
                      </button>
                      <span className="guests-modal-count">
                        {selectedGuests.children}
                      </span>
                      <button
                        type="button"
                        className="guests-modal-btn"
                        onClick={() =>
                          setSelectedGuests({
                            ...selectedGuests,
                            children: selectedGuests.children + 1,
                          })
                        }
                        disabled={
                          selectedGuests.children === 16 ||
                          selectedGuests.adults + selectedGuests.children ===
                            capacity
                        }
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </div>

                  {/* Infants */}
                  <div className="guests-options" id="infants">
                    <div className="guests-title">
                      <h3 className="guests-modal-title">Infants</h3>
                      <span className="guests-modal-subtitle">Under 2</span>
                    </div>
                    <div className="guests-action flex">
                      <button
                        type="button"
                        className="guests-modal-btn"
                        disabled={selectedGuests.infants === 0}
                        onClick={() =>
                          setSelectedGuests({
                            ...selectedGuests,
                            infants: selectedGuests.infants - 1,
                          })
                        }
                      >
                        <AiOutlineMinus />
                      </button>
                      <span className="guests-modal-count">
                        {selectedGuests.infants}
                      </span>
                      <button
                        type="button"
                        className="guests-modal-btn"
                        disabled={selectedGuests.infants === 5}
                        onClick={() =>
                          setSelectedGuests({
                            ...selectedGuests,
                            infants: selectedGuests.infants + 1,
                          })
                        }
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </div>

                  {/* PETS */}
                  <div className="guests-options" id="pets">
                    <div className="guests-title">
                      <h3 className="guests-modal-title">Pets</h3>
                      <span className="guests-modal-subtitle">
                        <a href="#">Bringing a service animal?</a>
                      </span>
                    </div>
                    <div className="guests-action flex">
                      <button
                        disabled={selectedGuests.pets === 0}
                        onClick={() =>
                          setSelectedGuests({
                            ...selectedGuests,
                            pets: selectedGuests.pets - 1,
                          })
                        }
                        type="button"
                        className="guests-modal-btn"
                      >
                        <AiOutlineMinus />
                      </button>
                      <span className="guests-modal-count">
                        {selectedGuests.pets}
                      </span>
                      <button
                        type="button"
                        disabled={selectedGuests.pets === 5}
                        onClick={() =>
                          setSelectedGuests({
                            ...selectedGuests,
                            pets: selectedGuests.pets + 1,
                          })
                        }
                        className="guests-modal-btn"
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <BrandedBtn txt="Reserve" />
              {dateDiffDays ? (
                <div className="reservation-footer">
                  <div style={{ width: "100%" }}>
                    <span>You won't be charged yet</span>
                    <div className="reservation-footer-price flex">
                      <div className="footer-price-container flex">
                        <div className="footer-price-nigts">
                          <span className="link">
                            ${price} x {dateDiffDays.toFixed(0)} nights
                          </span>
                          <span className="price">
                            ${price * dateDiffDays.toFixed(2)}
                          </span>
                        </div>
                        <div className="footer-price-fee">
                          <span className="link">Airbnb service fee</span>
                          <span className="price">
                            ${(totalSum * 0.125).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="footer-price-sum">
                        <span>Total</span>
                        <span>${totalPlusFee.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="reservation-footer"></div>
              )}
            </div>
          </form>
        </div>
      )}
      {isMobile && isStayPage && (
        <form onSubmit={handleSubmit} className="checkout-form-mobile">
          <footer className="stay-footer-mobile">
            <div className="stay-footer-container flex">
              <div className="stay-footer-details">
                <span className="price">
                  ${price} <span className="per-night">night</span>
                </span>
                <span className="dates">
                  {selectedRange.from
                    ? format(selectedRange.from, "dd MMM")
                    : ""}{" "}
                  - {selectedRange.to ? format(selectedRange.to, "dd MMM") : ""}
                </span>
              </div>
                    <div className="stay-footer-btn-c"
                    style={{width: "100px", height: "48px", alignSelf: "center"}}
                    // width: 100px;
                    // height: 48px;
                    // align-self: center;
                    >
              <BrandedBtn txt="Reserve" className="stay-footer-btn" width={100} />
              </div>
            </div>
          </footer>
        </form>
      )}
      {!isMobile && !isStayPage && (
        <header
          className="main-layout stayDetails
        checkout-header"
          style={
            !galleryInViewport
              ? { position: "fixed", top: "0" }
              : { position: "fixed", top: "-90px" }
          }
        >
          <div className="checkout-header-container flex">
            <div
              className="checkout-header-btn"
              onClick={() => {
                scrollToElement("images-editor-container");
              }}
            >
              <div className="checkout-header-btn-title">Photos</div>
            </div>
            <div
              className="checkout-header-btn"
              onClick={() => {
                scrollToElement("stay-amenities");
              }}
            >
              <div className="checkout-header-btn-title">Amenities</div>
            </div>
            <div
              className="checkout-header-btn"
              onClick={() => {
                scrollToElement("reviews-container");
              }}
            >
              <div className="checkout-header-btn-title">Reviews</div>
            </div>
            <div
              className="checkout-header-btn"
              onClick={() => {
                scrollToElement("details-map");
              }}
            >
              <div className="checkout-header-btn-title">Location</div>
            </div>
          </div>
          <div className="checkout-header-order">
            <div
              className="order-details"
              style={
                !asideInViewport
                  ? { opacity: "1", minWidth: "110px" }
                  : { opacity: "0", minWidth: "0px" }
              }
            >
              <div className="order-price">
                <span className="price">${price}</span>
                <span className="night"> night</span>
              </div>
              <div className="order-rating">
                <span className="star">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                  >
                    <path
                      fillRule="evenodd"
                      d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                    ></path>
                  </svg>
                </span>
                <span className="avg-rate">{avgRate.toFixed(2)} ·</span>
                <span className="reviews">{reviews.length} reviews</span>
              </div>
            </div>
            <div
              className="order-btn"
              style={
                !asideInViewport
                  ? { opacity: "1", minWidth: "110px" }
                  : { opacity: "0", minWidth: "0px" }
              }
              onClick={(ev) => {
                ev.stopPropagation();
                !selectedRange.from || !selectedRange.to
                  ? scrollToElement("stay-details-aside")
                  : console.log("nope");
                handleSubmit(ev);
              }}
            >
              <BrandedBtn txt="Reserve" />
            </div>
          </div>
        </header>
      )}
    </React.Fragment>
  );
}
