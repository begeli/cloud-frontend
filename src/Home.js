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
  //const email = localStorage.getItem('email');
  //const [email, setEmail] = useState("");
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
            <form className={classes.form} noValidate>
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
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
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
            />                   
            </form>
        </div>
        </Container>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Create a Custom URL
            </Typography>
            <form className={classes.form} noValidate>
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
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Customize URL
            </Button>                               
            </form>
        </div>
        </Container>
    </div>
    
  );
    
}
