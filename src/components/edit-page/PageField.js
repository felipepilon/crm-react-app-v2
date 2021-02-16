import React from 'react';
import { InputLabel, Box } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import PageFieldText from './PageFieldText';
import PageFieldSelect from './PageFieldSelect';
import PageFieldCheckbox from './PageFieldCheckbox';
import PageFieldMasked from './PageFieldMasked';
import PageFieldPassword from './PageFieldPassword';
import PageFieldTextMultiline from './PageFieldTextMultiline';

const components = {
    default: PageFieldText,
    masked: PageFieldMasked,
    checkbox: PageFieldCheckbox,
    select: PageFieldSelect,
    multiline: PageFieldTextMultiline,
    password: PageFieldPassword
}

const PageField = ({comp, title, required, readOnly, ...other}) => {
    const Component = components[comp || 'default'] || components.default;

    return (
        <Box display='flex' alignItems='center' marginTop={1}>
            <Box width='30%'>
                <InputLabel>
                    <FormattedMessage id={title}/>
                    { required && !readOnly && '*' }
                </InputLabel>
            </Box>
            <Box flex='1'>
                <Component {...other} readOnly={readOnly}/>
            </Box>
        </Box>
    );
}
 
export default PageField;