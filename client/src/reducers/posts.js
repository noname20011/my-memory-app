import { actionsType } from "../constants/actionsType"

const initialState ={
    isLoading: true,
    posts: []
}

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionsType.START_LOADING: 
            return { ...state, isLoading: true }
        case actionsType.END_LOADING: 
            return { ...state, isLoading: false }
        case actionsType.FETCH_ALL:
            return { ...state,
                    posts: payload.data,
                    currentPage: payload.currentPage,
                    numberOfPages: payload.numberOfPages }
        case actionsType.FETCH_POST:
            return { ...state, post: payload }
        case actionsType.FETCH_SEARCH:
            return  { ...state, posts: payload}
        case actionsType.CREATE:
            return { ...state, payload }
        case actionsType.UPDATE:
        case actionsType.LIKE:
            return { ...state, posts: state.posts.map(post => post._id === payload._id ? payload : post) }
        case actionsType.DELETE:
            return { ...state, posts: state.posts.filter(post => post._id !== payload) }
        default:
            return state;
    }
}

export default reducer  