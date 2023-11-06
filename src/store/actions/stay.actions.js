import { stayService } from '../../services/stay.service.js'
import { userService } from '../../services/user.service.js'
import { store } from '../store.js'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import {
  ADD_STAY,
  REMOVE_STAY,
  SET_STAYS,
  UNDO_REMOVE_STAY,
  UPDATE_STAY,
  SET_FILTERED_STAYS,
} from '../reducer/stay.reducer.js'
import { LOADING_DONE, LOADING_START } from '../reducer/system.reducer'
import { httpService } from '../../services/http.service.js'
// import { SET_SCORE } from "../user.reducer.js";

// Action Creators:
export function getActionRemoveStay(stayId) {
  return {
    type: REMOVE_STAY,
    stayId,
  }
}
export function getActionAddStay(stay) {
  return {
    type: ADD_STAY,
    stay,
  }
}
export function getActionUpdateStay(stay) {
  return {
    type: UPDATE_STAY,
    stay,
  }
}

export async function loadStays(params) {
  store.dispatch({ type: LOADING_START })
  try {
    const stays = await stayService.query(params)
    store.dispatch({
      type: SET_STAYS,
      stays,
    })
    // store.dispatch({
    //   type: SET_FILTERED_STAYS,
    //   stays,
    // })
  } catch (err) {
    console.log('Cannot load stays', err)
    throw err
  } finally {
    store.dispatch({ type: LOADING_DONE })
  }
}

// export async function loadAllStays() {
//   try {
//     const stays = await httpService.get(`stay`)
//     return stays
//   } catch (err) {
//     console.log('Cannot load stays', err)
//     throw err
//   }
// }

export async function loadStay(stayId) {
  try {
    const stay = await stayService.getById(stayId)
    return stay
  } catch (err) {
    console.log('Cannot load stays', err)
    throw err
  }
}

export async function removeStay(stayId) {
  try {
    await stayService.remove(stayId)
    store.dispatch(getActionRemoveStay(stayId))
  } catch (err) {
    console.log('Cannot remove stay', err)
    throw err
  }
}

export async function addStay(stay) {
  try {
    const savedStay = await stayService.save(stay)
    store.dispatch(getActionAddStay(savedStay))
    return savedStay
  } catch (err) {
    console.log('Cannot add stay', err)
    throw err
  }
}

export async function updateStay(stay) {
  try {
    const savedStay = await stayService.save(stay)
    store.dispatch(getActionUpdateStay(savedStay))
    return savedStay
  } catch (err) {
    console.log('Cannot save stay', err)
    throw err
  }
}

// export function filterStays(properties, params) {
//   const stays = stayService.filterStays(properties, params)
//   store.dispatch({
//     type: SET_FILTERED_STAYS,
//     stays,
//   })
// }
export function filterStays(params) {
  return (dispatch, getState) => {
    const { allStays } = getState() // Assuming `allStays` holds the unfiltered list

    // Convert the incoming parameters to a params object, similar to `getParams`
    const paramsObj = getParams(params)

    // Start with all stays and apply filters as needed
    let staysToReturn = allStays

    const minPrice = +paramsObj.minPrice
    const maxPrice = +paramsObj.maxPrice
    staysToReturn = stayService.filterStaysByPrice(staysToReturn, minPrice, maxPrice)

    // Apply other filters based on the presence of parameters
    if (paramsObj.bedrooms) {
      staysToReturn = staysToReturn.filter((stay) => stay.bedrooms >= +paramsObj.bedrooms)
    }
    if (paramsObj.beds) {
      staysToReturn = staysToReturn.filter((stay) => stay.beds >= +paramsObj.beds)
    }
    if (paramsObj.bathrooms) {
      staysToReturn = staysToReturn.filter((stay) => stay.bathrooms >= +paramsObj.bathrooms)
    }
    if (paramsObj.amenities) {
      staysToReturn = staysToReturn.filter((stay) =>
        paramsObj.amenities
          .split(',')
          .every((amenity) => stay.amenities.some((item) => new RegExp(amenity, 'i').test(item)))
      )
    }

    // Dispatch the action to set the filtered stays in the store
    dispatch({
      type: SET_FILTERED_STAYS,
      payload: staysToReturn,
    })
  }
}

export function getResultLength(filter, stays) {
  return stayService.getResultLength(filter, stays)
}

function getParams(params) {
  const paramsObject = {}
  for (const key of params.keys()) {
    paramsObject[key] = params.get(key)
  }
  return paramsObject
}

//was Cart
// export function addToStay(stay) {
//     store.dispatch({
//         type: ADD_STAY,
//         stay
//     })
// }

// export function removeFromStay(stayId) {
//     store.dispatch({
//         type: REMOVE_STAY,
//         stayId
//     })
// }

// export async function checkout(total) {
//     try {
//         const score = await userService.changeScore(-total)
//         store.dispatch({ type: SET_SCORE, score })
//         store.dispatch({ type: CLEAR_STAY })
//         return score
//     } catch (err) {
//         console.log('StayActions: err in checkout', err)
//         throw err
//     }
// }

// Demo for Optimistic Mutation
// (IOW - Assuming the server call will work, so updating the UI first)
