import {
    COUNT_ADD
} from './action-types';


export const addCount = (count) => {
    //给reducer
    return {
        type: COUNT_ADD,
        payload: count
    }
}