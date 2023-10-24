import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'stayDB'

export const stayService = {
  query,
  getById,
  save,
  remove,
  getEmptyStay,
  addStayMsg,
  getLabels,
  getAmenities,
}

window.cs = stayService

async function query(params) {

  const paramsObject = {};
  for (const key of params.keys()) {
    paramsObject[key] = params.get(key);
  }
  console.log('paramsObject:', paramsObject)

  let capacity = (+paramsObject?.adults) + (+paramsObject?.children)
  let stays = await storageService.query(STORAGE_KEY)
  let staysToReturn = stays
  console.log('capacity:', capacity)

  if (capacity) staysToReturn = staysToReturn.filter(stay => stay.capacity >= capacity)
  if (paramsObject.region) staysToReturn = staysToReturn.filter(stay => stay.loc.country === paramsObject.region.split(',')[0])
  return staysToReturn
}

function getById(stayId) {
  return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
  await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
  console.log('stay:', stay)
  let savedStay
  const { _id, fullname, imgUrl } = await userService.getLoggedinUser()
  stay.imgUrls = stay.imgUrls.filter((url) => url)

  if (stay._id) {
    savedStay = await storageService.put(STORAGE_KEY, stay)
  } else {
    stay._id = utilService.makeId()
    stay.host = {
      _id: _id || '',
      fullname: fullname || '',
      imgUrl: imgUrl || '',
    }
    stay.reviews = _reviewDemoData()
    savedStay = await storageService.post(STORAGE_KEY, stay)
  }
  return savedStay
}

async function addStayMsg(stayId, txt) {
  // Later, this is all done by the backend
  const stay = await getById(stayId)
  if (!stay.msgs) stay.msgs = []

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  stay.msgs.push(msg)
  await storageService.put(STORAGE_KEY, stay)

  return msg
}

async function _getStayLatLang(address, city, countryCode) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${_joinString(address)},+${_joinString(
      city
    )},+${countryCode}&key=AIzaSyB0XrNIJmg5sZqYETs7D_1d2qfIIwy1fkY`
  )
  const { results } = await response.json()
  return results[0].geometry.location
}

async function _getCountryCode(name) {
  const response = await fetch(`https://restcountries.com/v3.1/name/${name}`)
  const country = await response.json()
  return country[0].cca2
}

function _joinString(string) {
  return string.split(' ').join('+')
}

function getEmptyStay() {
  return {
    name: '',
    type: '',
    bedrooms: '',
    beds: '',
    bathrooms: '',
    imgUrls: [],
    price: '',
    summary: '',
    room_type: '',
    capacity: '',
    amenities: [],
    labels: [],
    loc: {
      country: '',
      countryCode: '',
      city: '',
      address: '',
      lat: 0,
      lng: 0,
    },
    reviews: [
      {
        id: '',
        txt: '',
        rate: 0,
        by: {
          _id: '',
          fullname: '',
          imgUrl: '',
        },
      },
    ],
    likedByUsers: [''],
  }
}

function getLabels() {
  return [
    { value: 'Top of the world', label: 'Top of the world' },
    { value: 'Trending', label: 'Trending' },
    { value: 'Play', label: 'Play' },
    { value: 'Tropical', label: 'Tropical' },
  ]
}

function getAmenities() {
  return ['TV', 'Wifi', 'Kitchen', 'Smoking allowed', 'Pets allowed', 'Cooking basics', 'Chair']
}

async function _createDemoData() {
  let getStays = await storageService.query(STORAGE_KEY)
  if (!getStays || getStays.length < 1) {
    for (let stay of stays) {
      await storageService.post(STORAGE_KEY, stay)
    }
  }
}
_createDemoData()

