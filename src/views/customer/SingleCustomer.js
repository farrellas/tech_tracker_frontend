import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearSystem } from '../../store/reducers/systemSlice';
import { clearWorkOrder } from '../../store/reducers/workOrderSlice';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

import SystemCard from '../../components/SystemCard';
import WorkOrderCard from '../../components/WorkOrderCard';

export default function SingleCustomer({ notification }) {
  const params = useParams();
  const user = useSelector((state) => state.auth.user);
  const customer = useSelector((state) => state.customer.customer);
  const dispatch = useDispatch();

  const [redirect, setRedirect] = useState(false);
  const [systems, setSystems] = useState([]);
  const [work_orders, setWorkOrderList] = useState([]);

  const getSystems = async (customerId) => {
    const res = await fetch(`http://localhost:5000/api/customers/${customerId}/system-list`, {
      method: "GET",
      headers: {
        'x-access-token': user.token
      }
    });
    const data = await res.json();
    console.log(data)
    if (data.status === 'success') {
      setSystems(data.systems)
    }
    else {
      setRedirect(true);
      notification({
        'status': 'error',
        'message': 'Error retrieving system list. Try again later'
      });
    }
  }

  const getCustomerWorkOrders = async (customerId) => {
    const res = await fetch(`http://localhost:5000/api/customers/${customerId}/work-order-list`, {
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
      setRedirect(true);
      notification({
        'status': 'error',
        'message': 'Error retrieving work order list. Try again later'
      });
    }
  }

  useEffect(() => {
    getSystems(params.customerId);
    getCustomerWorkOrders(params.customerId);
    dispatch(clearSystem());
    dispatch(clearWorkOrder());

    return () => {

    }
  }, [])

  return redirect ? (
    <Navigate to='/customers' />
  )
    :
    (
      <div className='flex-box-container'>
        <div className="row gx-0 justify-content-center w-100 mt-2">
          <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-4">
            <div className="floating-box">
              <div className='row'>
                <div className="cancel center mb-1">
                  <Link className='col-sm-12 d-grid text-decoration-none' to={`/customers`}>
                    <Button variant="contained" size='large' color='info'>BACK TO CUSTOMER LIST</Button>
                  </Link>
                </div>
                <h4 className="title">
                  Customer Profile
                </h4>
                <div className="col-sm-12 mb-2">
                  Customer Name:
                  <h3>{customer.name}</h3>
                </div>
                <div className="col-sm-12 mb-2">
                  Street Address:
                  <h3>{customer.street_address}</h3>
                </div>
                <div className="col-sm-12 mb-2">
                  City:
                  <h3>{customer.city}</h3>
                </div>
                <div className="col-sm-12 mb-2">
                  State:
                  <h3>{customer.state}</h3>
                </div>
                <div className="col-sm-12 mb-2">
                  Zip Code:
                  <h3>{customer.zip_code}</h3>
                </div>
                <div className="edit-footer">
                  <Link className="box-footer-margins " to={{ pathname: `/customers/edit/${customer.id}`, state: { customer } }}>
                    Edit Customer Info
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row gx-0 justify-content-center w-100">
          <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-4">
            <div className="floating-box pb-4 system-list">
              <h4 className="title">
                System List
              </h4>
              {systems.length > 0 ?
                <>
                  <Link to={`/customers/${params.customerId}/systems/create`} className="col-sm-12 d-grid text-decoration-none">
                    <Button variant="contained" size='large'>Add Another System</Button>
                  </Link>
                  <div className='column center'>
                    <hr />
                    {systems.map((s, i) => <SystemCard key={i} system={s} />)}
                  </div>
                </>
                :
                <div>
                  <Link to={`/customers/${params.customerId}/systems/create`} className="col-sm-12 d-grid text-decoration-none">
                    <Button variant="contained" size='large'>Add First System</Button>
                  </Link>
                </div>
              }
            </div>
          </div>
        </div>

        <div className="row gx-0 justify-content-center w-100">
          <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-4">
            <div className="floating-box pb-4 system-list">
              <h4 className="title">
                Work Order List
              </h4>
              {work_orders.length === 0 ?
                <div className='column center'>
                  <hr />
                  <h5>No Work Orders</h5>
                </div>
                :
                <div className='column center'>
                  {work_orders.map((w, i) => <WorkOrderCard key={i} work_order={w} />)}
                </div>
              }
            </div>
          </div>
        </div>
      </div >
    )
}
