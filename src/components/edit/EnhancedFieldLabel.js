import React from 'react';
import { InputBase } from '@material-ui/core';
import LabelMasks from '../../utils/LabelMasks'

const EnhancedFieldLabel = (props) => {
    let { value } = props;

    if (props.mask)
        value = LabelMasks[props.mask](value);

    return (
        <InputBase
            value={value}
            readOnly
        />
    );
}
 
export default EnhancedFieldLabel;