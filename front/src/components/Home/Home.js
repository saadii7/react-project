import React, { Component } from 'react';

// import Temperature from '../Temperature';
// import Carousel  from './Carousel';
import Features from './Features';
// import Headlines from './Headlines';
import TabList from '../Tabs/Tabs';

class Home extends Component {
    render() {
      return (
        <div>
            {/* <Carousel /> */}
            <div className="container">
                <TabList/>
                {/* <Features /> */}
                {/* <Headlines /> */}
            </div>
        </div>
      
      );
    }
}

export default Home;