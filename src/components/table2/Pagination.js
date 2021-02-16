import { TablePagination } from '@material-ui/core';
import React, { Fragment } from 'react';

const Pagination = ({hidden, count, page, rowsPerPage, setPage, setRowsPerPage}) => {
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    }

    return (
        <Fragment>
        {
            !hidden &&
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component='div'
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={(e, newPage) => setPage(newPage)}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        }
        </Fragment>
    );
}
 
export default Pagination;