import React, { useEffect } from 'react'
import { Grid, CircularProgress, Paper } from '@material-ui/core'
import Post from './Post/Post'
import useStyle from './style'
import { useSelector } from 'react-redux'

const Posts = ({ setCurrentId }) => {
    const classes = useStyle()
    const {posts, isLoading}  = useSelector(state => state.posts)

    const allPosts = posts['data']

    if(isLoading && !allPosts?.length) return(
        <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size="7em"/>
        </Paper>)

    return (
        <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
            {allPosts?.map(post => (
                <Grid item key={post._id} xs={12} sm={4}>
                    <Post post={post} setCurrentId={setCurrentId}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default Posts