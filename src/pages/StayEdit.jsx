import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { stayService } from "../services/stay.service.local"
import { uploadService } from "../services/upload.service"
import { EditForm } from "../cmps/StayEdit.jsx/EditForm"

const emptyStay = {
  name: '',
  type: '',
  host: {
    _id: '',
    fullname: '',
    imgUrl: '',
  },
  capacity: '',
  price: '',
  imgUrls: '',
  amenities: [],
  summary: '',
  loc: {
    country: "",
    city: "",
    address: "",
    lat: -8.61308,
    lng: 41.1413,
    countryCode: "PT",
  },
}

const amenities = [
  "TV",
  "Wifi",
  "Kitchen",
  "Smoking allowed",
  "Pets allowed",
  "Cooking basics"
]

const labels = [
  "Top of the world",
  "Trending",
  "Play",
  "Tropical"
]

export function StayEdit() {
  const [stay, setStay] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // const emptyStay = stayService.getEmptyStay()
    setStay(emptyStay)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    console.log(stay);
    try {
      stayService.save(stay)
    } catch (err) {
      console.log('handleSubmit err:', err)
    }
  }

  function handleInputChange(e) {
    let { name, value } = e.target;
    if (name === 'price' || name === 'capacity') {
      setStay({ ...stay, [name]: parseFloat(value) })
      console.log(stay);
      return
    }
    if (name === 'country' || name === 'city' || name === 'address') {
      setStay({ ...stay, loc: { ...stay.loc, [name]: value } })
      console.log(stay);
      return
    }
    setStay({ ...stay, [name]: value, });
    console.log(stay);
  }

  if (!stay) return <div>loading...</div>
  return (
    <main>
      <EditForm stay={stay} setStay={setStay} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
    </main>
  )
}
