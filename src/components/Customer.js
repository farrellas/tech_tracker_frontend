import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { setCustomer } from '../store/reducers/customerSlice';
import { useDispatch } from 'react-redux';


export default function Customer({ customer }) {
    const dispatch = useDispatch();
    
    return (
        <>
            <Card variant="outlined" sx={{ minWidth: 275 }}>
                <CardContent className='center'>
                    <Typography variant="h5" component="div">
                        {customer.name}
                    </Typography>
                    <Typography variant="body2">
                        {customer.street_address}
                        <br />
                        {customer.city}, {customer.state}  {customer.zip_code}
                    </Typography>
                </CardContent>
                <CardActions className='justify-content-around'>
                    <Link to={`/customers/${customer.id}`} className="text-decoration-none link-dark">
                        <Button size="small" onClick={()=>dispatch(setCustomer(customer))}>View details</Button>
                    </Link>
                    <Link to={`/customers/${customer.id}`} className="text-decoration-none link-dark">
                        <Button size="small" onClick={()=>dispatch(setCustomer(customer))}>Create Work Order</Button>
                    </Link>
                </CardActions>
            </Card>
            <hr />
        </>
    )
}
