import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CompanyProfile() {
  const user = useSelector((state) => state.auth.user)
  const company = useSelector((state) => state.company.company)

  return (
    <div className='flex-box-container'>
      <div className="row gx-0 justify-content-center w-100 mt-2">
        <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-4">
          <div className="floating-box">
            <h4 className="title">
              Company Profile
            </h4>
            <div className="col-sm-12 mb-2">
              Company Name:
              <h3>{company.company_name}</h3>
            </div>
            <div className="col-sm-12 mb-2">
              Street Address:
              <h3>{company.street_address}</h3>
            </div>
            <div className="col-sm-12 mb-2">
              City:
              <h3>{company.city}</h3>
            </div>
            <div className="col-sm-12 mb-2">
              State:
              <h3>{company.state}</h3>
            </div>
            <div className="col-sm-12 mb-2">
              Zip Code:
              <h3>{company.zip_code}</h3>
            </div>
            <div className='row'>
              {company.logo_url ?
                <>
                  <p>Logo:</p>
                  <img src={company.logo_url} alt={company.company_name} className="company-logo" />
                </>
                :
                <></>
              }
              {company.admin_id === user.id ?
                <div className="edit-footer">
                  <Link className="box-footer-margins " to='/company/edit'>
                    Edit Company Info
                  </Link>
                </div>
                :
                <></>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
