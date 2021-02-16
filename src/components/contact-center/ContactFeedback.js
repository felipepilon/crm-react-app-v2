import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useIntl } from 'react-intl';
import { TextField, Box } from '@material-ui/core';

const optionsPhone = [
    'Picked up',
    'Line busy',
    'Call another time',
    'Voicemail',
    'Invalid number',
    'Wrong person',
    'Another',
]

const optionsWhatsApp = [
    'Invalid number',
    'Wrong person',
    'Waiting response',
    'Another',
    'Replied',
]

const ContactFeedback = (props) => {
    const [ options ] = useState(props.contactVia === 'WhatsApp' ? optionsWhatsApp : optionsPhone);
    const [ open, setOpen ] = useState(false);
    const [ openAnotherFeedback, setOpenAnotherFeedback ] = useState(false);

    const intl = useIntl();
    
    const handleChange = (e, newSelected) => {
        props.handleFeedbackChange(newSelected ? newSelected : null);
    }

    useEffect(() => {
        if (['Replied', 'Another'].includes(props.feedback)) {
            setOpenAnotherFeedback(true);
        } else {
            setOpenAnotherFeedback(false);
            props.handleAnotherFeedbackChange(null);
        }
    // eslint-disable-next-line
    }, [props.feedback])

    return (
        <Box
            display='flex'
            flexDirection='column'
            width='100%'
            marginTop={2}
        >
            <Autocomplete
                options={options}
                open={open}
                onOpen={() => {setOpen(true)}}
                onClose={() => {setOpen(false)}}
                getOptionLabel={(opt) => intl.formatMessage({ id: opt })}
                renderOption={(opt) => intl.formatMessage({ id: opt })}
                noOptionsText={false}
                onChange={handleChange}
                
                renderInput={(params) => 
                    <TextField
                        { ...params } 
                        label={intl.formatMessage({ id: 'Feedback' })}
                        error={props.feedbackError ? true : false}
                        helperText={
                            props.feedbackError ? intl.formatMessage({ id: props.feedbackError }) : 
                            !props.feedback ? intl.formatMessage({id: 'Select a feedback'}) :
                            null
                        }
                    />
                }
            />
            {
                openAnotherFeedback ?
                <TextField
                    multiline
                    rowsMax={4}
                    value={props.another_feedback || ''}
                    onChange={(e) => props.handleAnotherFeedbackChange(e.target ? e.target.value : null)}
                    label={intl.formatMessage({ id: props.feedback === 'Replied' ? 'Response' : 'Another Feedback' })}
                    error={props.anotherFeedbackError ? true : false}
                    helperText={props.anotherFeedbackError ? intl.formatMessage({ id: props.anotherFeedbackError }) : null}
                /> : 
                null
            }
        </Box>
    );
}
 
export default ContactFeedback;