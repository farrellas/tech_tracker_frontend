import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

export default function WorkOrder({ getCustomerInfo, getSystemInfo }) {
  const params = useParams();
  const user = useSelector((state) => state.auth.user)
  const workOrder = useSelector((state) => state.workOrder.work_order);
  
  useEffect(() => {
    getCustomerInfo(user, params.customerId);
    getSystemInfo(user, params.customerId, params.systemId);
  }, [])
  

  return (
    <div className='flex-box-container'>
      <div className="row gx-0 justify-content-center w-100 mt-2">
        <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-4">
          <div className="floating-box">
            <div className='row'>
              <div className="cancel center mb-1">
                <Link className='col-sm-12 d-grid text-decoration-none' to={`/customers/${params.customerId}/systems/${params.systemId}`}>
                  <Button variant="contained" size='large' color='info'>BACK TO SYSTEM</Button>
                </Link>
              </div>
              <h4 className="title">
                Work Order:
              </h4>
              <div className="col-sm-12 mb-2">
                Date:
                <h3>{workOrder.date_created}</h3>
              </div>
              <div className="col-sm-12 mb-2">
                Type:
                <h3>{workOrder.order_type}</h3>
              </div>
              <div className="col-sm-12 mb-2">
                Work Performed:
                <h3>{workOrder.work_performed}</h3>
              </div>
              <div className="edit-footer">
                <Link className="box-footer-margins " to={`/customers/${params.customerId}/systems/${params.systemId}/workorders/${params.workOrderId}/edit`}>
                  Edit Work Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}