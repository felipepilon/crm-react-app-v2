import React from 'react';
import { InputLabel, Box } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import EnhancedFieldText from './EnhancedFieldText';
import EnhancedFieldSelect from './EnhancedFieldSelect';
import EnhancedFieldCheckbox from './EnhancedFieldCheckbox';

const components = {
    default: EnhancedFieldText,
    select: EnhancedFieldSelect,
    checkbox: EnhancedFieldCheckbox
}

const EnhancedField = (props) => {
    const Component = components[props.field.comp || 'default'] || components.default;

    return (
        <Box display='flex' alignItems='center' marginTop={1}>
            <Box width='30%'>
                <InputLabel>
                    <FormattedMessage id={props.field.title}/>
                    { props.required && !props.readOnly && '*' }
                </InputLabel>
            </Box>
            <Box flex='1'>
                <Component {...props}/>
            </Box>
        </Box>
    );
    /*if (props.type === 'label') {
        fieldComponent = (
            <EnhancedFieldLabel
                value={props.value}
                mask={props.mask}
            />
        );
    }
    else {
        fieldComponent = (
            <EnhancedFieldInput
                name={props.name}
                value={props.value}
                error={props.error}
                handleFieldChange={props.handleFieldChange}
                mask={props.mask}
            />
        )
    }

    return (
        <Box display='flex' alignItems='center' marginTop={1}>
            <Box width='30%'>
                <InputLabel>
                    <FormattedMessage id={props.title}/>
                    { props.required && !props.readOnly && '*' }
                </InputLabel>
            </Box>
            <Box flex='1'>
                {fieldComponent}
            </Box>
        </Box>
    );*/
}
 
export default EnhancedField;