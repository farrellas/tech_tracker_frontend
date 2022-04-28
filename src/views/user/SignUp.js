import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Button } from '@mui/material';
import logo from '../../assets/images/ace_tech_logo_2.png'

import gLogo from "../../assets/images/google.svg";
import mLogo from "../../assets/images/microsoft.svg";

export default function SignUp({ notification }) {
  const [redirect, setRedirect] = useState(false);

  const auth = getAuth();

  const signUpGoogle = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    console.log(res);
    if (res.user) {
      const googleUser = {
        ...res.user,
        email: res.user.email,
        id: res.user.uid
      }
      const name = googleUser.displayName.split(" ")
      const first_name = name[0]
      const last_name = name[1]
      const flask = await fetch("http://127.0.0.1:5000/api/signup", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: googleUser.email,
          first_name: first_name,
          last_name: last_name,
          password: googleUser.uid,
          conf_password: googleUser.uid
        })
      });
      const data = await flask.json();

      if (data.status === 'success') {
        notification(data);
        setRedirect(true);
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
    const res = await fetch("http://127.0.0.1:5000/api/signup", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: e.target.email.value,
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        password: e.target.password.value,
        conf_password: e.target.conf_password.value
      })
    });
    const data = await res.json();
    console.log(data)
    if (data.status === 'success') {
      notification(data);
      setRedirect(true)
    }
    else {
      notification(data);
    }
  };

  return redirect ?
    (<Navigate to='/login' />)
    :
    (
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
                  Welcome to Ace Tech Tracker!
                </h4>
                <div className="col-sm-12 mb-2">
                  <input className="form-control form-control-lg" name="email" placeholder="E-mail" required="True" type="email" />
                </div>
                <div className="col-sm-12 mb-2">
                  <input className="form-control form-control-lg" name="first_name" placeholder="First Name" required="True" type="text" />
                </div>
                <div className="col-sm-12 mb-2">
                  <input className="form-control form-control-lg" name="last_name" placeholder="Last Name" required="True" type="text" />
                </div>
                <div className="col-sm-12 mb-3">
                  <input className="form-control form-control-lg" name="password" placeholder="Password" required="True" type="password" />
                </div>
                <div className="col-sm-12 mb-3">
                  <input className="form-control form-control-lg" name="conf_password" placeholder="Confirm Password" required="True" type="password" />
                </div>
                <div className="col-sm-12 d-grid">
                  <Button variant="contained" size='large' type='submit'>SIGN UP</Button>
                </div>
                <div className="mt-5 mb-3 text-center d-grid gap-1">
                  <p className="mb-2">
                    or sign up using a provider below
                  </p>
                </div>
                <div className="floating-box-footer">
                  <Link className="box-footer-margins" to='/' onClick={(e) => signUpGoogle(e)}>
                    <img src={gLogo} alt='G' width="18" height="18" />&nbsp;
                    Sign up with Google
                  </Link>
                  <Link className="box-footer-margins" to="/">
                    <img src={mLogo} alt='M' width="18" height="18" />&nbsp;
                    Sign up with Microsoft
                  </Link>
                </div>
              </form>
            </div>
            <div className="row gx-0 w-100">
              <div className="col-sm-12">
                <Link className="col-sm-12 btn no-account" to="/login">
                  <span className="first mr-2">Already have an account?</span>
                  <span className="link-text">Sign in here</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
