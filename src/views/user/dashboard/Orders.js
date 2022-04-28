import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

export default function Orders({ work_orders }) {
  return (
    <React.Fragment>
      <Title>Recent Work Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Customer ID</TableCell>
            <TableCell>Order Type</TableCell>
            <TableCell>Payment Method</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {work_orders.map((work_order) => (
            <TableRow key={work_order.id}>
              <TableCell>{work_order.date_created}</TableCell>
              <TableCell>{work_order.customer_id}</TableCell>
              <TableCell>{work_order.order_type}</TableCell>
              <TableCell>{work_order.work_performed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}