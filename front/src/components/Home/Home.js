// Home.js

import React, { Component } from 'react';
// import { Button } from 'reactstrap';
import Button from '@material-ui/core/Button';

// import New from './new';
// import Slider from './slider/slider';

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <Button variant="contained" color="primary">
                    Hello World
                </Button>
            </div>
        );
    }
}
