import { DialogContent } from '@material-ui/core';
import React from 'react';
import FieldGroup from './FieldGroup';

const SearchDialogContent = ({schema, values, handleFieldChange}) => {
    return (
        <DialogContent>
            {
                schema.fieldGroups.map((grp, grpIndex) => {
                    return (
                        <FieldGroup key={grp.key} group={grp} values={values} grpIndex={grpIndex}
                            handleFieldChange={handleFieldChange}
                        />
                    );
                })
            }
        </DialogContent>
    );
}
 
export default SearchDialogContent;