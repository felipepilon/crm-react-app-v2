import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import EnhancedTable from '../EnhancedTable/EnhancedTable';
import SearchDialog from '../SearchDialog';
import PageHeader from './PageHeader';
import SearchIconButton from './SearchButton';
import AddButton from './AddButton';
import EditDialog from '../EditDialog';
import { AppStateContext } from '../../contexts/AppState';
import { useIntl } from 'react-intl';
import { Can } from '../../../contexts/Can';

const reduceFilters = (_rawFilters) => Object.entries(_rawFilters || {}).reduce((prevFil, [filKey, fld]) => {
    return {
        ...prevFil,
        [filKey]: typeof fld === 'object' && fld.hasOwnProperty('value') ?
            `${fld.value || ''}${fld.likeSuffix || ''}` :
            fld
    };
}, {})

const ReportPage = ({
    title, columns, getDataFnc, searchSchema, addSchema,
    addValues, addFnc, editSchema, editFnc, 
    modelName, modelTitle, getFnc, rowId, filters
}) => {
    const { setPageTitle } = useContext(AppStateContext);

    const loc = useLocation();
    const hist = useHistory();
    const intl = useIntl();
    
    const [filterOpen, setFilterOpen] = useState(false);
    const [_filters, _setFilters] = useState(reduceFilters(loc.state.filters));
    const [_rawFilters, _setRawFilters] = useState(loc.state.filters);
    const [addOpen, setAddOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(new Date());
    const [selected, setSelected] = useState({});
    const [data, setData] = useState([]);

    const _modelTitle = intl.formatMessage({id: modelTitle || 'Record'});
    
    useEffect(() => {
        if (title)
            setPageTitle(title);
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        _setFilters({
            ...filters,
            ...reduceFilters({
                ...filters,
                ..._rawFilters
            })
        });
        
        if (!_rawFilters) {
            setFilterOpen(true);
        }

        hist.replace(loc.pathname, {
            ...loc.state,
            filters: _rawFilters
        })
    // eslint-disable-next-line
    }, [_rawFilters])

    const handleEdit = (row) => {
        setSelected(row);
        setUpdateOpen(true);
    }

    const handleUpdate = () => {
        setLastUpdate(new Date());
    }
    
    return (
        <Fragment>
            <PageHeader>
                {
                    addSchema &&
                    <Can I='add' an={modelName}>
                        <AddButton handleClick={() => setAddOpen(true)}/>
                    </Can>
                }
                <SearchIconButton handleClick={() => setFilterOpen(true)}/>
            </PageHeader>
            <EnhancedTable columns={columns} 
                data={data} setData={setData}
                getDataFnc={getDataFnc} 
                filters={_filters}
                noLoadData={!Boolean(_rawFilters)}
                lastUpdate={lastUpdate}
                handleEdit={editSchema && handleEdit}
                hideRowNo={Boolean(editSchema)}
            />
            {
                searchSchema &&
                <SearchDialog 
                    modelTitle={_modelTitle} 
                    schema={searchSchema} 
                    values={_rawFilters}
                    open={filterOpen} 
                    handleClose={() => setFilterOpen(false)} 
                    setFilters={_setRawFilters}
                />
            }
            {
                addSchema && 
                <EditDialog 
                    modelTitle={_modelTitle} 
                    schema={addSchema}
                    open={addOpen}
                    values={addValues}
                    action='add'
                    editFnc={addFnc}
                    handleClose={() => setAddOpen(false)}
                    handleSubmit={handleUpdate}
                />
            }
            {
                editSchema &&
                <EditDialog 
                    modelTitle={_modelTitle}
                    schema={editSchema}
                    open={updateOpen}
                    values={selected}
                    getFnc={getFnc}
                    rowId={rowId}
                    action='update'
                    editFnc={editFnc}
                    handleClose={() => setUpdateOpen(false)}
                    handleSubmit={handleUpdate}
                />
            }
        </Fragment>
    );
}
 
export default ReportPage;