import { LuHotel } from 'react-icons/lu';
import { HiOutlineHome } from 'react-icons/hi2';
import { BsHouses } from 'react-icons/bs';
import { MdApartment } from 'react-icons/md';

const defaultProperties = [
    {
      value: 'house',
      icon: HiOutlineHome,
    },
    {
      value: 'apartment',
      icon: MdApartment,
    },
    {
      value: 'guesthouse',
      icon: BsHouses,
    },
    {
      value: 'hotel',
      icon: LuHotel,
    },
  ];

export function PropertyFilter({ selectedProperty, onPropertyChange }) {
    
  const handleInputChange = (property) => {
    if (selectedProperty.includes(property)) {
      const selectedProperties = selectedProperty.filter((a) => a != property);
      onPropertyChange(selectedProperties);
    } else {
      onPropertyChange([...selectedProperty, property]);
    }
  };

  if (!defaultProperties) return;
  return (
    <section
    className='property-filter'
     style={{ display: 'flex', gap: 10 }}>
      {defaultProperties.map((property, i) => {
        const isChecked = selectedProperty.includes(property.value);
        return (
          <label
            key={property.value}
            htmlFor={property.value}
            className={`property-place ${isChecked ? 'selected' : ''}`}
          >
            <input
              style={{
                display: 'none',
              }}
              onChange={() => handleInputChange(property.value, i)}
              name={property.value}
              type='checkbox'
              id={property.value}
              checked={isChecked}
            />
            <div className='property-logo'>
              <property.icon size={34} />
            </div>
            <div className='property-title'>{property.value}</div>
          </label>
        );
      })}
    </section>
  );
}
