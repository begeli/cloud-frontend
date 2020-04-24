import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LinkIcon from '@material-ui/icons/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link }  from "react-router-dom";
import NavBar from './NavBar';
import axios from "axios";
import moment from 'moment';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';

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

export default function Home(props) {
  const classes = useStyles();
  const [originalUrl, setOriginalUrl] = useState("");
  const [originalUrl4Custom, setOrginal4Custom] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const redirectionUrl = "http://18.197.151.94:8080/Urls/";//http://localhost:3000/";  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate4Custom, setSelectedDate4Custom] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected date is " + date);
  };

  const handleDateChange4Custom = (date) => {
    setSelectedDate4Custom(date);
    console.log("Selected date is " + date);
  };

  const onFinish = () =>  {
    if (originalUrl !== "") {
      console.log("Regular url shortener");
      const data = {_id: null, URL:originalUrl, hash:"", userMail:props.email, date:selectedDate};
      console.log(data);
      axios.post("http://18.197.151.94:8080/Urls/shorten", data)    
      .then(res => {
        console.log(res);
        if (res.status === 200) {       
          setShortenedUrl(redirectionUrl + res.data.hash);
        } else {
          console.log(res)
        }
      })
      .catch(res => console.log(res));    
    }
    
  }

  const onFinishCustom = () =>  {    
    if (originalUrl4Custom !== "" && customUrl !== "") {
      console.log("Custom url shortener");
      const headers = {
        "hash":customUrl
      }
      const data = {_id: null, URL:originalUrl4Custom, hash:customUrl, userMail:props.email, date:moment().format("YYYY-MM-DD")};
      console.log(data);
      axios.post("http://18.197.151.94:8080/Urls/customshorten", data, {headers: headers})    
      .then(res => {
        console.log(res);
        /*if (res.status === 200) {        
          //setAuthorization(true);
          //props.handleSuccessfulAuth(email);
          //history.push("/home")
          //setShortenedUrl(redirectionUrl + res.data.hash);
        } else {
          console.log(res)
        }*/
      })
      .catch(res => console.log("Error"));    
    }
    
  }

  const updateOriginalUrl = (event) => {    
    setOriginalUrl(event.target.value);
    //console.log(originalUrl);
  };
  
  const updateOriginalUrl4Custom = (event) => {    
    setOrginal4Custom(event.target.value);
    //console.log(originalUrl);
  };

  const updateCustomUrl = (event) => {    
    setCustomUrl(event.target.value);
    //console.log(originalUrl);
  };
//<form className={classes.form} onSubmit={onFinish()} noValidate> </form>
  return (
    <div>
        <NavBar />
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LinkIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Welcome {props.email}
            </Typography>
            
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="fullUrl"
                label="Full URL"
                name="fullUrl"
                autoComplete="fullUrl"
                autoFocus
                onChange={updateOriginalUrl}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="yyyy-MM-dd"
                  margin="normal"
                  id="date-picker-inline"
                  label="Select expiration date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                /> 

                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Select expiration time"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => onFinish()}
            >
                Shorten URL
            </Button>

            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="shortenedUrl"
                label="Shortened URL"
                id="shortenedUrl"
                autoComplete="shortenedUrl"
                value={shortenedUrl}
            />                   
            
        </div>
        </Container>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Create a Custom URL
            </Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="fullUrl2"
                label="Full URL"
                name="fullUrl2"
                autoComplete="fullUrl2"
                autoFocus
                onChange={updateOriginalUrl4Custom}
            />

            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="customUrl"
                label="Custom URL"
                id="customUrl"
                autoComplete="customUrl"
                onChange={updateCustomUrl}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="yyyy-MM-dd"
                  margin="normal"
                  id="date-picker-inline"
                  label="Select expiration date"
                  value={selectedDate4Custom}
                  onChange={handleDateChange4Custom}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                /> 

                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Select expiration time"
                  value={selectedDate4Custom}
                  onChange={handleDateChange4Custom}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => onFinishCustom()}
            >
                Customize URL
            </Button>  
        </div>
        </Container>
    </div>
    
  );
    
}
