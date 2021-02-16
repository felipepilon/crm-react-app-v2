import React from 'react';
import { Container, makeStyles, useTheme, Avatar } from '@material-ui/core';
import LoginRouter from './LoginRouter';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.light,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    main: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.secondary.main,
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
    },
}))

const Login = () => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.root}>
            <Container maxWidth="xs" className={classes.main}>
                {
                    /*<Box>
                        <img src={require('./home-bar-black.png')} height='50px' alt=''/>
                    </Box>*/
                    <Avatar style={{backgroundColor: theme.palette.primary.main}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                }
                <LoginRouter/>
            </Container>
        </div>
    );
}
 
export default Login;