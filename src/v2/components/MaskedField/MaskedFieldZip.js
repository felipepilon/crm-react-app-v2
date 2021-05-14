import React from 'react';
import MaskedInput from 'react-text-mask';
import Masks from '../../../utils/InputMasks';

const MaskedFieldZip = ({inputRef, ...other}) => {
    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={Masks.zip}
        />
    );
};

export default MaskedFieldZip;