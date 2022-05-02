import React from 'react'
import { Grid, TextField, InputAdornment, IconButton } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'


const Input = ({ name, half, label, handleChange, autoFocus, type, handleShowPassword }) => {

    return (
        <Grid item xs={12} sm={ half ? 6 : 12}>
            <TextField
                name={name}
                onChange={(e) => handleChange(e)}
                variant='outlined'
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={name === 'password' ? ({
                    endAdornment: (
                        <></>
                        // <InputAdornment position='end'>
                        //     <IconButton onClick={handleShowPassword}>{type === 'password' ? <Visibility/> : <VisibilityOff/>}</IconButton>
                        // </InputAdornment>
                    )
                    }) : null}
            />
        </Grid>
    )
}

export default Input