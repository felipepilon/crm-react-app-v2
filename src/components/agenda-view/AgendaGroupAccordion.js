import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormattedMessage } from 'react-intl';
import LoadingAbsoluteBox from '../LoadingAbsoluteBox';

const AgendaGroupAccordion = ({loadContentFnc, loadSummaryFnc, summaryData, summaryStatus, children, title, contentStatus}) => {
    const theme = useTheme();

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        loadSummaryFnc()
    // eslint-disable-next-line 
    }, [])

    useEffect(() => {
        if (expanded && contentStatus === 'none')
        {
            loadContentFnc();
        }
    // eslint-disable-next-line
    }, [expanded]);

    return (
        <Box display = 'flex' position='relative' style={{marginBottom: theme.spacing(1)}}>
            <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)} style={{width: '100%'}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box display='flex' width='100%'>
                        <Typography variant='body1' style={{flex: '1'}}><FormattedMessage id={title}/></Typography>
                        <Typography variant='body1'>{summaryData.done || 0} / {summaryData.to_do || 0}</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails style={{display: 'flex', flexDirection: 'column', maxHeight: '250px', overflow: 'auto'}}>
                    {children}
                </AccordionDetails>
            </Accordion>
            <LoadingAbsoluteBox loading={summaryStatus !== 'loaded'}/>
        </Box>
    );
}
 
export default AgendaGroupAccordion;