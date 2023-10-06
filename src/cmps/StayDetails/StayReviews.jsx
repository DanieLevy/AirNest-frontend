// import { SvgIcon } from '../SvgIcon'

export function StayReviews({ data }) {
  return (
    <div className='stay-reviews'>
      <h2>Reviews</h2>
      <ul>
        {data.map((review, index) => (
          <li key={index}>
            <span className='review-username'>{review.by.fullname}:</span> {review.txt}
          </li>
        ))}
      </ul>
    </div>
  )
}
