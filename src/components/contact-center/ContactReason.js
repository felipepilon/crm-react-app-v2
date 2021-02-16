import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useIntl } from 'react-intl';
import { TextField, Box } from '@material-ui/core';
import { get_ContactReasons } from '../../services/ContactReason';
import LoadingAbsoluteBox from '../LoadingAbsoluteBox';

const ContactReason = ({
    reasons, handleReasonsChange, 
    another_reason, reasonError, anotherReasonError,
    handleAnotherReasonChange, reason_type,
    anotherRsnReq
}) => {
    const intl = useIntl();

    const [ options, setOptions ] = useState([]);
    const [ open, setOpen ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    
    const handleChange = (e, sel) => {
        //console.log('sel', sel);
        handleReasonsChange(sel);
    }

    useEffect(() => {
        setTimeout(() => {
            get_ContactReasons({active: true})
            .then((res) => {
                setOptions(res);

                if (reason_type) {
                    const def = res.find((rsn) => rsn.reason_type === reason_type);
                    handleReasonsChange([def]);
                }

                setLoading(false);
            })
        }, 500)
    // eslint-disable-next-line
    }, [])

    return (
        <Box display='flex' flexDirection='column' width='100%' marginTop={1} position='relative'>
            <Autocomplete
                multiple
                filterSelectedOptions
                options={options}
                open={open}
                value={reasons}
                onOpen={() => {setOpen(true)}}
                onClose={() => {setOpen(false)}}
                getOptionLabel={(opt) => opt.reason_description}
                renderOption={(opt) => opt.reason_description}
                noOptionsText={false}
                onChange={handleChange}
                renderInput={(params) => 
                    <TextField
                        { ...params } 
                        label={intl.formatMessage({ id: 'Reason(s)' })}
                        error={reasonError ? true : false}
                        helperText={
                            reasonError ? intl.formatMessage({id: reasonError }) :
                            !reasons.length ? intl.formatMessage({id: 'Select reason(s) for contact'}) :
                            null
                        }
                    />
                }
            />
            {
                anotherRsnReq ?
                <TextField
                    size='small'
                    value={another_reason || ''}
                    onChange={(e) => handleAnotherReasonChange(e.target.value || null)}
                    label={intl.formatMessage({ id: 'Another Reason' })}
                    error={anotherReasonError ? true : false}
                    helperText={
                        anotherReasonError ?
                        intl.formatMessage({id: anotherReasonError}) :
                        null
                    }
                /> : 
                null
            }
            <LoadingAbsoluteBox loading={loading}/>
        </Box>
    );
}
 
export default ContactReason;