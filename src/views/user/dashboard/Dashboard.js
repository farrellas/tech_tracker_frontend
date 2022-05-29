import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import RecentWorkOrders from './RecentWorkOrders';
import Orders from './Orders';

export default function Dashboard({ notification }) {
    const user = useSelector((state) => state.auth.user);

    const [work_orders, setWorkOrderList] = useState([]);


    const getUserWorkOrders = async () => {
        const res = await fetch(`https://tech-tracker-backend.herokuapp.com/api/recent/work-order-list`, {
            method: "GET",
            headers: {
                'x-access-token': user.token
            }
        });
        const data = await res.json();
        console.log(data)
        if (data.status === 'success') {
            setWorkOrderList(data.work_order)
        }
        else {
            notification({
                'status': 'error',
                'message': 'Error retrieving work order list. Try again later'
            });
        }
    }

    useEffect(() => {
        getUserWorkOrders();
    }, [])

    return (
        <Box>
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            <Chart />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            <RecentWorkOrders work_orders={work_orders} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Orders work_orders={work_orders} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
