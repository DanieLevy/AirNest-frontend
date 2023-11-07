import { StayMap } from '../StayDetails/StayMap';
import { AmenitiesEditor } from './AmenitiesEditor';
import { Component } from './GooglePlaceAutoComplete';
import { ImagesEditor } from './ImagesEditor';
import MultiSelectLabels from './MultiSelectLabels';
import { PropertyEditor } from './PropertyEditor';
import { GiBunkBeds } from 'react-icons/gi';
import { BrandedBtn } from '../BrandedBtn';
import { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { is } from 'date-fns/locale';
import { showErrorMsg } from '../../services/event-bus.service';
import { useNavigate } from 'react-router';

export function FormEditor({
  stay,
  handleInputChange,
  handleSubmit,
  onUrlsChange,
  onAmenitiesChange,
  setLabels,
  setLocation,
  onPropertyChange,
}) {
  const navigate = useNavigate();
  const {
    name,
    propertyType,
    imgUrls,
    labels,
    amenities,
    capacity,
    bedrooms,
    beds,
    bathrooms,
    summary,
    price,
  } = stay;

  const [pageIdx, setPageIdx] = useState(0);
  const [propertyTypeEle, setPropertyTypeEle] = useState(stay.roomType);
  const stayId = stay._id;

  useEffect(() => {
    if (stay._id) {
      setPropertyTypeEle(stay.roomType);
    }
  }, [stay._id]);

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const pages = [
    'Page1',
    'Page2',
    'Page3',
    'Page4',
    'Page5',
    'Page6',
    'Page7',
    'Page8',
    'Page9',
    'Page10',
    'Page11',
    'Page12',
    'Page13',
  ];

  function isValidPropertyType(propertyType) {
    const validTypes = ['apartment', 'guesthouse', 'hotel', 'house'];

    if (!validTypes.includes(propertyType)) {
      return true;
    }
    return false;
  }

  function isNextBtnDisabled() {
    switch (pageIdx) {
      case 0:
        return false;
      case 1:
        return !propertyTypeEle;
      case 2:
        return isValidPropertyType(propertyType);
      case 3:
        return !stay.loc.country || !stay.loc.city ;
      case 4:
        return !capacity || !beds;
      case 5:
        return false;
      case 6:
        return !amenities.length;
      case 7:
        return !imgUrls.length || !imgUrls[0];
      case 8:
        return !name;
      case 9:
        return !summary;
      default:
        return false;
    }
  }

  return (
    <section className='stay-edit main-layout'>
      <header className='stay-edit-header'>
        <div className='header-container'>
          <div className='header-icon'>
            <svg
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/')}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 32 32'
              aria-hidden='true'
              role='presentation'
              focusable='false'
            >
              <path d='M16 1c2 0 3.46.96 4.75 3.27l.53 1.02a424.58 424.58 0 0 1 7.1 14.84l.15.35c.67 1.6.9 2.48.96 3.4v.41l.01.23c0 4.06-2.88 6.48-6.36 6.48-2.22 0-4.55-1.26-6.7-3.39l-.26-.26-.17-.17h-.02l-.17.18c-2.05 2.1-4.27 3.42-6.42 3.62l-.28.01-.26.01c-3.48 0-6.36-2.42-6.36-6.48v-.47c.03-.93.23-1.77.83-3.24l.22-.53c.97-2.3 6.08-12.98 7.7-16.03C12.55 1.96 14 1 16 1zm0 2c-1.24 0-2.05.54-2.99 2.21l-.52 1a422.57 422.57 0 0 0-7.03 14.7l-.35.84a6.86 6.86 0 0 0-.6 2.24l-.01.33v.2C4.5 27.4 6.41 29 8.86 29c1.77 0 3.87-1.24 5.83-3.35-2.3-2.94-3.86-6.45-3.86-8.91 0-2.92 1.94-5.39 5.18-5.42 3.22.03 5.16 2.5 5.16 5.42 0 2.45-1.56 5.96-3.86 8.9 1.97 2.13 4.06 3.36 5.83 3.36 2.45 0 4.36-1.6 4.36-4.48v-.4a7.07 7.07 0 0 0-.72-2.63l-.25-.6C25.47 18.41 20.54 8.12 19 5.23 18.05 3.53 17.24 3 16 3zm.01 10.32c-2.01.02-3.18 1.51-3.18 3.42 0 1.8 1.18 4.58 2.96 7.04l.2.29.18-.24c1.73-2.38 2.9-5.06 3-6.87v-.22c0-1.9-1.17-3.4-3.16-3.42z'></path>
            </svg>
          </div>
          <div className='header-btns'>
            <button
              className='header-btn'
              onClick={(ev) => {
                ev.preventDefault();
                stayId === '' ? navigate('/') : handleSubmit(ev);
              }}
            >
              {stayId === '' ? 'Exit without saving' : 'Save & exit'}
            </button>
          </div>
        </div>
      </header>
      <div className='stay-edit-container'>
        <form onSubmit={handleSubmit} className='stay-edit-form'>
          <section className={`step-1 ${pageIdx === 0 ? 'selected' : ''}`}>
            <div className='text'>
              <div className='title'>
                <span>Step 1</span>
              </div>
              <div className='subtitle'>
                <span>Tell us about your place</span>
              </div>
              <div className='description'>
                <span>
                  In this step, we'll ask you which type of property you have and if guests will
                  book the entire place or just a room. Then let us know the location and how many
                  guests can stay.
                </span>
              </div>
            </div>
            <div className='video-container'>
              <video
                src='https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high'
                autoPlay
                muted
                playsInline
                className='video'
              ></video>
            </div>
          </section>

          <section className={`step-2 ${pageIdx === 1 ? 'selected' : ''}`}>
            <div className='text'>
              <span>What type of place will guests have?</span>
            </div>
            <div className='property-type'>
              <div
                className={`property-type-btn ${
                  propertyTypeEle === 'An Entire place' || propertyTypeEle === 'Entire home/apt'
                    ? 'selected'
                    : ''
                }`}
                onClick={(ev) => {
                  onPropertyChange({
                    target: {
                      name: 'roomType',
                      value: 'An Entire place',
                    },
                  });
                  setPropertyTypeEle('An Entire place');
                  // setPageIdx(pageIdx + 1);
                }}
              >
                <div className='property-type-text'>
                  <span className='title'>An Entire place</span>
                  <span className='subtitle'>
                    Guests have the whole place to themselves. This usually includes a bedroom, a
                    bathroom, and a kitchen.
                  </span>
                </div>
                <div className='property-type-icon'>
                  <img src='https://svgshare.com/i/zC6.svg' alt='' />
                </div>
              </div>
              <div
                className={`property-type-btn ${
                  propertyTypeEle === 'A Private room' || propertyTypeEle === 'Private room'
                    ? 'selected'
                    : ''
                }`}
                onClick={(ev) => {
                  onPropertyChange({
                    target: {
                      name: 'roomType',
                      value: 'A Private room',
                    },
                  });
                  setPropertyTypeEle('A Private room');
                  // setPageIdx(pageIdx + 1);
                }}
              >
                <div className='property-type-text'>
                  <span className='title'>A room</span>
                  <span className='subtitle'>
                    Guests have their own private room for sleeping. Other areas could be shared.
                  </span>
                </div>
                <div className='property-type-icon'>
                  <img src='https://svgshare.com/i/zBn.svg' alt='' />
                </div>
              </div>
              <div
                className={`property-type-btn ${
                  propertyTypeEle === 'A Shared room' ? 'selected' : ''
                }`}
                onClick={() => {
                  onPropertyChange({
                    target: {
                      name: 'roomType',
                      value: 'A Shared room',
                    },
                  });
                  setPropertyTypeEle('A Shared room');
                  // setPageIdx(pageIdx + 1);
                }}
              >
                <div className='property-type-text'>
                  <span className='title'>A Shared room</span>
                  <span className='subtitle'>
                    Guests sleep in a bedroom or a common area that could be shared with others.
                  </span>
                </div>
                <div className='property-type-icon'>
                  <img src='https://svgshare.com/i/zBw.svg' alt='' />
                </div>
              </div>
            </div>
          </section>

          <section className={`step-3 ${pageIdx === 2 ? 'selected' : ''}`}>
            <div className='text'>
              <span>Which of these best describes your place?</span>
            </div>
            <PropertyEditor selectProperty={propertyType} onPropertyChange={onPropertyChange} />
          </section>

          <section className={`step-4 ${pageIdx === 3 ? 'selected' : ''}`}>
            <div className='text'>
              <span>Where's your place located?</span>
              <span className='subtitle'>
                Your address is only shared with guests after they’ve made a reservation.
              </span>
            </div>

            <article className='location'>
              <Component setLocation={setLocation} stayLocation={stay.loc} />

              <StayMap loc={stay.loc} />
            </article>
          </section>

          <section className={`step-5 ${pageIdx === 4 ? 'selected' : ''}`}>
            <div className='text'>
              <div className='title'>Let's start with the basics</div>
              <div className='subtitle'>
                <span>How many guests can your place accommodate?</span>
              </div>
            </div>
            <div className='basic-section'>
              <span>Guests</span>
              <div className='section-btns'>
                <button
                  type='button'
                  disabled={capacity === 1}
                  className='prev-btn'
                  onClick={() => {
                    handleInputChange({
                      target: {
                        name: 'capacity',
                        value: capacity - 1,
                      },
                    });
                  }}
                >
                  <AiOutlineMinus />
                </button>
                <span>{capacity}</span>
                <button
                  disabled={capacity === 16}
                  className='next-btn'
                  type='button'
                  onClick={() => {
                    handleInputChange({
                      target: {
                        name: 'capacity',
                        value: capacity + 1,
                      },
                    });
                  }}
                >
                  <AiOutlinePlus />
                </button>
              </div>
            </div>

            <div className='basic-section'>
              <span>Bedrooms</span>
              <div className='section-btns'>
                <button
                  className='prev-btn'
                  type='button'
                  disabled={bedrooms === 0}
                  onClick={() => {
                    handleInputChange({
                      target: {
                        name: 'bedrooms',
                        value: bedrooms - 1,
                      },
                    });
                  }}
                >
                  <AiOutlineMinus />
                </button>
                <span>{bedrooms}</span>
                <button
                  disabled={bedrooms === 16}
                  className='next-btn'
                  type='button'
                  onClick={() => {
                    handleInputChange({
                      target: {
                        name: 'bedrooms',
                        value: bedrooms + 1,
                      },
                    });
                  }}
                >
                  <AiOutlinePlus />
                </button>
              </div>
            </div>

            <div className='basic-section'>
              <span>Beds</span>
              <div className='section-btns'>
                <button
                  className='prev-btn'
                  disabled={beds === 1}
                  type='button'
                  onClick={() => {
                    handleInputChange({
                      target: {
                        name: 'beds',
                        value: beds - 1,
                      },
                    });
                  }}
                >
                  <AiOutlineMinus />
                </button>
                <span>{beds}</span>
                <button
                  className='next-btn'
                  disabled={beds === 16}
                  type='button'
                  onClick={() => {
                    handleInputChange({
                      target: {
                        name: 'beds',
                        value: beds + 1,
                      },
                    });
                  }}
                >
                  <AiOutlinePlus />
                </button>
              </div>
            </div>

            <div className='basic-section'>
              <span>Bathrooms</span>
              <div className='section-btns'>
                <button
                  disabled={bathrooms === 0}
                  className='prev-btn'
                  type='button'
                  onClick={() => {
                    handleInputChange({
                      target: {
                        name: 'bathrooms',
                        value: bathrooms - 1,
                      },
                    });
                  }}
                >
                  <AiOutlineMinus />
                </button>
                <span>{bathrooms}</span>
                <button
                  className='next-btn'
                  disabled={bathrooms === 16}
                  type='button'
                  onClick={() => {
                    handleInputChange({
                      target: {
                        name: 'bathrooms',
                        value: bathrooms + 1,
                      },
                    });
                  }}
                >
                  <AiOutlinePlus />
                </button>
              </div>
            </div>
          </section>

          <section className={`step-6 ${pageIdx === 5 ? 'selected' : ''}`}>
            <div className='text'>
              <div className='title'>
                <span>Step 2</span>
              </div>
              <div className='subtitle'>
                <span>Make your place stand out</span>
              </div>
              <div className='description'>
                <span>
                  In this step, you’ll add some of the amenities your place offers, plus 5 or more
                  photos. Then, you’ll create a title and description.
                </span>
              </div>
            </div>
            <div className='video-container'>
              <video
                src='https://stream.media.muscache.com/H0101WTUG2qWbyFhy02jlOggSkpsM9H02VOWN52g02oxhDVM.mp4?v_q=high'
                autoPlay
                muted
                playsInline
                className='video'
              ></video>
            </div>
          </section>

          <section
            className={`step-7 ${pageIdx === 6 ? 'selected' : ''}`}
            onClick={(ev) => {
              ev.stopPropagation();
            }}
          >
            <div className='text'>
              <span className='title'>Tell guests what your place has to offer</span>
              <span className='subtitle'>
                You can add more amenities after you publish your listing.
              </span>
            </div>
            <AmenitiesEditor
              selectedAmenities={stay.amenities}
              onAmenitiesChange={onAmenitiesChange}
            />
          </section>

          <section className={`step-8 ${pageIdx === 7 ? 'selected' : ''}`}>
            <div className='text'>
              <span className='title'>Add photos of your place</span>
              <span className='subtitle'>
                Guests are more likely to book a listing that includes photos. You can add more
                photos after you publish your listing.
              </span>
            </div>
            <ImagesEditor urls={imgUrls} onUrlsChange={onUrlsChange} className='main' />
          </section>

          <section className={`step-9 ${pageIdx === 8 ? 'selected' : ''}`}>
            <div className='text'>
              <span className='title'>Now, let's give your place a title</span>
              <span className='subtitle'>
                Short titles work best. Have fun with it—you can always change it later.
              </span>
            </div>
            <div className='title-input'>
              <input
                type='text'
                name='name'
                value={name}
                onChange={handleInputChange}
                required
                maxLength='32'
              />
              {/* max of 32 chars */}
              <span
                className='char-counter'
                style={{ color: name.length >= 32 ? '#ff5b5b' : '#717171' }}
              >
                {name.length}/32
              </span>
            </div>
          </section>

          <section className={`step-10 ${pageIdx === 9 ? 'selected' : ''}`}>
            <div className='text'>
              <span className='title'>Create your description</span>
              <span className='subtitle'>Share what makes your place special.</span>
            </div>
            <div className='description-input'>
              <textarea
                rows='10'
                cols='70'
                name='summary'
                value={summary}
                onChange={handleInputChange}
                required
                maxLength='500'
              />
              {/* max of 500 chars */}
              <span
                className='char-counter'
                style={{
                  color: summary.length >= 500 ? '#ff5b5b' : '#717171',
                }}
              >
                {summary.length}/500
              </span>
            </div>
          </section>

          <section className={`step-11 ${pageIdx === 10 ? 'selected' : ''}`}>
            <div className='text'>
              <div className='title'>
                <span>Step 3</span>
              </div>
              <div className='subtitle'>
                <span>Finish up and publish</span>
              </div>
              <div className='description'>
                <span>
                  Finally, you’ll choose if you'd like to start with an experienced guest, then
                  you'll set your nightly price. Answer a few quick questions and publish when
                  you're ready.
                </span>
              </div>
            </div>
            <div className='video-container'>
              <video
                src='https://stream.media.muscache.com/KeNKUpa01dRaT5g00SSBV95FqXYkqf01DJdzn01F1aT00vCI.mp4?v_q=high'
                autoPlay
                muted
                playsInline
                className='video'
              ></video>
            </div>
          </section>

          <section className={`step-12 ${pageIdx === 11 ? 'selected' : ''}`}>
            <div className='text'>
              <span className='title'>Now, set your price</span>
              <span className='subtitle'>You can change it anytime.</span>
            </div>
            <div className='price-input'>
              <span className='price-sign' style={{ color: price > 0 ? '#222222' : '#717171' }}>
                $
              </span>
              <input
                style={price > 0 ? { fontSize: '8rem' } : { fontSize: '4rem' }}
                type='number'
                name='price'
                value={price === 0 ? '' : price}
                min='10'
                placeholder='per night'
                onChange={handleInputChange}
                required
              />
              <span
                className='price-per-night'
                style={{
                  color: price > 0 ? '#222222' : '#717171',
                  display: price > 0 ? 'block' : 'none',
                }}
              >
                per night
              </span>
            </div>
          </section>

          <section className={`step-13 ${pageIdx === 12 ? 'selected' : ''}`}>
            <div className='text'>
              <span className='title'>Review your listing</span>
              <span className='subtitle'>
                Here's what we'll show to guests. Make sure everything looks good.
              </span>
            </div>
            <div className='review-container'>
              <div className='review-preview'>
                <div className='review-img'>
                  <img src={imgUrls[0]} alt='' />
                </div>
                <div className='review-info'>
                  <div className='review-title'>
                    <div className='review-title-text'>
                      <span>{name}</span>
                      <span className='review-title-type flex align-center'>
                        New
                        <AiFillStar style={{ color: '#222222' }} />
                      </span>
                    </div>
                  </div>
                  <div className='review-price'>
                    <span>${formatNumberWithCommas(price)}</span>
                    <span className='per-night'>night</span>
                  </div>
                </div>
              </div>
              <div className='whats-next'>
                <h2>What's next?</h2>
                <div className='actions-container'>
                  <div className='action'>
                    <div className='action-icon'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 32 32'
                        aria-hidden='true'
                        role='presentation'
                        focusable='false'
                      >
                        <path d='M25 30H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5h5a5 5 0 0 1 8 0h5a5 5 0 0 1 5 5v18a5 5 0 0 1-5 5zM7 4a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-6.11l-.29-.5a3 3 0 0 0-5.2 0l-.29.5zm17.41 8L23 10.59l-9.5 9.5-4.5-4.5L7.59 17l5.91 5.91zM16 6a1 1 0 1 0-1-1 1 1 0 0 0 1 1z'></path>
                      </svg>
                    </div>
                    <div className='action-text'>
                      <div className='action-title'>
                        <span>Confirm a few details and publish</span>
                      </div>
                      <div className='action-subtitle'>
                        <span>
                          We’ll let you know if you need to verify your identity or register with
                          the local government.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='action'>
                    <div className='action-icon'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 32 32'
                        aria-hidden='true'
                        role='presentation'
                        focusable='false'
                      >
                        <path d='M11.67 0v1.67h8.66V0h2v1.67h6a2 2 0 0 1 2 1.85v16.07a2 2 0 0 1-.46 1.28l-.12.13L21 29.75a2 2 0 0 1-1.24.58H6.67a5 5 0 0 1-5-4.78V3.67a2 2 0 0 1 1.85-2h6.15V0zm16.66 11.67H3.67v13.66a3 3 0 0 0 2.82 3h11.18v-5.66a5 5 0 0 1 4.78-5h5.88zm-.08 8h-5.58a3 3 0 0 0-3 2.82v5.76zm-18.58-16h-6v6h24.66v-6h-6v1.66h-2V3.67h-8.66v1.66h-2z'></path>
                      </svg>
                    </div>
                    <div className='action-text'>
                      <div className='action-title'>
                        <span>Set up your calendar</span>
                      </div>
                      <div className='action-subtitle'>
                        <span>
                          Choose which dates your listing is available. It will be visible 24 hours
                          after you publish.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='action'>
                    <div className='action-icon'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 32 32'
                        aria-hidden='true'
                        role='presentation'
                        focusable='false'
                      >
                        <path d='M20.8 4.8a4.54 4.54 0 0 1 6.57 6.24l-.16.17L9 29.4a2 2 0 0 1-1.24.58L7.6 30H2v-5.59a2 2 0 0 1 .47-1.28l.12-.13zM19 9.4l-15 15V28h3.59l15-15zm6.8-3.2a2.54 2.54 0 0 0-3.46-.13l-.13.13L20.4 8 24 11.59l1.8-1.8c.94-.94.98-2.45.12-3.45z'></path>
                      </svg>{' '}
                    </div>
                    <div className='action-text'>
                      <div className='action-title'>
                        <span>Adjust your settings</span>
                      </div>
                      <div className='action-subtitle'>
                        <span>
                          Set house rules, select a cancellation policy, choose how guests book, and
                          more.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
      <footer className='stay-edit-footer'>
        <div
          className='footer-loader'
          style={pageIdx === pages.length - 1 ? { height: '2px' } : { height: '8px' }}
        >
          <div
            className='loader'
            style={{
              height: pageIdx === pages.length - 1 ? '2px' : '8px',
              width: `${((pageIdx + 1) * 100 - 100) / pages.length}%`,
            }}
          ></div>
        </div>

        <div className='footer-btns'>
          <button
            className='back-btn'
            disabled={pageIdx === 0}
            onClick={() => {
              setPageIdx(pageIdx - 1);
            }}
          >
            Back
          </button>
          {pageIdx === pages.length - 1 ? (
            <div
              className='publish-btn'
              onClick={(ev) => {
                handleSubmit(ev);
              }}
              disabled={isNextBtnDisabled()}
            >
              <BrandedBtn width={150} txt={'Publish'} />
            </div>
          ) : (
            <button
              className='next-btn'
              onClick={() => {
                setPageIdx(pageIdx + 1);
              }}
              disabled={isNextBtnDisabled()}
            >
              Next
            </button>
          )}
        </div>
      </footer>
    </section>
  );
}
