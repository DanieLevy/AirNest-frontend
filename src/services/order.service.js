import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'

export const orderService = {
  add,
  query,
  remove,
}

async function query(filterBy) {
  try {
    const orders = await storageService.query('order')

    return orders
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

async function remove(orderId) {
  await httpService.delete(`order/${orderId}`)
  // await storageService.remove('order', orderId)
}

async function add(orderDetails) {
  const { startDate, endDate, adults, children } = orderDetails

  console.log('🚀 ~ file: order.service.js:25 ~ add ~ orderDetails:', orderDetails)

  const orderToAdd = {
    startDate,
    endDate,
    adults,
    children,
  }
  const addedOrder = await storageService.post('order', orderToAdd)

  return addedOrder

  /*
  TODO: add user (byuser)
  const aboutUser = await userService.getById(aboutUserId)
  const loggedInUser = userService.getLoggedinUser()
  const addedOrder = await httpService.post(`order`, { txt, aboutUserId })
  return addedOrder
*/
}
