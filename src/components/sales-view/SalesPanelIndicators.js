import React, { useState, useEffect, Fragment } from 'react';
import {  Box, CircularProgress, useTheme } from '@material-ui/core';
import IndicatorGroup from './IndicatorGroup';
import { get_SalesSummary } from '../../services/Sale';

const dateFormatter = (year, month, day, hour, min, sec) => 
    year.toString().padStart(4, '0') + '-' +
    month.toString().padStart(2, '0') + '-' +
    day.toString().padStart(2, '0') + 'T' +
    hour.toString().padStart(2, '0') + ':' +
    min.toString().padStart(2, '0') + ':' +
    sec.toString().padStart(2, '0') + 'Z';

const lastDayOfMonth = (now) => new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

const SalesPanelIndicators = (props) => {
    const theme = useTheme();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const loadData = () => {
        setLoading(true);

        const now = new Date();

        const filters = [
            {
                ...props.filters,
                ...{
                    sale_date_start: dateFormatter(now.getFullYear(), now.getMonth() + 1, now.getDate(), 0, 0, 0, 0),
                    sale_date_end: dateFormatter(now.getFullYear(), now.getMonth() + 1, now.getDate(), 23, 59, 59, 999),
                }
            },
            {
                ...props.filters,
                ...{
                    sale_date_start: dateFormatter(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0),
                    sale_date_end: dateFormatter(now.getFullYear(), now.getMonth() + 1, lastDayOfMonth(now), 23, 59, 59, 999),
                }
            },
            {
                ...props.filters,
                ...{
                    sale_date_start: dateFormatter(now.getFullYear(), 1, 1, 0, 0, 0, 0),
                    sale_date_end: dateFormatter(now.getFullYear(), 12, 31, 23, 59, 59, 999),
                }
            },
        ]

        get_SalesSummary(filters)
        .then((res) => {
            setTimeout(() => {
                setData(res);
                setLoading(false);
            }, 500);
        });
    }

    useEffect(() => {
        loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.filters]);
    
    return (
        <Fragment>
            <IndicatorGroup
                label='Total Sales Value'
                indicators={[
                    {label: 'Day', style: 'currency', value: (data.length && data[0].sum_paid_value) || 0},
                    {label: 'Month', style: 'currency', value: (data.length >= 2 && data[1].sum_paid_value) || 0},
                    {label: 'Year', style: 'currency', value: (data.length >= 3 && data[2].sum_paid_value) || 0},
                ]}
            />
            <IndicatorGroup
                label='Sales Average Value'
                indicators={[
                    {label: 'Day', style: 'currency', value: (data.length && data[0].avg_paid_value) || 0},
                    {label: 'Month', style: 'currency', value: (data.length >= 2 && data[1].avg_paid_value) || 0},
                    {label: 'Year', style: 'currency', value: (data.length >= 3 && data[2].avg_paid_value) || 0},
                ]}
            />
            <IndicatorGroup
                label='Sales Counter'
                indicators={[
                    {label: 'Day', value: (data.length && data[0].sale_count) || 0},
                    {label: 'Month', value: (data.length >= 2 && data[1].sale_count) || 0},
                    {label: 'Year', value: (data.length >= 3 && data[2].sale_count) || 0},
                ]}
            />
            <IndicatorGroup
                label='Total Sales Unit'
                indicators={[
                    {label: 'Day', value: (data.length && data[0].sum_total_qty) || 0},
                    {label: 'Month', value: (data.length >= 2 && data[1].sum_total_qty) || 0},
                    {label: 'Year', value: (data.length >= 3 && data[2].sum_total_qty) || 0},
                ]}
            />
            <IndicatorGroup
                label='Units Per Sale'
                indicators={[
                    {label: 'Day', value: (data.length && data[0].avg_total_qty) || 0},
                    {label: 'Month', value: (data.length >= 2 && data[1].avg_total_qty) || 0},
                    {label: 'Year', value: (data.length >= 3 && data[2].avg_total_qty) || 0},
                ]}
            />
            {
                loading ?
                <Box
                    display='flex'
                    position='absolute'
                    height='100%'
                    width='100%'
                    justifyContent='center'
                    alignItems='center'
                    bgcolor={theme.palette.background.paper}
                    zIndex='1'
                    style={{opacity: 0.3}}
                >
                    <CircularProgress/>
                </Box> : 
                null
            }
        </Fragment>
    );
}
 
export default SalesPanelIndicators;