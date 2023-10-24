import React from 'react'
import { ListingPreview } from './userStaysPreview'

export function ListingList({ stays }) {
  return (
    <ul>
      {stays.map((stay) => (
        <ListingPreview key={stay.id} stay={stay} />
      ))}
    </ul>
  )
}
