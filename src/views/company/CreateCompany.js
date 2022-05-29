import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@mui/material';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { currentLocation } from '../../functions/getAddress';
import { states } from '../../functions/states';



export default function CreateCompany({ notification, getUserInfo }) {
  const user = useSelector((state) => state.auth.user)

  const [redirect, setRedirect] = useState(false);


  const sendToFlask = async (e) => {
    e.preventDefault();
    const res = await fetch("https://tech-tracker-backend.herokuapp.com/api/company/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': user.token
      },
      body: JSON.stringify({
        company_name: e.target.company_name.value,
        street_address: e.target.street_address.value,
        city: e.target.city.value,
        state: e.target.state.value,
        zip_code: e.target.zip_code.value,
        company_password: e.target.company_password.value,
        logo_url: e.target.logo_url.value
      })
    });
    const data = await res.json();
    console.log(data);
    if (data.status === 'success') {
      notification(data);
      getUserInfo(user);
      setRedirect(true);
    }
    else {
      notification(data);
    }
  };

  if (user.company_id) {
    setRedirect(true);
  }

  return redirect ?
    (<Navigate to='/profile' />)
    :
    (
      <div className='flex-box-container'>
        <div className="row gx-0 justify-content-center w-100 mt-2">
          <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-4">
            <div className="floating-box">
              <form className="form-group row" onSubmit={(e) => sendToFlask(e)}>
                <h4 className="title">
                  Enter your companies information
                </h4>
                <div className="col-sm-12 mb-2">
                  <input className="form-control form-control-lg" name="company_name" placeholder="Company Name" required="True" type="text" />
                </div>
                <div className="col-sm-12 mb-2 center">
                  <Button id="useLocation" variant="contained" endIcon={<AddLocationIcon />} onClick={() => { currentLocation() }} >
                    Use Current Location
                  </Button>
                </div>
                <div className="col-sm-12 mb-2">
                  <input id="street_address" className="form-control form-control-lg" name="street_address" placeholder="Street Address" required="True" type="text" />
                </div>
                <div className="col-sm-12 mb-3">
                  <input id="city" className="form-control form-control-lg" name="city" placeholder="City" required="True" type="text" />
                </div>
                <div className="col-sm-12 mb-3">
                  <select id="state" className="form-control form-control-lg" name="state" placeholder="State" required="True">
                    <option selected disabled>Select state</option>
                    {[...states].map((state, i) =>
                      <option key={i} value={state}>{state}</option>
                    )}
                  </select>
                </div>
                <div className="col-sm-12 mb-3">
                  <input id="zip_code" className="form-control form-control-lg" name="zip_code" placeholder="Zip Code" required="True" type="text" />
                </div>
                <div className="col-sm-12 mb-3">
                  <input className="form-control form-control-lg" name="company_password" placeholder="Set Company Password" required="True" type="text" />
                </div>
                <div className="col-sm-12 mb-3">
                  <input className="form-control form-control-lg" name="logo_url" placeholder="URL for logo (not required)" type="text" />
                </div>
                <div className="col-sm-12 d-grid mb-3">
                  <Button variant="contained" size='large' type='submit'>CREATE COMPANY</Button>
                </div>
                <div className="cancel center">
                  <Link className='col-sm-12 d-grid' to='/addcompany'>
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