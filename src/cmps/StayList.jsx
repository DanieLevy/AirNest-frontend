import React, { useEffect, useState } from 'react';
import { StayPreview } from './StayPreview';
import { StayLoader } from './StayLoader';
import { PropagateLoader } from 'react-spinners';

export function StayList({ stays, isLoading }) {
  const isWishListPage = window.location.pathname.includes('wishlist');
  if (isLoading)
    return <PropagateLoader color={'#ff385c'} className='loader' speedMultiplier={0.8} />;

  if (stays.length === 0)
    return (
      <div className='no-stays'>
        <img src='https://i.ibb.co/LvDMwQQ/ok.jpg' alt='no-stays' border='0' />
        <h1>No Stays Found..</h1>
        {isWishListPage ? (
          <h3>Try to add some stays to your wishlist</h3>
        ) : (
          <h3>Try to change your search</h3>
        )}
      </div>
    );

  return (
    <section className='stay-list'>
      {stays.map((stay) =>
        isLoading ? <StayLoader key={stay._id} /> : <StayPreview key={stay._id} stay={stay} />
      )}
    </section>
  );
}
