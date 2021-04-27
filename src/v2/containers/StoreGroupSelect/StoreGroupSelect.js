import { Link, Avatar, Box, Container, List, ListItem, ListItemText, makeStyles, Typography, useTheme } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Link as LinkRouter, useHistory, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../contexts/Auth';
import { get_StoreGroups } from '../../../services/StoreGroup';
import { AppStateContext } from '../../contexts/AppState';
import DomainIcon from '@material-ui/icons/DomainOutlined';
import { FormattedMessage } from 'react-intl';

const loadingStatus = 'Loading store groups';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.light,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    main: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.secondary.main,
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
    },
}));

const StoreGroupSelect = () => {
    const { addStatus, removeStatus } = useContext(AppStateContext);
    const { setStoreGroup } = useContext(AuthContext);

    const hist = useHistory();
    const loc = useLocation();
    const theme = useTheme();

    const classes = useStyles();

    const [ options, setOptions ] = useState(null);

    useEffect(() => {
        addStatus(loadingStatus);

        get_StoreGroups({})
        .then((res) => {
            removeStatus(loadingStatus);

            if (res.length === 1) {
                setStoreGroup(res[0]);
                hist.replace(`/${res[0].store_group_code}/workspace`, loc.state);
            } else {
                setOptions(res)
            }
        });
    // eslint-disable-next-line
    }, []);

    return (
        <div className={classes.root}>
            <Container maxWidth="xs" className={classes.main}>
                {
                    /*<Box>
                        <img src={require('./home-bar-black.png')} height='50px' alt=''/>
                    </Box>*/
                    <Avatar style={{backgroundColor: theme.palette.primary.main}}>
                        <DomainIcon/>
                    </Avatar>
                }
                {
                    options &&
                    <Box width='100%'>
                        <Typography variant="body1" style={{marginTop: theme.spacing(2)}}>
                            <FormattedMessage id='Select the store group:'/>
                        </Typography>
                        <List style={{width: '100%'}}>{
                            options.map((opt) => {
                                return (
                                    <Link key={opt.store_group_code} component={LinkRouter} 
                                        to={{
                                        pathname: `/${opt.store_group_code}/workspace`,
                                        state: { ...loc.state, from: loc }
                                    }}>
                                        <ListItem button>
                                            <ListItemText primary={opt.name} secondary={opt.store_group_code}/>
                                        </ListItem>
                                    </Link>
                                )
                            })
                        }</List>
                    </Box>
                }
            </Container>
        </div>
    );
}
 
export default StoreGroupSelect;