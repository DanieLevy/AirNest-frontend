import { useState, useEffect } from "react";
import { stayService } from "../../services/stay.service.local";
import { amenitiesData } from "../StayDetails/amenities";

export function AmenitiesEditor({ stay, onAmenitiesChange }) {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [amenities, setAmenities] = useState(null);

  useEffect(() => {
    const amenities = stayService.getAmenities();
    setAmenities(amenities);

    if (stay._id) {
      const stayAmenities = stay.amenities.map((ament) => ament.toLowerCase());
      setSelectedAmenities(
        amenities.map((ament) => stayAmenities.includes(ament.toLowerCase()))
      );
    } else {
      setSelectedAmenities(amenities.map(() => false));
    }
  }, []);

  const handleInputChange = (index) => {
    const copy = selectedAmenities.slice();
    copy[index] = !copy[index];
    setSelectedAmenities(copy);
    const names = amenities.filter((_, i) => copy[i]);
    onAmenitiesChange(names);
  };


  if (!amenities) return;
  return (
    <section
      className="amenities-editor"
    >
      {amenities.map((ament, i) => (
        <label
          key={ament}
          htmlFor={ament}
          className={`amenity ${selectedAmenities[i] ? "selected" : ""}`}
        >
          <input
            style={{
              display: "none",
            }}
            onChange={() => handleInputChange(i)}
            name={ament}
            type="checkbox"
            id={ament}
            checked={selectedAmenities[i]}
          />
          <div className="amenity-logo">
          {
            <svg width="32" height="32" stroke="">
              {amenitiesData[ament].svg}
            </svg>
          }
          </div>
          <div className="amenity-title">{amenitiesData[ament].title}</div>
        </label>
      ))}
    </section>
  );
}