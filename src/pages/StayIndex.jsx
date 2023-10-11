import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { StayList } from "../cmps/StayList.jsx"
import { loadStays } from "../store/actions/stay.actions.js"
import { StayMapIndex } from "../cmps/StayMapIndex.jsx"

import { HiMiniMap } from "react-icons/hi2"
import { HiMiniListBullet } from "react-icons/hi2"
import { StayFilter } from "../cmps/StayFilter.jsx"

export function StayIndex() {
  const [listMode, setListMode] = useState(true) // true = list, false = map

  const stays = useSelector((storeState) => storeState.stayModule.stays)
  console.log("stays:", stays)
  const isLoading = useSelector(
    (storeState) => storeState.systemModule.isLoading
  )

  useEffect(() => {
    loadStays()
  }, [])

  return (
    <React.Fragment>
      <StayFilter />
      <main className="main-layout stay-index">
        <section>
          <div className="show-map-btn-container ">
            <button
              className="show-map-btn"
              onClick={() => setListMode(!listMode)}
            >
              {listMode ? (
                <>
                  Show Map
                  <HiMiniMap className="map-icon" />
                </>
              ) : (
                <>
                  Show List
                  <HiMiniListBullet className="map-icon" />
                </>
              )}
            </button>
          </div>
          {isLoading && <div>Loading...</div>}
          {!isLoading && listMode && <StayList stays={stays} />}
          {!isLoading && !listMode && <StayMapIndex stays={stays} />}
        </section>
      </main>
    </React.Fragment>
  )
}
