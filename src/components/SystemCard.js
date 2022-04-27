import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { setSystem } from '../store/reducers/systemSlice';
import { useDispatch } from 'react-redux';

export default function SystemCard({ system }) {
    const dispatch = useDispatch();
    
    return (
        <>
            <Card variant="outlined" sx={{ minWidth: 275 }}>
                <CardContent className='center'>
                    <Typography variant="h5" component="div">
                        {system.name}
                    </Typography>
                    <Typography variant="h6" component="div">
                        {system.area_served}
                    </Typography>
                    <Typography variant="h6">
                    {(system.heating && system.cooling) ?
                        "Heating and Cooling"
                        : system.heating ?
                            ("Heating Only")
                            :
                            ("Cooling Only")
                    }
                    </Typography>
                </CardContent>
                <CardActions className='justify-content-around'>
                    <Link to={`/customers/${system.customer_id}/systems/${system.id}`}>
                        <Button size="small" onClick={()=>dispatch(setSystem(system))}>View details</Button>
                    </Link>
                    <Link to={`/customers/${system.customer_id}/systems/${system.id}/workorders/create`}>
                        <Button size="small" onClick={()=>dispatch(setSystem(system))}>Create Work Order</Button>
                    </Link>
                </CardActions>
            </Card>
            <hr />
        </>
    )
}
