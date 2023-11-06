import React, { useEffect, useState } from 'react'
import { StayPreview } from './StayPreview'
import { StayLoader } from './StayLoader'

export function StayList({ stays, isLoading }) {
  
  if (stays.length === 0) return (<div className="no-stays">No stays found</div>)
  
  return (
    <section className='stay-list'>
      {stays.map((stay) =>
        isLoading ? <StayLoader key={stay._id} /> : <StayPreview key={stay._id} stay={stay} />
      )}
    </section>
  )
}
