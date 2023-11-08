import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { geocodeByAddress } from "react-google-places-autocomplete";

export function StayMapIndex({ stays }) {
  const [tinyModal, setTinyModal] = useState(false);
  const [selectedStay, setSelectedStay] = useState(null);
  const [locationFromUrl, setLocationFromUrl] = useState(null); // [lat, lng
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const region = urlParams.get("region");

  async function getPlaceDetails(placeAddress) {
    try {
      const location = await geocodeByAddress(placeAddress);
      const lat = location[0].geometry.location.lat();
      const lng = location[0].geometry.location.lng();
      setLocationFromUrl([lat, lng]);
      console.log('locationFromUrl', locationFromUrl);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (region) {
      const regionLocation = region.split(",");
      getPlaceDetails(regionLocation[0]);
    }
  }, [region]);

  useEffect(() => {
    const closeModal = (ev) => {
      if (ev.target.classList.contains("tiny-modal")) {
        setTinyModal(null);
      }
    };
    window.addEventListener("click", closeModal);
    return () => {
      window.removeEventListener("click", closeModal);
    };
  }, [tinyModal]);

  function handleClick(id) {
    const stay = stays.find((stay) => stay._id === id);
    setSelectedStay(stay);
    setTinyModal(!tinyModal);
  }

  useEffect(() => {
    if (locationFromUrl) {
      const center = {
        lat: locationFromUrl[0],
        lng: locationFromUrl[1],
      };
      console.log('center', center);
    }
  }, [locationFromUrl]);

  const center = locationFromUrl || {
    lat: 32.0853,
    lng: 34.7818,
  };

  const zoom = locationFromUrl ? 12 : 11;

  const Marker = ({ id, price }) => {
    return (
      <div className="price-label">
        <div className="marker-icon" onClick={() => handleClick(id)}>
          ${price}
        </div>
      </div>
    );
  };

  const markers = stays.map((stay) => {
    return (
      <Marker
        key={stay._id}
        lat={stay.loc.lat}
        lng={stay.loc.lng}
        text={stay.name}
        id={stay._id}
        price={stay.price}
      />
    );
  });

  return (
    <div className="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCF6YSAF__0aiqIrTE2ZClywS74stbpWuE" }}
        defaultCenter={center}
        center={center}
        defaultZoom={zoom}
        zoom={zoom}
      >
        {markers}

        {tinyModal && selectedStay && (
          <div className="tiny-modal">
            <div className="tiny-modal-content">
              <div className="tiny-modal-header">
                <img src={selectedStay.imgUrls[0]} alt="stay" />
                <button onClick={() => setTinyModal(null)}>&times;</button>
              </div>
              <div
                className="tiny-modal-body"
                onClick={() => navigate(`/stay/${selectedStay._id}`)}
              >
                <div className="tiny-modal-title">
                  {selectedStay.loc.city}, {selectedStay.loc.country}
                </div>
                <div className="tiny-modal-subtitle">
                  ${selectedStay.price}
                  <span className="per-night"> night · </span>
                  <span className="dates">Nov 10-15</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </GoogleMapReact>
    </div>
  );
}
