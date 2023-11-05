import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  update,
  changeScore,
  getEmptyCredentials,
  demoUser,
}

window.userService = userService

function getUsers() {
  // return storageService.query('user')
  return httpService.get(`user`)
}

async function getById(userId) {
  // const user = await storageService.get('user', userId)
  const user = await httpService.get(`user/${userId}`)
  return user
}

function remove(userId) {
  // return storageService.remove('user', userId)
  return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
  // const user = await storageService.get('user', _id)
  // user.score = score
  // await storageService.put('user', user)

  const user = await httpService.put(`user/${_id}`, { _id, score })
  // // Handle case in which admin updates other user's details
  // if (getLoggedinUser()._id === user._id) saveLocalUser(user)
  return user
}

async function login(userCred) {
  // const users = await storageService.query('user')
  // const users = await httpService.query('user')
  // const user = users.find((user) => user.username === userCred.username)
  const user = await httpService.post('auth/login', userCred)
  if (user) {
    return saveLocalUser(user)
  }
}
// async function signup(userCred) {
//     const user = await httpService.post('auth/signup', userCred)
//     // socketService.login(user._id)
//     return saveLocalUser(user)
// }
// async function logout() {
//     sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
//     socketService.logout()
//     return await httpService.post('auth/logout')
// }
async function signup(userCred) {
  console.log('🚀 ~ file: user.service.js:70 ~ userCred:', userCred)
  // const users = await storageService.query('user')
  // const user = await httpService.post('auth/signup', userCred)
  // console.log('🚀 ~ file: user.service.js:63 ~ signup ~ users:', user)
  // const userExist = users.find((user) => user.username === userCred.username)

  // if (userExist) {
  //   console.log('user name already exist')
  //   return
  // } else {
  // const user = await storageService.post('user', userCred)
  const user = await httpService.post('auth/signup', userCred)
  return saveLocalUser(user)
}

async function logout() {
  localStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  return await httpService.post('auth/logout')
}

async function changeScore(by) {
  const user = getLoggedinUser()
  if (!user) throw new Error('Not loggedin')
  user.score = user.score + by || by
  await update(user)
  return user.score
}

function saveLocalUser(user) {
  user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
  localStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyCredentials() {
  return {
    username: '',
    password: '',
    fullname: '',
    imgUrl: '',
  }
}

async function demoUser() {
  return {
    username: 'test',
    password: 'test',
  }
}
// ; (async () => {
//   await userService.signup({
//     fullname: 'Puki Norma', username: 'puki', password: '123', imgUrl: 'https://marketplace.canva.com/EAFqNrAJpQs/1/0/1600w/canva-neutral-pink-modern-circle-shape-linkedin-profile-picture-WAhofEY5L1U.jpg', isAdmin: false
//   })

// })()
