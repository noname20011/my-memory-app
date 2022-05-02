import React from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import useStyle from './style'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPosts } from '../actions/posts';

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector(state => state.posts.posts)
    const dispatch = useDispatch()
    const classes = useStyle()

    useEffect(() => {
        if(page) dispatch(getPosts(page))
    }, [page, dispatch])

    return (
        <Pagination
        classes={{ ul: classes.ul }}
        count={numberOfPages}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
            <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
        )}
        />
    )
}

export default Paginate