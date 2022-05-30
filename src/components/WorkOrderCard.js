import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { setWorkOrder } from '../store/reducers/workOrderSlice';
import { useDispatch } from 'react-redux';

export default function WorkOrderCard({ work_order }) {
    const dispatch = useDispatch();

    return (
        <>
            <Card variant="outlined" sx={{ minWidth: 275 }}>
                <CardContent className='center'>
                    <Typography variant="h6">
                        Date:&nbsp;
                        {work_order.date_created}
                    </Typography>
                    <Typography variant="h6" component="div">
                        Type:&nbsp;
                        {work_order.order_type}
                    </Typography>
                    <Typography component="div">
                        Work Performed:
                    </Typography>
                    <Typography component="div">
                        {work_order.work_performed}
                    </Typography>
                </CardContent>
                <CardActions className='justify-content-around'>
                    <Link
                        to={`/customers/${work_order.customer_id}/systems/${work_order.system_id}/workorders/${work_order.id}`}
                        className="text-decoration-none link-dark"
                    >
                        <Button size="small" onClick={() => dispatch(setWorkOrder(work_order))}>View details</Button>
                    </Link>
                </CardActions>
            </Card>
            <hr />
        </>
    )
}