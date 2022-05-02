import React from 'react'
import { Typography } from '@material-ui/core'

const Error = (message) => {
    return (
        <div>
            <Typography variant='textSecondary' color='error'>{message}</Typography>
        </div>
    )
}

export default Error