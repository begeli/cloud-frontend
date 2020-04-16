import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('11/04/2020', 0),
  createData('12/04/2020', 3),
  createData('13/04/2020', 6),
  createData('14/04/2020', 4),
  createData('15/04/2020', 7),
  createData('16/04/2020', 10),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Number of Clicks per Day
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
              Clicks
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}