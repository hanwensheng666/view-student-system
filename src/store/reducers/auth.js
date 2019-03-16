import { LOGIN,LOGOUT } from '@/store/action-types';


const initialState = {
  token:'',
  isLogin:false,
  userInfo:{}
}

export default function (state=initialState,action) {
  switch(action.type){
    case LOGIN:{
      return {
        ...state,
        token:action.payload.token,
        isLogin:true,
        userInfo:action.payload.userInfo,
        identity:action.payload.identity
      }
    }
    case LOGOUT: {
      return {
        ...state,
        token:'',
        isLogin:false,
        userInfo:{}
      }
    }
    default:{
      return state
    }
  }
}