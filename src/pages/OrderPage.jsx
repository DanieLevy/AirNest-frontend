import React, { useEffect, useState } from 'react'
import { orderService } from '../services/order.service'
import { useDispatch, useSelector } from 'react-redux'
import { addOrder, getActionAddOrder, getActionClearStagedOrder, loadOrders } from '../store/actions/order.actions'
import { showErrorMsg } from '../services/event-bus.service'

export function OrderPage() {
  const stagedOrder = useSelector((state) => state.orderModule.stagedOrder)
  const isLoading = useSelector((state) => state.systemModule.isLoading)

  const [isConfirmed, setIsConfirmed] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    loadOrders()
    return () => {
      dispatch(getActionClearStagedOrder())
    }
  }, [])

  async function handleConfirmOrder() {
    try {
      const confirmedOrder = await orderService.add(stagedOrder)

      dispatch(getActionAddOrder(confirmedOrder))
      setIsConfirmed(true)
    } catch (err) {
      console.error('Failed to confirm order:', err)
      showErrorMsg('problem saving order', err)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (!stagedOrder && !isConfirmed) return <div>No staged order found!</div>

  return (
    <div>
      <h2>Confirm Your Order</h2>
      <p>Start Date: {new Date(stagedOrder.startDate).toLocaleDateString()}</p>
      <p>End Date: {new Date(stagedOrder.endDate).toLocaleDateString()}</p>
      <p>Adults: {stagedOrder.adults}</p>
      <p>Children: {stagedOrder.children}</p>

      {!isConfirmed ? <button onClick={handleConfirmOrder}>Confirm Order</button> : <div>Order Confirmed!</div>}
    </div>
  )
}
