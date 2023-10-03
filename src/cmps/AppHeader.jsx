import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../routes'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/actions/user.actions.js'
import { LoginSignup } from './LoginSignup.jsx'
import { ExploreBy } from './ExploreBy'
import { UserMsg } from './UserMsg'

export function AppHeader() {
    const user = useSelector((storeState) => storeState.userModule.user)

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <header className='app-header flex' style={{ justifyContent: 'space-between' }}>
            <div className='flex' style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ fontSize: '2em' }}><i className="fa-brands fa-airbnb"></i></div>
                <h1 style={{ fontSize: '1.5em' }}>airbnb</h1>
            </div>
            <ExploreBy />
            <div className='flex' style={{ gap: 20, color: 'black', alignItems: 'center', }}>
                <div>Airbnb your home</div>
                <div><i className="fa-solid fa-globe"></i></div>
                <div className='flex' style={{ gap: 10, alignItems: 'center' }}>
                    <div><i className="fa-solid fa-bars"></i></div>
                    <div><i className="fa-solid fa-user"></i></div>
                </div>
            </div>
            {/* <div>
        {user && (
          <span className='user-info'>
            <Link to={`user/${user._id}`}>
              {user.imgUrl && <img src={user.imgUrl} />}
              {user.fullname}
            </Link>
            <span className='score'>{user.score?.toLocaleString()}</span>
            <button onClick={onLogout}>Logout</button>
          </span>
        )}
        {!user && (
          <section className='user-info'>
            <LoginSignup onLogin={onLogin} onSignup={onSignup} />
          </section>
        )}
      </div>
      <UserMsg /> */}
        </header>
    )

}
