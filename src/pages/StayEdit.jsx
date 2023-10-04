import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { stayService } from "../services/stay.service.local"
import { EditForm } from "../cmps/StayEdit.jsx/EditForm"

export function StayEdit() {
  const [stay, setStay] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const emptyStay = stayService.getEmptyStay()
    console.log('emptyStay:', emptyStay)
    setStay(emptyStay)
  }, [])

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
