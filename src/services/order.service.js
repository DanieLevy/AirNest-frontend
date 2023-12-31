import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'

export const orderService = {
  add,
  query,
  remove,
}

async function query(filterBy = {}) {
  try {
    // const orders = await storageService.query('order')
    const orders = await httpService.get('order', filterBy)

    // if (filterBy.logginUser) {
    //   return orders.filter((order) => order.buyer._id === filterBy.logginUser._id)
    // }

    return orders
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

async function remove(orderId) {
  // await httpService.delete(`order/${orderId}`)
  await storageService.remove('order', orderId)
}

async function add(orderDetails) {
  console.log('🚀 ~ file: order.service.js:33 ~ add ~ orderDetails:', orderDetails)
  // const { checkIn, checkOut, guests, stay, buyer, hostId, hostName, status } = orderDetails

  // const orderToAdd = {
  //   checkIn,
  //   checkOut,
  //   guests,
  //   status,
  //   stay: {
  //     _id: stay._id,
  //     name: stay.name,
  //     price: stay.price,
  //   },
  //   buyer: {
  //     _id: buyer._id,
  //     fullname: buyer.fullname,
  //   },
  //   hostId,
  //   hostName,
  // }

  try {
    // const addedOrder = await storageService.post('order', orderToAdd)
    const addedOrder = await httpService.post('order', orderDetails)
    return addedOrder
  } catch (err) {
    console.log('problem adding order!', err)
    throw err
  }
}
