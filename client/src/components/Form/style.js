import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
    '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    paper: {
        padding: theme.spacing(2),
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    label : {
        float: 'left',
        width: '50%',
        margin: '10px 0',
        background: '#999',
        cursor: 'pointer',
    },
    fileInput: {
        width: '97%',
        margin: '10px 0',
    },
    buttonSubmit: {
        marginBottom: 10,
    },
}));