const stays = [
  {
    _id: 's101',
    name: 'Ribeira Charming Duplex',
    type: 'House',
    imgUrls: ['/img/img1.jpg', '/img/img2.jpg'],
    price: 80.0,
    summary: 'Fantastic duplex apartment...',
    capacity: 8,
    room_type: 'Entire home',
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    amenities: ['TV', 'Wifi', 'Kitchen', 'Smoking allowed', 'Pets allowed', 'Cooking basics'],
    labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
    host: {
      _id: 'u101',
      fullname: 'Davit Pok',
      imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Lisbon',
      address: '17 Kombo st',
      lat: 31.768318,
      lng: 35.213711,
    },
    reviews: [
      {
        id: 'madeId',
        txt: 'Very helpful hosts. Cooked traditional...',
        rate: 4,
        by: {
          _id: 'u102',
          fullname: 'user2',
          imgUrl: '/img/img2.jpg',
        },
      },
      {
        id: 'madeId2',
        txt: 'Amazing location and very cozy space...',
        rate: 5,
        by: {
          _id: 'u104',
          fullname: 'user3',
          imgUrl: '/img/img3.jpg',
        },
      },
      {
        id: 'madeId3',
        txt: 'Stylish place in the heart of the action...',
        rate: 5,
        by: {
          _id: 'u106',
          fullname: 'user4',
          imgUrl: '/img/img5.jpg',
        },
      },
      {
        id: 'madeId4',
        txt: 'Peaceful location with stunning views...',
        rate: 4,
        by: {
          _id: 'u108',
          fullname: 'user5',
          imgUrl: '/img/img7.jpg',
        },
      },
      {
        id: 'madeId5',
        txt: 'A charming space with a vintage touch...',
        rate: 4,
        by: {
          _id: 'u110',
          fullname: 'user6',
          imgUrl: '/img/img4.jpg',
        },
      },
      {
        id: 'madeId6',
        txt: 'Great location and very comfortable...',
        rate: 5,
        by: {
          _id: 'u112',
          fullname: 'user7',
          imgUrl: '/img/img6.jpg',
        },
      },
    ],
    likedByUsers: ['mini-user'],
  },
  {
    _id: 's102',
    name: 'Alfama Cozy Retreat',
    type: 'Apartment',
    imgUrls: ['/img/img11.jpeg', '/img/img12.jpeg', '/img/img13.webp', '/img/img14.webp', '/img/img15.jpeg'],
    price: 90.0,
    summary:
      'Nestled in the heart of Alfama, this cozy apartment offers a blend of modern amenities and traditional Portuguese charm. Experience the vibrant local culture right at your doorstep, with famous Fado houses, historic sites, and local eateries just a short walk away. The space is perfect for couples or small families looking for an authentic Lisbon experience.',
    capacity: 6,
    room_type: 'Entire home',
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    amenities: ['TV', 'Wifi', 'Kitchen', 'Washer', 'Heating', 'Cooking basics'],
    labels: ['City Center', 'Historic', 'Cozy', 'Local Experience'],
    host: {
      _id: 'u103',
      fullname: 'Maria Alves',
      imgUrl: 'https://a0.muscache.com/im/pictures/abc123.jpg?aki_policy=profile_small',
    },
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Lisbon',
      address: '45 Fado st',
      lat: -8.61408,
      lng: 41.1423,
    },
    reviews: [
      {
        id: 'madeId2',
        txt: 'Amazing location and very cozy space...',
        rate: 5,
        by: {
          _id: 'u104',
          fullname: 'user3',
          imgUrl: '/img/img3.jpg',
        },
      },
    ],
    likedByUsers: ['mini-user2'],
  },
  {
    _id: 's103',
    name: 'Bairro Alto Modern Loft',
    type: 'Loft',
    imgUrls: ['/img/img21.jpg', '/img/img22.jpg', '/img/img23.jpg', '/img/img24.jpg'],
    price: 110.0,
    summary:
      'Discover the lively Bairro Alto from this modern loft. With high ceilings and an open-concept design, this space is a blend of comfort and style. Surrounded by a plethora of bars, restaurants, and cultural spots, guests can dive into the nightlife or simply enjoy the city views from the balcony. Ideal for solo travelers or couples seeking a vibrant Lisbon experience.',
    capacity: 4,
    room_type: 'Entire home',
    bedrooms: 5,
    beds: 3,
    bathrooms: 4,
    amenities: ['TV', 'Wifi', 'Kitchen', 'Air conditioning', 'Elevator', 'Cooking basics'],
    labels: ['Nightlife', 'Modern', 'City View', 'Vibrant'],
    host: {
      _id: 'u105',
      fullname: 'João Silva',
      imgUrl: 'https://a0.muscache.com/im/pictures/def456.jpg?aki_policy=profile_small',
    },
    loc: {
      country: 'Israel',
      countryCode: 'IL',
      city: 'Hertliya',
      address: '32 Night st',
      lat: 32.16486,
      lng: 34.84417,
    },
    reviews: [
      {
        id: 'madeId3',
        txt: 'Stylish place in the heart of the action...',
        rate: 5,
        by: {
          _id: 'u106',
          fullname: 'user4',
          imgUrl: '/img/img5.jpg',
        },
      },
    ],
    likedByUsers: ['mini-user3'],
  },
  {
    _id: 's104',
    name: 'Belém Riverside Suite',
    type: 'Condo',
    imgUrls: ['/img/img7.jpg', '/img/img6.jpg'],
    price: 120.0,
    summary:
      'Relax in this serene suite located right by the Tagus River in Belém. Guests can enjoy morning walks by the riverside, visit nearby monuments like the Belém Tower, or indulge in the world-famous Pastéis de Belém. The condo boasts modern amenities, a spacious living area, and a balcony with breathtaking river views. Perfect for those seeking a calm retreat in the city.',
    capacity: 5,
    room_type: 'Entire home',
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    amenities: ['TV', 'Wifi', 'Kitchen', 'Balcony', 'Free parking', 'Cooking basics'],
    labels: ['Riverside', 'Serene', 'Historic Area', 'Scenic View'],
    host: {
      _id: 'u107',
      fullname: 'Ana Costa',
      imgUrl: 'https://a0.muscache.com/im/pictures/ghi789.jpg?aki_policy=profile_small',
    },
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Lisbon',
      address: '9 Riverside lane',
      lat: -8.61608,
      lng: 41.1443,
    },
    reviews: [
      {
        id: 'madeId4',
        txt: 'Peaceful location with stunning views...',
        rate: 4,
        by: {
          _id: 'u108',
          fullname: 'user5',
          imgUrl: '/img/img7.jpg',
        },
      },
    ],
    likedByUsers: ['mini-user4'],
  },
  {
    _id: 's105',
    name: 'Lisbon Vintage Studio',
    type: 'Studio',
    imgUrls: ['/img/img3.jpg', '/img/img4.jpg'],
    price: 70.0,
    summary:
      "Step back in time with this vintage-inspired studio located in the heart of Lisbon. Adorned with antique furnishings and classic decor, this space offers a unique blend of the past and present. It's a stone's throw away from local cafes, boutiques, and historic landmarks. Ideal for history buffs or those looking for a nostalgic getaway.",
    capacity: 2,
    room_type: 'Entire home',
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: ['TV', 'Wifi', 'Kitchen', 'Heating', 'Coffee maker', 'Cooking basics'],
    labels: ['Vintage', 'Central', 'Historic', 'Charming'],
    host: {
      _id: 'u109',
      fullname: 'Miguel Santos',
      imgUrl: 'https://a0.muscache.com/im/pictures/jkl101.jpg?aki_policy=profile_small',
    },
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Lisbon',
      address: '23 Antique rd',
      lat: -8.61708,
      lng: 41.1453,
    },
    reviews: [
      {
        id: 'madeId5',
        txt: 'A charming space with a vintage touch...',
        rate: 4,
        by: {
          _id: 'u110',
          fullname: 'user6',
          imgUrl: '/img/img9.jpg',
        },
      },
    ],
    likedByUsers: ['mini-user5'],
  },
  {
    _id: 's106',
    name: 'Ribeira Charming Duplex',
    type: 'House',
    imgUrls: ['/img/img1.jpg', '/img/img2.jpg'],
    price: 80.0,
    summary: 'Fantastic duplex apartment...',
    capacity: 8,
    room_type: 'Entire home',
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    amenities: ['TV', 'Wifi', 'Kitchen', 'Smoking allowed', 'Pets allowed', 'Cooking basics'],
    labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
    host: {
      _id: 'u101',
      fullname: 'Davit Pok',
      imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Lisbon',
      address: '17 Kombo st',
      lat: 31.768318,
      lng: 35.213711,
    },
    reviews: [
      {
        id: 'madeId',
        txt: 'Very helpful hosts. Cooked traditional...',
        rate: 4,
        by: {
          _id: 'u102',
          fullname: 'user2',
          imgUrl: '/img/img2.jpg',
        },
      },
    ],
    likedByUsers: ['mini-user'],
  },
  {
    _id: 's107',
    name: 'Alfama Cozy Retreat',
    type: 'Apartment',
    imgUrls: ['/img/img3.jpg', '/img/img4.jpg'],
    price: 90.0,
    summary:
      'Nestled in the heart of Alfama, this cozy apartment offers a blend of modern amenities and traditional Portuguese charm. Experience the vibrant local culture right at your doorstep, with famous Fado houses, historic sites, and local eateries just a short walk away. The space is perfect for couples or small families looking for an authentic Lisbon experience.',
    capacity: 6,
    room_type: 'Entire home',
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    amenities: ['TV', 'Wifi', 'Kitchen', 'Washer', 'Heating', 'Cooking basics'],
    labels: ['City Center', 'Historic', 'Cozy', 'Local Experience'],
    host: {
      _id: 'u103',
      fullname: 'Maria Alves',
      imgUrl: 'https://a0.muscache.com/im/pictures/abc123.jpg?aki_policy=profile_small',
    },
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Lisbon',
      address: '45 Fado st',
      lat: -8.61408,
      lng: 41.1423,
    },
    reviews: [
      {
        id: 'madeId2',
        txt: 'Amazing location and very cozy space...',
        rate: 5,
        by: {
          _id: 'u104',
          fullname: 'user3',
          imgUrl: '/img/img3.jpg',
        },
      },
    ],
    likedByUsers: ['mini-user2'],
  },
  {
    _id: 's108',
    name: 'Bairro Alto Modern Loft',
    type: 'Loft',
    imgUrls: ['/img/img5.jpg', '/img/img6.jpg'],
    price: 110.0,
    summary:
      'Discover the lively Bairro Alto from this modern loft. With high ceilings and an open-concept design, this space is a blend of comfort and style. Surrounded by a plethora of bars, restaurants, and cultural spots, guests can dive into the nightlife or simply enjoy the city views from the balcony. Ideal for solo travelers or couples seeking a vibrant Lisbon experience.',
    capacity: 4,
    room_type: 'Entire home',
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    amenities: ['TV', 'Wifi', 'Kitchen', 'Air conditioning', 'Elevator', 'Cooking basics'],
    labels: ['Nightlife', 'Modern', 'City View', 'Vibrant'],
    host: {
      _id: 'u105',
      fullname: 'João Silva',
      imgUrl: 'https://a0.muscache.com/im/pictures/def456.jpg?aki_policy=profile_small',
    },
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Lisbon',
      address: '32 Night st',
      lat: -8.61508,
      lng: 41.1433,
    },
    reviews: [
      {
        id: 'madeId3',
        txt: 'Stylish place in the heart of the action...',
        rate: 5,
        by: {
          _id: 'u106',
          fullname: 'user4',
          imgUrl: '/img/img5.jpg',
        },
      },
    ],
    likedByUsers: ['mini-user3'],
  },
  {
    _id: 's109',
    name: 'Belém Riverside Suite',
    type: 'Condo',
    imgUrls: ['/img/img3.jpg', '/img/img4.jpg'],
    price: 120.0,
    summary:
      'Relax in this serene suite located right by the Tagus River in Belém. Guests can enjoy morning walks by the riverside, visit nearby monuments like the Belém Tower, or indulge in the world-famous Pastéis de Belém. The condo boasts modern amenities, a spacious living area, and a balcony with breathtaking river views. Perfect for those seeking a calm retreat in the city.',
    capacity: 5,
    room_type: 'Entire home',
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    amenities: ['TV', 'Wifi', 'Kitchen', 'Balcony', 'Free parking', 'Cooking basics'],
    labels: ['Riverside', 'Serene', 'Historic Area', 'Scenic View'],
    host: {
      _id: 'u107',
      fullname: 'Ana Costa',
      imgUrl: 'https://a0.muscache.com/im/pictures/ghi789.jpg?aki_policy=profile_small',
    },
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Lisbon',
      address: '9 Riverside lane',
      lat: -8.61608,
      lng: 41.1443,
    },
    reviews: [
      {
        id: 'madeId4',
        txt: 'Peaceful location with stunning views...',
        rate: 4,
        by: {
          _id: 'u108',
          fullname: 'user5',
          imgUrl: '/img/img7.jpg',
        },
      },
    ],
    likedByUsers: ['mini-user4'],
  },
  {
    _id: 's110',
    name: 'Lisbon Vintage Studio',
    type: 'Studio',
    imgUrls: ['/img/img2.jpg', '/img/img4.jpg'],
    price: 70.0,
    summary:
      "Step back in time with this vintage-inspired studio located in the heart of Lisbon. Adorned with antique furnishings and classic decor, this space offers a unique blend of the past and present. It's a stone's throw away from local cafes, boutiques, and historic landmarks. Ideal for history buffs or those looking for a nostalgic getaway.",
    capacity: 2,
    room_type: 'Entire home',
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: ['TV', 'Wifi', 'Kitchen', 'Heating', 'Coffee maker', 'Cooking basics'],
    labels: ['Vintage', 'Central', 'Historic', 'Charming'],
    host: {
      _id: 'u109',
      fullname: 'Miguel Santos',
      imgUrl: 'https://a0.muscache.com/im/pictures/jkl101.jpg?aki_policy=profile_small',
    },
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Lisbon',
      address: '23 Antique rd',
      lat: -8.61708,
      lng: 41.1453,
    },
    reviews: [
      {
        id: 'madeId5',
        txt: 'A charming space with a vintage touch...',
        rate: 4,
        by: {
          _id: 'u110',
          fullname: 'user6',
          imgUrl: '/img/img9.jpg',
        },
      },
    ],
    likedByUsers: ['mini-user5'],
  },
]

