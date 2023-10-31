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
  getResultLength,
  getCarouselLabels,
  filterStays,
  getPropertyType,
}

window.cs = stayService

async function query(params) {
  const paramsObj = getParams(params)

  let capacity = +paramsObj?.adults + +paramsObj?.children
  let stays = await storageService.query(STORAGE_KEY)
  let staysToReturn = stays

  if (capacity) staysToReturn = staysToReturn.filter(stay => stay.capacity >= capacity)
  if (paramsObj.region) {
    const regionRegex = new RegExp(paramsObj.region.split(',')[0], 'i');
    staysToReturn = staysToReturn.filter(stay => regionRegex.test(stay.loc.country));
  }
  return staysToReturn
}

function getParams(params) {
  const paramsObject = {}
  for (const key of params.keys()) {
    paramsObject[key] = params.get(key)
  }
  return paramsObject
}

function filterStaysByPrice(stays, minPrice, maxPrice) {
  const hasNumberPrices = !isNaN(minPrice) && !isNaN(maxPrice)
  const isNotDefaultPrices = hasNumberPrices && (minPrice > 0 || maxPrice < 1500)

  if (isNotDefaultPrices)
    return stays.filter(stay => {
      const max = maxPrice >= 1500 ? Infinity : maxPrice
      const min = minPrice || 0
      return stay.price >= min && stay.price <= max
    })

  return stays
}

function filterStays(stays, params) {
  const paramsObj = getParams(params)
  let staysToReturn = stays

  const minPrice = +paramsObj.minPrice
  const maxPrice = +paramsObj.maxPrice
  staysToReturn = filterStaysByPrice(staysToReturn, minPrice, maxPrice)

  if (paramsObj.bedrooms) staysToReturn = staysToReturn.filter(stay => stay.bedrooms >= +paramsObj.bedrooms)
  if (paramsObj.beds) staysToReturn = staysToReturn.filter(stay => stay.beds >= +paramsObj.beds)
  if (paramsObj.bathrooms) staysToReturn = staysToReturn.filter(stay => stay.bathrooms >= +paramsObj.bathrooms)
  if (paramsObj.amenities) staysToReturn = staysToReturn.filter(stay => paramsObj.amenities.split(',').every(amenity => stay.amenities.some((item) => new RegExp(amenity, 'i').test(item))))

  return staysToReturn
}

function getResultLength(filterBy, properties) {
  let stays = filterStaysByPrice(properties, filterBy.minPrice, filterBy.maxPrice)

  if (filterBy.bedrooms && filterBy.bedrooms !== 'Any') stays = stays.filter(stay => stay.bedrooms >= filterBy.bedrooms)
  if (filterBy.beds && filterBy.beds !== 'Any') stays = stays.filter(stay => stay.beds >= filterBy.beds)
  if (filterBy.bathrooms && filterBy.bathrooms !== 'Any') stays = stays.filter(stay => stay.bathrooms >= filterBy.bathrooms)
  if (filterBy.amenities.length) stays = stays.filter(stay => filterBy.amenities.every(amenity => stay.amenities.some((item) => new RegExp(amenity, 'i').test(item))))

  return stays.length
}

function getById(stayId) {
  return storageService.get(STORAGE_KEY, stayId)
}
async function getStaysByUserId(userId) {
  let stays = await storageService.query(STORAGE_KEY)

  stays = stays.filter((stay) => stay.host._id === userId)

  return stays
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
  // return ['TV', 'Wifi', 'Kitchen', 'Smoking allowed', 'Pets allowed', 'Cooking basics', 'Chair']
  return [
    "firePlace",
    "seaView",
    "valleyView",
    "bathtub",
    "hairDryer",
    "cleaningProducts",
    "shampoo",
    "bodySoap",
    "outdoorShower",
    "hotWater",
    "washer",
    "essentials",
    "hangers",
    "bedLinens",
    "extraPillowsAndBlankets",
    "roomDarkeningShades",
    "mountainView",
    "iron",
    "dryingRack",
    "mosquitoNet",
    "tv",
    "travelCrib",
    "windowAC",
    "heating",
    "fireExtinguisher",
    "wifi",
    "dedicatedWorkspace",
    "kitchen",
    "refrigerator",
    "microwave",
    "cookingBasics",
    "dishesAndSilverware",
    "miniFridge",
    "dishwasher",
    "stove",
    "hotWaterKettle",
    "wineGlasses",
    "toaster",
    "bakingSheet",
    "barbecueUtensils",
    "diningTable",
    "breadMaker",
    "beachAccess",
    "patioOrBalcony",
    "backyard",
    "firePit",
    "outdoorFurniture",
    "hammock",
    "outdoorDiningArea",
    "bbqGrill",
    "freeParkingOnPremises",
    "privateHotTub",
    "singleLevelHome",
    "petsAllowed",
    "longTermStaysAllowed",
    "selfCheckIn",
    "lockbox",
    "smokeAlarm",
    "firstAidKit",
    "privateEntrance",
    "sharedPool"
  ]
}

function getPropertyType() {
  return ['home', 'apartment', 'guesthouse', 'hotel']
}

