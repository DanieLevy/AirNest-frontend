export const SET_STAYS = 'SET_STAYS'
export const REMOVE_STAY = 'REMOVE_STAY'
export const ADD_STAY = 'ADD_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'
export const UNDO_REMOVE_STAY = 'UNDO_REMOVE_STAY'
export const SET_FILTERED_STAYS = 'SET_FILTERED_STAYS'
export const SET_STAY_LOCATION = 'SET_STAY_LOCATION'

const initialState = {
  stays: [],
  lastRemovedStay: null,
  filteredStays: [],
  stayLocation: null,
}

export function stayReducer(state = initialState, action) {
  var newState = state
  var stays
  switch (action.type) {
    case SET_STAYS:
      newState = { ...state, stays: action.stays }
      break
    case REMOVE_STAY:
      const lastRemovedStay = state.stays.find((stay) => stay._id === action.stayId)
      stays = state.stays.filter((stay) => stay._id !== action.stayId)
      newState = { ...state, stays, lastRemovedStay }
      break
    case ADD_STAY:
      newState = { ...state, stays: [...state.stays, action.stay] }
      break
    case UPDATE_STAY:
      stays = state.stays.map((stay) => (stay._id === action.stay._id ? action.stay : stay))
      newState = { ...state, stays }
      break

    case SET_STAY_LOCATION:
      newState = { ...state, stayLocation: action.location }
      break

    case UNDO_REMOVE_STAY:
      if (state.lastRemovedStay) {
        newState = {
          ...state,
          stays: [...state.stays, state.lastRemovedStay],
          lastRemovedStay: null,
        }
      }
      break
    case SET_FILTERED_STAYS:
      newState = { ...state, filteredStays: action.stays }
      break
    default:
  }
  return newState
}
