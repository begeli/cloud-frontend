import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MUIDataTable from "mui-datatables";
import NavBar from './NavBar';
import Chart from './Chart';
import axios from "axios";
import Button from '@material-ui/core/Button';

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
  fixedHeight: {
    height: 240,
  },
}));


export default function LinkAnalytics(props) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const columns = ["Full URL", "Shortened URL", "Number of Clicks"];
    const [dataUpdated, setDataUpdated] = useState(false);
    const [table_data, setTableData] = useState([]);
    /*      
      ["https://github.com/odayibas/CS443/blob/master/project/project-definition.pdf", "urlshortener.com/hAxaAYVZ", "5", "0", "3", "2"],
      ["https://github.com/odayibas/CS443", "urlshortener.com/hYAxaZAV", "6", "1", "3", "2"],
      ["https://github.com/odayibas/CS443/tree/master/slides", "urlshortener.com/slides", "2", "0", "0", "2"],
      ["https://github.com/odayibas/CS443/blob/master/slides/chapter-1.pdf", "urlshortener.com/slide1", "1", "0", "0", "1"],
    */
    const options = {
        responsive: 'scroll', whiteSpace: 'nowrap', selectableRows: false
        };

    

    const onFinish = () =>  {
      const headers = {
        "usermail":props.email
      }
      console.log("All user urls");
      console.log(headers);
      //, {headers: headers}
      axios.get("http://18.197.151.94:8080/Urls/userURL", {headers: headers})    
      .then(res => {
        console.log(res);
        if (res.status === 200) {     
          console.log(res.data.length);
          var i;
          const data = [];
          for (i = 0; i < res.data.length; i++) {
            //console.log(res.data[i]);
            const table_row = [res.data[i].URL, "http://18.197.151.94:8080/Urls/" + res.data[i].hash, res.data[i].noOfClick];
            data.push(table_row);            
            //console.log(data);
          }
          console.log("data is " + data);
          setTableData(data);
          console.log("table data is " + table_data);
          setDataUpdated(true);
          //setShortenedUrl(redirectionUrl + res.data.hash);
        } else {
          console.log(res)
        }
      })
      .catch(res => console.log(res));          
    }
    //onClick={onFinish()}
    if (dataUpdated) {
      return(        
        <div style={{display: 'table', tableLayout:'fixed', width:'100%'}}>
          <NavBar />
          <MUIDataTable
          title={"Link Analytics"}
          data={table_data}
          //data={data}
          columns={columns}
          options={options}
          />
      </div>
      );      
    } else {
      return (
        <div>
            <NavBar />
            <Button onClick={() => onFinish()}>Button Here {props.email}</Button>
            <div style={{display: 'table', tableLayout:'fixed', width:'100%'}}>
                        <MUIDataTable
                        title={"Link Analytics"}
                        data={table_data}
                        //data={data}
                        columns={columns}
                        options={options}
                        />
            </div>
            <div>
                <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                    <Chart />
                </Paper>
                </Grid>
            </div>
        </div>        
      );
    }
    
}