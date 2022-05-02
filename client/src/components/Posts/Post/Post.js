import React, { useEffect } from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core'
import { ThumbUpAltOutlined, DeleteOutline, MoreHorizOutlined, ThumbUp } from '@material-ui/icons'
import { deletedPost, likedPost, getPosts } from '../../../actions/posts'
import moment from 'moment'
import useStyle from './style'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import zIndex from '@material-ui/core/styles/zIndex'


const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch()
    const negative = useNavigate()
    const classes = useStyle()
    const user = JSON.parse(localStorage.getItem('profile'))

    const handleDeletePost = () => {
        setCurrentId(null)
        dispatch(deletedPost(post._id))
    }

    const handleLikePost = () => {
        if(localStorage.getItem('profile')) {
            setCurrentId(null)
            dispatch(likedPost(post._id))
        } else {
            alert('You don\'t sign in. Please sign in to continue!')
        }
    }

    const handleEditPost = () => {
        if(localStorage.getItem('profile')) {
            const postOfUser = post.creatorId === (user?.result?.googleId || user?.result?._id)
            if(postOfUser) {
                setCurrentId(post._id)
            } else {
                alert('You don\'t have the right edit!')
            }
        }  else {
            alert('You don\'t sign in. Please sign in to continue!')
        }
    }


    const Like = () => {
        const countLikes = post.likes.length
        const isLikedPost = post.likes.find(like => like === ( user?.result?.googleId ||  user?.result?._id))
        if(countLikes > 0 ) {
            return (isLikedPost) ? (
                <><ThumbUp fontSize='small' />
                    &nbsp;{countLikes > 1 ? ` You and ${countLikes - 1} peoples liked post` : `You liked post`}&nbsp;</>
                ) : (
                <><ThumbUpAltOutlined fontSize='small'/>
                    &nbsp;{countLikes === 1 ? `${countLikes} people liked post` : `${countLikes} peoples liked post` } &nbsp;</>
                )
        } 
        return (<><ThumbUpAltOutlined fontSize='small'/>&nbsp; Like</>)
    }

    const openPost = () => negative(`/posts/post/${post._id}`)

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} component="span" name="test" onClick={openPost}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/> 
                <div className={classes.overlay}>
                    <Typography variant='h6'>{post.creator}</Typography>
                    <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
                </div>
            </ButtonBase>
            <div className={classes.overlay2}>
                { post.creatorId === (user?.result?.googleId || user?.result?._id) ? (
                <Button style={{color: 'white'}} size='small' onClick={() => handleEditPost()}>
                    <MoreHorizOutlined fontSize='medium' titleAccess='Edit'/>
                </Button>
                ) : null }
            </div>
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags.map(tag => `#${tag}`)}</Typography>
            </div>
            <CardContent style={{paddingTop: 0}}>
                <Typography className={classes.title} variant='h6' gutterBottom>{post.title}</Typography>
                <Typography className={classes.title} variant='body2' color='textSecondary'>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions} style={{justifyContent: 'space-between'}}>
                <Button className={classes.btnAction} size='small' color='primary' onClick={() => handleLikePost()}>
                    <Like/>
                </Button>
                {post.creatorId === (user?.result?._id || user?.result?.googleId) ? (
                    <Button className={classes.btnAction} size='small' color='primary' onClick={() => handleDeletePost()} >
                        <DeleteOutline fontSize='small'/>
                        &nbsp;
                        Delete
                    </Button>
                ) : null}
            </CardActions>    
        </Card>
    )
}

export default Post