import React from 'react';
import EditFieldCheckbox from './EditFieldCheckbox';
import EditFieldText from './EditFieldText';
import EditFieldLabel from './EditFieldLabel';
import EditFieldPassword from './EditFieldPassword';
import EditFieldSelect from './EditFieldSelect';
import EditFieldNumber from './EditFieldNumber';
import DialogFormControl from '../DialogFormControl';

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
        <DialogFormControl
            title={field.title}
            required={field.required}
            error={error}
            control={<FieldComponent field={field} {...other}/>}
        />
    );
}
 
export default EditField;