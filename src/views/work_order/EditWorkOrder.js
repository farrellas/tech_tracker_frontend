import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { clearWorkOrder } from '../../store/reducers/workOrderSlice';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

export default function EditWorkOrder({ notification, getWorkOrderInfo }) {
  const params = useParams();
  const user = useSelector((state) => state.auth.user);
  const workOrder = useSelector((state) => state.workOrder.work_order)
  const dispatch = useDispatch();

  const [redirect, setRedirect] = useState(false);
  const [editWorkOrder, setEditWorkOrder] = useState({ ...workOrder })

  const sendToFlask = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://127.0.0.1:5000/api/customers/${params.customerId}/systems/${params.systemId}/work-order/${params.workOrderId}/edit`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': user.token
      },
      body: JSON.stringify({
        order_type: e.target.order_type.value,
        work_performed: e.target.work_performed.value,
      })
    });
    const data = await res.json();
    console.log(data);

    if (data.status === 'success') {
      notification(data);
      getWorkOrderInfo(user, params.customerId, params.systemId, params.workOrderId);
      setRedirect(true);
    }
    else {
      notification(data);
    }
  }

  const deleteWorkOrder = async () => {
    const res = await fetch(`http://127.0.0.1:5000/api/customers/${params.customerId}/systems/${params.systemId}/work-order/delete/${params.workOrderId}`, {
      method: "POST",
      headers: {
        'x-access-token': user.token
      }
    });
    const data = await res.json();
    if (data.status === 'success') {
      notification(data);
      dispatch(clearWorkOrder());
      setRedirect(true);
    }
    else {
      notification(data);
    }
  };

  const handleChange = (event) => {
    setEditWorkOrder({ value: event.target.value });
  };

  return redirect ?
  (<Navigate to={`/customers/${params.customerId}/systems/${params.systemId}`} />)
  :
  (
    <div className='flex-box-container'>
      <div className="row gx-0 justify-content-center w-100 mt-2">
        <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-4">
          <div className="floating-box">
            <form className="form-group row" onSubmit={(e) => sendToFlask(e)}>
              <h4 className="title">
                Enter equipment information
              </h4>
              <div className="col-sm-12 mb-2">
                <select className="form-control form-control-lg" value={editWorkOrder.order_type} name="order_type" required="True">
                  <option value="PM">Preventative Maintenance</option>
                  <option value="Repair">Repair</option>
                </select>
              </div>
              <div className="col-sm-12 mb-3">
                <textarea className="form-control form-control-lg" name="work_performed" value={editWorkOrder.work_performed} onChange={handleChange}  />
              </div>
              <div className="col-sm-12 d-grid mb-3">
                <Button variant="contained" size='large' type='submit'>UPDATE ORDER</Button>
              </div>
              <div className="cancel center mb-3">
                <Link className='col-sm-12 d-grid' to={`/customers/${params.customerId}/systems/${params.systemId}`}>
                  <Button variant="contained" size='large' color='warning'>CANCEL</Button>
                </Link>
              </div>
                <div className="col-sm-12 d-grid">
                  <Button variant="contained" size='large' color='error' onClick={() => deleteWorkOrder()}>DELETE WORK ORDER</Button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
