import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { staysDemonData } from './stayDemoData.js'
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
  getStaysByUserId,
}

window.cs = stayService

async function query(params) {
  const paramsObject = {}
  for (const key of params.keys()) {
    paramsObject[key] = params.get(key)
  }
  console.log('paramsObject:', paramsObject)

  let capacity = +paramsObject?.adults + +paramsObject?.children
  let stays = await storageService.query(STORAGE_KEY)
  let staysToReturn = stays
  console.log('capacity:', capacity)

  if (capacity) staysToReturn = staysToReturn.filter((stay) => stay.capacity >= capacity)
  if (paramsObject.region) staysToReturn = staysToReturn.filter((stay) => stay.loc.country === paramsObject.region.split(',')[0])
  return staysToReturn
}

function getById(stayId) {
  return storageService.get(STORAGE_KEY, stayId)
}
async function getStaysByUserId(userId) {
  let stays = await storageService.query(STORAGE_KEY)
  return stays.filter((stay) => stay._id === userId)

  // if (filterBy.logginUser) {
  //   return stays.filter((stay) => stay.host._id === filterBy.logginUser._id)
  // }
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

const stays = staysDemonData

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
