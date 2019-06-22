import React, { Component } from 'react';
import EventListing from './listing';

class EventIndex extends Component {
    state = {
        events: []
    };
    render() {
        return (
            <div style={{ maxWidth: '100%' }}>
                <EventListing events={this.state.events} />
            </div>
        );
    }
}
export default EventIndex;
