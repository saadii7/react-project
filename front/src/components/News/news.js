import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
// import { render } from 'react-dom'
// import ReactAwesomePlayer from 'react-awesome-player';
// import ReactAwesomePlayer from './video_player';
// import "node_modules/video-react/dist/video-react.css"; // import css
// import "~video-react/styles/scss/video-react";
// import { Player } from 'video-react';
import VideoPlayer from './video_player';

function Media(props) {
  const { loading = false } = props;
  const data = props.data;
  console.log('Receriver Data-------->', loading)
  return (
    <Grid container spacing={40} justify="center">
      {(loading ? Array.from(new Array(4)) : data).map((item, index) => (
        <Box key={index} width={210} marginRight={0.5} my={5}>
          {item ? (

            <img style={{ width: 210, height: 118 }} alt={item.title} src={item.thumbnail} />
          ) : (
              <Skeleton variant="rect" width={210} height={118} />
            )}

          {item ? (
            <Grid item xs={9}>
              <Box paddingRight={2}>
                <Typography gutterBottom variant="body2">
                  {item.title}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {item.date}
                </Typography>
                <Typography display="block" variant="caption" color="textSecondary">
                  {`${item.competition.name} •`}
                </Typography>
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
                <Button color='primary' >More</Button>

              </Box>
            </Grid>
          ) : (
              <React.Fragment>
                <Skeleton />
                <Skeleton width="60%" />
              </React.Fragment>
            )}
        </Box>
      ))}
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default class YouTube extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };

  }
  componentDidMount() {
    var url = 'https://free-football-soccer-videos.p.rapidapi.com/'
    var headers = {
      "x-rapidapi-host": "free-football-soccer-videos.p.rapidapi.com",
      "x-rapidapi-key": "061f62151emsh110748f17f3acc9p173cf9jsnbf515c35bf73"
    }
    // return dispatch => {
    axios.get(url, { headers })
      .then(response => {
        (this.setState({
          data: response.data
        }));
        console.log("API-------------Response----->", this.state.data);
      })
      .catch(error => {
        throw error;
      });
    // }
  }
  render() {
    const { options } = this.state
    return (
      <div>
        <Media loading />
        <Media data={this.state.data} />
      </div>
    );
  }
}
