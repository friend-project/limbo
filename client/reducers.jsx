import { combineReducers } from 'redux'

import count from './component/count/reducer'
import async from './component/async/reducer'

const rootReducer = combineReducers({
  count,
  async,
})

export default rootReducer

