import { Box, Divider, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import SearchField from './SearchField';

const FieldGroup = ({group, values, handleFieldChange, grpIndex}) => {
    const theme = useTheme();

    return (
        <Box display='flex' flexDirection='column' width='100%'>
            {
                group.title &&
                <Typography variant='h6'>
                    <FormattedMessage id={group.title}/>
                </Typography>
            }
            {
                grpIndex !== 0 &&
                <Divider style={{marginBottom: theme.spacing(2)}}/>
            }
            {
                group.fields.map((fld, fldIndex) => {
                    return (
                        <SearchField key={fld.key} field={fld} values={values} 
                            handleFieldChange={handleFieldChange}
                            autoFocus={grpIndex === 0 && fldIndex === 0}    
                        />
                    );
                })
            }
        </Box>
    );
}
 
export default FieldGroup;