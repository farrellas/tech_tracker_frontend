import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearWorkOrder } from '../../store/reducers/workOrderSlice';

import WorkOrderCard from '../../components/WorkOrderCard';
import { clearCustomer } from '../../store/reducers/customerSlice';
import { clearSystem } from '../../store/reducers/systemSlice';

export default function Recent({ notification }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

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
    dispatch(clearWorkOrder());
    dispatch(clearCustomer());
    dispatch(clearSystem());
  }, [])

  return (
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
              <hr />
              {work_orders.map((w, i) => <WorkOrderCard key={i} work_order={w} />)}
            </div>
          }
        </div>
      </div>
    </div>
  )
}
