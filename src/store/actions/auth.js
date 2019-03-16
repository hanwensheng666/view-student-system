import { LOGIN,LOGOUT } from '@/store/action-types';


export const loginAction = data => dispatch=>{
  dispatch({
    type:LOGIN,
    payload:data
  })
}

export const logoutAction = () => dispatch=>{
  dispatch({
    type:LOGOUT
  })
}