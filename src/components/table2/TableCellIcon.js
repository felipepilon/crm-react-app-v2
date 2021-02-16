import React from 'react';
import { TableCell, IconButton, Tooltip } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import { useIntl } from 'react-intl';

const TableCellIcon = ({dense, handleClick, Icon, tipText}) => {
    const intl = useIntl();

    return (
        <TableCell align='center'> {
            tipText ?
            <Tooltip title={intl.formatMessage({id: tipText})}>
                <IconButton size={dense ? 'small' : 'medium'} onClick={handleClick}>{
                    Icon ? <Icon/> : <HelpIcon/>
                }</IconButton>
            </Tooltip> :
            <IconButton size={dense ? 'small' : 'medium'} onClick={handleClick}>{
                Icon ? <Icon/> : <HelpIcon/>
            }</IconButton>
        }</TableCell>
            
    );
}
 
export default TableCellIcon;