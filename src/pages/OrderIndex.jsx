import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders } from '../store/actions/order.actions'
import { OrderList } from '../cmps/Order/OrderList'

export function OrderIndex() {
  const orders = useSelector((storeState) => storeState.orderModule.orders)
  const logginUser = useSelector((storeState) => storeState.userModule.user)

  const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)

  useEffect(() => {
    if (logginUser) {
      loadOrders({ logginUser })
    } else {
      loadOrders()
    }
  }, [logginUser])

  return (
    <main className='main-layout order-index'>
      <section>
        {isLoading && <div>Loading...</div>}

        {!isLoading && <OrderList orders={orders} />}
      </section>
    </main>
  )
}
