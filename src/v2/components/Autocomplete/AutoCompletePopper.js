import { ClickAwayListener, List, Paper, Popper } from '@material-ui/core';
import React from 'react';
import { Fragment } from 'react';
import AutocompleteListItem from './AutocompleteListItem';

const AutoCompletePopper = ({anchorEl, listOptions, highlightIndex, handleClose, open, handleOptionChange, setSelectedValue}) => {
    return (
        <Fragment>
            {
                anchorEl &&
                <ClickAwayListener onClickAway={handleClose}>
                    <Popper open={open} anchorEl={anchorEl} placement='bottom-start' style={{zIndex: 1}}>
                        <Paper style={{width: anchorEl.clientWidth, maxHeight: '60vh', overflow: 'auto'}}>
                            <List>
                                {
                                    listOptions.map((opt, idx) => {
                                        return (
                                            <AutocompleteListItem key={idx} index={idx} highlightIndex={highlightIndex} handleOptionChange={handleOptionChange} option={opt} setSelectedValue={setSelectedValue}/>
                                        );
                                    })
                                }
                            </List>
                        </Paper>
                    </Popper>
                </ClickAwayListener>
            }
        </Fragment>
    );
}
 
export default AutoCompletePopper;