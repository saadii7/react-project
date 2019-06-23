import React, { Component } from 'react';
import EventListing from './listing';
import AddEvent from './Add-Events';

class EventIndex extends Component {
    state = {
        events: []
    };
    render() {
        return (
            <div style={{ maxWidth: '100%' }}>
                <AddEvent/>
                <EventListing events={this.state.events} />
            </div>
        );
    }
}
export default EventIndex;
