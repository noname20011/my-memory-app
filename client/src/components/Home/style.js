import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBarSearch: {
        borderRadius: 4,
        marginBottom: '1rem',
        display: 'flex',
        padding: '16px',
    },
    pagination: {
        position: 'absolute',
        bottom: '-100px',
        left: 0,
        right: 0,
        borderRadius: 4,
        width: '50%',
        margin: '2rem auto',
        padding: '16px',
    },
    gridContainer: {
        [theme.breakpoints.down('xs')]: {
        flexDirection: 'column-reverse',
        },
    },
    btnSearch: {
        background: '#54C7EC',
        color: '#fff',
        transition: '.1s ease-in',
        '&:hover': {
            background: '#54C7EC',
            opacity: .5,
        }
    }
}));