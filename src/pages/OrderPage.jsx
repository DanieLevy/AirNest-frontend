import React, { useEffect, useState } from 'react'
import { orderService } from '../services/order.service'
import { useSelector } from 'react-redux'
import { addOrder, loadOrders } from '../store/actions/order.actions'
import { showErrorMsg } from '../services/event-bus.service'

export function OrderPage() {
  const orderData = useSelector((state) => state.orderModule.orders)
  // const dispatch = useDispatch()

  console.log('🚀 ~ file: OrderPage.jsx:9 ~ OrderPage ~ orderData:', orderData)

  const isLoading = useSelector((state) => state.systemModule.isLoading)

  const [isConfirmed, setIsConfirmed] = useState(false)

  useEffect(() => {
    loadOrders()
  }, [])
  const singleOrder = orderData[orderData.length - 1]

  console.log('🚀 ~ file: OrderPage.jsx:22 ~ OrderPage ~ singleOrder:', singleOrder)

  async function handleConfirmOrder() {
    try {
      await orderService.add({
        startDate: singleOrder.startDate,
        endDate: singleOrder.endDate,
        adults: singleOrder.adults,
        children: singleOrder.children,
      })

      setIsConfirmed(true)
    } catch (err) {
      console.error('Failed to confirm order:', err)
      showErrorMsg('problem saving order', err)
    }
  }

  console.log('🚀 ~ file: OrderPage.jsx:32 ~ OrderPage ~ orderData:', orderData)

  if (isLoading) return <div>Loading...</div>
  if (!orderData) return <div>Error: No order data provided!</div>

  return (
    <div>
      <h2>Confirm Your Order</h2>
      <p>Start Date: {new Date(singleOrder.startDate).toLocaleDateString()}</p>
      <p>End Date: {new Date(singleOrder.endDate).toLocaleDateString()}</p>
      <p>Adults: {singleOrder.adults}</p>
      <p>Children: {singleOrder.children}</p>

      {!isConfirmed ? <button onClick={handleConfirmOrder}>Confirm Order</button> : <div>Order Confirmed!</div>}
    </div>
  )
}
