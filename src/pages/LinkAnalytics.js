import React, {useState} from 'react';
import MUIDataTable from "mui-datatables";
import NavBar from '../components/NavBar';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Chart from '../components/Chart';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';

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

export default function LinkAnalytics(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const userURLsAPIURL = "http://3.120.199.92:8080/Urls/userURL";
  const redirectionAPIURL = "http://3.120.199.92:8080/Urls/";
  const userLinkAnalyticsURL = "http://3.120.199.92:8080/Urls/lastMonthsUserLinkAnalytics";

  const [userLinkDataUpdated, setUserLinkDataUpdated] = useState(false); 
  const [userLinkAnalyticsChartData, setUserLinkAnalyticsData] = useState([]);
  
  const columns = ["Full URL", "Shortened URL", "Number of Clicks", "Expiration Date"];
  const [dataUpdated, setDataUpdated] = useState(false);
  const [table_data, setTableData] = useState([]);
  const options = {
    responsive: 'scroll', whiteSpace: 'nowrap', selectableRows: false
  };

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
    const headers = {admin: "admin"};
    const data = {email: props.email, password: props.password, role: "user"};
    axios.post(userLinkAnalyticsURL, data, {headers: headers}) 
      .then(res => {
        console.log(res);
        if (res.status === 200) {       
          setUserLinkAnalyticsData(res.data.reverse());
          setUserLinkDataUpdated(true);
        } else {
          console.log(res)
        }
      })
      .catch(res => console.log(res));
  }

  const onFinish = () =>  {
    const headers = {
      "usermail":props.email
    }
    console.log("All user urls");
    console.log(headers);
    axios.get(userURLsAPIURL, {headers: headers})    
    .then(res => {
      console.log(res);
      if (res.status === 200) {     
        console.log(res.data.length);
        var i;
        const data = [];
        for (i = 0; i < res.data.length; i++) {
          const table_row = [res.data[i].URL, redirectionAPIURL + res.data[i].hash, res.data[i].noOfClick, res.data[i].date];
          data.push(table_row);            
        }
        console.log("data is " + data);
        setTableData(data);
        console.log("table data is " + table_data);
        setDataUpdated(true);
      } else {
        console.log(res)
      }
    })
    .catch(res => console.log(res));          
  }    

  if (dataUpdated && userLinkDataUpdated) {
    return(        
      <div style={{display: 'table', tableLayout:'fixed', width:'100%'}}>
        <NavBar />
        <br>
        </br>
        <Container component="main" maxWidth="xl">
          <Grid container spacing={5} alignItems="center"> 
            <Grid item xs={12} md={8} lg={9} >
              <MUIDataTable
              title={"Link Analytics"}
              data={table_data}
              columns={columns}
              options={options}
              />  
            </Grid>
            <Grid item xs={12} md={8} lg={9} >
              <Paper className={fixedHeightPaper}>
                <Chart 
                  title={"Monthly Redirection Analytics"} 
                  yAxisLable={"Monthly URL Redirections"} 
                  xAxisData={past12Months}
                  yAxisData={userLinkAnalyticsChartData}
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
          <NavBar />
          {userLinkAnalytics()}
          {onFinish()}
          <Typography component="h1" variant="h5">
            Analytics are loading...
          </Typography>
      </div>        
    );
  }
    
}