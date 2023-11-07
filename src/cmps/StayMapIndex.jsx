import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

import { FaMapMarkerAlt } from "react-icons/fa";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router-dom";


export function StayMapIndex({ stays }) {
  const [tinyModal, setTinyModal] = useState(false);
  const [selectedStay, setSelectedStay] = useState(null);
  const navigate = useNavigate();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  // Get the value of the "region" parameter
  const region = urlParams.get("region");

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
    const region = urlParams.get("region");

    if (region) {
      // If the "region" parameter is present, fetch its coordinates using the Google Places API.
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${region}&key=AIzaSyCF6YSAF__0aiqIrTE2ZClywS74stbpWuE`;
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          const location = res.results[0].geometry.location;
          const center = {
            lat: location.lat,
            lng: location.lng,
          };
        });
    }
  }
  , [urlParams]);

  const center = {
    lat: 31.046051,
    lng: 34.851612,
  };

  const zoom = 8;

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
        defaultZoom={zoom}
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
