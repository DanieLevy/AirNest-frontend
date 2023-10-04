import { stayService } from '../../services/stay.service.local'

export function StayHeader({ name, type, imgUrls, price, labels, host, loc, reviews }) {
  function calculateAverageRating(reviews) {
    if (!reviews.length) return 0

    const totalRating = reviews.reduce((sum, review) => sum + review.rate, 0)

    return totalRating / reviews.length
  }
  const avgRate = calculateAverageRating(reviews)

  return (
    <div className='stay-header'>
      <h1 className='name-title'>{name}</h1>
      <div className='stay-info'>
        <span className='avg-rating'>{avgRate}</span>
        <span>.</span>
        {reviews.length === 0 ? 'No Reviews' : `${reviews.length} Review${reviews.length > 1 ? 's' : ''}`}
        <span>.</span>
        {avgRate > 4 ? <span>Superhost</span> : null}
        <span className='address'>{`${loc.country}`}</span>
      </div>
      <div className='stay-image-container'>
        {imgUrls.map((image, index) => (
          <img key={index} src={image} alt={name} />
        ))}
      </div>
      <p>Hosted by {host.fullname}</p>
    </div>
  )
}
