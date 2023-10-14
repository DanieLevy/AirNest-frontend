import React from "react"
import GoogleMapReact from "google-map-react"
import { FaMapMarkerAlt } from "react-icons/fa"
import { useEffect, useState } from "react"

export function StayMap({ loc }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }

  }, [])

    console.log('🚀 ~ file: StayMap.jsx:1 ~ StayMap ~ loc', loc);
  const center = {
    lat: loc.lat,
    lng: loc.lng,
  }
  const zoom = 11

  const Marker = () => {
    return (
      <div className="marker">
        <div className="marker-container">
          <div className="marker-icon">
            {/* Add content for marker icon */}
          </div>
          <div className="marker-tooltip">
            {/* Add content for marker tooltip */}
          </div>
          <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="house"><path d="m8.94959955 1.13115419 5.71719515 4.68049298c.2120231.18970472.3332053.46073893.3332053.74524138v7.94311145c0 .2761424-.2238576.5-.5.5h-4.5v-5.5c0-.24545989-.17687516-.44960837-.41012437-.49194433l-.08987563-.00805567h-3c-.27614237 0-.5.22385763-.5.5v5.5h-4.5c-.27614237 0-.5-.2238576-.5-.5v-7.95162536c0-.28450241.12118221-.55553661.3502077-.75978249l5.70008742-4.65820288c.55265671-.45163993 1.34701168-.45132001 1.89930443.00076492z"></path></svg>
        </div>
      </div>
    );
  };
  



  return (
    <div className={isMobile ? "main-layout small details-map" : "details-map"}>
        <h4 className="map-title">Where you'll be</h4>
    <div className="map-location">
        {loc.address}, {loc.city}, {loc.country}
    </div>
    <div className="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCF6YSAF__0aiqIrTE2ZClywS74stbpWuE" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <Marker lat={loc.lat} lng={loc.lng} />
      </GoogleMapReact>
    </div>
    </div>
  )
}
