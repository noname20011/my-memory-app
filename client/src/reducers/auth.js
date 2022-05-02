import { authActionsType } from "../constants/actionsType"

const initialState = {
    authData: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authActionsType.AUTH:
        case authActionsType.SIGNUP:
        case authActionsType.LOGIN:
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return { ...state, authData: action?.data}

        case authActionsType.LOGOUT:
            localStorage.clear()
            return { ...state, authData: action?.data }

        default:
            return state
    }
}

export default authReducer