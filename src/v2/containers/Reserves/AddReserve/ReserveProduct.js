import React from 'react';
import ReserveProductSearch from './ReserveProductSearch';
import ReserveProductShow from './ReserveProductShow';
import { Paper, useTheme } from '@material-ui/core';

const ReserverProduct = ({step, activeStep, products, handleAddProduct, handleRemoveProduct, handleNextStep}) => {
    const theme = useTheme();

    const isActive = step === activeStep;
    const width = isActive ? '50%' : '25%';

    return (
        <Paper style={{ margin: theme.spacing(1), padding: theme.spacing(1), width }}>
            {
                isActive ? 
                <ReserveProductSearch
                    products={products}
                    handleAddProduct={handleAddProduct}
                    handleRemoveProduct={handleRemoveProduct}
                    handleNextStep={handleNextStep}
                /> : 
                <ReserveProductShow
                    products={products}
                />
            }
        </Paper>
    );
};
 
export default ReserverProduct;