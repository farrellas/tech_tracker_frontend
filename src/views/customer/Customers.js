import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCustomer, customerSlice } from '../../store/reducers/customerSlice';
import { clearSystem } from '../../store/reducers/systemSlice';
import { clearEquipment } from '../../store/reducers/equipmentSlice';
import { clearWorkOrder } from '../../store/reducers/workOrderSlice';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@mui/material';

import Customer from '../../components/Customer';

export default function Customers({ notification }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [redirect, setRedirect] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(clearCustomer());
    dispatch(clearSystem());
    dispatch(clearEquipment());
    dispatch(clearWorkOrder());
    const getCustomers = async () => {
      const res = await fetch('https://tech-tracker-backend.herokuapp.com/api/customer-list', {
        method: "GET",
        headers: {
          'x-access-token': user.token,
        }
      });
      const data = await res.json();
      console.log(data)

      if (data.status === 'success') {
        setCustomers(data.customers)
      }
      else {
        setRedirect(true);
        notification({
          'status': 'error',
          'message': 'Error retrieving customer list. Try again later'
        });
      }
    }
    getCustomers();

    return () => {

    }
  }, [])

  return redirect ? (
    <Navigate to="/customers" />
  )
    :
    (
      <div className='flex-box-container'>
        <div className="row gx-0 justify-content-center w-100 mt-2">
          <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-4">
            <div className="floating-box">
              <h4 className="title">
                Customer List
              </h4>
              <div className='mb-3'>
                <input placeholder='Search Customers' className="form-control form-control-lg" onChange={event => setQuery(event.target.value)} />
              </div>
              <Link to='/customers/create' className="col-sm-12 d-grid text-decoration-none">
                <Button variant="contained" size='large'>Add New Customer</Button>
              </Link>
              {customers.length > 0 ?
                <div className='column center customer-box scrollable-box'>
                  <hr />
                  {
                    customers.filter(customer => {
                      if (query === '') {
                        return customer;
                      } else if (customer.name.toLowerCase().includes(query.toLowerCase())) {
                        return customer;
                      }
                    }).map((c, i) => <Customer key={i} customer={c} />)}
                </div>
                :
                <></>
              }
            </div>
          </div>
        </div>
      </div>
    )
}
