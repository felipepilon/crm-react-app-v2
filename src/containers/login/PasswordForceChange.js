import React, { useContext, useState } from 'react';
import { Typography, TextField, Button, Box, useTheme } from '@material-ui/core';
import { FormattedMessage, useIntl } from 'react-intl';
import { AuthContext } from '../../contexts/Auth';
import { post_SignIn } from '../../services/Auth';
import { useHistory } from 'react-router-dom';

const PasswordForceChange = () => {
    const { user, authenticate } = useContext(AuthContext);
    
    const hist = useHistory();
    const intl = useIntl();
    const theme = useTheme();

    const [ state, setState ] = useState({});
    const [ errors, setErrors ] = useState({});

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        post_SignIn({
            ...state,
            ...user,
        })
        .then(res => {
            authenticate(res)
            hist.replace('/workspace');
        })
        .catch(err => {
            setErrors(err);
        });
    }

    const handleFieldChange = (fieldKey, newValue) => {
        if (errors[fieldKey]) {
            const {[fieldKey]: err, ...otherErr} = errors;
            setErrors(otherErr);
        }
        setState({...state, ...{[fieldKey]: newValue}});
    }
    
    const handleBack = (e) => { 
        e.preventDefault();
        hist.goBack();
    };

    const canProceed = state.password && state.password_new && state.password_confirm;

    return (
        <form style={{width: '100%'}}>
            <Typography variant="h5" style={{marginTop: theme.spacing(2)}}>
                <FormattedMessage id='Hi {first_name}' values={user}/>
            </Typography>
            <Typography variant="body1" style={{marginTop: theme.spacing(2)}}>
                <FormattedMessage id='You need to reset your password' values={user}/>
            </Typography>
            <TextField type="password" margin="normal" required fullWidth autoFocus autoComplete="password"
                label={intl.formatMessage({id: 'Enter your current password'})}
                value={state.password || ''}
                onChange={(e) => handleFieldChange('password', e.target.value || undefined)}
                error={errors.password ? true : false}
                helperText={errors.password && intl.formatMessage({id: errors.password})}
            />
            <TextField type="password" margin="normal" required fullWidth autoComplete="password"
                label={intl.formatMessage({id: 'Enter a new password'})}
                value={state.password_new || ''}
                onChange={(e) => handleFieldChange('password_new', e.target.value || undefined)}
                error={errors.password_new ? true : false}
                helperText={errors.password_new && intl.formatMessage({id: errors.password_new})}
            />
            <TextField type="password" margin="normal" required fullWidth autoComplete="password"
                label={intl.formatMessage({id: 'Confirm new password'})}
                value={state.password_confirm || ''}
                onChange={(e) => handleFieldChange('password_confirm', e.target.value || undefined)}
                error={errors.password_confirm ? true : false}
                helperText={errors.password_confirm && intl.formatMessage({id: errors.password_confirm})}
            />
            <Box width='100%' display='flex'>
                <Button variant='contained' color='secondary'
                    style={{margin: theme.spacing(2, 1, 2)}}
                    onClick={handleBack}
                >
                    <FormattedMessage id='Back'/>
                </Button>
                <Button fullWidth type='submit' variant='contained' color='primary'
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
 
export default PasswordForceChange;