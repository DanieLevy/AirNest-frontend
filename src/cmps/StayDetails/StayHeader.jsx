export function StayHeader({ name, type, imgUrls, price, labels, host }) {
  return (
    <div className='stay-header'>
      <h1>{name}</h1>
      <div className='stay-image-container'>
        {imgUrls.map((image, index) => (
          <img key={index} src={image} alt={name} />
        ))}
      </div>
      <p>Hosted by {host.fullname}</p>
    </div>
  )
}
