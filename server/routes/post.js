import express from "express";
import { getPosts, getPost, getPostsSearch, createPosts, updatePost, deletePost, likePost } from "../controllers/post.js";
import auth from "../middleware/auth.js";

const router = express.Router()

router.get('/', getPosts)
router.get('/post/:id', getPost)
router.get('/search', getPostsSearch)
router.post('/', auth, createPosts)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likepost', auth, likePost)
export default router