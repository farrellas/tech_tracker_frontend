import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';

export default function Deposits({ work_orders }) {
  return (
    <React.Fragment>
      <Title>Recently Completed Work Orders</Title>
      <Typography component="p" variant="h4">
        {work_orders.length}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        in the last month
      </Typography>
    </React.Fragment>
  );
}