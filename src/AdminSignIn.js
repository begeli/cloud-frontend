import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AdminSignIn(props) {
  const classes = useStyles();
  const loginAPIURL = "http://52.59.23.76:8080/login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = () =>  {
    const data = {email:email, password:password};
    axios.post(loginAPIURL, data)    
    .then(res => {
      if (res.status === 200) {        
        console.log("Response  ", res);
        props.handleSuccessfulAuth(email, password);
        props.history.push(`/ahome`);
      } else {
        console.log(res);
      }
    })
    .catch(res => console.log(res));
  }

  const updateEmail = (event) => {
    setEmail(event.target.value);
  };

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          onChange = {updateEmail}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="adminPassword"
          label="Password"
          type="password"
          id="adminPassword"
          autoComplete="adminPassword"
          onChange = {updatePassword}
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => onFinish()}
          className={classes.submit}
        >
          Sign In
        </Button>

        <Grid container>
          <Grid item xs>
            <Link to="/signin" variant="body2">
              {"Go back"}
            </Link>
          </Grid>            
        </Grid>
      </div>      
    </Container>
  );
}