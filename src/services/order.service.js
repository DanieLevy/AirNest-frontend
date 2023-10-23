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
    const orders = await storageService.query('order')

    // If a userId is provided in filterBy, filter the orders by that userId.
    if (filterBy.userId) {
      return orders.filter((order) => order.userId === filterBy.userId)
    }

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
  const { checkIn, checkOut, adults, children, stay, buyer, hostId, hostName } = orderDetails

  const orderToAdd = {
    checkIn,
    checkOut,
    adults,
    children,
    stay: {
      _id: stay._id,
      name: stay.name,
      price: stay.price,
    },
    buyer: {
      _id: buyer._id,
      fullname: buyer.fullname,
    },
    hostId,
    hostName,
  }

  try {
    const addedOrder = await storageService.post('order', orderToAdd)
    return addedOrder
  } catch (err) {
    console.log('problem adding order!', err)
    throw err
  }
}
