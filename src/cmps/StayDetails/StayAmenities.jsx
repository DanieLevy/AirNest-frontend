export function StayAmenities({ data }) {
  return (
    <div className='stay-amenities'>
      <h2>Amenities</h2>
      <ul>
        {data.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>
    </div>
  )
}
