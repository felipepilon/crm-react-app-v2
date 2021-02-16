import { Box, FormControlLabel, Switch } from '@material-ui/core';
import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';

const DenseSwitch = ({hidden, dense, setDense}) => {
    const intl = useIntl();

    const handleChangeDense = () => {
        setDense(dense === 'normal' ? 'dense' : 'normal');
    }

    return (
        <Fragment>
        {
            !hidden &&
            <Box padding={dense.includes('dense') ? 0 : 2}
            >
                <FormControlLabel
                    control={<Switch checked={dense.includes('dense')} onChange={handleChangeDense} />}
                    label={intl.formatMessage({id: 'Dense Padding'})}
                />
            </Box>
        }
        </Fragment>
    );
}
 
export default DenseSwitch;