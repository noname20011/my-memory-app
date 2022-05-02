import axios from "axios";

// const URL = 'http://localhost:5000'

const API = axios.create({
    baseURL: 'http://localhost:5000'
})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        if(JSON.parse(localStorage.getItem('profile')).token) {
            req.headers.Authorization = `Bearer ${ JSON.parse(localStorage.getItem('profile')).token }`
        } else {
            req.headers.Authorization = `Bearer ${ JSON.parse(localStorage.getItem('profile')).tokenId }`
        }
    }
    return req
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`)

export const fetchPost = (postId) => API.get(`/posts/post/${postId}`)

export const getPostSearch = (searchQuery) => API.get(`/posts/search?search=${searchQuery.search || 'none'}&tags=${searchQuery.tags || 'none'}`)

export const createPost = (newPost) => API.post(`/posts`, newPost)

export const updatePost = (postId, updatedPost) => API.patch(`/posts/${postId}`, updatedPost)

export const deletePost = (postId) => API.delete(`/posts/${postId}`)

export const likePost = (postId) => API.patch(`/posts/${postId}/likepost`)

export const signIn = (formData) => API.post(`/user/login`, formData)

export const signUp = (formData) => API.post(`/user/signup`, formData)
