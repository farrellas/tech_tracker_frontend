import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button, Checkbox } from '@mui/material';

export default function CreateSystem({ notification }) {
  const params = useParams();
  const user = useSelector((state) => state.auth.user);

  const [redirect, setRedirect] = useState(false);
  const [heating, setHeating] = useState(false);
  const [cooling, setCooling] = useState(false);

  const sendToFlask = async (e) => {
    e.preventDefault();
    console.log(e.target.heating.value)
    const res = await fetch(`https://tech-tracker-backend.herokuapp.com/api/customers/${params.customerId}/systems/create`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': user.token
      },
      body: JSON.stringify({
        name: e.target.name.value,
        area_served: e.target.area_served.value,
        system_type: e.target.system_type.value,
        heating: heating,
        cooling: cooling,
        notes: e.target.notes.value
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

  const handleChangeHeating = () => {
    setHeating(!heating);
  };

  const handleChangeCooling = () => {
    setCooling(!cooling);
  };

  return redirect ?
    (<Navigate to={`/customers/${params.customerId}`} />)
    :
    (
      <div className='flex-box-container'>
        <div className="row gx-0 justify-content-center w-100 mt-2">
          <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-4">
            <div className="floating-box">
              <form className="form-group row" onSubmit={(e) => sendToFlask(e)}>
                <h4 className="title">
                  Enter system information
                </h4>
                <div className="col-sm-12 mb-2">
                  <input className="form-control form-control-lg" name="name" placeholder="System Name" required="True" type="text" />
                </div>
                <div className="col-sm-12 mb-2">
                  <input id="area_served" className="form-control form-control-lg" name="area_served" placeholder="Area Served" required="True" type="text" />
                </div>
                <div className="col-sm-12 mb-3">
                <select id="system_type" className="form-control-lg w-100" name="system_type" required="True">
                    <option value='Hydronic'>Hydronic</option>
                    <option value='Forced Air'>Forced Air</option>
                    <option value='Mini Split'>Mini Split</option>
                    <option value='Packaged Unit'>Packaged Unit</option>
                  </select>
                </div>
                <div className="col-sm-12 mb-3 d-flex justify-content-around">
                  <div>
                    <h5>Heating: <Checkbox name="heating" type="checkbox" onChange={handleChangeHeating} /></h5>
                  </div>
                  <div>
                    <h5>Cooling: <Checkbox name="cooling" type="checkbox" onChange={handleChangeCooling} /></h5>
                  </div>
                </div>
                <div className="col-sm-12 mb-3">
                  <textarea className="form-control form-control-lg" name="notes" placeholder="System notes"/>
                </div>
                <div className="col-sm-12 d-grid mb-3">
                  <Button variant="contained" size='large' type='submit'>CREATE SYSTEM</Button>
                </div>
                <div className="cancel center">
                  <Link className='col-sm-12 d-grid' to={`/customers/${params.customerId}`}>
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
