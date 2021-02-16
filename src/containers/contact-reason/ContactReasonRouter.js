import React from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import ContactReasonList from './ContactReasonList';
import ContactMsgPresetList from '../contact-msg-preset/ContactMsgPresetList';

const ContactReasonRouter = () => {
    const { path } = useRouteMatch();
    
    return (
        <Switch>
            <Route exact path={`${path}/:contact_reason_id/messagePresets`}
                render={({match}) => {
                    return (
                        <ContactMsgPresetList
                            contact_reason_id={match.params.contact_reason_id}
                        />
                    )
                }}
            />
            <Route path={`${path}`}>
                <ContactReasonList/>
            </Route>
        </Switch>
    );
}
 
export default ContactReasonRouter;