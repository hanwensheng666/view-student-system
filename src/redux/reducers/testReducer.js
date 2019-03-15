import { COUNT_ADD } from '../action-types';


const initialState = {
  count:0
}

export default function (state=initialState,action) {
  switch(action.type){
    case COUNT_ADD:{
      return {
        ...state,
        count:action.payload
      }
    }
    default:{
      return state
    }
  }
}