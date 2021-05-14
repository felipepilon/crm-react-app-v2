import React from 'react';
import MaskedInput from 'react-text-mask';
import Masks from '../../../utils/InputMasks';

const MaskedFieldCPF = ({inputRef, ...other}) => {
    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={Masks.cpf}
        />
    );
};

export default MaskedFieldCPF;