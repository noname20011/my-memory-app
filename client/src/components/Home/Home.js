import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPosts ,getPostsSearch } from '../../actions/posts' 
import { Grow, Container, Grid, Typography, AppBar, Button, TextField, Paper } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'
import { useNavigate, useLocation } from 'react-router-dom'
import useStyle from './style'
import Form from '../Form/Form'
import Posts from '../Posts/Posts'
import Paginate from '../Pagination'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const dispatch = useDispatch()
    const negative = useNavigate()
    const classes = useStyle()
    const query = useQuery()
    const page = query.get('page') 
    const searchQuery = query.get('search') 

    const [currentId, setCurrentId] = useState(null)
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])
    
    useEffect(() => {
        dispatch(getPosts(page))
    }, [currentId, dispatch,page])


    const handleSearch = (e) => {
        if(e.keyCode === 13) {
            handleSearchPost()
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag])
    const handleDelete = (deleteTag) => setTags(tags.filter(tag => tag !== deleteTag))

    const handleSearchPost = () => {
        if(search.trim() || tags) {
            dispatch(getPostsSearch({ search: search, tags: tags.join(',')}))
            negative(`/posts/search?search=${search || 'none'}&tags=${tags.join(',') || 'none'}`)
        } else {
            negative('/')
        }
    } 

    return (
        <Grow in>
            <Container maxWidth='lg'>
                <div style={{marginBottom: '0'}}><Typography variant='h3' color='textPrimary' fontWeight='medium'>Memories</Typography></div>
                <Grid className={classes.mainContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={6} md={9} style={{position: 'relative'}}>
                        <Posts setCurrentId={setCurrentId} />
                        {!searchQuery && !tags.length && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Paginate page={page}/>
                            </Paper>
                        )}
                    </Grid>
                    <Grid item xs={8} sm={4} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <Typography variant='h6' align='center'>Search</Typography>
                            <TextField name='search' variant='outlined' 
                                label='Search Title' fullWidth value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyUp={handleSearch}
                            />
                            <ChipInput style={{margin: '20px 0'}} variant='outlined' label=' Search tags'
                                    value={tags}
                                    onAdd={handleAdd}
                                    onDelete={handleDelete}
                            />
                            <Button className={classes.btnSearch} onClick={handleSearchPost}>Search Post</Button>
                        </AppBar>
                        <Form  currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home