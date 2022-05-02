import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
        appBar: {
            borderRadius: 15,
            margin: '0px 80px 30px',
            width: 'initial',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 50px',
        },
        heading: {
            color: 'rgba(0,183,255, 1)',
            textDecoration: 'none',
        },
        image: {
            marginLeft: '15px',
        },
        toolbar: {
            display: 'flex',
            justifyContent: 'flex-end',
            width: '400px',
        },
        profile: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '6px 12px',
            alignItems: 'center',
            position: 'relative',
            cursor: 'pointer',
            columnGap: '10px',
            '&:hover': {
                background: '#f0f2f5',
                borderRadius: '1rem',
            }
        },
        userName: {
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px',
            fontWeight: '600',
        },
        brandContainer: {
            display: 'flex',
            alignItems: 'center',
        },
        purple: {
            // color: theme.palette.getContrastText(deepPurple[500]),
            // backgroundColor: deepPurple[500],
            width: '30px',
            height: '30px',
            objectFit: 'contain',
        },
        option: {
            position: 'absolute',
            width: '160px',
            top: '54px',
            right: '-52px',
            background: '#F0F2F5',
            boxShadow: '1px 1px .2px rgba(0, 0, 0, 0.05)',
            borderRadius: '.3rem',
            "&::before": {
                content: '"\\0020"',
                position: 'absolute',
                top: '-10px',
                left: '38px',
                width: 0,
                height: 0,
                borderRight: '10px solid transparent',
                borderLeft: '10px solid transparent',
                borderBottom: '10px solid #F0F2F5',
            },
            "&::after": {
                content: '"\\0020"',
                position: 'absolute',
                top: '-10px',
                left: 0,
                width: '100%',
                height: '12px',
            }
        },
        logout: {
            width: '100%',
            fontSize: '12px',
            textAlign: 'left',
            display: 'block',
        },
        login: {
            width: '100px',
            background: '#54C7EC',
            fontWeight: '600',
            color: '#fff',
            '&:hover': {
                background: '#2ABBA7',
            }
        }
        
}))