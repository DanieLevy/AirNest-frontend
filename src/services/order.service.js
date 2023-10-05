import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'

export const orderService = {
  add,
  query,
  remove,
}

function query(filterBy) {
  var queryStr = !filterBy ? '' : `?name=${filterBy.name}&sort=anaAref`
  // return httpService.get(`order${queryStr}`)
  return storageService.query('order')
}

async function remove(orderId) {
  await httpService.delete(`order/${orderId}`)
  // await storageService.remove('order', orderId)
}

async function add(orderDetails) {
  const { startDate, endDate, adults, children } = orderDetails
  const orderToAdd = {
    startDate,
    endDate,
    adults,
    children,
  }
  try {
    const addedOrder = await storageService.post('order', orderToAdd)
    return addedOrder
  } catch (err) {
    console.log('problem adding order!', err)
    throw err
  }

  /*
  TODO: add user (byuser)
  const aboutUser = await userService.getById(aboutUserId)
  const loggedInUser = userService.getLoggedinUser()
  const addedOrder = await httpService.post(`order`, { txt, aboutUserId })
  return addedOrder
*/
}
