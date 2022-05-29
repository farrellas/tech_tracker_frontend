import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function AddCompany({ notification, getUserInfo, getCompanyInfo }) {
    const user = useSelector((state) => state.auth.user);

    const [redirect, setRedirect] = useState(false);


    const sendToFlask = async (e) => {
        e.preventDefault();
        const res = await fetch("https://tech-tracker-backend.herokuapp.com/api/profile/add-company", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.token
            },
            body: JSON.stringify({
                company_name: e.target.company_name.value,
                company_password: e.target.company_password.value,
            })
        });
        const data = await res.json();
        console.log(data)
        if (data.status === 'success') {
            notification(data);
            getUserInfo(user);
            getCompanyInfo(user);
            setRedirect(true);
        }
        else {
            notification(data);
        }
    };

    return redirect ?
        (<Navigate to='/profile' />)
        :
        (
            <div className='flex-box-container'>
                <div className="row gx-0 justify-content-center w-100 mt-2">
                    <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-4">
                        <div className="floating-box">
                            <div className="col-sm-12 d-grid mb-3 center">
                                <h5>Does your business not yet have an account?</h5>
                                <Link to='/company/create'>
                                    <Button variant="contained" size='large' type='submit'>CREATE NEW COMPANY</Button>
                                </Link>
                            </div>
                            <form className="form-group row" onSubmit={(e) => sendToFlask(e)}>
                                <h4 className="title">
                                    Add Company Affiliation
                                </h4>
                                <div className="col-sm-12 mb-2">
                                    <input className="form-control form-control-lg" name="company_name" placeholder="Company Name" required="True" type="text" />
                                </div>
                                <div className="col-sm-12 mb-3">
                                    <input className="form-control form-control-lg" name="company_password" placeholder="Company Password" required="True" type="text" />
                                </div>
                                <div className="col-sm-12 d-grid mb-3">
                                    <Button variant="contained" size='large' type='submit'>ADD COMPANY</Button>
                                </div>
                                <div className="cancel center">
                                    <Link className='col-sm-12 d-grid' to='/profile'>
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
