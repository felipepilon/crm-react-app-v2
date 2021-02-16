import React, { useEffect, useState } from 'react';
import { TextField, Button, useTheme, Box } from '@material-ui/core';
import { FormattedMessage, useIntl } from 'react-intl';
import isEmail from 'validator/lib/isEmail';
import { get_User } from '../../services/Auth';
import { useHistory } from 'react-router-dom';

const Email = () => {
    const hist = useHistory();
    const theme = useTheme();
    const intl = useIntl();

    const [ error, setError ] = useState('');
    const [ email, setEmail ] = useState('')

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        get_User({email})
        .then((res) => {
            if (!res.active) {
                setError('User inactive. Contact system administrator');
                return;
            }

            hist.push('/login/password', {user: res});
        })
        .catch(err => {
            console.log('err.message', err.message)
            setError(err.message || 'Unknown error');
        });
    }

    useEffect(() => {
        if (error)
            setError('');
    // eslint-disable-next-line
    }, [email])
    
    const canProceed = email && isEmail(email);

    return (
        <form style={{width: '100%'}}>
            <TextField
                label='Email'
                autoFocus
                margin="normal"
                required
                fullWidth
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(error)}
                helperText={error && intl.formatMessage({id: error})}
            />
            <Box width='100%' display='flex'>
                <Button
                    fullWidth
                    type='submit'
                    variant='contained'
                    color='primary'
                    style={{margin: theme.spacing(2, 1, 2)}}
                    disabled={!canProceed}
                    onClick={handleSubmit}
                >
                    <FormattedMessage id='Next'/>
                </Button>
            </Box>
        </form>
    );
}
 
export default Email;