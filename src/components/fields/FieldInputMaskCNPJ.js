import React from 'react';
import MaskedInput from 'react-text-mask';
import Masks from '../../utils/InputMasks';

const FieldInputMaskCNPJ = (props) => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={Masks.cnpj}
        />
    );
};

export default FieldInputMaskCNPJ;