import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { StayList } from "../cmps/StayList.jsx"
import { loadStays } from "../store/actions/stay.actions.js"
import { StayMapIndex } from "../cmps/StayMapIndex.jsx"

import { HiMiniMap } from "react-icons/hi2"
import { HiMiniListBullet } from "react-icons/hi2"
import { StayFilter } from "../cmps/StayFilter.jsx"
import { useSearchParams } from "react-router-dom"
import { QUERY_KEYS } from "../services/util.service.js"

export function StayIndex() {
  const [listMode, setListMode] = useState(true) // true = list, false = map
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [isVisible, setIsVisible] = useState(true)
  const [searchParams] = useSearchParams();

  const region = searchParams.get(QUERY_KEYS.region)
  const adults = searchParams.get(QUERY_KEYS.adults)
  const children = searchParams.get(QUERY_KEYS.children)

  const stays = useSelector((storeState) => storeState.stayModule.filteredStays)

  const isLoading = useSelector(
    (storeState) => storeState.systemModule.isLoading
  )

  useEffect(() => {
    loadStays(searchParams)
  }, [region, adults, children])

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    let prevScrollY = 0

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <React.Fragment>
      <StayFilter />
      <main className="main-layout stay-index">
        <section>
          <div
            className={`show-map-btn-container ${isVisible && isMobile ? "" : "hidden"
              }`}
            style={{ bottom: isMobile ? "75px" : "80px" }}
          >
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
