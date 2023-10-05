import { useState, useEffect } from "react";
import { stayService } from "../../services/stay.service.local";


export function AmenitiesEditor({ stay, setStay }) {

    const [selectedAmenities, setSelectedAmenities] = useState([])
    const [amenities, setAmenities] = useState(null)

    useEffect(() => {
        const services = stayService.getAmenities()
        setAmenities(services)
        if (stay._id) {
        } else {
            setSelectedAmenities(services.map(() => false))
        }
    }, [])

    const handleInputChange = (index) => {
        const copy = selectedAmenities.slice()
        copy[index] = !copy[index]
        setSelectedAmenities(copy)
        const names = amenities.filter((_, i) => copy[i])
        setStay(prev => ({
            ...prev, amenities: names
        }))
    };

    if (!amenities) return
    return (
        (<section>
            {amenities.map((ament, index) =>
                <div key={ament}>
                    <input onChange={() => handleInputChange(index)} name={ament} type="checkbox" id={ament} checked={selectedAmenities[index]} />
                    <label htmlFor={ament}>{ament} {index}</label>
                </div>)
            }
        </section >)
    );
}