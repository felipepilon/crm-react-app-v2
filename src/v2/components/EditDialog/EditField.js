import React from 'react';
import EditFieldCheckbox from './EditFieldCheckbox';
import EditFieldText from './EditFieldText';
import EditFieldLabel from './EditFieldLabel';
import EditFieldSelect from './EditFieldSelect';
import DialogFormControl from '../DialogFormControl';

const fieldTypes = {
    default: EditFieldText,
    checkbox: EditFieldCheckbox,
    label: EditFieldLabel,
    password: EditFieldText,
    date: EditFieldText,
    number: EditFieldText,
    select: EditFieldSelect,
}

const EditField = ({field, errors, ...other}) => {
    const FieldType = (field.type && fieldTypes[field.type]) || fieldTypes.default;

    const error = (errors && errors[field.key]) || '';

    return (
        <DialogFormControl
            title={field.title}
            required={field.required}
            error={error}
            control={<FieldType field={field} {...other}/>}
        />
    );
}
 
export default EditField;