function _reviewDemoData() {
  return [
    {
      id: 'madeId',
      txt: 'Very helpful hosts. Cooked traditional...',
      rate: 4,
      by: {
        _id: 'u102',
        fullname: 'user2',
        imgUrl: '/img/img2.jpg',
      },
    },
    {
      id: 'madeId2',
      txt: 'Amazing location and very cozy space...',
      rate: 5,
      by: {
        _id: 'u104',
        fullname: 'user3',
        imgUrl: '/img/img3.jpg',
      },
    },
    {
      id: 'madeId3',
      txt: 'Stylish place in the heart of the action...',
      rate: 5,
      by: {
        _id: 'u106',
        fullname: 'user4',
        imgUrl: '/img/img5.jpg',
      },
    },
    {
      id: 'madeId4',
      txt: 'Peaceful location with stunning views...',
      rate: 4,
      by: {
        _id: 'u108',
        fullname: 'user5',
        imgUrl: '/img/img7.jpg',
      },
    },
    {
      id: 'madeId5',
      txt: 'A charming space with a vintage touch...',
      rate: 4,
      by: {
        _id: 'u110',
        fullname: 'user6',
        imgUrl: '/img/img4.jpg',
      },
    },
    {
      id: 'madeId6',
      txt: 'Great location and very comfortable...',
      rate: 5,
      by: {
        _id: 'u112',
        fullname: 'user7',
        imgUrl: '/img/img6.jpg',
      },
    },
  ]
}
