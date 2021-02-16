import React, { useState } from 'react';
import { 
    get_StoreGroup,
    post_StoreGroup,
} from '../../services/StoreGroup';
import EnhancedEditPage from '../edit/EnhancedEditPage';

const StoreEdit = (props) => {
    const [fields] = useState({
        groups: [
            {
                fields: [
                    { name: 'name', title: 'Name' },
                ],
            },
        ]
    });

    const [postValidations] = useState([
        (data) => {
            if (!data.name)
                return {name: 'Required'};
        },
    ]);

    return (
        <EnhancedEditPage
            title={props._new ? 'New Store Group' : 'Edit Store Group'}
            fields={fields}
            postFnc={post_StoreGroup}
            postValidations={postValidations}
            findRecordFnc={get_StoreGroup}
            findParams={{store_group_id: props.store_group_id}}
            _new={props._new}
        />
    )
};

export default StoreEdit;