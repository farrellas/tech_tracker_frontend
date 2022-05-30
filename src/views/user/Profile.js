import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const company = useSelector((state) => state.company.company);

  return (
    <div className='flex-box-container'>
      <div className="row gx-0 justify-content-center w-100 mt-2">
        <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-4">
          <div className="floating-box pb-6">
            <h4 className="title">
              User Profile
            </h4>
            <div className="col-sm-12 mb-2 w-100 text-wrap">
              E-Mail:
              <h3>{user.email}</h3>
            </div>
            <div className="col-sm-12 mb-2">
              First Name:
              <h3>{user.first_name}</h3>
            </div>
            <div className="col-sm-12 mb-2">
              Last Name:
              <h3>{user.last_name}</h3>
            </div>
            <div className='row'>
              <div className="floating-box-footer">
                <Link className="box-footer-margins" to='/profile/edit'>
                  Edit Profile
                </Link>
                {user.company_id ?
                  <Link className="profile-logo" to='/company'>
                    <img src={company.logo_url} alt={company.company_name} className="h-100" />
                  </Link>
                  :
                  <Link className="box-footer-margins" to="/addcompany">
                    Add Company Affiliation
                  </Link>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
