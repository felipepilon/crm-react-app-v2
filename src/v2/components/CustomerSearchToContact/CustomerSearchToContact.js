import React, { useContext } from 'react';
import Autocomplete from '../Autocomplete/Autocomplete';
import { Typography, Link, useTheme, Box, fade } from '@material-ui/core';
import { Link as LinkRouter, useLocation } from 'react-router-dom';
import { WorkspaceContext } from '../../contexts/Workspace';
import { get_Customers } from '../../../services/Customer';
import LabelMasks from '../../../utils/LabelMasks';

const CustomerSearchToContact = () => {
    const { store_group_code } = useContext(WorkspaceContext);

    const theme = useTheme();
    const loc = useLocation();

    return (
        <Box
            bgcolor={fade(theme.palette.common.white, 0.40)}
            borderRadius={theme.shape.borderRadius}
            width='20em'
        >
            <Autocomplete inputLabel='Customer'
                valueField='customer_code'
                filterField='search_index'
                labelField='name'
                getOptionsFnc={get_Customers}
                getOptionsParams={{store_group_code, params: {_limit: 10}}}
                getOptionsField='search_index'
                labelOptionField={(({opt}) => {
                    return (
                        <Link component={LinkRouter} to={{
                            pathname: `/${store_group_code}/workspace/customers/${opt.customer_code}/contact`,
                            state: {...loc.state, from: loc}
                        }}>
                            <Typography variant='subtitle2'>
                                {opt.cpf ? LabelMasks.cpf(opt.cpf) : ''} {opt.name ? opt.name : ''}
                            </Typography>
                            <Typography variant='body2'>
                                {opt.email ? opt.email + ' ' : ''}
                                {opt.phone1 ? LabelMasks.phone(opt.phone1) + ' ' : ''}
                                {opt.phone2 ? LabelMasks.phone(opt.phone2) + ' ' : ''}
                            </Typography>
                        </Link>
                    );
                })}
            />
        </Box>
    );
}
 
export default CustomerSearchToContact;