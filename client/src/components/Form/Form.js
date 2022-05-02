import React, { useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import useStyle from './style'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createdPost, updatedPost } from '../../actions/posts'

const user = JSON.parse(localStorage.getItem('profile'))

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ 
        title: '', message: '', tags: '', selectedFile: '' 
    })
    
    const dispatch = useDispatch()
    const classes = useStyle()
    const post = useSelector(state => currentId ? state.posts.posts['data'].find(post => post._id === currentId) : null)

    useEffect(() => {
        if(post) setPostData(post)
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault()

        if(currentId) {
            dispatch(updatedPost(currentId, { ...postData, creator: user?.result?.name}))
        } else {
            dispatch(createdPost({...postData, creator: user?.result?.name, creatorId: (user?.result?.googleId ? user?.result?.googleId : user?.result?._id )}))
        }
        clear()
    }

    const clear = () => {
        setCurrentId(null)
        setPostData({ 
            title: '', message: '', tags: '', selectedFile: '' 
        })
    }

    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper} style={{background: '#F38E7B'}}>
                <Typography variant='h6' align='center' style={{color: '#fff'}}>
                    Sign in so you can use the feature more. What are you waiting for! &#128151; &#128151;	
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a memory</Typography>
                <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
                <TextField name='message' variant='outlined' label='Message' multiline  fullWidth  value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
                <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>
                <div className={classes.fileInput}>
                    <FileBase id='memory-file' type={'file'} multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}/>
                </div>
                <Button className={classes.buttonSubmit} type='submit' variant='contained' color='primary' size='large' fullWidth >{currentId ? 'Edit' : 'Create'} Memory</Button>
                <Button onClick={clear} variant='contained' color='secondary' size='large' fullWidth>Clear Memory</Button>
            </form>
        </Paper>
    )
}

export default Form