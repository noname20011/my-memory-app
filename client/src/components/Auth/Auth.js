import { Paper, Grid, Button, Avatar, Typography, Container } from '@material-ui/core'
import { LockOpenOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { GoogleLogin} from 'react-google-login'
import useStyle from './sytyle'
import Input from './Input'
import Icon from './Icon'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authActionsType, actionsType } from '../../constants/actionsType'
import { signIn, signUp } from '../../actions/auth'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
const Auth = () => {
    

    const dispatch = useDispatch()
    const [form, setForm] = useState(initialState)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const classes = useStyle()
    const negative = useNavigate()
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if( isSignUp){
            dispatch(signUp(form, negative))
        } else {
            dispatch(signIn(form, negative))
        }
    }

    const handleShowPassword = () =>  setShowPassword(prevShowPassword => !prevShowPassword)
    const handleShowConfirmPassword = () =>  setShowConfirmPassword(prevShowConfirmPassword => !prevShowConfirmPassword)

    const switchMode = () => {
        setForm(initialState)
        setIsSignUp(isSignUp => !isSignUp)
        setShowPassword(false)
        setShowConfirmPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = await res?.profileObj
        const tokenId = await res?.tokenId

        try {
            dispatch({ type: authActionsType.AUTH, data: { result, tokenId }})
            negative('/')
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = async (res) => {
        console.log(res.error);
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOpenOutlined fontSize='small'/>
                </Avatar>
                <Typography variant='h5'>{ !isSignUp ? 'Sign In' : 'Sign Up'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignUp ? (
                            <>
                                <Input name='firstName' autoFocus  label='First Name' handleChange={handleChange} half/>
                                <Input name='lastName' label='Last Name' handleChange={handleChange}  half/>
                            </>
                        ) : null}  
                        <Input name='email'  label='Email' handleChange={handleChange} type='email' autoFocus={isSignUp ? false : true}/>
                        <Input name='password' label='Password' 
                                handleChange={handleChange} 
                                type={showPassword ? 'text' : 'password'} 
                                handleShowPassword={handleShowPassword}
                                onBlur={() => setShowConfirmPassword(false)}/>
                        { isSignUp ? (
                            <Input name='confirmPassword' label='Confirm Password' 
                                    handleChange={handleChange}  
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    handleShowPassword={handleShowConfirmPassword}
                                    onBlur={() => setShowConfirmPassword(false)}/>
                        ) : null} 
                        <GoogleLogin
                            clientId='456668442058-stidib8tmc8atpqcrk7a2hce602nndsh.apps.googleusercontent.com'
                            render={(renderProps) => (
                                <Button className={classes.googleButton} 
                                        color='primary' fullWidth 
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        startIcon={<Icon/>} variant='contained'>
                                            Sign in with Google
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                        />
                        <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                            { isSignUp ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <Container container justify='flex-end'>
                            <Typography variant='body2'>
                                { isSignUp ? (<>
                                        Already have an account? 
                                        <Button onClick={switchMode}>Log in here</Button>
                                    </>
                                ) : ( <>
                                        Don't have an account?
                                        <Button onClick={switchMode}>Sign up here</Button>
                                    </>
                                )}
                            .</Typography>
                        </Container>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth