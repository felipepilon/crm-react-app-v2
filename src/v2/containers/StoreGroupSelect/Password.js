import React, { useState } from 'react';
import { Typography, TextField, Button, Box, useTheme } from '@material-ui/core';
import { FormattedMessage, useIntl } from 'react-intl';
import { post_SignIn } from '../../services/Auth';
import { useHistory, useLocation } from 'react-router-dom';

const Password = () => {
    const hist = useHistory();
    const intl = useIntl();
    const theme = useTheme();
    const loc = useLocation();

    const user = loc.state && loc.state.user;

    const [ password, setPassword ] = useState('')
    const [ error, setError ] = useState('');
    
    const handleProceed = (e) =>
    {
        e.preventDefault();

        post_SignIn({email: user.email, password})
        .then(() => {
            hist.push('/login/storeGroup', { user });
        })
        .catch(err => {
            setError(err.password || err.message || 'Unknown error');
        });
    }
    
    const handleBack = (e) => { 
        e.preventDefault();
        hist.goBack();
    }

    const canProceed = password;

    return (
        <form style={{width: '100%'}}>
            <Typography variant="h5" style={{marginTop: theme.spacing(2)}}>
                <FormattedMessage id='Hi {first_name}' values={user}/>
            </Typography>
            <TextField type="password" margin="normal" required fullWidth autoFocus autoComplete="password"
                label={intl.formatMessage({id: 'Enter your password'})}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(error)}
                helperText={error && intl.formatMessage({id: error})}
            />
            <Box width='100%' display='flex' >
                <Button variant="contained" color="secondary"
                    style={{margin: theme.spacing(2, 1, 2)}}
                    onClick={handleBack}
                >
                    <FormattedMessage id='Back'/>
                </Button>
                <Button  fullWidth variant="contained" color="primary" type='submit'
                    style={{margin: theme.spacing(2, 1, 2)}}
                    disabled={!Boolean(canProceed)}
                    onClick={handleProceed}
                >
                    <FormattedMessage id='Next'/>
                </Button>
            </Box>
        </form>
    );
}
 
export default Password;