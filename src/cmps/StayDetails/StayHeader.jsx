import { DetailsImages } from "./DetailsImages"

export function StayHeader({
  name,
  imgUrls,
  reviews,
}) {
  function calculateAverageRating(reviews) {
    if (!reviews.length) return 0

    const totalRating = reviews.reduce((sum, review) => sum + review.rate, 0)

    return totalRating / reviews.length
  }
  const avgRate = calculateAverageRating(reviews)

  return (
    <div className="stay-header">
      <div className="stay-header-top flex">
        <h1 className="name-title">{name}</h1>
        <div className="details-action-buttons flex">
          <div>Share</div>
          <div>Save</div>
        </div>
      </div>
      <DetailsImages urls={imgUrls} />
    </div>
  )
}

{
  /* <div className='stay-info'>
<h1>{`${room_type} in ${loc.city}, ${loc.country}`}</h1>
<div className='stay-info-list'>
  <ol className='horizontal-list'>
    <li>{`${capacity} guests`}</li>
    <span>·</span>
    <li>{`${bedrooms} bedrooms`}</li>
    <span>·</span>
    <li>{`${beds} beds`}</li>
    <span>·</span>
    <li>{`${bathrooms} baths`}</li>
  </ol>
</div>

<span className='avg-rating'>
  {' '}
  <i className='fa-solid fa-star'></i>
  {avgRate}
</span>
<span>.</span>

{reviews.length === 0 ? 'No Reviews' : `${reviews.length} Review${reviews.length > 1 ? 's' : ''}`}

<span>.</span>

{avgRate > 4 ? <span>Superhost</span> : null}
</div>
<div className='divider-bottom'></div>
<div className='divider-both'>
<p>Hosted by {host.fullname}</p>
</div>
  type,
  price,
  labels,
  host,
  loc,
  bedrooms,
  beds,
  bathrooms,
  room_type,
  capacity,
 */
}
