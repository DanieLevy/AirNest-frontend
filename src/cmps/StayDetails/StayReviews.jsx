export function StayReviews({ data }) {
  return (
    <div className='stay-reviews'>
      <h2>Reviews</h2>
      <ul>
        {data.map((review, index) => (
          <li key={index}>
            <strong>{review.user}:</strong> {review.review}
          </li>
        ))}
      </ul>
    </div>
  )
}
