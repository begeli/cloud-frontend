import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';

// Generate Sales Data


export default function Chart(props) {
  const theme = useTheme();

  const createData = (time, amount) => {
    return { time, amount };
  }  

  const returnData = () => {
    const chartData = []
    var i;
    for (i = 0; i < props.xAxisData.length; i++) {
      console.log(createData(props.xAxisData[i], props.yAxisData[i]));
      chartData.push(createData(props.xAxisData[i], props.yAxisData[i]));
    }

    console.log("Chart data is " + chartData);
    return chartData;
  }

  const data = returnData();

  return (
    <React.Fragment>
        {console.log(data)}
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {props.title}
        </Typography>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              {props.yAxisLabel}
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}