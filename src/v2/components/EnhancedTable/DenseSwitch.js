import { Box, FormControlLabel, Switch } from '@material-ui/core';
import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';

const DenseSwitch = ({hidden, dense, setDense}) => {
    const intl = useIntl();

    const handleChangeDense = () => {
        setDense((prevDense) => !prevDense);
    }

    const checked = Boolean(dense);

    return (
        <Fragment>
        {
            !hidden &&
            <Box padding={dense ? 0 : 1}
            >
                <FormControlLabel
                    control={<Switch checked={checked} onChange={handleChangeDense}/>}
                    label={intl.formatMessage({id: 'Dense'})}
                />
            </Box>
        }
        </Fragment>
    );
}
 
export default DenseSwitch;