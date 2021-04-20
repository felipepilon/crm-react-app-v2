import React from 'react';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import { Button, useTheme } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const SearchButton = ({handleClick}) => {
    const theme = useTheme();

    return (
        <Button variant='contained' color='primary' 
            style={{marginLeft: theme.spacing(1)}}
            endIcon={<SearchIcon/>}
            onClick={handleClick}
        >
            <FormattedMessage id='Search'/>
        </Button>
    );
}
 
export default SearchButton;