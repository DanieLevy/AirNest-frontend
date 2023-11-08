import React, { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';

import { BrandedBtn } from './BrandedBtn';
import { useLocation } from 'react-router';

/// Dont remove! - DatesModal is used in this component
import { DatesModal } from './DatesModal';
import { FadeIn } from 'react-slide-fade-in';
import { set } from 'date-fns';
import { is } from 'date-fns/locale';
/// Dont remove! - DatesModal is used in this component

import { IoSearch } from 'react-icons/io5';
import { AiOutlineMinus } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import { CiLocationArrow1 } from 'react-icons/ci';
import { CgSearch } from 'react-icons/cg';
import { useSearchParams } from 'react-router-dom';
import { QUERY_KEYS } from '../services/util.service';
import { utilService } from '../services/util.service';
import { store } from '../store/store';
import { useDispatch } from 'react-redux';

export function ExploreBar({ onExpandChange }) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isActive, setIsActive] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileExploreBar, setMobileExploreBar] = useState(false);

  // Mobile collapse
  const [whereCollapsed, setWhereCollapsed] = useState(false);
  const [whenCollapsed, setWhenCollapsed] = useState(true);
  const [guestsCollapsed, setGuestsCollapsed] = useState(true);

  function handleExpandChange(value = null) {
    const newValue = value === null ? !isExpanded : value;
    console.log('newValue', newValue);
    dispatch({ type: 'SET_EXPLORE_EXPANDED', isExploreExpanded: newValue });
    setIsExpanded(newValue);
  }

  const [formData, setFormData] = useState({
    location: '',
    startDate: null,
    endDate: null,
  });

  const [selectedRange, setSelectedRange] = useState({
    from: null,
    to: null,
  });

  const [selectedGuests, setSelectedGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const expandedBarRef = useRef(null);

  const location = useLocation();
  const path = location.pathname;
  const isStayPage = path === '/' || path.startsWith('/?');
  const isDashboardPage = path === path.startsWith('/dashboard');

  useEffect(() => {
    setSelectedGuests((prevState) => ({
      ...prevState,
      adults: +searchParams.get(QUERY_KEYS.adults) || 0,
      children: +searchParams.get(QUERY_KEYS.children) || 0,
      infants: +searchParams.get(QUERY_KEYS.infants) || 0,
      pets: +searchParams.get(QUERY_KEYS.pets) || 0,
    }));
    setSelectedRange((prevState) => ({
      ...prevState,
      from: searchParams.has(QUERY_KEYS.checkin)
        ? new Date(+searchParams.get(QUERY_KEYS.checkin))
        : null,
      to: searchParams.has(QUERY_KEYS.checkout)
        ? new Date(+searchParams.get(QUERY_KEYS.checkout))
        : null,
    }));
    setFormData((prevState) => ({
      ...prevState,
      location: searchParams.get(QUERY_KEYS.region) || '',
      startDate: searchParams.has(QUERY_KEYS.checkin)
        ? new Date(+searchParams.get(QUERY_KEYS.checkin))
        : null,
      endDate: searchParams.has(QUERY_KEYS.checkout)
        ? new Date(+searchParams.get(QUERY_KEYS.checkout))
        : null,
    }));
  }, [searchParams]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    if (isExpanded) {
      window.addEventListener('scroll', handleScroll);
      document.addEventListener('click', handleDocumentClick);
    } else {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleDocumentClick);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleDocumentClick);
      window.removeEventListener('resize', handleResize);
    };
  }, [isExpanded]);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  function handleFilterModal(action = 'close') {
    store.dispatch({
      type: 'SET_FILTER_MODAL',
      filterModal: action === 'open' ? true : false,
    });
  }

  function handleDayClick(date) {
    if (selectedRange.from && selectedRange.to) {
      setSelectedRange({
        from: date,
        to: null,
      });
      setIsActive('check-out');
      console.log('selectedRange', selectedRange);
      return;
    }

    if (selectedRange.from && date < selectedRange.from) {
      // Reset range
      setSelectedRange({
        from: date,
        to: null,
      });
      // setIsActive("check-out")
      return;
    }

    if (!selectedRange.from) {
      setIsActive('check-out');
      setSelectedRange({ from: date, to: null });
    }

    if (selectedRange.from && !selectedRange.to) {
      setIsActive('guests');
      setSelectedRange({ from: selectedRange.from, to: date });

      setFormData((prevState) => ({
        ...prevState,
        startDate: selectedRange.from,
        endDate: date,
      }));
    }
  }

  function handleScroll() {
    handleExpandChange(false);
    setIsActive(null);
  }

  function handleClick(ev) {
    ev.stopPropagation();
    console.log('isActive', isActive);
    handleExpandChange(!isExpanded);
  }

  function handleDocumentClick(ev) {
    ev.stopPropagation();
    if (expandedBarRef.current && !expandedBarRef.current.contains(ev.target)) {
      setIsExpanded(false);
      handleExpandChange(false);
      setIsActive(null);
    }
  }

  function handleLocationClick(e) {
    e.stopPropagation();
    let locationText;
    if (e.target.tagName === 'IMG') {
      locationText = e.target.nextSibling.innerText;
    } else {
      locationText = e.target.innerText;
    }

    setFormData((prevState) => ({
      ...prevState,
      location: locationText,
    }));
    setIsActive('check-in');
  }

  function handleCollapse(type) {
    return (ev) => {
      ev.stopPropagation();
      switch (type) {
        case 'where':
          setWhereCollapsed(!whereCollapsed);
          setWhenCollapsed(true);
          setGuestsCollapsed(true);
          break;
        case 'when':
          setWhenCollapsed(!whenCollapsed);
          setWhereCollapsed(true);
          setGuestsCollapsed(true);
          break;
        case 'guests':
          setGuestsCollapsed(!guestsCollapsed);
          setWhereCollapsed(true);
          setWhenCollapsed(true);
          break;
        default:
          break;
      }
    };
  }

  const handleChange = (event) => {
    const { name, type, value } = event.target;

    switch (name) {
      case 'location':
        setFormData((prevState) => ({ ...prevState, location: value }));
        break;
      default:
        break;
    }
  };

  function handleSubmit(ev) {
    mobileExploreBar && setMobileExploreBar(false);
    ev.preventDefault();

    if (selectedRange.from && !selectedRange.to) {
      const inputDate = new Date(selectedRange.from);
      inputDate.setDate(inputDate.getDate() + 1);
      selectedRange.to = inputDate.toString();
    }
    if (selectedRange.to && !selectedRange.from) {
      const inputDate = new Date(selectedRange.to);
      inputDate.setDate(inputDate.getDate() - 1);
      selectedRange.from = inputDate.toString();
    }

    const exploreSearch = {};

    const region = formData.location;
    const checkin = selectedRange.from
      ? new Date(selectedRange.from).getTime()
      : selectedRange.from;
    const checkout = selectedRange.to ? new Date(selectedRange.to).getTime() : selectedRange.to;
    const adults = selectedGuests.adults;
    const children = selectedGuests.children;
    const infants = selectedGuests.infants;
    const pets = selectedGuests.pets;

    region ? (exploreSearch[QUERY_KEYS.region] = region) : '';
    checkin ? (exploreSearch[QUERY_KEYS.checkin] = checkin) : '';
    checkout ? (exploreSearch[QUERY_KEYS.checkout] = checkout) : '';
    adults ? (exploreSearch[QUERY_KEYS.adults] = adults) : '';
    children ? (exploreSearch[QUERY_KEYS.children] = children) : '';
    infants ? (exploreSearch[QUERY_KEYS.infants] = infants) : '';
    pets ? (exploreSearch[QUERY_KEYS.pets] = pets) : '';

    setSearchParams(exploreSearch);

    handleExpandChange(false);
    if (path !== '/' && !path.startsWith('/?')) {
      window.location.href = '/';
    }
  }

  function handleMobileExplore() {
    setMobileExploreBar(!mobileExploreBar);
  }

  let totalGuests = selectedGuests.adults + selectedGuests.children;

  return (
    <React.Fragment>
      {/* 1 */}
      {!isExpanded && isStayPage && !isMobile && (
        <div
          className={`explore-bar-preview ${isExpanded ? 'slideOut' : 'slideIn'}`}
          onClick={isExpanded ? null : handleClick}
        >
          <button type='button' className='location-btn' onClick={() => setIsActive('location')}>
            {formData.location ? formData.location.split(',')[0] : 'Anywhere'}
          </button>
          <span className='splitter'></span>
          <button type='button' className='dates-btn' onClick={() => setIsActive('check-in')}>
            {selectedRange.from && selectedRange.to
              ? `${utilService.getDayAndMonthFromDate(selectedRange.from, selectedRange.to)}`
              : 'Any week'}
          </button>
          <span className='splitter'></span>
          <button
            type='button'
            className={`guests-btn ${
              selectedGuests.adults || selectedGuests.children ? 'filled' : ''
            }`}
            onClick={() => setIsActive('guests')}
          >
            {selectedGuests.adults + selectedGuests.children !== 0
              ? `${
                  selectedGuests.adults + selectedGuests.children === 1
                    ? `${selectedGuests.adults + selectedGuests.children} guest`
                    : `${selectedGuests.adults + selectedGuests.children} guests`
                } `
              : 'Add guests'}
          </button>
          <button type='button' className='search-btn'>
            <IoSearch />
          </button>
        </div>
      )}

      {/* 2 */}
      {!isExpanded && !isStayPage && !isMobile && !isDashboardPage && (
        <div className={`explore-bar-preview short`} onClick={isExpanded ? null : handleClick}>
          <div className='title'>Start your search</div>
          <button type='button' className='search-btn'>
            <IoSearch />
          </button>
        </div>
      )}

      {!isExpanded && !isStayPage && !isMobile && isDashboardPage && (
        <div className='dashboard-header'>Dashboard</div>
      )}

      {/* 3 */}
      <React.Fragment>
        {isExpanded && (
          <div
            className={!isExpanded ? 'explore-helper' : 'explore-helper show'}
            style={{ display: isExpanded ? '' : 'none' }}
          >
            <form
              ref={expandedBarRef}
              className={`explore-bar-preview expanded  ${isExpanded ? 'slideIn2' : 'slideOut2'}`}
              onSubmit={handleSubmit}
              style={{
                backgroundColor: isActive === null ? 'white' : '#ebebeb',
              }}
            >
              <article
                className={`explore-bar location flex ${isActive === 'location' ? 'active' : ''}`}
                onClick={() => setIsActive('location')}
              >
                <label htmlFor='location'>Where</label>
                <input
                  type='text'
                  name='location'
                  id='location'
                  placeholder='Search destination'
                  value={formData.location}
                  onChange={handleChange}
                />
                {isActive === 'location' && (
                  <div className='location-modal'>
                    <ul className='location-list'>
                      <li className='location-list-item' onClick={handleLocationClick}>
                        <div className='location-list-icon'>
                          <CiLocationArrow1 />
                        </div>
                        <span className='location-list-text'>Spain, Madrid</span>
                      </li>
                      <li className='location-list-item' onClick={handleLocationClick}>
                        <div className='location-list-icon'>
                          <CiLocationArrow1 />
                        </div>
                        <span className='location-list-text'>Portugal, Lisbon</span>
                      </li>
                      <li className='location-list-item' onClick={handleLocationClick}>
                        <div className='location-list-icon'>
                          <CiLocationArrow1 />
                        </div>
                        <span className='location-list-text'>Israel, Tel-aviv</span>
                      </li>
                      <li className='location-list-item' onClick={handleLocationClick}>
                        <div className='location-list-icon'>
                          <CiLocationArrow1 />
                        </div>
                        <span className='location-list-text'>Australia ,Canberra</span>
                      </li>
                      <li className='location-list-item' onClick={handleLocationClick}>
                        <div className='location-list-icon'>
                          <CiLocationArrow1 />
                        </div>
                        <span className='location-list-text'>Canada ,Ottawa</span>
                      </li>
                      <li className='location-list-item' onClick={handleLocationClick}>
                        <div className='location-list-icon'>
                          <CiLocationArrow1 />
                        </div>
                        <span className='location-list-text'>United States</span>
                      </li>
                      <li className='location-list-item' onClick={handleLocationClick}>
                        <div className='location-list-icon'>
                          <CiLocationArrow1 />
                        </div>
                        <span className='location-list-text'>Hong Kong</span>
                      </li>
                    </ul>
                    <section className='location-region'>
                      <div className='location-region-title'>Search by region</div>
                      <div className='location-region-list'>
                        <div className='location-region-item'>
                          <img src='https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg' />
                          <span className='location-region-text'>I'm flexible</span>
                        </div>
                        <div className='location-region-item' onClick={handleLocationClick}>
                          <img src='https://a0.muscache.com/im/pictures/66355b01-4695-4db9-b292-c149c46fb1ca.jpg?im_w=320' />
                          <span className='location-region-text'>Middle East</span>
                        </div>
                        <div className='location-region-item' onClick={handleLocationClick}>
                          <img src='https://a0.muscache.com/im/pictures/ea5598d7-2b07-4ed7-84da-d1eabd9f2714.jpg?im_w=320' />
                          <span className='location-region-text'>Italy</span>
                        </div>
                        <div className='location-region-item' onClick={handleLocationClick}>
                          <img src='https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320' />
                          <span className='location-region-text'>United States</span>
                        </div>
                        <div className='location-region-item' onClick={handleLocationClick}>
                          <img src='https://a0.muscache.com/im/pictures/f0ece7c0-d9b2-49d5-bb83-64173d29cbe3.jpg?im_w=320' />
                          <span className='location-region-text'>France</span>
                        </div>
                        <div className='location-region-item' onClick={handleLocationClick}>
                          <img src='https://a0.muscache.com/im/pictures/06a30699-aead-492e-ad08-33ec0b383399.jpg?im_w=320' />
                          <span className='location-region-text'>South America</span>
                        </div>
                      </div>
                    </section>
                  </div>
                )}
              </article>

              <span className='splitter'></span>

              <article
                className={`explore-bar check-in ${isActive === 'check-in' ? 'active' : ''}`}
                onClick={() => setIsActive('check-in')}
              >
                <div className='check-in-text flex'>
                  Check in
                  <input
                    type='text'
                    placeholder={
                      selectedRange.from
                        ? utilService.getDateString(selectedRange.from)
                        : 'Add dates'
                    }
                    readOnly
                    value={selectedRange.from ? utilService.getDateString(selectedRange.from) : ''}
                  />
                </div>
              </article>

              <span className='splitter'></span>

              <article
                className={`explore-bar check-out ${isActive === 'check-out' ? 'active' : ''}`}
                onClick={() => setIsActive('check-out')}
              >
                <div className='check-out-text flex'>
                  Check out
                  <input
                    type='text'
                    placeholder={
                      selectedRange.to ? utilService.getDateString(selectedRange.to) : 'Add dates'
                    }
                    readOnly
                    value={selectedRange.to ? utilService.getDateString(selectedRange.to) : ''}
                  />
                </div>
              </article>

              {isActive === 'check-in' || isActive === 'check-out' ? (
                <React.Fragment>
                  <div className='dates-modal' onClick={(ev) => ev.stopPropagation()}>
                    <DayPicker
                      mode='range'
                      selected={selectedRange}
                      onDayClick={handleDayClick}
                      numberOfMonths={2}
                      modifiers={{ disabled: [{ before: new Date() }] }}
                    />
                  </div>
                </React.Fragment>
              ) : null}

              <span className='splitter'></span>

              <article
                className={`explore-bar guests ${isActive === 'guests' ? 'active' : ''}`}
                onClick={() => setIsActive('guests')}
              >
                <div className='guests-text flex'>
                  Who
                  <input
                    type='text'
                    placeholder='Add guests'
                    className='guests-input'
                    value={
                      totalGuests === 0
                        ? 'Add guests'
                        : `${selectedGuests.adults + selectedGuests.children} ${
                            selectedGuests.adults + selectedGuests.children === 1
                              ? 'guest'
                              : 'guests'
                          }${
                            selectedGuests.infants > 0
                              ? `, ${selectedGuests.infants} ${
                                  selectedGuests.infants === 1 ? 'infant' : 'infants'
                                }`
                              : ''
                          }`
                    }
                    readOnly
                  />
                  {isActive === 'guests' && (
                    <div className='guests-modal'>
                      {/* Adults */}
                      <div className='guests-options' id='adults'>
                        <div className='guests-title'>
                          <h3 className='guests-modal-title'>Adults</h3>
                          <span className='guests-modal-subtitle'>Ages 13 or above</span>
                        </div>
                        <div className='guests-action flex'>
                          <button
                            disabled={
                              selectedGuests.children || selectedGuests.infants
                                ? selectedGuests.adults === 1
                                : selectedGuests.adults === 0
                            }
                            type='button'
                            className='guests-modal-btn'
                            onClick={() => {
                              if (selectedGuests.adults > 0)
                                setSelectedGuests((prevState) => ({
                                  ...prevState,
                                  adults: prevState.adults - 1,
                                }));
                            }}
                          >
                            <AiOutlineMinus />
                          </button>
                          <span className='guests-modal-count'>{selectedGuests.adults}</span>
                          <button
                            type='button'
                            className='guests-modal-btn'
                            onClick={() => {
                              setSelectedGuests((prevState) => ({
                                ...prevState,
                                adults: prevState.adults + 1,
                              }));
                            }}
                            disabled={selectedGuests.adults === 16}
                          >
                            <AiOutlinePlus />
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className='guests-options' id='children'>
                        <div className='guests-title'>
                          <h3 className='guests-modal-title'>Children</h3>
                          <span className='guests-modal-subtitle'>Ages 2-12</span>
                        </div>
                        <div className='guests-action flex'>
                          <button
                            disabled={selectedGuests.children === 0}
                            type='button'
                            className='guests-modal-btn'
                            onClick={() => {
                              if (selectedGuests.children > 0)
                                setSelectedGuests((prevState) => ({
                                  ...prevState,
                                  children: prevState.children - 1,
                                }));
                            }}
                          >
                            <AiOutlineMinus />
                          </button>
                          <span className='guests-modal-count'>{selectedGuests.children}</span>
                          <button
                            type='button'
                            className='guests-modal-btn'
                            onClick={() => {
                              if (!selectedGuests.adults) {
                                setSelectedGuests((prevState) => ({
                                  ...prevState,
                                  adults: prevState.adults + 1,
                                  children: prevState.children + 1,
                                }));
                                return;
                              }
                              setSelectedGuests((prevState) => ({
                                ...prevState,
                                children: prevState.children + 1,
                              }));
                            }}
                            disabled={selectedGuests.children === 15}
                          >
                            <AiOutlinePlus />
                          </button>
                        </div>
                      </div>

                      {/* Infants */}
                      <div className='guests-options' id='infants'>
                        <div className='guests-title'>
                          <h3 className='guests-modal-title'>Infants</h3>
                          <span className='guests-modal-subtitle'>Under 2</span>
                        </div>
                        <div className='guests-action flex'>
                          <button
                            disabled={selectedGuests.infants === 0}
                            type='button'
                            className='guests-modal-btn'
                            onClick={() => {
                              if (selectedGuests.infants > 0)
                                setSelectedGuests((prevState) => ({
                                  ...prevState,
                                  infants: prevState.infants - 1,
                                }));
                            }}
                          >
                            <AiOutlineMinus />
                          </button>
                          <span className='guests-modal-count'>{selectedGuests.infants}</span>
                          <button
                            type='button'
                            className='guests-modal-btn'
                            onClick={() => {
                              if (!selectedGuests.adults) {
                                setSelectedGuests((prevState) => ({
                                  ...prevState,
                                  adults: prevState.adults + 1,
                                  infants: prevState.infants + 1,
                                }));
                                return;
                              }
                              setSelectedGuests((prevState) => ({
                                ...prevState,
                                infants: prevState.infants + 1,
                              }));
                            }}
                            disabled={selectedGuests.infants === 5}
                          >
                            <AiOutlinePlus />
                          </button>
                        </div>
                      </div>

                      {/* PETS */}
                      <div className='guests-options' id='pets'>
                        <div className='guests-title'>
                          <h3 className='guests-modal-title'>Pets</h3>
                          <span className='guests-modal-subtitle'>
                            <a href='#'>Bringing a service animal?</a>
                          </span>
                        </div>
                        <div className='guests-action flex'>
                          <button
                            type='button'
                            className='guests-modal-btn'
                            onClick={() => {
                              setSelectedGuests((prevState) => ({
                                ...prevState,
                                pets: prevState.pets - 1,
                              }));
                            }}
                            disabled={selectedGuests.pets === 0}
                          >
                            <AiOutlineMinus />
                          </button>
                          <span className='guests-modal-count'>{selectedGuests.pets}</span>
                          <button
                            type='button'
                            className='guests-modal-btn'
                            onClick={() => {
                              setSelectedGuests((prevState) => ({
                                ...prevState,
                                pets: prevState.pets + 1,
                              }));
                            }}
                            disabled={selectedGuests.pets === 5}
                          >
                            <AiOutlinePlus />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <BrandedBtn
                  onClick={() => console.log('clicked')}
                  txt={isActive !== null ? 'Search' : ''}
                  icon={
                    // <IoSearch className='search-icon' />
                    <div
                      className='search-icon'
                      style={{
                        marginInlineEnd: isActive !== null ? '4px' : '0px',
                      }}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 32 32'
                        aria-hidden='true'
                        role='presentation'
                        focusable='false'
                      >
                        <path
                          fill='none'
                          d='M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9'
                        ></path>
                      </svg>
                    </div>
                  }
                  borderRadius={isActive !== null ? '32px' : '50%'}
                  width={isActive !== null ? '100px' : '48px'}
                  isActive={isActive !== null}
                />
              </article>
            </form>
          </div>
        )}
        <div className={`explore-bar-backdrop ${isExpanded ? 'show' : ''}`}></div>
      </React.Fragment>

      {isMobile && (
        <React.Fragment>
          <div className='explore-bar-mobile flex'>
            <div className='ebm-container flex'>
              <div
                className='ebm-search-bar flex'
                onClick={() => {
                  handleMobileExplore();
                }}
              >
                <div className='ebm-search-logo'>
                  <CgSearch />
                </div>
                <div className='ebm-search-text'>
                  <div className='ebm-search-location'>
                    <span>{formData.location ? formData.location : 'Anywhere'}</span>
                  </div>
                  <div className='ebm-search-dates'>
                    {selectedRange.from && selectedRange.to ? (
                      <span>
                        {utilService.getDayAndMonthFromDate(selectedRange.from, selectedRange.to)}
                      </span>
                    ) : (
                      <span>Any week</span>
                    )}
                    <span className='dot'>•</span>
                    {selectedGuests.adults + selectedGuests.children !== 0 ? (
                      <span>
                        {selectedGuests.adults + selectedGuests.children}{' '}
                        {selectedGuests.adults + selectedGuests.children === 1 ? 'guest' : 'guests'}{' '}
                        {selectedGuests.infants > 0
                          ? `, ${selectedGuests.infants} ${
                              selectedGuests.infants === 1 ? 'infant' : 'infants'
                            }`
                          : ''}
                      </span>
                    ) : (
                      <span>Add guests</span>
                    )}
                  </div>
                </div>
              </div>
              <div className='ebm-filter-btn flex' onClick={() => handleFilterModal('open')}>
                <svg xmlns='http://www.w3.org/2000/svg'>
                  <path d='M5 8a3 3 0 0 1 2.83 2H14v2H7.83A3 3 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.83 4H2V4h6.17A3 3 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z'></path>
                </svg>
              </div>
            </div>
            <section className={`ebm-modal ${mobileExploreBar ? 'show' : ''}`}>
              <React.Fragment>
                <button className='ebm-modal-close' onClick={handleMobileExplore}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 32 32'
                    aria-hidden='true'
                    role='presentation'
                    focusable='false'
                  >
                    <path d='m6 6 20 20M26 6 6 26'></path>
                  </svg>
                </button>
                <div className='ebm-modal-container'>
                  {!whereCollapsed ? (
                    <div className='where-container'>
                      <div className='where-header'>
                        <h2>Where to?</h2>
                      </div>

                      <div className='where-input' onClick={(ev) => ev.stopPropagation()}>
                        <label htmlFor='location'>
                          <div className='label-container'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 32 32'
                              aria-hidden='true'
                              role='presentation'
                              focusable='false'
                            >
                              <path
                                fill='none'
                                d='M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9'
                              ></path>
                            </svg>
                            <input
                              type='text'
                              placeholder='Anywhere'
                              value={formData.location}
                              onChange={handleChange}
                              name='location'
                              id='location'
                            />
                          </div>
                        </label>
                      </div>
                      <div className='where-suggestions'>
                        <div className='suggestions-region-list'>
                          <button
                            className='region-item'
                            onClick={(ev) => (handleLocationClick(ev), handleCollapse('when')(ev))}
                          >
                            <img
                              src='https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg'
                              className={`region-img ${
                                formData.location === "I'm flexible" ? 'active' : ''
                              }`}
                            />
                            <span className='region-text'>I'm flexible</span>
                          </button>
                          <button
                            className='region-item'
                            onClick={(ev) => (handleLocationClick(ev), handleCollapse('when')(ev))}
                          >
                            <img
                              src='https://a0.muscache.com/im/pictures/66355b01-4695-4db9-b292-c149c46fb1ca.jpg?im_w=320'
                              className={`region-img ${
                                formData.location === 'Middle East' ? 'active' : ''
                              }`}
                            />
                            <span className='where-suggestions-region-text'>Middle East</span>
                          </button>
                          <button
                            className='region-item'
                            onClick={(ev) => (handleLocationClick(ev), handleCollapse('when')(ev))}
                          >
                            <img
                              src='https://a0.muscache.com/im/pictures/ea5598d7-2b07-4ed7-84da-d1eabd9f2714.jpg?im_w=320'
                              className={`region-img ${
                                formData.location === 'Italy' ? 'active' : ''
                              }`}
                            />
                            <span className='where-suggestions-region-text'>Italy</span>
                          </button>
                          <button
                            className='region-item'
                            onClick={(ev) => (handleLocationClick(ev), handleCollapse('when')(ev))}
                          >
                            <img
                              src='https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320'
                              className={`region-img ${
                                formData.location === 'United States' ? 'active' : ''
                              }`}
                            />
                            <span className='where-suggestions-region-text'>United States</span>
                          </button>
                          <button
                            className='region-item'
                            onClick={(ev) => (handleLocationClick(ev), handleCollapse('when')(ev))}
                          >
                            <img
                              src='https://a0.muscache.com/im/pictures/f0ece7c0-d9b2-49d5-bb83-64173d29cbe3.jpg?im_w=320'
                              className={`region-img ${
                                formData.location === 'France' ? 'active' : ''
                              }`}
                            />
                            <span className='region-text'>France</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='where-container collapsed' onClick={handleCollapse('where')}>
                      <div className='where-title'>
                        <span>Where</span>
                      </div>
                      <div className='where-input'>
                        <span>
                          {formData.location ? formData.location.split(',')[0] : 'Anywhere'}
                        </span>
                      </div>
                    </div>
                  )}

                  {!whenCollapsed ? (
                    <div
                      className='when-container'
                      // onClick={handleCollapse("guests")}
                    >
                      <div className='when-header'>
                        <h2>When's your trip?</h2>
                      </div>
                      <div className='dates-modal' onClick={(ev) => ev.stopPropagation()}>
                        <DayPicker
                          mode='range'
                          numberOfMonths={2}
                          selected={selectedRange}
                          onDayClick={handleDayClick}
                          modifiers={{ disabled: [{ before: new Date() }] }}
                        />
                        <div className='dates-modal-footer'>
                          <button
                            className='dates-modal-footer-btn clear'
                            onClick={() => {
                              setSelectedRange({
                                from: null,
                                to: null,
                              });
                              setIsActive(null);
                            }}
                          >
                            Reset
                          </button>
                          <button
                            className='dates-modal-footer-btn next'
                            onClick={handleCollapse('guests')}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='when-container collapsed' onClick={handleCollapse('when')}>
                      <div className='when-title'>
                        <span>When</span>
                      </div>
                      <div className='when-input'>
                        <span>
                          {selectedRange.from && selectedRange.to ? (
                            <span>
                              {utilService.getDayAndMonthFromDate(
                                selectedRange.from,
                                selectedRange.to
                              )}
                            </span>
                          ) : (
                            <span>Any week</span>
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                  {!guestsCollapsed ? (
                    <div className='guests-container' onClick={handleCollapse('where')}>
                      <div className='guests-header'>
                        <h2>Who's coming?</h2>
                      </div>

                      <div className='guests-modal' onClick={(ev) => ev.stopPropagation()}>
                        {/* Adults */}
                        <div className='guests-options' id='adults'>
                          <div className='guests-title'>
                            <h3 className='guests-modal-title'>Adults</h3>
                            <span className='guests-modal-subtitle'>Ages 13 or above</span>
                          </div>
                          <div className='guests-action flex'>
                            <button
                              disabled={
                                selectedGuests.children || selectedGuests.infants
                                  ? selectedGuests.adults === 1
                                  : selectedGuests.adults === 0
                              }
                              type='button'
                              className='guests-modal-btn'
                              onClick={() => {
                                if (selectedGuests.adults > 0)
                                  setSelectedGuests((prevState) => ({
                                    ...prevState,
                                    adults: prevState.adults - 1,
                                  }));
                              }}
                            >
                              <AiOutlineMinus />
                            </button>
                            <span className='guests-modal-count'>{selectedGuests.adults}</span>
                            <button
                              type='button'
                              className='guests-modal-btn'
                              onClick={() => {
                                setSelectedGuests((prevState) => ({
                                  ...prevState,
                                  adults: prevState.adults + 1,
                                }));
                              }}
                              disabled={selectedGuests.adults === 16}
                            >
                              <AiOutlinePlus />
                            </button>
                          </div>
                        </div>

                        {/* Children */}
                        <div className='guests-options' id='children'>
                          <div className='guests-title'>
                            <h3 className='guests-modal-title'>Children</h3>
                            <span className='guests-modal-subtitle'>Ages 2-12</span>
                          </div>
                          <div className='guests-action flex'>
                            <button
                              disabled={selectedGuests.children === 0}
                              type='button'
                              className='guests-modal-btn'
                              onClick={() => {
                                if (selectedGuests.children > 0)
                                  setSelectedGuests((prevState) => ({
                                    ...prevState,
                                    children: prevState.children - 1,
                                  }));
                              }}
                            >
                              <AiOutlineMinus />
                            </button>
                            <span className='guests-modal-count'>{selectedGuests.children}</span>
                            <button
                              type='button'
                              className='guests-modal-btn'
                              onClick={() => {
                                if (!selectedGuests.adults) {
                                  setSelectedGuests((prevState) => ({
                                    ...prevState,
                                    adults: prevState.adults + 1,
                                    children: prevState.children + 1,
                                  }));
                                  return;
                                }
                                setSelectedGuests((prevState) => ({
                                  ...prevState,
                                  children: prevState.children + 1,
                                }));
                              }}
                              disabled={selectedGuests.children === 15}
                            >
                              <AiOutlinePlus />
                            </button>
                          </div>
                        </div>

                        {/* Infants */}
                        <div className='guests-options' id='infants'>
                          <div className='guests-title'>
                            <h3 className='guests-modal-title'>Infants</h3>
                            <span className='guests-modal-subtitle'>Under 2</span>
                          </div>
                          <div className='guests-action flex'>
                            <button
                              disabled={selectedGuests.infants === 0}
                              type='button'
                              className='guests-modal-btn'
                              onClick={() => {
                                if (selectedGuests.infants > 0)
                                  setSelectedGuests((prevState) => ({
                                    ...prevState,
                                    infants: prevState.infants - 1,
                                  }));
                              }}
                            >
                              <AiOutlineMinus />
                            </button>
                            <span className='guests-modal-count'>{selectedGuests.infants}</span>
                            <button
                              type='button'
                              className='guests-modal-btn'
                              onClick={() => {
                                if (!selectedGuests.adults) {
                                  setSelectedGuests((prevState) => ({
                                    ...prevState,
                                    adults: prevState.adults + 1,
                                    infants: prevState.infants + 1,
                                  }));
                                  return;
                                }
                                setSelectedGuests((prevState) => ({
                                  ...prevState,
                                  infants: prevState.infants + 1,
                                }));
                              }}
                              disabled={selectedGuests.infants === 5}
                            >
                              <AiOutlinePlus />
                            </button>
                          </div>
                        </div>

                        {/* PETS */}
                        <div className='guests-options' id='pets'>
                          <div className='guests-title'>
                            <h3 className='guests-modal-title'>Pets</h3>
                            <span className='guests-modal-subtitle'>
                              <a href='#'>Bringing a service animal?</a>
                            </span>
                          </div>
                          <div className='guests-action flex'>
                            <button
                              type='button'
                              className='guests-modal-btn'
                              onClick={() => {
                                setSelectedGuests((prevState) => ({
                                  ...prevState,
                                  pets: prevState.pets - 1,
                                }));
                              }}
                              disabled={selectedGuests.pets === 0}
                            >
                              <AiOutlineMinus />
                            </button>
                            <span className='guests-modal-count'>{selectedGuests.pets}</span>
                            <button
                              type='button'
                              className='guests-modal-btn'
                              onClick={() => {
                                setSelectedGuests((prevState) => ({
                                  ...prevState,
                                  pets: prevState.pets + 1,
                                }));
                              }}
                              disabled={selectedGuests.pets === 5}
                            >
                              <AiOutlinePlus />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='guests-container collapsed' onClick={handleCollapse('guests')}>
                      <div className='guests-title'>
                        <span>Guests</span>
                      </div>
                      <div className='guests-input'>
                        <span>
                          {totalGuests === 0
                            ? 'Add guests'
                            : `${selectedGuests.adults + selectedGuests.children} ${
                                selectedGuests.adults + selectedGuests.children === 1
                                  ? 'guest'
                                  : 'guests'
                              }${
                                selectedGuests.infants > 0
                                  ? `, ${selectedGuests.infants} ${
                                      selectedGuests.infants === 1 ? 'infant' : 'infants'
                                    }`
                                  : ''
                              }`}
                        </span>
                      </div>
                    </div>
                  )}
                  <div
                    className='ebm-modal-footer'
                    style={mobileExploreBar ? { bottom: '0px' } : { bottom: '-80px' }}
                  >
                    <button
                      className='ebm-modal-footer-btn clear'
                      onClick={() => {
                        setSelectedRange({
                          from: null,
                          to: null,
                        });
                        setIsActive(null);
                        setSelectedGuests({
                          adults: 0,
                          children: 0,
                          infants: 0,
                          pets: 0,
                        });

                        setFormData({
                          location: '',
                        });
                      }}
                    >
                      Clear all
                    </button>
                    <div onClick={handleSubmit}>
                      <BrandedBtn txt='Search' width={120} />
                    </div>
                  </div>
                </div>
              </React.Fragment>
            </section>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
