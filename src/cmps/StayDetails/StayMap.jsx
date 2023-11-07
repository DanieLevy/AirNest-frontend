import React from 'react'
import GoogleMapReact from 'google-map-react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { add } from 'date-fns'

export function StayMap({ loc }) {
  const lat = loc.lat ? loc.lat : 32.0853
  const lng = loc.lng ? loc.lng : 34.7818

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [mapCenter, setMapCenter] = useState({ lat, lng })

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const center = {
    lat,
    lng,
  }
  const zoom = 11

  const Marker = () => {
    return (
      <div className='marker'>
        <div className='marker-container'>
          <div className='marker-icon'></div>
          <div className='marker-tooltip'></div>
          <svg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' className='house'>
            <path d='m8.94959955 1.13115419 5.71719515 4.68049298c.2120231.18970472.3332053.46073893.3332053.74524138v7.94311145c0 .2761424-.2238576.5-.5.5h-4.5v-5.5c0-.24545989-.17687516-.44960837-.41012437-.49194433l-.08987563-.00805567h-3c-.27614237 0-.5.22385763-.5.5v5.5h-4.5c-.27614237 0-.5-.2238576-.5-.5v-7.95162536c0-.28450241.12118221-.55553661.3502077-.75978249l5.70008742-4.65820288c.55265671-.45163993 1.34701168-.45132001 1.89930443.00076492z'></path>
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div className={isMobile ? 'main-layout small details-map' : 'details-map'}>
      <h4 className='map-title'>Where you'll be</h4>
      <div className='map-location'>
        {loc.address}
        {/* {loc.street}, {loc.streetNum} {loc.city} */}
      </div>
      <div className='map-container'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCF6YSAF__0aiqIrTE2ZClywS74stbpWuE' }}
          center={center}
          defaultZoom={zoom}
        >
          <Marker lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>
    </div>
  )
}
