import * as api from '../api'
import { actionsType } from '../constants/actionsType'

export const getPosts = (page) => async(dispatch) => {
    try {
        dispatch({ type: actionsType.START_LOADING })
        const { data, currentPage, numberOfPages } = await api.fetchPosts(page)
        dispatch({ type: actionsType.FETCH_ALL , payload: { data, currentPage, numberOfPages }})
        dispatch({ type: actionsType.END_LOADING})
    } catch (error) {
        console.log("Err:", error);
    }
}

export const getPost = (postId) => async (dispatch) => {
    try {
        dispatch({ type: actionsType.START_LOADING})
        const { data } = await api.fetchPost(postId)
        dispatch({ type: actionsType.FETCH_POST, payload: data})
        
        dispatch({ type: actionsType.END_LOADING})
    } catch (error) {
        
    }

}
export const getPostsSearch = (searchQuery) => async(dispatch) => {
    try {
        dispatch({ type: actionsType.START_LOADING })
        const { data } = await api.getPostSearch(searchQuery)

        dispatch({ type: actionsType.FETCH_SEARCH , payload: data })
        dispatch({ type: actionsType.END_LOADING})
    } catch (error) {
        console.log("Err:", error);
    }
}

export const createdPost = (newPost) => async (dispatch) => {
    try {
        dispatch({ type: actionsType.START_LOADING })
        const { data }  = await api.createPost(newPost)
        dispatch({ type: actionsType.CREATE, payload: data})
        dispatch({ type: actionsType.END_LOADING})
        console.log(data);
    } catch (error) {
        console.log("Err:", error);
    }
}

export const updatedPost = (id, updatePost) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, updatePost)
        dispatch({type: actionsType.UPDATE, payload: data})
    } catch (error) {
        console.log("Err:", error);
    }
}

export const deletedPost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({type: actionsType.DELETE, payload: id})
    } catch (error) {
        console.log("Err:", error);
    }
}

export const likedPost = (postId) => async (dispatch) => {
    try {
        const { data } = await api.likePost(postId)
        dispatch({type: actionsType.LIKE, payload: data })
        console.log(data);
    } catch (error) {
        console.log("Err:", error);
    }
}
