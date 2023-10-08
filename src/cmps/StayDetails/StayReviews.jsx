import React, { useEffect, useState } from "react"
import { AiFillStar } from "react-icons/ai"

export function StayReviews({ data }) {
  const [reviewsModal, setReviewsModal] = useState(false)

  useEffect(() => {
    // click outside modal to close
    const closeModal = (ev) => {
      if (ev.target.classList.contains("reviews-modal-container")) {
        setReviewsModal(false)
      }
    }
    window.addEventListener("click", closeModal)
    return () => {
      window.removeEventListener("click", closeModal)
    }
  }, [])

  const reviews = data

  const sumOfRatings = reviews.reduce((acc, review) => {
    return acc + review.rate
  }, 0)

  const avgRating = (sumOfRatings / reviews.length).toFixed(2)

  return (
    <React.Fragment>
      <div className="reviews-container">
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
        <div className="show-all-reviews" onClick={() => setReviewsModal(true)}>
          Show all {reviews.length} reviews
        </div>
      </div>

      {reviewsModal && (
        <div className="reviews-modal-container">
          <div className="reviews-modal">
            <button
              className="close-modal-btn"
              onClick={() => setReviewsModal(false)}
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
  )
}
