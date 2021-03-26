import React, { useContext, useEffect, useState } from 'react';
import TableWrapper from './TableWrapper';
import TableHeader from './TableHeader';
import { Box, Paper } from '@material-ui/core';
import DenseSwitch from './DenseSwitch';
import Pagination from './Pagination';
import TableBody from './TableBody';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { AppStateContext } from '../../contexts/AppState';
import EditIcon from '@material-ui/icons/Edit';
import { AbilityContext } from '../../../contexts/Can';

const EnhancedTable = ({
    columns, data, setData, filters, 
    getDataFnc, lastUpdate, handleEdit, 
    loadingStatus, modelName,
    defaultDense, hideDense, hideNoData,
    rowsPerPageDefault, pageDefault, hidePagination,
    hidePaginationSinglePage,
    noLoadData, noSaveFilter,
    hideRowNo
}) => {
    const { setError } = useContext(AppStateContext);
    const { addStatus, removeStatus } = useContext(AppStateContext)
    const ability = useContext(AbilityContext);

    const match = useRouteMatch();
    const hist = useHistory();
    const loc = useLocation();

    const [dense, setDense] = useState(Boolean(defaultDense));
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageDefault || 10);
    const [_rowsPerPageDefault] = useState(rowsPerPageDefault || 10);
    const [page, setPage] = useState(pageDefault || 0);
    
    const _loadingStatus = loadingStatus || 'Loading';
    const _data = data || [];

    useEffect(() => {
        if (noLoadData) {
            if (data.length)
                setData([]);
        } 
        else if (filters && getDataFnc && setData) {
            addStatus(_loadingStatus);

            setTimeout(() => {
                getDataFnc({...match.params, params: filters})
                .then((res) => {
                    setData(res);
                    removeStatus(_loadingStatus);
                })
                .catch((err) => {
                    setData([]);
                    removeStatus(_loadingStatus);
                        
                    setError({
                        title: 'Search Users',
                        message: 'Error getting users: {message}',
                        raw: err
                    });
                });
            }, 1000);
            
            if (!noSaveFilter)
                hist.replace(loc.pathname, {...loc.state, filters});
        }
    // eslint-disable-next-line
    }, [filters, lastUpdate, noLoadData])
        
    if (hideNoData && !_data.length)
        return null

    const _columns = columns;

    if (!hideRowNo) {
        _columns.unshift({ key: '_row_no', title: 'constant.table_row_no' });
    }

    if (handleEdit && !_columns.find((row) => row.key === '_edit') && ability.can('edit', modelName)) {
        _columns.unshift({ key: '_edit', title: 'Edit', comp: 'icon', icon: EditIcon, click: handleEdit});
    }

    const _hidePagination = Boolean(hidePagination ||
        (hidePaginationSinglePage && data.length <= _rowsPerPageDefault)
    );

    return (
        <Box display='flex' flexDirection='column' width='100%' position='relative' flex='1'>
            <Paper style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                <TableWrapper dense={dense}>
                    <TableHeader columns={_columns}/>
                    <TableBody data={_data} rowsPerPage={rowsPerPage} page={page} columns={_columns}/>
                </TableWrapper>
                <Pagination count={_data.length} 
                    page={page} setPage={setPage}
                    hidden={_hidePagination}
                    rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}
                />
            </Paper>
            {
                !hideDense &&
                <DenseSwitch dense={dense} setDense={setDense}/>
            }
        </Box>
    );
};

export default EnhancedTable;