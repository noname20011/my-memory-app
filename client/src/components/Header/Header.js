import React, { useEffect, useState } from 'react'
import {  AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import image from '../../images/memories.png'
import useStyle from './style'
import { useDispatch } from 'react-redux'
import { authActionsType } from '../../constants/actionsType'
import { useLocation } from 'react-router-dom'
import jwtDecode from 'jwt-decode'


const Header = () => {
    const [openOption, setOpenOption] = useState(false)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const classes = useStyle()
    const dispatch = useDispatch()
    const negative = useNavigate()
    const location = useLocation()

    useEffect(() => {

        const token = user?.tokenId
        
        if(token) {
            const decodeToken = jwtDecode(token)
            if (decodeToken.exp * 1000 < new Date().getTime()) {
                handleLogOut()
            }
        } 
        
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])

    const handleLogOut = () => {
        dispatch({ type: authActionsType.LOGOUT, data: null})
        negative('/')
    }

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>Memories</Typography>
                <img className={classes.image} src={image} alt='memories app' height={60} />
            </div>
            <Toolbar>
                {user ? (
                    <div className={classes.profile} onClick={() => setOpenOption(openOption => !openOption)}>
                        <Avatar className={classes.purple}  alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6' >{user?.result.name}</Typography>
                        {openOption ? (
                            <div className={classes.option}>
                                <ul><li><Button className={classes.logout} variant='container' onClick={handleLogOut} >Log Out</Button></li></ul>
                            </div>
                        ) : null}
                    </div>

                ) : (
                    <Button className={classes.login} component={Link} to='/auth'>Log In</Button>
                ) }
            </Toolbar>
        </AppBar>                    
            
    )
}

export default Header