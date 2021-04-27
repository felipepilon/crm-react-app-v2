import React, { useContext, useEffect, useState } from 'react';
import TableWrapper from './TableWrapper';
import TableHeader from './TableHeader';
import { Box, Paper } from '@material-ui/core';
import DenseSwitch from './DenseSwitch';
import Pagination from './Pagination';
import TableBody from './TableBody';
import { useRouteMatch } from 'react-router-dom';
import { AppStateContext } from '../../contexts/AppState';
import EditIcon from '@material-ui/icons/Edit';
import { AbilityContext } from '../../../contexts/Can';

const EnhancedTable = ({
    columns, data, setData, filters,
    getDataFnc, lastUpdate, handleEdit, 
    modelName,
    dense, hideDense, hideNoData,
    rowsPerPage, hidePagination,
    hidePaginationSinglePage,
    noLoadData, hideRowNo,
    colapsable
}) => {
    const { setError } = useContext(AppStateContext);
    const ability = useContext(AbilityContext);

    const match = useRouteMatch();

    const [ _dense, _setDense ] = useState(Boolean(dense));
    const [_rowsPerPage, _setRowsPerPage] = useState(rowsPerPage || 10);
    const [_rowsPerPageDefault] = useState(rowsPerPage || 10);
    const [page, setPage] = useState(0);
    const [ _colapsable, _setColapsable ] = useState({
        rows: {},
        ...colapsable
    });
    const [ _loading, _setLoading ] = useState(false);
    
    const _data = data || [];

    const handleColapsable = ({row, open}) => {
        _setColapsable((prev) => ({
            ...prev,
            rows: {
                ...prev.rows,
                [row._row_id]: {
                    ..._colapsable.rows[row._row_id],
                    open
                }
            }
        }));
    };

    useEffect(() => { 
        if (typeof dense === 'boolean')
            _setDense(dense);
    }, [dense]);

    useEffect(() => { 
        if (typeof rowsPerPage === 'number')
            _setRowsPerPage(rowsPerPage) ;
    }, [rowsPerPage]);

    useEffect(() => {
        console.log('params', match.params);
        console.log('filters', filters);

        if (noLoadData) {
            if (_data.length) {
                setData([]);
            }
        } 
        else if (filters && getDataFnc && setData) {
            _setLoading(true);

            setTimeout(() => {
                getDataFnc({...match.params, ...filters})
                .then((res) => {
                    setData(res);
                    _setLoading(false);
                })
                .catch((err) => {
                    setData([]);
                    _setLoading(false);
                        
                    setError({
                        title: 'Search Users',
                        message: 'Error getting users: {message}',
                        raw: err
                    });
                });
            }, 1000);
        }
    // eslint-disable-next-line
    }, [filters, lastUpdate, noLoadData]);

    useEffect(() => {
        if (hidePagination && !rowsPerPage)
        {
            console.log('updatePagination data length', data.length)
            _setRowsPerPage(data.length + 1);
        }
    // eslint-disable-next-line
    }, [data.length])

    if (hideNoData && !_data.length)
        return null

    const _columns = [...columns]; 

    if (!hideRowNo) {
        _columns.unshift({ key: '_row_no', title: 'constant.table_row_no' });
    }

    if (handleEdit && !_columns.find((row) => row.key === '_edit') && ability.can('edit', modelName)) {
        _columns.unshift({ key: '_edit', title: 'Edit', comp: 'icon', icon: EditIcon, click: handleEdit});
    }

    if (colapsable && colapsable.columns) {
        _columns.unshift({ 
            key: '_colapsable', comp: 'colapsable', 
            click: handleColapsable 
        });
    }

    const _hidePagination = Boolean(hidePagination ||
        (hidePaginationSinglePage && data.length <= _rowsPerPageDefault)
    );

    return (
        <Box display='flex' flexDirection='column' width='100%' position='relative' flex='1'>
            <Paper style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                <TableWrapper dense={_dense}>
                    <TableHeader columns={_columns}/>
                    <TableBody data={_data} columns={_columns}
                        rowsPerPage={_rowsPerPage} page={page}
                        dense={_dense} loading={_loading}
                        colapsable={_colapsable}
                    />
                </TableWrapper>
                <Pagination count={_data.length} 
                    page={page} setPage={setPage}
                    hidden={_hidePagination}
                    rowsPerPage={_rowsPerPage} setRowsPerPage={_setRowsPerPage}
                />
            </Paper>
            {
                !hideDense &&
                <DenseSwitch dense={_dense} setDense={_setDense}/>
            }
        </Box>
    );
};

export default EnhancedTable;