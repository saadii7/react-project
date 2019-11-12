import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


import VideoPlayer from 'react-video-markers';

class Video extends Component {
  state = {
    isPlaying: false,
    volume: 0.7,
    url:'',
  };
  
  handlePlay = () => {
    this.setState({isPlaying: true});
  };
  
  handlePause = () => {
    this.setState({isPlaying: false});
  };
  
  handleVolume = value => {
    this.setState({volume: value});
  };
  
  componentDidMount(){
      console.log("===========video Url===========>",this.props.match.params.url)
      this.setState({
        url:this.props.match.params.url
      })      
  }

  render () {
    const {isPlaying, volume} = this.state;

    return <VideoPlayer
      url={this.state.url}
      isPlaying={isPlaying}
      volume={volume}
      onPlay={this.handlePlay}
      onPause={this.handlePause}
      onVolume={this.handleVolume}
     />
  }
}
export default connect(withStyles({ withTheme: true })(withRouter(Video)));
