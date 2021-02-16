import { Box, Typography } from '@material-ui/core';
import { formatISO } from 'date-fns';
import React, { Fragment } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import CakeIcon from '@material-ui/icons/Cake';

const getDateMonthDay = (date) => formatISO(date).substr(5, 5);

const BirthdayMessage = ({customer}) => {
    const intl = useIntl();

    let details;
    if (!customer.birthday) {
        details = (
            <Typography variant='body1'>
                <FormattedMessage id='Birtday information not available'/>
            </Typography>
        );
    } else {
        const today = new Date();
        const yesterday = new Date(new Date().setDate(today.getDate() - 1));
        const dayBeforeYesterday = new Date(new Date().setDate(today.getDate() - 2));
        const tomorrow = new Date(new Date().setDate(today.getDate() + 1));

        const isToday = customer.birthday === getDateMonthDay(today);
        const wasYesterday = customer.birthday === getDateMonthDay(yesterday);
        const wasDayBeforeYesterday = customer.birthday === getDateMonthDay(dayBeforeYesterday);
        const isTomorrow = customer.birthday === getDateMonthDay(tomorrow);

        const isAnotherDate = !isToday && !wasYesterday && !wasDayBeforeYesterday && !isTomorrow;

        const message = isToday ? 'Customer birthday is today {date_of_birth}!' :
            wasDayBeforeYesterday ? 'Customer birthday was day before yesterday {date_of_birth}' :
            wasYesterday ? 'Customer birthday was yesterday {date_of_birth}' :
            isTomorrow ? 'Customer birthday is tomorrow {date_of_birth}' :
            'Customer birthday is at {date_of_birth}';

        const date_of_birth = intl.formatDate(customer.date_of_birth, {month: '2-digit', day: '2-digit', timeZone: 'utc'});

        details = (
            <Fragment>
                <Typography variant='body1'>
                    <FormattedMessage id={message} values={{date_of_birth}}/>
                </Typography>
                {
                    !isAnotherDate &&
                    <Box paddingLeft={1}><CakeIcon fontSize='large'/></Box>
                }
            </Fragment>
        )
    }

    

    return (
        <Box display='flex' marginTop={1} alignItems='center'>{
            details
        }</Box>
    );
}
 
export default BirthdayMessage;