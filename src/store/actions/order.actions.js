import { orderService } from '../../services/order.service'
import { store } from '../store.js'
import { ADD_ORDER, REMOVE_ORDER, SET_ORDERS } from '../reducer/order.reducer'
import { SET_SCORE, SET_WATCHED_USER } from '../reducer/user.reducer'

// Action Creators
export function getActionRemoveOrder(orderId) {
  return { type: REMOVE_ORDER, orderId }
}
export function getActionAddOrder(order) {
  return { type: ADD_ORDER, order }
}
export function getActionSetWatchedUser(user) {
  return { type: SET_WATCHED_USER, user }
}

export async function loadOrders() {
  try {
    const orders = await orderService.query()
    store.dispatch({ type: SET_ORDERS, orders })
  } catch (err) {
    console.log('OrderActions: err in loadOrders', err)
    throw err
  }
}

export async function addOrder(order) {
  try {
    const addedOrder = await orderService.add(order)
    store.dispatch(getActionAddOrder(addedOrder))
    const { score } = addedOrder.byUser
    store.dispatch({ type: SET_SCORE, score })
  } catch (err) {
    console.log('OrderActions: err in addOrder', err)
    throw err
  }
}

export async function removeOrder(orderId) {
  try {
    await orderService.remove(orderId)
    store.dispatch(getActionRemoveOrder(orderId))
  } catch (err) {
    console.log('OrderActions: err in removeOrder', err)
    throw err
  }
}
