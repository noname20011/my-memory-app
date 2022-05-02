import * as api from '../api/index'
import { authActionsType } from '../constants/actionsType'

export const signIn = (formData, negative) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData)
        dispatch({ type: authActionsType.LOGIN, data})
        negative('/')
    } catch (error) {
        console.log(error.message);
    }
}

export const signUp = (formData, negative) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData)
        dispatch({ type: authActionsType.SIGNUP, data})
        negative('/')
    } catch (error) {
        console.log(error.message);
    }
}

