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
  const redirectionUrl = "http://18.196.128.47:8080/Urls/";
  const urlShorteningAPIURL = "http://18.196.128.47:8080/Urls/shorten";
  const customUrlShorteningAPIURL = "http://18.196.128.47:8080/Urls/customshorten";

  const classes = useStyles();
  const [originalUrl, setOriginalUrl] = useState("");
  const [originalUrl4Custom, setOrginal4Custom] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [customShortenedUrl, setCustomShortenedUrl] = useState("");  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate4Custom, setSelectedDate4Custom] = useState(new Date);

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const handleDateChange = (date) => {
    var dateString = convert(date.toString());
    setSelectedDate(date);
    console.log("Selected date is " + dateString);
  };

  const handleDateChange4Custom = (date) => {
    var dateString = convert(date.toString());
    setSelectedDate4Custom(date);
    console.log("Selected date is " + dateString);
  };

  const onFinish = () =>  {
    if (originalUrl !== "") {
      console.log("Regular url shortener");
      const data = {_id: null, URL:originalUrl, hash:"", userMail:props.email, date:convert(selectedDate.toString())};
      console.log(data);
      
      axios.post(urlShorteningAPIURL, data)    
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
      const data = {_id: null, URL:originalUrl4Custom, hash:customUrl, userMail:props.email, date:convert(selectedDate4Custom.toString())};
      console.log(data);
      axios.post(customUrlShorteningAPIURL, data, {headers: headers})    
      .then(res => {
        console.log(res);
        if (res.status === 200) {       
          setCustomShortenedUrl(redirectionUrl + res.data.hash);
        } else {
          console.log(res)
        }
      })
      .catch(res => console.log("Error"));    
    }
    
  }

  const updateOriginalUrl = (event) => {    
    setOriginalUrl(event.target.value);
  };
  
  const updateOriginalUrl4Custom = (event) => {    
    setOrginal4Custom(event.target.value);
  };

  const updateCustomUrl = (event) => {    
    setCustomUrl(event.target.value);
  };
  
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

            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="customShortenedUrl"
                label="Custom Shortened URL"
                id="customShortenedUrl"
                autoComplete="customShortenedUrl"
                value={customShortenedUrl}
            />     
        </div>
        </Container>
    </div>
    
  );
    
}
