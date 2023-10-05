import { orderService } from '../../services/order.service'
import { store } from '../store.js'
import { ADD_ORDER, REMOVE_ORDER, SET_ORDERS } from '../reducer/order.reducer'
import { LOADING_DONE, LOADING_START } from '../reducer/system.reducer'

// Synchronous Action Creators
export function getActionRemoveOrder(orderId) {
  return { type: REMOVE_ORDER, orderId }
}

export function getActionAddOrder(order) {
  console.log('🚀 ~ file: order.actions.js:13 ~ getActionAddOrder ~ order:', order)

  return { type: ADD_ORDER, order }
}

export function setOrdersAction(orders) {
  return { type: SET_ORDERS, orders }
}

// Asynchronous Functions
export async function loadOrders() {
  store.dispatch({ type: LOADING_START })
  try {
    const orders = await orderService.query()

    console.log('🚀 ~ file: order.actions.js:25 ~ loadOrders ~ orders:', orders)

    store.dispatch({ type: SET_ORDERS, orders })
  } catch (err) {
    console.log('OrderActions: err in loadOrders', err)
    throw err
  } finally {
    store.dispatch({ type: LOADING_DONE })
  }
}

export async function addOrder(order) {
  store.dispatch({ type: LOADING_START })
  try {
    const addedOrder = await orderService.add(order)
    store.dispatch(getActionAddOrder(addedOrder))
  } catch (err) {
    console.log('OrderActions: err in addOrder', err)
    throw err
  } finally {
    store.dispatch({ type: LOADING_DONE })
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
