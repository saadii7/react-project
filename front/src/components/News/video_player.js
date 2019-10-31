import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
// import '../../../node_modules/video-react/dist/video-react';
import {Player,
    ControlBar,
    ReplayControl,
    ForwardControl,
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton,
    VolumeMenuButton} from 'video-react';

const styles = theme => ({
    video:{
        height:100,
        width:100,
        border:10
    }
})
class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const { classes } = this.props;
        return (
                
                <div className={classes.video}>
                {/* <Carousel /> */}
                <Player poster="/assets/poster.png">
      <source src="http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4" />
      <source src="http://mirrorblender.top-ix.org/movies/sintel-1024-surround.mp4" />

      <ControlBar>
        <ReplayControl seconds={10} order={1.1} />
        <ForwardControl seconds={30} order={1.2} />
        <CurrentTimeDisplay order={4.1} />
        <TimeDivider order={4.2} />
        <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
        <VolumeMenuButton disabled />
      </ControlBar>
    </Player>
                {/* <Player>
                    <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
                </Player> */}
            </div>

        );
    }
}

export default (withStyles(styles, { withTheme: true })(withRouter(VideoPlayer)));
