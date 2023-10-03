import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { StayList } from '../cmps/StayList.jsx'
import { loadStays } from '../store/actions/stay.actions.js'

export function StayIndex() {

    const stays = useSelector(storeState => storeState.stayModule.stays)

    useEffect(() => {
        loadStays()
    }, [])

    return (
        <main >
            <section>
                {isLoading && <div>Loading...</div>}
                {!isLoading && <StayList stays={stays} />}
            </section>
        </main>
    )
}
