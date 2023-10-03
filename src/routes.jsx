import { StayIndex } from './pages/StayIndex.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: 'stay',
        component: <StayIndex />,
        label: 'Stays'
    },
]

export default routes