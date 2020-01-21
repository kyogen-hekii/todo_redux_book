// In your root reducer file,
// * Create a function that takes history as an argument and returns a root reducer.
// * Add router reducer into root reducer by passing history to connectRouter.
// * Note: The key MUST be router.

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import tasksReducer from './tasks'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  tasks: tasksReducer,
})
export default createRootReducer
