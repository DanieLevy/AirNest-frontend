import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { stayService } from "../services/stay.service.local"
import { FormEditor } from "../cmps/StayEdit.jsx/FormEditor"

export function StayEdit() {
  const [stay, setStay] = useState(null)
  const { stayId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    if (!stayId) {
      const emptyStay = stayService.getEmptyStay()
      setStay(emptyStay)
    } else {
      loadStay()
    }
  }, [stayId])

  async function loadStay() {
    try {
      const stay = await stayService.getById(stayId)
      setStay(stay)
    } catch (error) {
      console.log('loadToy err:', err)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(stay);
    try {
      await stayService.save(stay)
      navigate('/')
    } catch (err) {
      console.log('handleSubmit err:', err)
    }
  }

  function setImgUrl(imgUrls) {
    setStay(prev => ({
      ...prev,
      imgUrls
    }))
  }

  function setLabels(labels) {
    setStay(prev => ({
      ...prev,
      labels
    }))
  }

  function setAmenities(amenities) {
    setStay(prev => ({
      ...prev,
      amenities
    }))
  }

  function setLocation(loc) {
    setStay(prev => ({
      ...prev,
      loc
    }))
  }

  function handleInputChange(e) {
    let { name, value } = e.target;

    if (name === 'price' || name === 'capacity' || name === 'bedrooms' || name === 'beds' || name === 'bathrooms') {
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
      <FormEditor stay={stay} setLabels={setLabels} handleInputChange={handleInputChange} setLocation={setLocation} handleSubmit={handleSubmit} onUrlsChange={setImgUrl} onAmenitiesChange={setAmenities} />
    </main>
  )
}
