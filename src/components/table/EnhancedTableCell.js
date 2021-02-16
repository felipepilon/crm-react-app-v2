import React from 'react';
import EnhancedTableCellEdit from './EnhancedTableCellEdit';
import EnhancedTableCellDefault from './EnhancedTableCellDefault';
import EnhancedTableCellIntl from './EnhancedTableCellIntl';
import EnhancedTableCellIntlSplit from './EnhancedTableCellIntlSplit';
import EnhancedTableCellIntlLink from './EnhancedTableCellIntlLink';
import EnhancedTableCellDatetime from './EnhancedTableCellDatetime';
import EnhancedTableCellDate from './EnhancedTableCellDate';
import EnhancedTableCellMasked from './EnhancedTableCellMasked';

const components = {
    editIcon: EnhancedTableCellEdit,
    intl: EnhancedTableCellIntl,
    intlSplit: EnhancedTableCellIntlSplit,
    intlLink: EnhancedTableCellIntlLink,
    default: EnhancedTableCellDefault,
    datetime: EnhancedTableCellDatetime,
    date: EnhancedTableCellDate,
    masked: EnhancedTableCellMasked,
}

const EnhancedTablCell = (props) => {
    const Component = components[props.column.comp || 'default'] || EnhancedTableCellDefault;

    return (
        <Component {...props}/>
    )

    /*
    if (props.column.type && props.column.type.includes('icon'))
    {
        cellContents = (
            <IconButton
                size={props.dense.includes('dense') ? 'small' : 'medium'}
                component={Link}
                to={props.column.to(props.row)}
            >
                {
                    props.column.type.includes('edit') ?
                    <EditIcon/> :
                    <HelpIcon/>
                }
            </IconButton>
        )
    }
    else
    {
        const value = props.column.value || props.row[props.column.name] || null;

        cellContents = <EnhancedFieldLabel
            value={value}
            mask={props.column.mask}
            intl={props.column.intl}
            intlSplit={props.column.intlSplit}
            wrap={props.column.wrap}
            type={props.column.type}
            rowIdx={props.rowIdx}
            name={props.name}
        />
    }

    return (
        <TableCell 
            align={
                props.icon ? 'center' : 'left'
            }
        >
            { cellContents }
        </TableCell>
    );*/
}
 
export default EnhancedTablCell;