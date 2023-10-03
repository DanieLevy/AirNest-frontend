import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { StayList } from '../cmps/StayList.jsx'
import { loadStays } from '../store/actions/stay.actions.js'

export function StayIndex() {
  const stays = useSelector((storeState) => storeState.stayModule.stays)
  console.log('stays:', stays)
  const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)

  useEffect(() => {
    loadStays()
  }, [])

  return (
    <main className='stay-index'>
      <section>
        {isLoading && <div>Loading...</div>}
        {!isLoading && <StayList stays={stays} />}
      </section>
    </main>
  )
}
