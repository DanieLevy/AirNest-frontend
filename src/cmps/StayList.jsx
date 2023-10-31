import React, { useEffect, useState } from 'react'
import { StayPreview } from './StayPreview'
import { StayLoader } from './StayLoader'

export function StayList({ stays, isLoading }) {
  return (
    <section className='stay-list'>
      {stays.map((stay) =>
        isLoading ? <StayLoader key={stay._id} /> : <StayPreview key={stay._id} stay={stay} />
      )}
    </section>
  )
}
