import { DialogContent } from '@material-ui/core';
import React from 'react';
import FieldGroup from './FieldGroup';

const EditDialogContent = ({schema, values, errors, handleFieldChange}) => {
    return (
        <DialogContent>
            {
                schema.fieldGroups.map((grp, grpIndex) => {
                    return (
                        <FieldGroup key={grp.key} group={grp} values={values} errors={errors} grpIndex={grpIndex}
                            handleFieldChange={handleFieldChange}
                        />
                    );
                })
            }
        </DialogContent>
    );
}

export default EditDialogContent;