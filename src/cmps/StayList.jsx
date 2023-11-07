import React, { useEffect, useState } from 'react';
import { StayPreview } from './StayPreview';
import { StayLoader } from './StayLoader';

export function StayList({ stays, isLoading }) {
  if (stays.length === 0)
    return (
      <div className='no-stays' style={{display:'flex' ,flexDirection:'column',gap:10 ,marginTop:20}}>
        <h1 style={{fontSize:22}}>No exact matches</h1>
        <p style={{fontSize:'1rem'}}>Try changing or removing some of your filters or adjusting your search area.</p>
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
