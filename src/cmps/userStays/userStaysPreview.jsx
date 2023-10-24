import React from 'react'

export function ListingPreview({ stay }) {
  return (
    <li>
      <h3>{stay.name}</h3>
      <img src={stay.imgUrl[0]} alt={stay.name} width='100' />
      <p>Type: {stay.type}</p>
      <p>Price: ${stay.price}</p>
      <p>Summary: {stay.summary}</p>
    </li>
  )
}
