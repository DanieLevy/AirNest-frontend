import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { store } from "../../store/store";
import { useSelector } from "react-redux";

export function StayReviews({ data }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const reviewsModal = useSelector(
    (storeState) => storeState.userModule.reviewsModal
  );

  const maxReviewsToShow = isMobile ? 3 : 6;
  const slicedReviews = data.slice(0, maxReviewsToShow);

  const hash = window.location.hash;

  useEffect(() => {
    const closeModal = (ev) => {
      if (ev.target.classList.contains("reviews-modal-container")) {
        store.dispatch({ type: "SET_REVIEWS_MODAL", reviewsModal: false });
      }
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("click", closeModal);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", closeModal);
    };
  }, []);
  const reviews = data;

  const sumOfRatings = reviews.reduce((acc, review) => {
    return acc + review.rate;
  }, 0);

  const avgRating = (sumOfRatings / reviews.length).toFixed(2);

  return (
    <React.Fragment>
      <div
        className={
          isMobile ? "main-layout small reviews-container" : "reviews-container"
        }
      >
        <div className="reviews-header flex">
          <div className="reviews-rating flex">
            <div className="flex" style={{ placeSelf: "center" }}>
              <AiFillStar />
            </div>
            <span>{avgRating}</span>
          </div>
          <span>•</span>
          <span>{reviews.length} Reviews</span>
        </div>
        <div className="reviews-list">
          {slicedReviews.map((review) => (
            <li className="review flex" key={review.id}>
              <div className="review-title flex">
                <img src={review.by.imgUrl} alt="" />
                <div className="reviewer-details flex">
                  <span>{review.by.fullname}</span>
                  <span>October 2021</span>
                </div>
              </div>
              <div className="review-body">
                <p>{review.txt}</p>
              </div>
            </li>
          ))}
        </div>
        <div
          className="show-all-reviews"
          onClick={() => {
            store.dispatch({
              type: "SET_REVIEWS_MODAL",
              reviewsModal: true,
            });
          }}
        >
          Show all {reviews.length} reviews
        </div>
      </div>

      {reviewsModal && (
        <div className="reviews-modal-container">
          <div className="reviews-modal">
            <button
              className="close-modal-btn"
              onClick={() => {
                store.dispatch({
                  type: "SET_REVIEWS_MODAL",
                  reviewsModal: false,
                });
              }}
            >
              &times;
            </button>
            <h1>Reviews</h1>
            {reviews.map((review) => (
              <li className="review flex" key={review.id}>
                <div className="review-title flex">
                  <img src={review.by.imgUrl} alt="" />
                  <div className="reviewer-details flex">
                    <span>{review.by.fullname}</span>
                    <span>October 2021</span>
                  </div>
                </div>
                <div className="review-body">
                  <p>{review.txt}</p>
                </div>
              </li>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
