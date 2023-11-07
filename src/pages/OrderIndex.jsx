import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders } from '../store/actions/order.actions'
import { OrderList } from '../cmps/Order/OrderList'
import { PropagateLoader } from "react-spinners";

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

  if (isLoading) {
    return (
      // <StayLoader />
      <PropagateLoader
        color={"#ff385c"}
        //  size={150}
        className="loader"
        speedMultiplier={0.8}
      />
    );
  }


  return (
    <main className='main-layout medium order-index'>
      <section>
        <OrderList orders={orders} />
      </section>
    </main>
  )
}
