import { Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import AgendaWrapper from './AgendaWrapper';
import Birthdays from './Birthdays';
import Missing30Days from './Missing30Sales';
import Reserves from './Reserves';
import TodaysSales from './TodaysSales';

const Agenda = () => {
    return (
        <AgendaWrapper>
            <Typography variant='subtitle1'><FormattedMessage id='Agenda'/></Typography>
            <Birthdays/>
            <Reserves/>
            <TodaysSales/>
            <Missing30Days/>
        </AgendaWrapper>
    );
}
 
export default Agenda;