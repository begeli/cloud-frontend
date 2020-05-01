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
import moment from 'moment';
import Chart from './Chart';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';

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
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function AdminHome(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");

  const [userCreationDataUpdated, setUserCreationDataUpdated] = useState(false); // probably unnecessary
  const [userCreationAnalyticsChartData, setUserCreationAnalyticsData] = useState([]);

  const [redirectionDataUpdated, setRedirectionDataUpdated] = useState(false);
  const [redirectionAnalyticsChartData, setRedirectionAnalyticsData] = useState([]);
  
  const [urlCreationDataUpdated, setUrlCreationDataUpdated] = useState(false);
  const [urlCreationAnalyticsChartData, setUrlCreationAnalyticsData] = useState([]);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
          setUrlCreationAnalyticsData(res.data.reverse());
          setUrlCreationDataUpdated(true);
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
          setRedirectionAnalyticsData(res.data.reverse());
          setRedirectionDataUpdated(true);  
        } else {
          console.log(res)
        }
      })
      .catch(res => console.log(res));
  }

  const pastXMonths = (noOfMonths) => {
    var monthName = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var d = new Date();
    d.setDate(1);
    var expectedLength = noOfMonths;
    var monthsArray = new Array(expectedLength);
    var i;
    for (i=0; i<expectedLength; i++) {
        monthsArray[(monthsArray.length - i - 1) % expectedLength] = monthName[d.getMonth()] + ' ' + d.getFullYear()
        d.setMonth(d.getMonth() - 1);
    }
    return monthsArray;
  }

  const past12Months = pastXMonths(12);
  
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

  if (redirectionDataUpdated && urlCreationDataUpdated) {
    return(
      <div>
        <NavBar page={"admin"}/>
        <Container component="main" maxWidth="md">
          <Grid container spacing={5}>
            <Grid item xs={12} md={8} lg={9} spacing={3}>
              <Paper className={fixedHeightPaper}>
                <Chart 
                  title={"Monthly URL Creation Analytics"} 
                  yAxisLable={"Monthly URL Creation"} 
                  xAxisData={past12Months}
                  yAxisData={urlCreationAnalyticsChartData}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={9} spacing={3}>
              <Paper className={fixedHeightPaper}>
                <Chart 
                  title={"Monthly Redirection Analytics"} 
                  yAxisLable={"Monthly Redirections"} 
                  xAxisData={past12Months}
                  yAxisData={redirectionAnalyticsChartData}
                />
              </Paper>
            </Grid> 
            {
              /*
                <Grid item xs={12} md={8} lg={9} spacing={3}>
                  <Paper className={fixedHeightPaper}>
                    <Chart 
                      title={"Monthly URL Creation Analytics"} 
                      yAxisLable={"Monthly User Creation"} 
                      xAxisData={past12Months}
                      yAxisData={redirectionAnalyticsChartData}
                    />
                  </Paper>
                </Grid>
              */
            }            
          </Grid>
        </Container>                
      </div>
    );
  } else {
    return (
      <div>
        <NavBar page={"admin"}/>
        {urlCreation()}
        {redirectionAnalytics()}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                    Admin page - Analytics are loading...
            </Typography>
            {
              /*
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
                
              */
            }
          </div>
        </Container>              
      </div>      
    );
  }
  
}