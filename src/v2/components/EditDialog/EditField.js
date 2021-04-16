import { Box, FormControl, FormControlLabel, FormHelperText, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import EditFieldCheckbox from './EditFieldCheckbox';
import EditFieldText from './EditFieldText';
import EditFieldLabel from './EditFieldLabel';
import EditFieldPassword from './EditFieldPassword';
import EditFieldSelect from './EditFieldSelect';
import EditFieldNumber from './EditFieldNumber';

const comps = {
    default: EditFieldText,
    checkbox: EditFieldCheckbox,
    label: EditFieldLabel,
    password: EditFieldPassword,
    select: EditFieldSelect,
    number: EditFieldNumber
}

const EditField = ({field, errors, ...other}) => {
    const FieldComponent = (field.comp && comps[field.comp]) || comps.default;

    const error = (errors && errors[field.key]) || '';

    return (
        <Box display='flex' alignItems='center' width='100%'>
            <Typography variant='body1' style={{width: '30%'}}>
                {
                    field.title &&
                    <FormattedMessage id={field.title}/>
                }
                {
                    field.required &&
                    <FormattedMessage id='constant.required_field_indicator'/>
                }
            </Typography>
            <FormControl error={Boolean(error)} fullWidth size='small' style={{flex: '1'}}>
                <FormControlLabel id={field.key}
                    control={<FieldComponent field={field} {...other}/>}
                />
                {
                    error &&
                    <FormHelperText><FormattedMessage id={error}/></FormHelperText>
                }
            </FormControl>
        </Box>
    );
}
 
export default EditField;