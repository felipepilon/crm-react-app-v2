import { ListItem, ListItemText, useTheme } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const AutocompleteListItem = ({highlightIndex, handleOptionChange, index, option}) => {
    const theme = useTheme();

    return (
        <ListItem onMouseOver={() => handleOptionChange({index})}
            onClick={() => handleOptionChange({select: option})}
            style={{
                fontStyle: ['_nothing'].includes(option.value) && 'italic',
                backgroundColor: highlightIndex === index && theme.palette.grey[200]
            }}
        >
            {
                typeof option.optionLabel === 'object' ?
                option.optionLabel :
                <ListItemText>{
                    option.intl ?
                    <FormattedMessage id={option.optionLabel}/> :
                    option.optionLabel
                }</ListItemText>
            }
        </ListItem>
    );
}
 
export default AutocompleteListItem;