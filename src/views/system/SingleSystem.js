import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import EquipmentCard from '../../components/EquipmentCard';
import { Button } from '@mui/material';
import { clearEquipment } from '../../store/reducers/equipmentSlice';
import { clearWorkOrder } from '../../store/reducers/workOrderSlice';
import { setSystem } from '../../store/reducers/systemSlice';
import WorkOrderCard from '../../components/WorkOrderCard';

export default function SingleSystem({ notification }) {
  const params = useParams();
  const user = useSelector((state) => state.auth.user);
  const system = useSelector((state) => state.system.current_system);
  const customer = useSelector((state) => state.customer.customer);

  const dispatch = useDispatch();

  const [redirect, setRedirect] = useState(false);
  const [equipment, setEquipmentList] = useState([]);
  const [work_orders, setWorkOrderList] = useState([]);

  const getEquipment = async (customerId, systemId) => {
    const res = await fetch(`http://localhost:5000/api/customers/${customerId}/systems/${systemId}/equipment-list`, {
      method: "GET",
      headers: {
        'x-access-token': user.token
      }
    });
    const data = await res.json();
    console.log(data)
    if (data.status === 'success') {
      setEquipmentList(data.equipment)
    }
    else {
      setRedirect(true);
      notification({
        'status': 'error',
        'message': 'Error retrieving system list. Try again later'
      });
    }
  }

  const getSystemWorkOrders = async (customerId, systemId) => {
    const res = await fetch(`http://localhost:5000/api/customers/${customerId}/systems/${systemId}/work-order-list`, {
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
    getEquipment(params.customerId, params.systemId);
    getSystemWorkOrders(params.customerId, params.systemId);
    dispatch(clearEquipment());
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
            <div className="floating-box pb-8">
              <div className="cancel center mb-1">
                <Link className='col-sm-12 d-grid mb-3 text-decoration-none' to={`/customers/${params.customerId}`}>
                  <Button variant="contained" size='large' color='info'>BACK TO CUSTOMER PAGE</Button>
                </Link>
                <Link to={`/customers/${system.customer_id}/systems/${system.id}/workorders/create`} className='col-sm-12 d-grid text-decoration-none'>
                  <Button variant='contained' size='large' onClick={() => dispatch(setSystem(system))}>Create Work Order</Button>
                </Link>
              </div>
              <h4 className="title">
                System Profile
              </h4>
              <div className="col-sm-12 mb-2">
                Name:
                <h3>{system.name}</h3>
              </div>
              <div className="col-sm-12 mb-2">
                Area Served:
                <h3>{system.area_served}</h3>
              </div>
              <div className="col-sm-12 mb-2">
                System Type:
                <h3>{system.system_type}</h3>
              </div>
              <div className="col-sm-12 mb-2">
                {(system.heating && system.cooling) ?
                  (<h3>Heating and Cooling</h3>)
                  : system.heating ?
                    (<h3>Heating Only</h3>)
                    :
                    (<h3>Cooling Only</h3>)
                }
              </div>
              <div className="col-sm-12 mb-2">
                Notes:
                <h3>{system.notes}</h3>
              </div>
              <div className='row'>
                <div className="edit-footer">
                  <Link className="box-footer-margins" to={`/customers/${customer.id}/systems/${system.id}/edit`}>
                    Edit System
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
                Equipment List
              </h4>
              <Link to={`/customers/${params.customerId}/systems/${params.systemId}/equipment/create`} className="col-sm-12 d-grid text-decoration-none">
                <Button variant="contained" size='large'>Add Equipment</Button>
              </Link>
              <div className='column center'>
                <hr />
                {equipment.map((e, i) => <EquipmentCard key={i} equipment={e} customerId={params.customerId} />)}
              </div>
            </div>
          </div>
        </div>

        <div className="row gx-0 justify-content-center w-100">
          <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-4">
            <div className="floating-box pb-4 system-list">
              <h4 className="title">
                Work Order List
              </h4>
              <Link to={`/customers/${params.customerId}/systems/${params.systemId}/workorders/create`} className="col-sm-12 d-grid text-decoration-none">
                <Button variant="contained" size='large'>CREATE WORK ORDER</Button>
              </Link>
              {work_orders.length === 0 &&
                <div className='column center'>
                  <h5>No Work Orders</h5>
                </div>
              }
              <div className='column center'>
                <hr />
                {work_orders.map((w, i) => <WorkOrderCard key={i} work_order={w} customerId={params.customerId} systemId={params.systemId} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
