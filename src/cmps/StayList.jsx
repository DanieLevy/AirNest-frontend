import { StayPreview } from './StayPreview'

export function StayList({ stays }) {
  console.log('🚀 ~ file: StayList.jsx:5 ~ StayList ~ stays:', stays)

  return (
    <section className='stay-list'>
      {stays.map((stay) => (
        <StayPreview key={stay._id} stay={stay} />
      ))}
    </section>
  )
}
