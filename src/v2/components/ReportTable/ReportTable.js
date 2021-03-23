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

const ReportTable = ({columns, filters, getDataFnc, lastUpdate, handleEdit, loadingStatus, modelName}) => {
    const { setError } = useContext(AppStateContext);
    const { addStatus, removeStatus } = useContext(AppStateContext)
    const ability = useContext(AbilityContext);

    const match = useRouteMatch();
    const hist = useHistory();
    const loc = useLocation();

    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);

    const _loadingStatus = loadingStatus || 'Loading';

    useEffect(() => {
        if (!filters)
            return;

        addStatus(_loadingStatus);

        if (getDataFnc) {
            getDataFnc({...match.params, params: filters})
            .then((res) => {
                setData(res);
                removeStatus(_loadingStatus);
            })
            .catch((err) => {
                setError({
                    title: 'Search Users',
                    message: 'Error getting users: {message}',
                    raw: err
                });
                removeStatus(_loadingStatus);
            });

            hist.replace(loc.pathname, {...loc.state, filters});
        }
    // eslint-disable-next-line
    }, [filters, lastUpdate])

    const _columns = columns;

    if (handleEdit && !_columns.find((row) => row.key === '_edit') && ability.can('edit', modelName)) {
        _columns.unshift({ key: '_edit', title: 'Edit', comp: 'icon', icon: EditIcon, click: handleEdit});
    }

    return (
        <Box display='flex' flexDirection='column' width='100%' position='relative' flex='1'>
            <Paper style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                <TableWrapper dense={dense}>
                    <TableHeader columns={_columns}/>
                    <TableBody data={data} rowsPerPage={rowsPerPage} page={page} columns={_columns}/>
                </TableWrapper>
                <Pagination count={data.length}
                    page={page} setPage={setPage}
                    rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}
                />
            </Paper>
            <DenseSwitch dense={dense} setDense={setDense}/>
        </Box>
    );
}
 
export default ReportTable;