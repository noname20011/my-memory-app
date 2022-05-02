import React, { useEffect } from 'react'
import { Paper, Typography, Divider } from '@material-ui/core'
import moment from 'moment'
import useStyle from './style'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getPost, getPostsSearch } from '../../actions/posts'
import { CircularProgress } from '@material-ui/core'
import { Container } from '@material-ui/core'


const PostDetail = () => {
    const { isLoading, post, posts } = useSelector(state => state.posts)
    const classes = useStyle()
    const { id } = useParams()
    const dispatch = useDispatch()
    const negative = useNavigate()

    useEffect(() => {
        dispatch(getPost(id))
    }, [id, dispatch])

    
    useEffect(() => {
        if(post) dispatch(getPostsSearch({ search: 'none', tags: post?.tags?.join(',') }))
    }, [post, dispatch] )

    if (!post) return   

    const openPost = (id) => negative(`/posts/posts/${id}`)

    const recommendedPosts = posts['data'].filter( _id  => _id !== post._id)

    if(isLoading) return(
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em"/>
            </Paper>)


    
    return (
        <Paper style={{ padding: '20px', borderRadius: '15px', width: '1020px', margin: '0 auto' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                <Typography variant="h3" component="h2">{post.title}</Typography>
                <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                <Typography variant="h6">Created by: {post.name}</Typography>
                <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                <Divider style={{ margin: '20px 0' }} />
                <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                <Divider style={{ margin: '20px 0' }} />
                {/* <CommentSection post={post} /> */}
                <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>
            </div>
            {!!recommendedPosts.length && (
                <div className={classes.section}>
                <Typography gutterBottom variant="h5">You might also like:</Typography>
                <Divider />
                <div className={classes.recommendedPosts}>
                    {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                    <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                        <Typography gutterBottom variant="h6">{title}</Typography>
                        <Typography gutterBottom variant="subtitle2">{name}</Typography>
                        <Typography gutterBottom variant="subtitle2">{message}</Typography>
                        <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                        <img src={selectedFile} width="200px" />
                    </div>
                    ))}
                </div>
                </div>
            )}
        </Paper>
    )
}

export default PostDetail