import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';


export default function CreateWorkOrder({ notification }) {
  const params = useParams();
  const user = useSelector((state) => state.auth.user);

  const [redirect, setRedirect] = useState(false);

  const sendToFlask = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://tech-tracker-backend.herokuapp.com/api/customers/${params.customerId}/systems/${params.systemId}/create-work-order`, {
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
      setRedirect(true);
    }
    else {
      notification(data);
    }
  }

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
                <select defaultValue='select' className="form-control form-control-lg" name="order_type" required="True">
                  <option value='select' disabled>Select Work Order Type</option>
                  <option value="PM">Preventative Maintenance</option>
                  <option value="Repair">Repair</option>
                </select>
              </div>
              <div className="col-sm-12 mb-3">
                <textarea className="form-control form-control-lg" name="work_performed" placeholder="Work Performed..." />
              </div>
              <div className="col-sm-12 d-grid mb-3">
                <Button variant="contained" size='large' type='submit'>CREATE WORK ORDER</Button>
              </div>
              <div className="cancel center">
                <Link className='col-sm-12 d-grid' to={`/customers/${params.customerId}/systems/${params.systemId}`}>
                  <Button variant="contained" size='large' color='warning'>CANCEL</Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
