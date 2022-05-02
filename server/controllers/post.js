import mongoose from "mongoose";
import PostMessage from "../modules/postMessageModel.js"

export const getPosts = async (req, res) => {
    const { page } = req.query
    try {
        const LIMIT = 6
        const startIndex = (Number(page) - 1) * LIMIT;
        const  total = await PostMessage.countDocuments({})
        const postMessage  = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex)
        res.status(200).json({ data: postMessage, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) })
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params
    try {
        const post = await PostMessage.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const getPostsSearch = async (req, res) => {
    const { search, tags } = req.query
    try {
        const title = new RegExp(search, 'i')
        const posts = await PostMessage.find({ $or : [{ title }, { tags : { $in: tags.split(' ') }} ]})
        res.json({ data: posts })
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const createPosts = async (req, res) => {
    const { title, message, selectedFile, creator,creatorId, tags } = req.body;
    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags, creatorId})
    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error });
    }

}

export const updatePost = async (req, res) => {
    const { id } = req.params
    const { title, message, creator, tags, likeCount } = req.body

    if(!mongoose.Types.ObjectId(id)) return res.status(404).send('No find post with that id!')

    const updatePost = {  title, message, creator, tags, likeCount }
    await PostMessage.findByIdAndUpdate(id, updatePost, { new : true })
    res.json(updatePost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId(id)) return res.status(404).send('No find post with that id!')

    await PostMessage.findByIdAndRemove(id)
    res.json({ message: 'Post delete successfully!' })
}

export const likePost = async (req, res) => {
    const  { id } = req.params

    try {
        if(!req.userId) res.status(400).json({ message: 'Unauthenticated!'})

        if(!mongoose.Types.ObjectId(id)) return res.status(404).send('No find post with that id!')
        
        const post = await PostMessage.findById(id)
        const index = await post.likes.findIndex(id => id === String(req.userId))

        if(index === -1){
            post.likes.push(req.userId)
        } else {
            post.likes = post.likes.filter(id => id !== String(req.userId))
        }
        const likedPost = await PostMessage.findByIdAndUpdate( id, post, { new: true })
        res.json(likedPost)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}