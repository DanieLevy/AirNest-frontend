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
      style={{
        display: "grid",
        gridTemplateColumns: "repeat( auto-fit, minmax(320px, 1fr) )",
        gap: "0.6rem",
      }}
    >
      {amenities.map((ament, i) => (
        <label
          key={ament}
          style={{
            userSelect: "none",
            padding: "8px 16px",
            // background: selectedAmenities[i] ? '#FF385C' : '#ebebeb80',
            border: `${
              selectedAmenities[i] ? "2px solid black" : "2px solid #ebebeb80"
            }`,
            // flex: '1 1 320px',
            backgroundColor: selectedAmenities[i] ? "#F7F7F7" : "",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "0.3125rem",
            cursor: "pointer",
            fontSize: "0.85rem",
            fontWeight: "bold",
            // color: selectedAmenities[i] ? 'white' : '',
            // fill: selectedAmenities[i] ? 'white' : '',
            // fill: selectedAmenities[i] ? "#FF385C" : "",
          }}
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
          {
            <svg width="32" height="32" stroke="">
              {amenitiesData[ament].svg}
            </svg>
          }
          {amenitiesData[ament].title}
        </label>
      ))}
    </section>
  );
}
// return (
//     (<section>
//         {amenities.map((ament, index) =>
//             <div key={ament}>
//                 <input onChange={() => handleInputChange(index)} name={ament} type="checkbox" id={ament} checked={selectedAmenities[index]} />
//                 <label htmlFor={ament}>{ament}</label>
//             </div>)
//         }
//     </section >)
// );
