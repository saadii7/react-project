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
import  {Divider, Typography, CardHeader}  from "@material-ui/core";
import { typography } from '@material-ui/system';
import { withRouter, Link } from 'react-router-dom';
import gameon from '../../assets/game-on-15.png';

const styles = {
  root: {
    flex:1
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
  card:{
    width:"300px",
    height:"300px",
  },
  cardMedia: {
    backgroundImage: 'linear-gradient( 180deg,rgb(242,113,33) 0%,rgb(251,129,34) 50%,rgb(24,28,31)100%)',
  },
  cardAvatar: {
    borderColor: "#FFFFFF",
    width: 150,
    height: 150,
    border: '5px solid',
  },
  cardAvatarPosition: {
    paddingTop:20,
    paddingLeft: 40,
    paddingRight: 40,
    // margin: 20,
    alignItems: "center",
    justify: "center",
  },
  fab: {
    color: '#181C1F',
    '&:hover': {
        color: ("#FB8122"),
    },
},
  Typography: {
    // marginTop: 10,
    marginLeft: 40,
    textAlign:"center",    
    fontSize: 20,
    fontWeight: 800,
    display: "flex",
    color: "white",
    letterSpacing:3,
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
margin:{
marginBottom:10
}
};

const useStyles = makeStyles(styles);

export default function Trending(props) {
  const classes = useStyles();
  // let img;
  //       if (data._id !== this.props.auth.user.id) {
  //           if(data.avatar && data.avatar.length>0){
  //               // img = data.avatar
  //               img=ProfileImg
  //           }else{
  //               img=ProfileImg
  //           }
  //         }
  return (
    <div className={classes.sticky}>
      {/* <Grid alignItems="center" className={classes.root}> */}
        {/* <Grid> */}
        <Card profile className={classes.margin}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="120"
            image={gameon}
            title={'gameon'}
          />
        </Card>
        <Card profile className={classes.margin}>
          <CardContent profile>
            <Link to='/profile' style={{ textDecoration: 'none' }}>
            <Typography className={classes.fab} variant="h6">Play like a Champion Today.</Typography>
            </Link>
            <Divider />
            <Link to='/profile' style={{ textDecoration: 'none' }}>
            <Typography className={classes.fab} variant="h6">Never let good enough BE enough!</Typography>
            </Link>
            <Divider />
            <Link to='/profile' style={{ textDecoration: 'none' }}>
            <Typography className={classes.fab} variant="h6">Winning is a habit, Success is a choice.</Typography>
            </Link>
            <Divider/>
            <Link to='/profile' style={{ textDecoration: 'none' }}>
            <Typography className={classes.fab} variant="h6">Practice winning every day.</Typography>
            </Link>
          </CardContent>
        </Card>
        <Card profile className={classes.margin}>
          <CardContent profile>
            <Link to='/profile' style={{ textDecoration: 'none' }}>
            <Typography className={classes.fab} variant="h6">about</Typography>
            </Link>
            <Divider />
            <Link to='/profile' style={{ textDecoration: 'none' }}>
            <Typography className={classes.fab} variant="h6">customer care</Typography>
            </Link>
            <Divider />
          </CardContent>
        </Card>
        {/* </Grid> */}
      {/* </Grid> */}
    </div>
  );
}