import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/reducers/authSlice';
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider  } from 'firebase/auth';
import { Button } from '@mui/material';
import logo from '../../assets/images/ace_tech_logo_2.png'

import gLogo from "../../assets/images/google.svg";
import mLogo from "../../assets/images/microsoft.svg";

export default function Login({ notification, getCompanyInfo }) {
    const dispatch = useDispatch();

    const auth = getAuth();

    const signInMicrosoft = async (e) => {
        e.preventDefault();
        const provider = new OAuthProvider('microsoft.com');
        provider.setCustomParameters({
            prompt: "consent",
            tenant: "common",
          })
        const res = await signInWithPopup(auth, provider);
        console.log(res);
        if (res.user) {
            const microsoftUser = {
                ...res.user,
                email: res.user.email,
            }
            const flask = await fetch("https://tech-tracker-backend.herokuapp.com/api/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: microsoftUser.email,
                    password: microsoftUser.uid,
                })
            });
            const data = await flask.json();

            if (data.status === 'success') {
                notification(data);
                dispatch(login(data.user));
                if (data.user.company_id) { getCompanyInfo(data.user); }
            }
            else {
                notification(data);
            }
        } else {
            notification({ 'status': 'error', 'message': 'Microsoft Authentication Failed' });
        }
    }

    const signInGoogle = async (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        const res = await signInWithPopup(auth, provider);
        console.log(res);
        if (res.user) {
            const googleUser = {
                ...res.user,
                email: res.user.email,
            }
            const flask = await fetch("https://tech-tracker-backend.herokuapp.com/api/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: googleUser.email,
                    password: googleUser.uid,
                })
            });
            const data = await flask.json();

            if (data.status === 'success') {
                notification(data);
                dispatch(login(data.user));
                if (data.user.company_id) { getCompanyInfo(data.user); }
            }
            else {
                notification(data);
            }
        } else {
            notification({ 'status': 'error', 'message': 'Google Authentication Failed' });
        }
    }

    const sendToFlask = async (e) => {
        e.preventDefault();
        const res = await fetch("https://tech-tracker-backend.herokuapp.com/api/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: e.target.email.value,
                password: e.target.password.value,
            })
        });
        const data = await res.json();
        console.log(data)
        if (data.status === 'success') {
            notification(data);
            dispatch(login(data.user));
            if (data.user.company_id) { getCompanyInfo(data.user); }
        }
        else {
            notification(data);
        }
    };

    return (
        <div className='flex-box-container'>
            <div className="row gx-0 justify-content-center w-100 mt-2">
                <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-4">
                    <div className='center mb-2'>
                        <Link to='/' className='text-decoration-none link-light'>
                            <img className='logo' alt='logo' src={logo} />
                        </Link>
                    </div>
                    <div className="floating-box">
                        <form className="form-group row" onSubmit={(e) => sendToFlask(e)}>
                            <h4 className="title">
                                Welcome back to Ace Tech Tracker!
                            </h4>
                            <div className="col-sm-12 mb-2">
                                <input className="form-control form-control-lg" name="email" placeholder="E-mail" required="True" type="email" />
                            </div>
                            <div className="col-sm-12 mb-3">
                                <input className="form-control form-control-lg" name="password" placeholder="Password" required="True" type="password" />
                            </div>
                            <div className="col-sm-12 d-grid">
                                <Button variant="contained" size='large' type='submit'>LOG IN</Button>
                            </div>
                            <div className="mt-5 mb-3 text-center d-grid gap-1">
                                <p className="mb-2">
                                    or sign in using a provider below
                                </p>
                            </div>
                            <div className="floating-box-footer">
                                <Link className="box-footer-margins" to='/' onClick={(e) => signInGoogle(e)}>
                                    <img src={gLogo} alt='G' width="18" height="18" />&nbsp;
                                    Sign in with Google
                                </Link>
                                <Link className="box-footer-margins" to="/" onClick={(e) => signInMicrosoft(e)}>
                                    <img src={mLogo} alt='M' width="18" height="18" />&nbsp;
                                    Sign in with Microsoft
                                </Link>
                            </div>
                        </form>
                    </div>
                    <div className="row gx-0 w-100">
                        <div className="col-sm-12">
                            <Link className="col-sm-12 btn no-account" to="/signup">
                                Don't have an account yet? Sign up Today
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
