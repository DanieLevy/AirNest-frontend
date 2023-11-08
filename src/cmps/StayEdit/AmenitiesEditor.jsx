import { useState, useEffect } from 'react'
import { stayService } from '../../services/stay.service'
import { amenitiesData } from '../StayDetails/amenities'

const allAmenities = stayService.getAmenities()

export function AmenitiesEditor({ selectedAmenities, onAmenitiesChange }) {
  const handleInputChange = (ament) => {
    if (selectedAmenities.includes(ament)) {
      const withoutAment = selectedAmenities.filter((a) => a != ament)
      onAmenitiesChange(withoutAment)
    } else {
      onAmenitiesChange([...selectedAmenities, ament])
    }
  }

  if (!allAmenities) return
  return (
    <section className='amenities-editor'>
      {allAmenities.map((ament, i) => {
        const isChecked = selectedAmenities.includes(ament)
        return (
          <label key={ament} htmlFor={ament} className={`amenity ${isChecked ? 'selected' : ''}`}>
            <input
              style={{
                display: 'none',
              }}
              onChange={() => handleInputChange(ament, i)}
              name={ament}
              type='checkbox'
              id={ament}
              checked={isChecked}
            />
            <div className='amenity-logo'>
              {
                <svg width='32' height='32' stroke=''>
                  {amenitiesData[ament].svg}
                </svg>
              }
            </div>
            <div className='amenity-title'>{amenitiesData[ament].title}</div>
          </label>
        )
      })}
    </section>
  )
}
