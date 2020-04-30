import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LinkIcon from '@material-ui/icons/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link}  from "react-router-dom";
import NavBar from './NavBar';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AdminHome(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const urlCreationAnalyticURL = "http://18.196.128.47:8080/Urls/lastMonthsUrlCreationAnalytics";
  const redirectionAnalyticsURL = "http://18.196.128.47:8080/Urls/lastMonthsRedirectionAnalytics";
  const userLinkAnalyticsURL = "http://18.196.128.47:8080/Urls/lastMonthsUserLinkAnalytics";

  const urlCreation = () => {
    const headers = {"admin": "admin"};
    const data = {email: "admin", password:"pass"};
    axios.post(urlCreationAnalyticURL, data, {headers: headers})    // CHANGE HERE
      .then(res => {
        console.log(res);
        if (res.status === 200) {       
          //setShortenedUrl(redirectionUrl + res.data.hash);
        } else {
          console.log(res)
        }
      })
      .catch(res => console.log(res));
  }

  const redirectionAnalytics = () => {
    const headers = {"admin": "admin"};
    const data = {email: "admin", password:"pass"};
    axios.post(redirectionAnalyticsURL, data)    // CHANGE HERE
      .then(res => {
        console.log(res);
        if (res.status === 200) {       
          //setShortenedUrl(redirectionUrl + res.data.hash);
        } else {
          console.log(res)
        }
      })
      .catch(res => console.log(res));
  }

  const userLinkAnalytics = () => {
    const headers = {"admin": "admin"};
    const data = {email: "admin", password:"pass"};
    axios.post(userLinkAnalyticsURL, data, {headers: headers})    // CHANGE HERE
      .then(res => {
        console.log(res);
        if (res.status === 200) {       
          //setShortenedUrl(redirectionUrl + res.data.hash);
        } else {
          console.log(res)
        }
      })
      .catch(res => console.log(res));
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
                  Admin page - under construction {props.email}
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => urlCreation()}
            //component={Link}
            //to="/ahome"
            className={classes.submit}
          >
            URL Creation
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => redirectionAnalytics()}
            //onClick={() => onFinish()}
            //component={Link}
            //to="/ahome"
            className={classes.submit}
          >
            Button 2
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => userLinkAnalytics()}
            //onClick={() => onFinish()}
            //component={Link}
            //to="/ahome"
            className={classes.submit}
          >
            Button 3
          </Button>
        </div>
      </Container>              
    </div>
    
  );
}