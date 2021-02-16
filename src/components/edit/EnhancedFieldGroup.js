import React from 'react';
import { Typography, Paper, useTheme } from '@material-ui/core';
import EnhancedTextField from './EnhancedField';
import { FormattedMessage } from 'react-intl';

const EnhancedFieldGroup = (props) => {
    const theme = useTheme();

    return (
        <Paper
            style={{
                marginTop: theme.spacing(1),
                padding: theme.spacing(1),
                width: '100%', 
                maxWidth: '540px',
                flexDirection: 'column',
            }}
        >
            {
                props.title &&
                <Typography variant='subtitle1'>
                    <FormattedMessage id={props.title}/>
                </Typography>
            }
            {
                props.fields &&
                props.fields.map((field) => {
                    return (
                        <EnhancedTextField
                            key={field.name}
                            field={field}
                            data={props.data || {}}
                            errors={props.errors || {}}
                            handleFieldChange={props.handleFieldChange}
                        />
                    )
                })
            }
        </Paper>
    );
}
 
export default EnhancedFieldGroup;