import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import NavBar from './NavBar';
import axios from "axios";
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
    width: '100%',
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

  const [redirectionDataUpdated, setRedirectionDataUpdated] = useState(false);
  const [redirectionAnalyticsChartData, setRedirectionAnalyticsData] = useState([]);
  
  const [urlCreationDataUpdated, setUrlCreationDataUpdated] = useState(false);
  const [urlCreationAnalyticsChartData, setUrlCreationAnalyticsData] = useState([]);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const urlCreationAnalyticURL = "http://52.59.23.76:8080/Urls/lastMonthsUrlCreationAnalytics";
  const redirectionAnalyticsURL = "http://52.59.23.76:8080/Urls/lastMonthsRedirectionAnalytics";

  const urlCreation = () => {
    const headers = {user: "admin"};
    axios.get(urlCreationAnalyticURL, {headers: headers})
      .then(res => {
        console.log(res);
        if (res.status === 200) {       
          setUrlCreationAnalyticsData(res.data.reverse());
          setUrlCreationDataUpdated(true);
        } else {
          console.log(res)
        }
      })
      .catch(res => console.log(res));
  }

  const redirectionAnalytics = () => {
    const headers = {user: "admin"};
    axios.get(redirectionAnalyticsURL, {headers: headers})
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

  if (redirectionDataUpdated && urlCreationDataUpdated) {
    return(
      <div>
        <NavBar page={"admin"}/>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Typography component="h1" variant="h5">
            System-wide Analytics
          </Typography>
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
          </div>
        </Container>              
      </div>      
    );
  }
  
}