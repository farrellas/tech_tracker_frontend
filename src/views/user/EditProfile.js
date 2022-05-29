import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/reducers/authSlice';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function EditProfile({ notification, getUserInfo }) {
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch();

    const [redirect, setRedirect] = useState(false);
    const [editUserInfo, setEditUserInfo] = useState({ ...user });

    const sendToFlask = async (e) => {
        e.preventDefault();
        const res = await fetch("https://tech-tracker-backend.herokuapp.com/api/profile/edit", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.token
            },
            body: JSON.stringify({
                email: e.target.email.value,
                first_name: e.target.first_name.value,
                last_name: e.target.last_name.value
            })
        });
        const data = await res.json();
        console.log(data)
        if (data.status === 'success') {
            notification(data);
            getUserInfo(data.user);
            setRedirect(true)
        }
        else {
            notification(data);
        }
    };

    const deleteUser = async () => {
        const res = await fetch("https://tech-tracker-backend.herokuapp.com/api/profile/delete", {
            method: "POST",
            headers: {
                'x-access-token': user.token
            }
        });
        const data = await res.json();
        console.log(data)
        if (data.status === 'success') {
            notification(data);
            dispatch(logout());
            setRedirect(true);
        }
    };

    const handleChange = (event) => {
        setEditUserInfo({ value: event.target.value });
    };

    return redirect ?
        (<Navigate to='/profile' />)
        :
        (
            <div className='flex-box-container'>
                <div className="row gx-0 justify-content-center w-100 mt-2">
                    <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-4">
                        <div className="floating-box pb-4">
                            <form className="form-group row" onSubmit={(e) => sendToFlask(e)}>
                                <h4 className="title">
                                    Update Profile Info
                                </h4>
                                <div className="col-sm-12 mb-2">
                                    <input className="form-control form-control-lg" name="email" value={editUserInfo.email} onChange={handleChange} required="True" type="email" />
                                </div>
                                <div className="col-sm-12 mb-2">
                                    <input className="form-control form-control-lg" name="first_name" value={editUserInfo.first_name} onChange={handleChange} required="True" type="text" />
                                </div>
                                <div className="col-sm-12 mb-2">
                                    <input className="form-control form-control-lg" name="last_name" value={editUserInfo.last_name} onChange={handleChange} required="True" type="text" />
                                </div>
                                <div className="col-sm-12 d-grid mb-3">
                                    <Button variant="contained" size='large' type='submit'>SUBMIT CHANGES</Button>
                                </div>
                                <div className="cancel center mb-3">
                                    <Link className='col-sm-12 d-grid' to='/profile'>
                                        <Button variant="contained" size='large' color='warning'>CANCEL</Button>
                                    </Link>
                                </div>
                                <div className="col-sm-12 d-grid">
                                    <Button variant="contained" size='large' color='error' onClick={()=>deleteUser()}>DELETE ACCOUNT</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )   
}
