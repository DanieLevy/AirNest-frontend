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
    store.dispatch({
      type: SET_FILTERED_STAYS,
      stays,
    })
  } catch (err) {
    console.log('Cannot load stays', err)
    throw err
  } finally {
    store.dispatch({ type: LOADING_DONE })
  }
}

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

export function filterStays(properties, params) {
  const stays = stayService.filterStays(properties, params)
  store.dispatch({
    type: SET_FILTERED_STAYS,
    stays,
  })
}

export function getResultLength(filter, stays) {
  return stayService.getResultLength(filter, stays)
}
