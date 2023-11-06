import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { StayList } from '../cmps/StayList.jsx'
import { loadStays } from '../store/actions/stay.actions.js'
import { StayMapIndex } from '../cmps/StayMapIndex.jsx'

import { HiMiniMap } from 'react-icons/hi2'
import { HiMiniListBullet } from 'react-icons/hi2'
import { StayFilter } from '../cmps/StayFilter.jsx'
import { useSearchParams } from 'react-router-dom'
import { QUERY_KEYS, utilService } from '../services/util.service.js'
import { httpService } from '../services/http.service.js'
import { StayLoader } from '../cmps/StayLoader.jsx'

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

  //   return () => {
  //     setCurrentIndex(0)
  //     setRenderedStays([])
  //   }
  // }, [region, adults, children, label])

  // useEffect(() => {
  //   if (!isLoading) {
  //     setRenderedStays(removeDuplicates(filteredStays))
  //   }
  // }, [filteredStays, region, adults, children, label])

  const removeDuplicates = (array) => {
    return [...new Set(array)]
  }

  const loadMoreStays = () => {
    if (currentIndex < filteredStays.length) {
      console.log(
        '🚀 ~ file: StayIndex.jsx:76 ~ loadMoreStays ~ filteredStays.length:',
        filteredStays.length
      )
      console.log('🚀 ~ file: StayIndex.jsx:76 ~ loadMoreStays ~ currentIndex:', currentIndex)

      const nextStays = filteredStays.slice(currentIndex, currentIndex + staysPerPage)
      console.log('🚀 ~ file: StayIndex.jsx:80 ~ loadMoreStays ~ nextStays:', nextStays)

      if (nextStays.length > 0) {
        setRenderedStays((prevStays) => removeDuplicates([...prevStays, ...nextStays]))
        setCurrentIndex((prevIndex) => prevIndex + staysPerPage)
      }
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log('Fetching more data')
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
    let prevScrollY = window.scrollY

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(prevScrollY >= currentScrollY)
      prevScrollY = currentScrollY
    }

    const debouncedHandleResize = utilService.debounce(handleResize)
    const debouncedHandleScroll = utilService.debounce(handleScroll)

    window.addEventListener('scroll', debouncedHandleScroll)
    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll)
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [])

  if (isLoading) return <StayLoader />

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
        <div
          ref={loader}
          style={{
            height: '1px',
            width: '1px',
            margin: '-1px',
            overflow: 'hidden',
            position: 'absolute',
          }}
        />
      </main>
    </React.Fragment>
  )
}
