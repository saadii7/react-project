import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import avatar from "../../assets/ronaldo.jpg";
import { Divider, Typography } from "@material-ui/core";
import { typography } from '@material-ui/system';
import { withRouter, Link } from 'react-router-dom';
import ProfileImg from '../../assets/profile.png';
import Container from '@material-ui/core/Container';
const styles = {
  root: {
    flex: 1
    // margin: 0,
    // position: '-webkit-sticky',
    // position: 'sticky',
    // boxShadow:5
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  card: {
    width: "300px",
    height: "300px",
  },
  cardMedia: {
    backgroundImage: 'linear-gradient( 180deg,rgb(242,113,33) 0%,rgb(251,129,34) 50%,rgb(24,28,31)100%)',
  },
  cardAvatar: {
    borderColor: "#FFFFFF",
    width: 120,
    height: 120,
    border: '5px solid',
    justify: "center",
    direction: "column",
  },
  cardAvatarPosition: {
    top:30,
    // marginTop: 30,
    alignItems: "center",
    marginLeft: 30,
    // alignItems: "center",
    // justify: "center",
  },
  fab: {
    color: '#181C1F',
    '&:hover': {
      color: ("#FB8122"),
    },
  },
  Typography: {
    // marginTop: 10,
    marginLeft: 30,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 800,
    display: "flex",
    color: "white",
    letterSpacing: 3,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    textDecoration: 'none'
  },
  sticky: {
    // background: 'black',
    position: '-webkit-sticky',
    position: 'sticky',
    // display: 'block',
    // overflow:"hidden",
    top: 80,
    bottom: 20,
    // paddingTop: '100px',
    // paddingBottom: '40px',
    // zIndex: 5,
    // Zindex: 100,
  },
  avatarPosition: {
    flex: 1,
    aspectRatio: 3.5,
    resizeMode: 'contain',
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile(props) {
  const classes = useStyles();
  console.log('-------------------User Bio-------', props.user.isAdmin)
  let button;
  if (props.user.isAdmin) {
    button = (
      <Link to='/grounds' style={{ textDecoration: 'none' }}>
        <Typography className={classes.fab} variant="h6">Play Grounds</Typography>
      </Link>
    )
  } else {
    button = (
      <Link to='/groundList' style={{ textDecoration: 'none' }}>
        <Typography className={classes.fab} variant="h6">Play Grounds</Typography>
      </Link>
    )
  }
  { console.log('function UserProfile---------->', props.id) }
  return (
    <div className={classes.sticky}>
      {/* <Grid style={{position: 'fixed'}} alignItems="center" className={classes.root}> */}
      {/* <Grid> */}
      {/* <Container> */}

      <Card profile>
        <CardMedia className={classes.cardMedia} profile>
          <Link to='https://www.google.com'>
            <div className={classes.cardAvatarPosition}>
              <Avatar src={props.user.avatar} alt={props.user.name} className={classes.cardAvatar} />
              <typography className={classes.Typography}>{props.user.name}</typography>
              <Rating style={{ justify: 'center' }} value={5} readOnly />
            </div>
          </Link>
        </CardMedia>
        <CardContent profile>
          <Link to={`/user/${props.id}/profile`} style={{ textDecoration: 'none' }}>
            <Typography className={classes.fab} variant="h6">My Timeline</Typography>
          </Link>
          <Divider />
          {/* <Link to='/grounds' style={{ textDecoration: 'none' }}>
            <Typography className={classes.fab} variant="h6">Play Grounds</Typography>
          </Link> */}
          {button}
          <Divider />
          <Link to='/profile' style={{ textDecoration: 'none' }}>
            <Typography className={classes.fab} variant="h6">News</Typography>
          </Link>
          <Divider />
          <Link to='/profile' style={{ textDecoration: 'none' }}>
            <Typography className={classes.fab} variant="h6">Match Highlights</Typography>
          </Link>
        </CardContent>
      </Card>
      {/* </Grid> */}
      {/* </Grid> */}
      {/* </Container> */}
    </div>
  );
}