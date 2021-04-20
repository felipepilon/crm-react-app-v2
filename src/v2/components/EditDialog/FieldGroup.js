import { Box, Divider, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import EditField from './EditField';

const FieldGroup = ({group, values, errors, handleFieldChange, grpIndex}) => {
    const theme = useTheme();

    return (
        <Box display='flex' flexDirection='column' width='100%' marginTop={1}>
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
                group.fields.map((fld) => {
                    return (
                        <EditField key={fld.key} field={fld} 
                            values={values} errors={errors}
                            handleFieldChange={handleFieldChange}
                        />
                    );
                })
            }
        </Box>
    );
}
 
export default FieldGroup;