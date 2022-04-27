import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { clearSystem } from '../../store/reducers/systemSlice';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

export default function EditSystem({ notification, getSystemInfo }) {
  const params = useParams();
  const user = useSelector((state) => state.auth.user);
  const system = useSelector((state) => state.system.current_system);
  const dispatch = useDispatch();

  const [redirect, setRedirect] = useState(false);
  const [editSystemInfo, setEditSystemInfo] = useState({ ...system })

  const sendToFlask = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://127.0.0.1:5000/api/customers/${params.customerId}/systems/${params.systemId}/edit`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': user.token
      },
      body: JSON.stringify({
        name: e.target.name.value,
        area_served: e.target.area_served.value,
        system_type: e.target.system_type.value,
        heating: e.target.heating.value,
        cooling: e.target.cooling.value,
        notes: e.target.notes.value
      })
    });
    const data = await res.json();
    console.log(data);

    if (data.status === 'success') {
      notification(data);
      getSystemInfo(user, params.customerId, params.systemId);
      setRedirect(true);
    }
    else {
      notification(data);
    }
  }

  const deleteSystem = async () => {
    const res = await fetch(`http://127.0.0.1:5000/api/customers/${params.customerId}/systems/delete/${params.systemId}`, {
      method: "POST",
      headers: {
        'x-access-token': user.token
      }
    });
    const data = await res.json();
    if (data.status === 'success') {
      notification(data);
      dispatch(clearSystem());
      setRedirect(true);
    }
  };

  const handleChange = (event) => {
    setEditSystemInfo({ value: event.target.value });
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
                  Enter system information
                </h4>
                <div className="col-sm-12 mb-2">
                  <input className="form-control form-control-lg" name="name" value={editSystemInfo.name} onChange={handleChange} required="True" type="text" />
                </div>
                <div className="col-sm-12 mb-2">
                  <input id="area_served" className="form-control form-control-lg" name="area_served" value={editSystemInfo.area_served} onChange={handleChange} required="True" type="text" />
                </div>
                <div className="col-sm-12 mb-3">
                  <select id="system_type" className="form-control-lg w-100" name="system_type" value={editSystemInfo.system_type} onChange={handleChange} required="True">
                    <option value='Hydronic'>Hydronic</option>
                    <option value='Forced Air'>Forced Air</option>
                    <option value='Mini Split'>Mini Split</option>
                    <option value='Packaged Unit'>Packaged Unit</option>
                  </select>
                </div>
                <div className="col-sm-12 mb-1 d-flex justify-content-around">
                  <div>
                    <h5>Heating: <input id="heating" name="heating" type="checkbox" checked={editSystemInfo.heating} onChange={handleChange} /></h5>
                  </div>
                  <div>
                    <h5>Cooling: <input id="cooling" name="cooling" type="checkbox" checked={editSystemInfo.cooling} onChange={handleChange} /></h5>
                  </div>
                </div>
                <div className="col-sm-12 mb-3">

                </div>
                <div className="col-sm-12 mb-3">
                  Notes:
                  <textarea className="form-control form-control-lg" name="notes" value={editSystemInfo.notes} onChange={handleChange} />
                </div>
                <div className="col-sm-12 d-grid mb-3">
                  <Button variant="contained" size='large' type='submit'>UPDATE SYSTEM</Button>
                </div>
                <div className="cancel center mb-3">
                  <Link className='col-sm-12 d-grid' to={`/customers/${params.customerId}/systems/${params.systemId}`}>
                    <Button variant="contained" size='large' color='warning'>CANCEL</Button>
                  </Link>
                </div>
                <div className="col-sm-12 d-grid">
                  <Button variant="contained" size='large' color='error' onClick={() => deleteSystem()}>DELETE SYSTEM</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}