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

export function PropertyEditor({
  selectProperty,
  properties = defaultProperties,
  onPropertyChange,
}) {
  return (
    <section style={{ display: 'flex', gap: 10 }}>
      {properties.map((property) => (
        <label htmlFor={property.value} key={property.value}>
          <div className={`property-place ${selectProperty === property.value ? 'selected' : ''}`}>
            <input
              hidden
              type='radio'
              id={property.value}
              value={property.value}
              onChange={(ev) =>
                onPropertyChange({
                  target: {
                    name: 'propertyType',
                    value: ev.target.value,
                  },
                })
              }
              checked={selectProperty === property.value}
            />
            <property.icon size={30} />
            <h1 style={{ fontSize: '18px', textTransform: 'capitalize' }}>{property.value}</h1>
          </div>
        </label>
      ))}
    </section>
  );
}
