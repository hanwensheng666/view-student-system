import { combineReducers } from 'redux';   //将多个reducer合成一个总的reducer

//所有的reducer
import testReducer from './testReducer'


export default combineReducers({
  "test":testReducer,
})