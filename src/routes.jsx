import { OrderPage } from './pages/OrderPage.jsx'
import { StayDetails } from './pages/StayDetails.jsx'
import { StayIndex } from './pages/StayIndex.jsx'

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
    path: '/order',
    component: <OrderPage />,
    label: 'order',
  },
]

export default routes
