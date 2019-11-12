import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Facebook from '../../assets/facebook (1).png';
import Google from '../../assets/google-plus.png';

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="/">
        GameOn
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({

  root: {
    display: 'flex',
    backgroundImage: 'linear-gradient( 180deg,rgb(242,113,33) 0%,rgb(251,129,34) 50%,rgb(24,28,31)100%)',
    // backgroundColor:'#FB8122',
    color: 'white'
  },
  appBar: {
    backgroundColor: '#FB8122',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    // marginLeft: drawerWidth, 
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
  },
  iconsWrapper: {
    height: 120,
  },
  icons: {
    display: 'flex',
  },
  icon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'#181C1F',
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: '#181C1F',
    },
  },
  list: {
    margin: 0,
    listStyle: 'none',
    paddingLeft: 0,
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  language: {
    marginTop: theme.spacing(1),
    width: 150,
  },
}));

const LANGUAGES = [
  {
    code: 'en-US',
    name: 'English',
  },
  {
    code: 'fr-FR',
    name: 'Français',
  },
];

export default function AppFooter() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <div position='fixed'
      className={classNames(classes.appBar, {
        [classes.appBarShift]: setOpen
      })}>
    <Typography component="footer" className={classes.root}>
        <Container className={classes.container}>
          <Grid container spacing={5}>
            <Grid item xs={6} sm={4} md={3}>
              <Grid
                container
                direction="column"
                justify="flex-end"
                className={classes.iconsWrapper}
                spacing={2}
              >
                <Grid item className={classes.icons}>
                  <a href="https://www.facebook.com/" className={classes.icon}>
                    <img src={Facebook} alt="Facebook" />
                  </a>
                  <a href="https://www.google.com" className={classes.icon}>
                    <img src={Google} alt="Twitter" />
                  </a>
                </Grid>
                <Grid item>
                  <Copyright />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Typography variant="h6" marked="left" gutterBottom>
                Legal
            </Typography>
              <ul className={classes.list}>
                <li className={classes.listItem}>
                  <Link href="/Terms">Terms</Link>
                </li>
                <li className={classes.listItem}>
                  <Link href="/Terms">Privacy</Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={6} sm={8} md={4}>
              <Typography variant="h6" marked="left" gutterBottom>
                Language
            </Typography>
              <TextField
                select
                SelectProps={{
                  native: true,
                }}
                className={classes.language}
              >
                {LANGUAGES.map(language => (
                  <option value={language.code} key={language.code}>
                    {language.name}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Container>
      </Typography>
    </div>
  );
}