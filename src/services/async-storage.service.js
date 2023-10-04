import { utilService } from './util.service'

export const storageService = {
  query,
  get,
  post,
  put,
  remove,
}

function query(entityType, delay = 50) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || []
  if (!entities.length) {
    entities = stays
    utilService.saveToStorage('stayDB', entities)
  }
  return new Promise((resolve) => setTimeout(() => resolve(entities), delay))
}

function get(entityType, entityId) {
  return query(entityType).then((entities) => {
    const entity = entities.find((entity) => entity._id === entityId)
    if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
    return entity
  })
}

function post(entityType, newEntity) {
  newEntity = JSON.parse(JSON.stringify(newEntity))
  newEntity._id = _makeId()
  return query(entityType).then((entities) => {
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
  })
}

function put(entityType, updatedEntity) {
  updatedEntity = JSON.parse(JSON.stringify(updatedEntity))
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
    if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`)
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
  })
}

function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === entityId)
    if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
    entities.splice(idx, 1)
    _save(entityType, entities)
  })
}

// Private functions

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

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
      lat: -8.61308,
      lng: 41.1413,
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
    _id: 's102',
    name: 'Ribeira Charming Duplex',
    type: 'House',
    imgUrls: ['https://e26e9b.jpg', 'otherImg.jpg'],
    price: 80.0,
    summary: 'Fantastic duplex apartment...',
    capacity: 8,
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
      lat: -8.61308,
      lng: 41.1413,
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
    _id: 's103',
    name: 'Ribeira Charming Duplex',
    type: 'House',
    imgUrls: ['https://e26e9b.jpg', 'otherImg.jpg'],
    price: 80.0,
    summary: 'Fantastic duplex apartment...',
    capacity: 8,
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
      lat: -8.61308,
      lng: 41.1413,
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
    _id: 's104',
    name: 'Ribeira Charming Duplex',
    type: 'House',
    imgUrls: ['https://e26e9b.jpg', 'otherImg.jpg'],
    price: 80.0,
    summary: 'Fantastic duplex apartment...',
    capacity: 8,
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
      lat: -8.61308,
      lng: 41.1413,
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
    _id: 's105',
    name: 'Ribeira Charming Duplex',
    type: 'House',
    imgUrls: ['https://e26e9b.jpg', 'otherImg.jpg'],
    price: 80.0,
    summary: 'Fantastic duplex apartment...',
    capacity: 8,
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
      lat: -8.61308,
      lng: 41.1413,
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
    _id: 's106',
    name: 'Ribeira Charming Duplex',
    type: 'House',
    imgUrls: ['https://e26e9b.jpg', 'otherImg.jpg'],
    price: 80.0,
    summary: 'Fantastic duplex apartment...',
    capacity: 8,
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
      lat: -8.61308,
      lng: 41.1413,
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
    name: 'Ribeira Charming Duplex',
    type: 'House',
    imgUrls: ['https://e26e9b.jpg', 'otherImg.jpg'],
    price: 80.0,
    summary: 'Fantastic duplex apartment...',
    capacity: 8,
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
      lat: -8.61308,
      lng: 41.1413,
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
    _id: 's108',
    name: 'Ribeira Charming Duplex',
    type: 'House',
    imgUrls: ['https://e26e9b.jpg', 'otherImg.jpg'],
    price: 80.0,
    summary: 'Fantastic duplex apartment...',
    capacity: 8,
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
      lat: -8.61308,
      lng: 41.1413,
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
    _id: 's109',
    name: 'Ribeira Charming Duplex',
    type: 'House',
    imgUrls: ['https://e26e9b.jpg', 'otherImg.jpg'],
    price: 80.0,
    summary: 'Fantastic duplex apartment...',
    capacity: 8,
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
      lat: -8.61308,
      lng: 41.1413,
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
]
