import { StayDetails } from './pages/StayDetails.jsx'
import { StayEdit } from './pages/StayEdit.jsx'
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
    path: '/list/',
    component: <StayEdit />,
    label: 'list',
  },
]

export default routes
