import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { setEquipment } from '../store/reducers/equipmentSlice';
import { useDispatch } from 'react-redux';

export default function EquipmentCard({ customerId, equipment }) {
    const dispatch = useDispatch();

    return (
        <>
            <Card variant="outlined" sx={{ minWidth: 275 }}>
                <CardContent className='center'>
                    <Typography variant="h6">
                        Type:&nbsp;
                        {equipment.equipment_type}
                    </Typography>
                    <Typography variant="h6" component="div">
                        Brand:&nbsp;
                        {equipment.brand}
                    </Typography>
                    <Typography variant="h6" component="div">
                        Model Number:&nbsp;
                        {equipment.model_no}
                    </Typography>
                    <Typography variant="h6" component="div">
                        Serial Number:&nbsp;
                        {equipment.serial_no}
                    </Typography>
                </CardContent>
                <CardActions className='justify-content-around'>
                    <Link
                        to={`/customers/${customerId}/systems/${equipment.system_id}/equipment/${equipment.id}`}
                        className="text-decoration-none link-dark"
                    >
                        <Button size="small" onClick={() => dispatch(setEquipment(equipment))}>View details</Button>
                    </Link>
                </CardActions>
            </Card>
            <hr />
        </>
    )
}
