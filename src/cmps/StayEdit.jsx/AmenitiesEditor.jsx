import { useState, useEffect } from "react";
import { stayService } from "../../services/stay.service.local";


export function AmenitiesEditor({ stay, onAmenitiesChange }) {

    const [selectedAmenities, setSelectedAmenities] = useState([])
    const [amenities, setAmenities] = useState(null)

    useEffect(() => {
        const amenities = stayService.getAmenities()
        setAmenities(amenities)
        if (stay._id) {
            const stayAmenities = stay.amenities
            setSelectedAmenities(amenities.map((ament) => stayAmenities.includes(ament)))
        } else {
            setSelectedAmenities(amenities.map(() => false))
        }
    }, [])

    const handleInputChange = (index) => {
        const copy = selectedAmenities.slice()
        copy[index] = !copy[index]
        setSelectedAmenities(copy)
        const names = amenities.filter((_, i) => copy[i])
        onAmenitiesChange(names)
    };

    if (!amenities) return
    return (
        (<section>
            {amenities.map((ament, index) =>
                <div key={ament}>
                    <input onChange={() => handleInputChange(index)} name={ament} type="checkbox" id={ament} checked={selectedAmenities[index]} />
                    <label htmlFor={ament}>{ament}</label>
                </div>)
            }
        </section >)
    );
}