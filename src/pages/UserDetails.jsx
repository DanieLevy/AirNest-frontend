import { useParams } from 'react-router'
import { ListingList } from '../cmps/userStays/userStaysList'
import { stayService } from '../services/stay.service'
import { loadStays } from '../store/actions/stay.actions.js'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export function UserDetails() {
  const { userId } = useParams()
  const [stays, setStays] = useState([])
  const logginUser = useSelector((storeState) => storeState.userModule.user)
  useEffect(() => {
    async function fetchStays() {
      try {
        const fetchedStays = await stayService.getStaysByUserId(userId)
        setStays(fetchedStays)
      } catch (error) {
        console.error('Error fetching stays:', error)
      }
    }

    fetchStays()
  }, [userId])

  if (!logginUser) return <div> No user found!</div>
  if (!stays) return <div> No stays found!</div>
  return (
    <main className='user-details main-layout'>
      {/* <h2>Stays for User: {userId}</h2> */}
      <ListingList stays={stays} />
    </main>
  )
}
