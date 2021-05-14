import React from 'react';
import MaskedInput from 'react-text-mask';
import Masks from '../../../utils/InputMasks';

const MaskedFieldPhone = ({inputRef, ...other}) => {
    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={Masks.phone}
        />
    );
};

export default MaskedFieldPhone;