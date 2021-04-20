import React, { useContext } from 'react';
import Autocomplete from '../Autocomplete/Autocomplete';
import { Box, Typography } from '@material-ui/core';
import { WorkspaceContext } from '../../contexts/Workspace';
import { get_Customers } from '../../../services/Customer';
import LabelMasks from '../../../utils/LabelMasks';

const CustomerSelect = ({handleSelect}) => {
    const { store_group_code } = useContext(WorkspaceContext);

    return (
        <Autocomplete inputLabel='Customer'
            valueField='customer_code'
            filterField='search_index'
            labelField='name'
            getOptionsFnc={get_Customers}
            getOptionsParams={{store_group_code, params: {_limit: 10}}}
            getOptionsField='search_index'
            handleSelect={handleSelect}
            labelOptionField={(({opt}) => {
                return (
                    <Box display='flex' flexDirection='column'>
                        <Typography variant='subtitle2'>
                            {opt.cpf ? LabelMasks.cpf(opt.cpf) : ''} {opt.name ? opt.name : ''}
                        </Typography>
                        <Typography variant='body2'>
                            {opt.email ? opt.email + ' ' : ''}
                            {opt.phone1 ? LabelMasks.phone(opt.phone1) + ' ' : ''}
                            {opt.phone2 ? LabelMasks.phone(opt.phone2) + ' ' : ''}
                        </Typography>
                    </Box>
                );
            })}
        />
    );
}
 
export default CustomerSelect;