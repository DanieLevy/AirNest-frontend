import React, { useEffect, useState } from 'react'
import { orderService } from '../services/order.service'
import { useSelector } from 'react-redux'
import { addOrder, loadOrders } from '../store/actions/order.actions'

export function OrderPage() {
  const orderData = useSelector((state) => state.orderModule.orders)

  console.log('🚀 ~ file: OrderPage.jsx:9 ~ OrderPage ~ orderData:', orderData)

  const isLoading = useSelector((state) => state.systemModule.isLoading)

  const [isConfirmed, setIsConfirmed] = useState(false)

  useEffect(function () {
    loadOrders()
  }, [])

  const handleConfirmOrder = function () {
    addOrder({
      stayId: orderData.stayId,
      startDate: orderData.startDate,
      endDate: orderData.endDate,
      adults: orderData.adults,
      children: orderData.children,
    })
    setIsConfirmed(true)
  }

  console.log('🚀 ~ file: OrderPage.jsx:32 ~ OrderPage ~ orderData:', orderData)

  if (isLoading) return <div>Loading...</div>
  if (!orderData) return <div>Error: No order data provided!</div>

  return (
    <div>
      <h2>Confirm Your Order</h2>
      <p>Start Date: {new Date(orderData.startDate).toLocaleDateString()}</p>
      <p>End Date: {new Date(orderData.endDate).toLocaleDateString()}</p>
      <p>Adults: {orderData.adults}</p>
      <p>Children: {orderData.children}</p>

      {!isConfirmed ? <button onClick={handleConfirmOrder}>Confirm Order</button> : <div>Order Confirmed!</div>}
    </div>
  )
}
