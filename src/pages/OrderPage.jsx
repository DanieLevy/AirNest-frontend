import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { orderService } from '../services/order.service'

export function OrderPage() {
  const location = useLocation()
  const formData = location.state?.formData
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleConfirmOrder = () => {
    orderService.add({
      startDate: formData.startDate,
      endDate: formData.endDate,
      adults: formData.adults,
      children: formData.children,
    })

    setIsConfirmed(true)
  }

  if (!formData) {
    return <div>Error: No order data provided!</div>
  }

  return (
    <div>
      <h2>Confirm Your Order</h2>
      <p>Start Date: {new Date(formData.startDate).toLocaleDateString()}</p>
      <p>End Date: {new Date(formData.endDate).toLocaleDateString()}</p>
      <p>Adults: {formData.adults}</p>
      <p>Children: {formData.children}</p>

      {!isConfirmed ? <button onClick={handleConfirmOrder}>Confirm Order</button> : <div>Order Confirmed!</div>}
    </div>
  )
}
