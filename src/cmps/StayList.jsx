import { StayPreview } from './StayPreview'

export function StayList({ stays }) {

  return (
    <section >
      {
        stays.map(stay => <StayPreview stay={stay} />)
      }
    </section >
  )
}