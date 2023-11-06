import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { StayList } from '../cmps/StayList.jsx'
import { loadStays } from '../store/actions/stay.actions.js'
import { StayMapIndex } from '../cmps/StayMapIndex.jsx'

import { HiMiniMap } from 'react-icons/hi2'
import { HiMiniListBullet } from 'react-icons/hi2'
import { StayFilter } from '../cmps/StayFilter.jsx'
import { useSearchParams } from 'react-router-dom'
import { QUERY_KEYS } from '../services/util.service.js'
import { httpService } from '../services/http.service.js'

export function StayIndex() {
  const [listMode, setListMode] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [isVisible, setIsVisible] = useState(true)
  const [searchParams] = useSearchParams()

  const region = searchParams.get(QUERY_KEYS.region)
  const adults = searchParams.get(QUERY_KEYS.adults)
  const children = searchParams.get(QUERY_KEYS.children)
  const label = searchParams.get(QUERY_KEYS.label)
  const beds = searchParams.get(QUERY_KEYS.beds)

  const [currentIndex, setCurrentIndex] = useState(0)
  const staysPerPage = 20
  const [renderedStays, setRenderedStays] = useState([])

  const loader = useRef(null)

  const filteredStays = useSelector((storeState) => storeState.stayModule.filteredStays)

  const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)

  useEffect(() => {
    setCurrentIndex(0)

    loadStays(searchParams)

    setRenderedStays(removeDuplicates(filteredStays))
    console.log('🚀 ~ file: StayIndex.jsx:39 ~ useEffect ~ filteredStays:', filteredStays)
    console.log('🚀 ~ file: StayIndex.jsx:39 ~ useEffect ~ currentIndex:', currentIndex)

    return () => {
      setCurrentIndex(0)
      setRenderedStays([])
    }
  }, [region, adults, children, label, beds])
  // useEffect(() => {
  //   loadStays(searchParams)
  //   console.log('🚀 ~ file: loadStays.jsx:39 ~ useEffect ~ filteredStays:', filteredStays)
  //   console.log('🚀 ~ file: loadStays.jsx:39 ~ useEffect ~ currentIndex:', currentIndex)
  // }, [loadStays, region, adults, children, label])

  // useEffect(() => {
  //   setRenderedStays(removeDuplicates(filteredStays))
  //   console.log('🚀 ~ file: setRenderedStays.jsx:39 ~ useEffect ~ filteredStays:', filteredStays)
  //   console.log('🚀 ~ file: setRenderedStays.jsx:39 ~ useEffect ~ currentIndex:', currentIndex)
  // }, [filteredStays])

  const removeDuplicates = (array) => {
    return [...new Set(array)]
  }

  const loadMoreStays = () => {
    if (currentIndex < filteredStays.length) {
      const nextStays = filteredStays.slice(currentIndex, currentIndex + staysPerPage)
      console.log('🚀 ~ file: StayIndex.jsx:39 ~ useEffect ~ filteredStays:', filteredStays)
      console.log('🚀 ~ file: StayIndex.jsx:39 ~ useEffect ~ currentIndex:', currentIndex)
      if (nextStays) {
        setRenderedStays((prevStays) => removeDuplicates([...prevStays, ...nextStays]))
        setCurrentIndex((prevIndex) => prevIndex + staysPerPage)
      }
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreStays()
        }
      },
      {
        root: null,
        rootMargin: '20px',
        threshold: 0.2,
      }
    )

    if (loader.current) {
      observer.observe(loader.current)
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current)
      }
    }
  }, [currentIndex, filteredStays.length])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    let prevScrollY = 0

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      currentScrollY > prevScrollY ? setIsVisible(false) : setIsVisible(true)
      prevScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <React.Fragment>
      <StayFilter />
      <main className='main-layout stay-index'>
        <section>
          <div
            className={`show-map-btn-container ${isVisible && isMobile ? '' : 'hidden'}`}
            style={{ bottom: isMobile ? '75px' : '90px' }}
          >
            <button
              className='show-map-btn'
              onClick={() =>
                // scroll to top of page
                window.scrollTo({ top: 0, behavior: 'smooth' }) & setListMode(!listMode)
              }
            >
              {listMode ? (
                <>
                  Show Map
                  <HiMiniMap className='map-icon' />
                </>
              ) : (
                <>
                  Show List
                  <HiMiniListBullet className='map-icon' />
                </>
              )}
            </button>
          </div>
          {listMode ? <StayList stays={renderedStays} /> : <StayMapIndex stays={renderedStays} />}
        </section>
        <div ref={loader} style={{ height: '1px', width: '100%' }} />
      </main>
    </React.Fragment>
  )
}
