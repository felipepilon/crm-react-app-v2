import { Box, FormControl, FormControlLabel, FormHelperText, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const DialogFormControl = ({title, required, error, control}) => {
    return (
        <Box display='flex' alignItems='center' width='100%'>
            <Typography variant='body1' style={{width: '30%'}}>
                {
                    title &&
                    <FormattedMessage id={title}/>
                }
                {
                    required &&
                    <FormattedMessage id='constant.required_field_indicator'/>
                }
            </Typography>
            <FormControl error={Boolean(error)} fullWidth size='small' style={{flex: '1'}}>
                <FormControlLabel control={control}/>
                {
                    error &&
                    <FormHelperText><FormattedMessage id={error}/></FormHelperText>
                }
            </FormControl>
        </Box>
    );
}
 
export default DialogFormControl;