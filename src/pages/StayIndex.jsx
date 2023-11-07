import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { StayList } from '../cmps/StayList.jsx';
import { loadStays } from '../store/actions/stay.actions.js';
import { StayMapIndex } from '../cmps/StayMapIndex.jsx';

import { HiMiniMap } from 'react-icons/hi2';
import { HiMiniListBullet } from 'react-icons/hi2';
import { StayFilter } from '../cmps/StayFilter.jsx';
import { useSearchParams } from 'react-router-dom';
import { QUERY_KEYS } from '../services/util.service.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import { StayLoader } from '../cmps/StayLoader.jsx';

export function StayIndex() {
  const stays = useSelector((storeState) => storeState.stayModule.filteredStays);
  const isLoading = useSelector((storeState) => storeState.systemModule.isLoading);

  const [listMode, setListMode] = useState(true); // true = list, false = map
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isVisible, setIsVisible] = useState(true);
  const [searchParams] = useSearchParams();

  const [displayCount, setDisplayCount] = useState(21);
  const displayStays = stays.slice(0, displayCount);
  console.log('displayStays:', displayStays.length);

  useEffect(() => {
    setDisplayCount(21);
  }, [searchParams]);

  const fetchMoreData = () => {
    setDisplayCount(displayCount + 21);
  };

  const region = searchParams.get(QUERY_KEYS.region);
  const adults = searchParams.get(QUERY_KEYS.adults);
  const children = searchParams.get(QUERY_KEYS.children);
  const label = searchParams.get(QUERY_KEYS.label);

  useEffect(() => {
    loadStays(searchParams);
  }, [region, adults, children, label]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    let prevScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      currentScrollY > prevScrollY ? setIsVisible(false) : setIsVisible(true);
      prevScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <React.Fragment>
      <StayFilter />
      <main className='main-layout stay-index'>
        {isMobile ? (
          <section>
            <div
              className={`show-map-btn-container ${isVisible && isMobile ? '' : 'hidden'}`}
              style={{ bottom: isMobile ? '70px' : '90px' }}
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
            {listMode ? (
              <StayList stays={stays} isLoading={isLoading} />
            ) : (
              <StayMapIndex stays={stays} />
            )}
          </section>
        ) : (
          <section>
            <div className={`show-map-btn-container`}>
              <button
                className='show-map-btn'
                onClick={() =>
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
            {listMode ? (
              <InfiniteScroll
                dataLength={displayStays.length}
                next={fetchMoreData}
                hasMore={displayCount < stays.length}
              >
                {<StayList stays={displayStays} isLoading={isLoading} />}
              </InfiniteScroll>
            ) : (
              <StayMapIndex stays={stays} />
            )}
          </section>
        )}
      </main>
    </React.Fragment>
  );
}
