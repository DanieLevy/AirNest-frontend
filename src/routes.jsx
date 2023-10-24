import { OrderConfirm } from './pages/OrderConfirm.jsx'
import { OrderIndex } from './pages/OrderIndex.jsx'
import { StayDetails } from './pages/StayDetails.jsx'
import { StayEdit } from './pages/StayEdit.jsx'
import { StayIndex } from './pages/StayIndex.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { Wishlist } from './pages/WishList.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
  {
    path: '/',
    component: <StayIndex />,
    label: 'Stays',
  },
  {
    path: '/stay',
    component: <StayIndex />,
    label: 'Stays',
  },
  {
    path: '/stay/:stayId',
    component: <StayDetails />,
    label: 'Details',
  },
  {
    path: '/edit/',
    component: <StayEdit />,
    label: 'Edit',
  },
  {
    path: '/edit/:stayId',
    component: <StayEdit />,
    label: 'edit',
  },
  {
    path: '/user/:userId',
    component: <UserDetails />,
    label: 'user',
  },
  {
    path: '/wishlist',
    component: <Wishlist />,
    label: 'Wishlist',
  },
  {
    path: '/order/confirm',
    component: <OrderConfirm />,
    label: 'order',
  },
  {
    path: '/order/',
    component: <OrderIndex />,
    label: 'Order Index',
  },
]

export default routes
