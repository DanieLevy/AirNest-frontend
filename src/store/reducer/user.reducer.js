import { userService } from '../../services/user.service.js'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_COUNT = 'CHANGE_COUNT'
export const SET_USER = 'SET_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_SCORE = 'SET_SCORE'
export const SET_LOGIN_MODAL = 'SET_LOGIN_MODAL'
export const SET_REVIEWS_MODAL = 'SET_REVIEWS_MODAL'
export const SET_EXPLORE_EXPANDED = 'SET_EXPLORE_EXPANDED'
export const SET_FILTER_MODAL = 'SET_FILTER_MODAL'

const initialState = {
    count: 10,
    user: userService.getLoggedinUser(),
    users: [],
    watchedUser : null,
    loginModal: false,
    reviewsModal: false,
    isExploreExpanded: false,
    filterModal: false
}

export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case INCREMENT:
            newState = { ...state, count: state.count + 1 }
            break
        case DECREMENT:
            newState = { ...state, count: state.count - 1 }
            break
        case CHANGE_COUNT:
            newState = { ...state, count: state.count + action.diff }
            break
        case SET_USER:
            newState = { ...state, user: action.user }
            break
        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.user }
            break
        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break
        case SET_USERS:
            newState = { ...state, users: action.users }
            break
        case SET_SCORE:
            newState = { ...state, user: { ...state.user, score: action.score } }
            break

        case SET_LOGIN_MODAL:
            newState = { ...state, loginModal: action.loginModal }
            break

        case SET_FILTER_MODAL:
            newState = { ...state, filterModal: action.filterModal }
            break
        
        case SET_REVIEWS_MODAL:
            newState = { ...state, reviewsModal: action.reviewsModal }
            break

        case SET_EXPLORE_EXPANDED:
            newState = { ...state, isExploreExpanded: action.isExploreExpanded }
            break

        default:
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}
