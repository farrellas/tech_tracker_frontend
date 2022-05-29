import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { clearCustomer } from '../../store/reducers/customerSlice';
import { clearSystem } from '../../store/reducers/systemSlice';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { currentLocation } from '../../functions/getAddress';
import { states } from '../../functions/states';

export default function EditCustomer({ notification, getCustomerInfo }) {
  const params = useParams();
  const user = useSelector((state) => state.auth.user);
  const customer = useSelector((state) => state.customer.customer);
  const dispatch = useDispatch();
  let redirectTo = `/customers/${params.customerId}`;

  const [redirect, setRedirect] = useState(false);
  const [editCustomerInfo, setEditCustomerInfo] = useState({ ...customer });

  if (params.customerId != customer.id) {
    setRedirect(true);
  } else if ((customer.company_id !== user.company_id) && (customer.user_id !== user.id)) {
    setRedirect(true);
  }


  const sendToFlask = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://tech-tracker-backend.herokuapp.com/api/customers/edit/${params.customerId}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': user.token
      },
      body: JSON.stringify({
        name: e.target.name.value,
        street_address: e.target.street_address.value,
        city: e.target.city.value,
        state: e.target.state.value,
        zip_code: e.target.zip_code.value,
        email: e.target.email.value
      })
    });
    const data = await res.json();
    console.log(data);

    if (data.status === 'success') {
      notification(data);
      getCustomerInfo(user, params.customerId)
      setRedirect(true);
    }
    else {
      notification(data);
    }
  }

  const deleteCustomer = async () => {
    const res = await fetch(`https://tech-tracker-backend.herokuapp.com/api/customers/delete/${params.customerId}`, {
      method: "POST",
      headers: {
        'x-access-token': user.token
      }
    });
    const data = await res.json();
    console.log(data)
    if (data.status === 'success') {
      notification(data);
      redirectTo = '/customers';
      setRedirect(true);
      dispatch(clearCustomer());
      dispatch(clearSystem());
    }
    else {
      notification(data);
    }
  };

  const handleChange = (event) => {
    setEditCustomerInfo({ value: event.target.value });
  }

  return redirect ?
    (<Navigate to={redirectTo} />)
    :
    (
      <div className='flex-box-container'>
        <div className="row gx-0 justify-content-center w-100 mt-2">
          <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-4">
            <div className="floating-box">
              <form className="form-group row" onSubmit={(e) => sendToFlask(e)}>
                <h4 className="title">
                  Update customer information
                </h4>
                <div className="col-sm-12 mb-2">
                  <input className="form-control form-control-lg" name="name" value={editCustomerInfo.name} onChange={handleChange} required="True" type="text" />
                </div>
                <div className="col-sm-12 mb-2 center">
                  <Button id="useLocation" variant="contained" endIcon={<AddLocationIcon />} onClick={() => { currentLocation() }} >
                    Use Current Location
                  </Button>
                </div>
                <div className="col-sm-12 mb-2">
                  <input id="street_address" className="form-control form-control-lg" name="street_address" value={editCustomerInfo.street_address} onChange={handleChange} required="True" type="text" />
                </div>
                <div className="col-sm-12 mb-3">
                  <input id="city" className="form-control form-control-lg" name="city" value={editCustomerInfo.city} onChange={handleChange} required="True" type="text" />
                </div>
                <div className="col-sm-12 mb-3">
                  <select id="state" className="form-control form-control-lg" name="state" value={editCustomerInfo.state} onChange={handleChange} required="True">
                    {[...states].map((state, i) =>
                      <option key={i} value={state}>{state}</option>
                    )}
                  </select>
                </div>
                <div className="col-sm-12 mb-3">
                  <input id="zip_code" className="form-control form-control-lg" name="zip_code" value={editCustomerInfo.zip_code} onChange={handleChange} required="True" type="text" />
                </div>
                <div className="col-sm-12 mb-3">
                  <input className="form-control form-control-lg" name="email" value={editCustomerInfo.email} onChange={handleChange} placeholder="Email (required for reporting)" type="email" />
                </div>
                <div className="col-sm-12 d-grid mb-3">
                  <Button variant="contained" size='large' type='submit'>SUBMIT CHANGES</Button>
                </div>
                <div className="cancel center mb-3">
                  <Link className='col-sm-12 d-grid' to={`/customers/${params.customerId}`}>
                    <Button variant="contained" size='large' color='warning'>CANCEL</Button>
                  </Link>
                </div>
                <div className="col-sm-12 d-grid">
                  <Button variant="contained" size='large' color='error' onClick={() => deleteCustomer()}>DELETE CUSTOMER</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}
