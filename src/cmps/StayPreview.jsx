import { is } from 'date-fns/locale';
import React, { lazy, useRef } from 'react';
import { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { HiMiniChevronLeft, HiMiniChevronRight } from 'react-icons/hi2';
import { userService } from '../services/user.service';

import { store } from '../store/store';
import { stayService } from '../services/stay.service';
import { utilService } from '../services/util.service';
import { StayLoader } from './StayLoader';
import { showErrorMsg } from '../services/event-bus.service';

export function StayPreview({ stay }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchParams] = useSearchParams();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const stayLink = `/stay/${stay._id}?${searchParams.toString()}`;
  const user = useSelector((storeState) => storeState.userModule.user);
  const stays = useSelector((storeState) => storeState.stayModule.stays);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const userLikedStays = user
    ? stays.filter((stay) => stay.likedByUsers.some((likedUser) => likedUser._id === user._id))
    : [];
  const isLiked = () => {
    if (!user) return false;
    return userLikedStays.some((likedStay) => likedStay._id === stay._id);
  };

  const [liked, setLiked] = useState(isLiked());

  const randomDateRangeRef = useRef();

  useEffect(() => {
    setIsLoading(true);
  }, [stay]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const lazy = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  async function handleLike(ev) {
    ev.stopPropagation();
    if (!user) {
      showErrorMsg('Please login to add stay to wishlist');
      return;
    }

    const wasLiked = liked;
    setLiked(!liked);

    try {
      if (wasLiked) {
        const idx = stay.likedByUsers.findIndex(
          (user) => user._id === userService.getLoggedinUser()._id
        );
        stay.likedByUsers.splice(idx, 1);
      } else {
        stay.likedByUsers.push(user);
      }
      await stayService.save(stay);
      store.dispatch({ type: 'UPDATE_STAY', stay });
    } catch (error) {
      setLiked(wasLiked);
      showErrorMsg('Failed to update wishlist. Please try again.');
    }
  }

  const reviewsAvg =
    stay.reviews.reduce((acc, review) => {
      return acc + review.rate;
    }, 0) / stay.reviews.length;

  const images = stay.imgUrls.map((imgUrl) => ({ original: imgUrl }));

  const leftNav = (onClick, disabled) => {
    if (currentSlideIndex === 0) return null;
    return (
      <button
        className='main-image-gallery left-nav'
        disabled={disabled}
        onClick={(ev) => {
          onClick();
          ev.stopPropagation();
        }}
        aria-label='Previous Slide'
      >
        <HiMiniChevronLeft />
      </button>
    );
  };

  const rightNav = (onClick, disabled) => {
    if (currentSlideIndex === images.length - 1) return null;
    return (
      <button
        className='main-image-gallery right-nav'
        disabled={disabled}
        onClick={(ev) => {
          onClick();
          ev.stopPropagation();
        }}
        aria-label='Next Slide'
      >
        <HiMiniChevronRight />
      </button>
    );
  };

  const HeartOutlineIcon = () => (
    <svg
      viewBox='0 0 32 32'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      role='presentation'
      focusable='false'
      className='heart-icon'
    >
      <path d='m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z'></path>
    </svg>
  );

  const HeartFillIcon = () => (
    <svg
      viewBox='0 0 32 32'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      role='presentation'
      focusable='false'
      className='heart-icon'
    >
      <path
        fill='#FF385C'
        d='m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z'
      ></path>
    </svg>
  );
  const getRandomDateRange = () => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const month = months[utilService.getRandomIntInclusive(0, 11)];

    const startDay = utilService.getRandomIntInclusive(1, 25);
    const days = utilService.getRandomIntInclusive(1, 7);
    const endDay = startDay + days;
    return `${month} ${startDay} - ${endDay}`;
  };
  if (!randomDateRangeRef.current) {
    randomDateRangeRef.current = getRandomDateRange();
  }

  // console.log("isLoading", isLoading);
  // if (isLoading) return <StayLoader />;
  // <div className='loader-overlay'>
  //   <StayLoader />
  // </div>

  return (
    <React.Fragment>
      <div className={`loader-overlay ${isLoading ? '' : 'hidden'}`}>
        <StayLoader />
      </div>
      <article
        className={`stay-preview ${isLoading ? 'hidden' : ''}`}
        onClick={isMobile ? navigate.bind(null, stayLink) : () => window.open(stayLink, '_blank')}
      >
        <div className='preview-img'>
          <React.Fragment>
            <div onClick={handleLike}>{liked ? <HeartFillIcon /> : <HeartOutlineIcon />}</div>
            <div style={{ borderRadius: 20, overflow: 'hidden' }}>
              <ImageGallery
                items={images}
                showPlayButton={false}
                showFullscreenButton={false}
                showBullets={true}
                loading={lazy}
                stopPropagation={true}
                disableKeyDown={true}
                renderLeftNav={leftNav}
                renderRightNav={rightNav}
                onSlide={(currentIndex) => setCurrentSlideIndex(currentIndex)}
                onImageLoad={(ev) => {
                  setIsLoading(false);
                }}
              />
            </div>
          </React.Fragment>
        </div>
        {isMobile ? (
          <Link to={stayLink} className='stay-card'>
            <div className='stay-card-details'>
              <div className='preview-header flex'>
                <div className='preview-name'>
                  <h1>{stay.name}</h1>
                </div>
                <div className='preview-rating'>
                  <i className='fa-solid fa-star'></i>
                  {reviewsAvg % 1 === 0 ? reviewsAvg.toFixed(1) : reviewsAvg.toFixed(2)}
                </div>
              </div>
              <div className='preview-summary'>
                <p>{stay.summary}</p>
              </div>
              <div className='preview-dates'>
                <p>{randomDateRangeRef.current}</p>
              </div>
              <div className='preview-price'>
                <span className='price-span'>₪{stay.price}</span>
                <span> night</span>
              </div>
            </div>
          </Link>
        ) : (
          <div className='stay-card-details'>
            <div className='preview-header flex'>
              <div className='preview-name'>
                <h1>{stay.name}</h1>
              </div>
              <div className='preview-rating'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' className='star'>
                  <path
                    fillRule='evenodd'
                    d='m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z'
                  ></path>
                </svg>
                {reviewsAvg % 1 === 0 ? reviewsAvg.toFixed(1) : reviewsAvg.toFixed(2)}
              </div>
            </div>
            <div className='preview-summary'>
              <p>{stay.summary}</p>
            </div>
            <div className='preview-dates'>
              <p>{randomDateRangeRef.current}</p>
            </div>
            <div className='preview-price'>
              <span className='price-span'>${stay.price}</span>
              <span> night</span>
            </div>
          </div>
        )}
      </article>
    </React.Fragment>
  );
}
