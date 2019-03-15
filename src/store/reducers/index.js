import { combineReducers } from 'redux';   //将多个reducer合成一个总的reducer

//所有的reducer
import authReducer from './auth'


export default combineReducers({
  'auth':authReducer
})