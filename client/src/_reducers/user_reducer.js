import { 
    LOGIN_USER, REGISTER_USER, AUTH_USER
 } from "../_action/types";


export default function (state = {}, action) {  // 현재 state는 비어있는 상태
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }

        case REGISTER_USER:
            return { ...state, registerSuccess: action.payload }

        case AUTH_USER:
            return { ...state, userData: action.payload }

    
        default:
            return state;
    }
}