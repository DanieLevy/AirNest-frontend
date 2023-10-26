import React, { useEffect, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import { GrValidate } from "react-icons/gr";
import { GrLocation } from "react-icons/gr";
import { MdOutlineCleaningServices } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { PiMedal } from "react-icons/pi";
import { StayAmenities } from "./StayAmenities";
import { CheckoutForm } from "./CheckoutForm";
import { store } from "../../store/store";
import { is } from "date-fns/locale";

export function StayDescription({
  summary,
  reviews,
  price,
  host,
  loc,
  bedrooms,
  beds,
  bathrooms,
  capacity,
  room_type,
  name,
  amenities,
  onSubmit,
}) {
  
  function calculateAverageRating(reviews) {
    if (!reviews.length) return 0;

    const totalRating = reviews.reduce((sum, review) => sum + review.rate, 0);

    return totalRating / reviews.length;
  }

  const avgRate = calculateAverageRating(reviews).toFixed(2);

  return (
    <React.Fragment>
      <div className="stay-description">
        <main className="stay-details-main">
          <div className="stay-details-preview">
            <h1>
              {room_type} in {loc.city}, {loc.country}
            </h1>
            <span>
              {capacity} guests · {bedrooms} bedrooms · {beds} beds ·{" "}
              {bathrooms} bathrooms
            </span>
            <div className="stay-details-rating">
              <AiFillStar />
              <span className="avg-rate">{avgRate}</span> ·
              <a
                style={{ cursor: "pointer" }}
                onClick={() => {
                  store.dispatch({
                    type: "SET_REVIEWS_MODAL",
                    reviewsModal: true,
                  });
                }}
              >
                {reviews.length} Reviews
              </a>
            </div>
          </div>

          <div className="stay-details-host">
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
          </div>

          <div className="stay-details-advantages">
            <div className="advantages-list">
              {host.superHost && (
                <div className="advantage">
                  <div className="advantage-icon">
                    <PiMedal />
                  </div>
                  <div className="advantage-text">
                    <span>Superhost</span>
                    <span>
                      Superhosts are experienced, highly rated hosts who are
                      committed to providing great stays for guests.
                    </span>
                  </div>
                </div>
              )}

              <div className="advantage">
                <div className="advantage-icon">
                  <MdOutlineCleaningServices />
                </div>
                <div className="advantage-text">
                  <span>Enhanced Clean</span>
                  <span>
                    This host committed to Airbnb's 5-step enhanced cleaning
                    process.
                  </span>
                </div>
              </div>

              <div className="advantage">
                <div className="advantage-icon">
                  <FiCheckCircle />
                </div>
                <div className="advantage-text">
                  <span>Self check-in</span>
                  <span>Check yourself in with the lockbox.</span>
                </div>
              </div>

              <div className="advantage">
                <div className="advantage-icon">
                  <GrLocation />
                </div>
                <div className="advantage-text">
                  <span>Great location</span>
                  <span>
                    90% of recent guests gave the location a 5-star rating.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="stay-details-description">
            <div className="description-text">
              <p>{summary}</p>
            </div>
          </div>

          <StayAmenities data={amenities} />
        </main>
        <aside className="stay-details-aside">
          <CheckoutForm onSubmit={onSubmit} price={price} reviews={reviews} />
        </aside>
      </div>
    </React.Fragment>
  );
}
