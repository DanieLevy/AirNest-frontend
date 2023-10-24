import { is } from "date-fns/locale";
import React, { lazy } from "react";
import { useState } from "react";
import { useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { HiMiniChevronLeft, HiMiniChevronRight } from "react-icons/hi2";
import { userService } from "../services/user.service";

import { store } from "../store/store";
import { stayService } from "../services/stay.service.local";

export function StayPreview({ stay }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchParams] = useSearchParams();

  const stayLink = `/stay/${stay._id}?${searchParams.toString()}`;
  const user = useSelector((storeState) => storeState.userModule.user);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isLiked = () => {
    if (!user) return false;
    return stay.likedByUsers.some((likedUser) => likedUser._id === user._id);
  };

  async function handleLike(ev) {
    ev.stopPropagation();
    if (!user) {
      alert("Please login to like a stay");
      return;
    }
    if (isLiked()) {
      const idx = stay.likedByUsers.findIndex(
        (user) => user._id === userService.getLoggedinUser()._id
      );
      stay.likedByUsers.splice(idx, 1);
    } else {
      stay.likedByUsers.push(user);
    }
    await stayService.save(stay);
    store.dispatch({ type: "UPDATE_STAY", stay });
  }

  const reviewsAvg =
    stay.reviews.reduce((acc, review) => {
      return acc + review.rate;
    }, 0) / stay.reviews.length;

  const images = stay.imgUrls.map((imgUrl) => ({ original: imgUrl }));

  const leftNav = (onClick, disabled) => {
    return (
      <button
        className="main-image-gallery left-nav"
        disabled={disabled}
        onClick={(ev) => {
          onClick();
          ev.stopPropagation();
        }}
        aria-label="Previous Slide"
      >
        <HiMiniChevronLeft />
      </button>
    );
  };

  const rightNav = (onClick, disabled) => {
    return (
      <button
        className="main-image-gallery right-nav"
        disabled={disabled}
        onClick={(ev) => {
          onClick();
          ev.stopPropagation();
        }}
        aria-label="Next Slide"
      >
        <HiMiniChevronRight />
      </button>
    );
  };

  const HeartOutlineIcon = () => (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      className="heart-icon"
    >
      <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
    </svg>
  );

  const HeartFillIcon = () => (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      className="heart-icon"
    >
      <path
        fill="#FF385C"
        d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"
      ></path>
    </svg>
  );

  console.log(isLiked());

  return (
    <article
      className="stay-preview"
      onClick={() => window.open(stayLink, "_blank")}
    >
      <div className="preview-img">
        <div onClick={handleLike}>
          {isLiked() ? <HeartFillIcon /> : <HeartOutlineIcon />}
        </div>
        <ImageGallery
          items={images}
          showPlayButton={false}
          showFullscreenButton={false}
          showBullets={true}
          loading={lazy}
          showThumbnails={true}
          stopPropagation={true}
          disableKeyDown={true}
          renderLeftNav={leftNav}
          renderRightNav={rightNav}
        />
      </div>
      {isMobile ? (
        <Link to={stayLink} className="stay-card">
          <div className="stay-card-details">
            <div className="preview-header flex">
              <div className="preview-name">
                <h1>{stay.name}</h1>
              </div>
              <div className="preview-rating">
                <i className="fa-solid fa-star"></i>
                <span>{reviewsAvg.toFixed(2)}</span>
              </div>
            </div>
            <div className="preview-summary">
              <p>{stay.summary}</p>
            </div>
            <div className="preview-dates">
              <p>Nov 10 - 15</p>
            </div>
            <div className="preview-price">
              <span className="price-span">₪{stay.price}</span>
              <span> / night</span>
            </div>
          </div>
        </Link>
      ) : (
        <a
          href={stayLink}
          target="_blank"
          rel="noopener noreferrer"
          className="stay-card"
        >
          <div className="stay-card-details">
            <div className="preview-header flex">
              <div className="preview-name">
                <h1>{stay.name}</h1>
              </div>
              <div className="preview-rating">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="star"
                >
                  <path
                    fillRule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  ></path>
                </svg>
                <span>{reviewsAvg.toFixed(2)}</span>
              </div>
            </div>
            <div className="preview-summary">
              <p>{stay.summary}</p>
            </div>
            <div className="preview-dates">
              <p>Nov 10 - 15</p>
            </div>
            <div className="preview-price">
              <span className="price-span">₪{stay.price}</span>
              <span> / night</span>
            </div>
          </div>
        </a>
      )}
    </article>
  );
}
