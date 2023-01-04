import { 
    LOGIN_USER, REGISTER_USER
 } from "../_action/types";


export default function (state = {}, action) {  // 현재 state는 비어있는 상태
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
            break;
        case REGISTER_USER:
            return { ...state, registerSuccess: action.payload }
            break;
    
        default:
            return state;
    }
}