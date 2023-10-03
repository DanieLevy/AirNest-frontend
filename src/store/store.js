import { createStore, combineReducers } from 'redux'

import { stayReducer } from './reducer/stay.reducer.js'
import { userReducer } from './reducer/user.reducer.js'
import { reviewReducer } from './reducer/review.reducer.js'
import { systemReducer } from './reducer/system.reducer.js'

const rootReducer = combineReducers({
    stayModule: stayReducer,
    userModule: userReducer,
    systemModule: systemReducer,
    reviewModule: reviewReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)


store.subscribe(() => {
    console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
    console.log('*******************************')
})



