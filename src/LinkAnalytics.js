import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MUIDataTable from "mui-datatables";
import NavBar from './NavBar';
import Chart from './Chart';

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


export default function LinkAnalytics() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const columns = ["Full URL", "Shortened URL", "Number of Clicks", "Clicks from YouTube", "Clicks from Facebook", "Clicks from Twitter"];

    const table_data = [
        ["https://github.com/odayibas/CS443/blob/master/project/project-definition.pdf", "urlshortener.com/hAxaAYVZ", "5", "0", "3", "2"],
        ["https://github.com/odayibas/CS443", "urlshortener.com/hYAxaZAV", "6", "1", "3", "2"],
        ["https://github.com/odayibas/CS443/tree/master/slides", "urlshortener.com/slides", "2", "0", "0", "2"],
        ["https://github.com/odayibas/CS443/blob/master/slides/chapter-1.pdf", "urlshortener.com/slide1", "1", "0", "0", "1"],
        ];
        const options = {
            responsive: 'scroll', whiteSpace: 'nowrap', selectableRows: false
            };
    return (
        <div>
            <NavBar />
            <div style={{display: 'table', tableLayout:'fixed', width:'100%'}}>
                        <MUIDataTable
                        title={"Link Analytics"}
                        data={table_data}
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