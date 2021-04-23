import { Box } from '@material-ui/core';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useIntl } from 'react-intl';

const AgendaChart = ({
    birthdays, reserves,
    todaysSales, missing30Days
}) => {
    
    const intl = useIntl();

    const labels = ["Birthdays", "Reserves", "Today's Sales", "30 Days no Buying"].map((lbl) => intl.formatMessage({id: lbl}));

    const toDo = [ 
        birthdays ? birthdays.to_do - birthdays.done : 0,
        reserves ? reserves.to_do - reserves.done : 0,
        todaysSales ? todaysSales.to_do - todaysSales.done : 0,
        missing30Days ? missing30Days.to_do - missing30Days.done: 0
    ];

    const done = [
        birthdays ? birthdays.done: 0,
        reserves ? reserves.done : 0,
        todaysSales ? todaysSales.done : 0, 
        missing30Days ? missing30Days.done: 0
    ];

    return (
        <Box width='50%' marginLeft={1}>
            <Bar data={{
                    labels,
                    datasets: [
                        {
                            label: intl.formatMessage({id: 'Contatado'}),
                            data: done,
                            backgroundColor: '#22aa99',
                            stack: 'Stack 0'
                        }, 
                        {
                            label: intl.formatMessage({id: 'To Contact'}),
                            data: toDo,
                            backgroundColor: '#2277aa',
                            stack: 'Stack 0'
                        }
                    ]
                }}
                options={{
                    
                }}
            />
        </Box>
    );
}
 
export default AgendaChart;