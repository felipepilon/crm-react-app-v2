import { Box, FormControl, FormControlLabel, FormHelperText, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import SearchFieldText from './SearchFieldText';
import SearchFieldTextLike from './SearchFieldTextLike';

const comps = {
    default: SearchFieldTextLike,
    text: SearchFieldText
}

const SearchField = ({field, errors, ...other}) => {

    const FieldComponent = (field.comp && comps[field.comp]) || comps.default;

    const error = (errors && errors[field.key]) || '';

    return (
        <Box display='flex' alignItems='center' padding={1} width='100%'>
            <Typography variant='body1' style={{width: '35%'}}>
                {
                    field.title &&
                    <FormattedMessage id={field.title}/>
                }
            </Typography>
            <FormControl error={Boolean(error)} fullWidth size='small'>
                <FormControlLabel id={field.key}
                    control={<FieldComponent field={field} {...other}/>}
                />
                {
                    error &&
                    <FormHelperText><FormattedMessage id={error}/></FormHelperText>
                }
            </FormControl>
        </Box>
    );
}
 
export default SearchField;