async function _createDemoData() {
  let getStays = await storageService.query(STORAGE_KEY);
  if (!getStays || getStays.length < 1) {
    for (let stay of stays) {
      for (let review of stay.reviews) {
        let randomNum = utilService.getRandomIntInclusive(1,200)
        review.by.imgUrl = `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${randomNum}.jpg`;
      }
      await storageService.post(STORAGE_KEY, stay);
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

function getCarouselLabels() {
  return [
    {
      img: "https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg",
      name: "Countryside",
    },
    {
      img: "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
      name: "OMG!",
    },
    {
      img: "https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg",
      name: "Cabins!",
    },
    {
      img: "https://a0.muscache.com/pictures/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg",
      name: "Tropical",
    },
    {
      img: "https://a0.muscache.com/pictures/248f85bf-e35e-4dc3-a9a1-e1dbff9a3db4.jpg",
      name: "Top of the world",
    },
    {
      img: "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
      name: "Amazing views",
    },
    {
      img: "https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg",
      name: "National parks",
    },
    {
      img: "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
      name: "Amazing pools",
    },
    {
      img: "https://a0.muscache.com/pictures/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg",
      name: "Tiny homes",
    },
    {
      img: "https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg",
      name: "Rooms",
    },
    {
      img: "https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg",
      name: "Beach",
    },
    {
      img: "https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg",
      name: "Farms",
    },
    {
      img: "https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg",
      name: "Beachfront",
    },
    {
      img: "https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg",
      name: "Castles",
    },
    {
      img: "https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg",
      name: "Treehouses",
    },
    {
      img: "https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg",
      name: "Mansions",
    },
    {
      img: "https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg",
      name: "Design",
    },
    {
      img: "https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg",
      name: "Lakefront",
    },
    {
      img: "https://a0.muscache.com/pictures/9a2ca4df-ee90-4063-b15d-0de7e4ce210a.jpg",
      name: "Off-the-grid",
    },
    {
      img: "https://a0.muscache.com/pictures/ed8b9e47-609b-44c2-9768-33e6a22eccb2.jpg",
      name: "Iconic cities",
    },
    {
      img: "https://a0.muscache.com/pictures/60ff02ae-d4a2-4d18-a120-0dd274a95925.jpg",
      name: "Vineyards",
    },
    {
      img: "https://a0.muscache.com/pictures/a4634ca6-1407-4864-ab97-6e141967d782.jpg",
      name: "Lakes",
    },
    {
      img: "https://a0.muscache.com/pictures/c8bba3ed-34c0-464a-8e6e-27574d20e4d2.jpg",
      name: "Skiing",
    },
    {
      img: "https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg",
      name: "Islands",
    },
    {
      img: "https://a0.muscache.com/pictures/33dd714a-7b4a-4654-aaf0-f58ea887a688.jpg",
      name: "Historical homes",
    },
  ]

}
// function getCarouselLabels() {
//   return [
//     {
//       img: "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
//       name: "OMG!",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg",
//       name: "Farms",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg",
//       name: "Luxe",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/4221e293-4770-4ea8-a4fa-9972158d4004.jpg",
//       name: "Caves",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/c8bba3ed-34c0-464a-8e6e-27574d20e4d2.jpg",
//       name: "Skiing",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf.jpg",
//       name: "Play",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
//       name: "Trending",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/c0fa9598-4e37-40f3-b734-4bd0e2377add.jpg",
//       name: "New",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/a6dd2bae-5fd0-4b28-b123-206783b5de1d.jpg",
//       name: "Desert",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg",
//       name: "Surfing",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg",
//       name: "Camping",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg",
//       name: "Artic",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/31c1d523-cc46-45b3-957a-da76c30c85f9.jpg",
//       name: "Campers",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/ddd13204-a5ae-4532-898c-2e595b1bb15f.jpg",
//       name: `Chef's kitchens`,
//     },
//     {
//       img: "https://a0.muscache.com/pictures/a4634ca6-1407-4864-ab97-6e141967d782.jpg",
//       name: "Lake",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
//       name: "Amazing Pools",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
//       name: "Amazing Views",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg",
//       name: "National Parks",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
//       name: "OMG!",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg",
//       name: "Farms",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg",
//       name: "Luxe",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/4221e293-4770-4ea8-a4fa-9972158d4004.jpg",
//       name: "Caves",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/c8bba3ed-34c0-464a-8e6e-27574d20e4d2.jpg",
//       name: "Skiing",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf.jpg",
//       name: "Play",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
//       name: "Trending",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/c0fa9598-4e37-40f3-b734-4bd0e2377add.jpg",
//       name: "New",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/a6dd2bae-5fd0-4b28-b123-206783b5de1d.jpg",
//       name: "Desert",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg",
//       name: "Surfing",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg",
//       name: "Camping",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg",
//       name: "Artic",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/31c1d523-cc46-45b3-957a-da76c30c85f9.jpg",
//       name: "Campers",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/ddd13204-a5ae-4532-898c-2e595b1bb15f.jpg",
//       name: `Chef's kitchens`,
//     },
//     {
//       img: "https://a0.muscache.com/pictures/a4634ca6-1407-4864-ab97-6e141967d782.jpg",
//       name: "Lake",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
//       name: "Amazing Pools",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
//       name: "Amazing Views",
//     },
//     {
//       img: "https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg",
//       name: "National Parks",
//     },
//   ]

// }