import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders } from '../store/actions/order.actions'

export function OrderIndex() {
  const orders = useSelector((storeState) => storeState.orderModule.orders)
  console.log('orders:', orders)
  const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)

  useEffect(() => {
    loadOrders()
  }, [])

  return (
    <main className='order-index'>
      <section>
        {isLoading && <div>Loading...</div>}
        {/* {!isLoading && <OrderList orders={orders} />} */}
      </section>
    </main>
  )
}
