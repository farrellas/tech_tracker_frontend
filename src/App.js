// Dependencies
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { login } from './store/reducers/authSlice';
import { setCompany } from './store/reducers/companySlice';
import { setCustomer } from './store/reducers/customerSlice';
import { setSystem } from './store/reducers/systemSlice';
import { setEquipment } from './store/reducers/equipmentSlice';
import { setWorkOrder } from './store/reducers/workOrderSlice';
import { useDispatch } from 'react-redux';

// Components
import AppBar from './components/AppBar';
import CustomizedSnackbars from './components/Alerts';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

// Views
import Home from './views/Home';
import Login from './views/user/Login';
import SignUp from './views/user/SignUp';
import Profile from './views/user/Profile';
import Company from './views/company/Company';
import CreateCompany from './views/company/CreateCompany';
import EditCompany from './views/company/EditCompany';
import AddCompany from './views/company/AddCompany';
import Customers from './views/customer/Customers';
import SingleCustomer from './views/customer/SingleCustomer';
import CreateCustomer from './views/customer/CreateCustomer';
import EditCustomer from './views/customer/EditCustomer';
import SingleSystem from './views/system/SingleSystem';
import CreateSystem from './views/system/CreateSystem';
import EditProfile from './views/user/EditProfile';
import Recent from './views/user/Recent';
import EditSystem from './views/system/EditSystem';
import Equipment from './views/equipment/Equipment';
import CreateEquipment from './views/equipment/CreateEquipment';
import EditEquipment from './views/equipment/EditEquipment';
import WorkOrder from './views/work_order/WorkOrder';
import CreateWorkOrder from './views/work_order/CreateWorkOrder';
import EditWorkOrder from './views/work_order/EditWorkOrder';
import Dashboard from './views/user/dashboard/Dashboard';


export default function App() {
  const dispatch = useDispatch();

  const [alert, setAlert] = useState();
  
  const notification = (alertObj) => {
    setAlert(alertObj);
  };
  const clearNotification = () => {
    setAlert();
  };

  const getUserInfo = async (user) => {
    if (user.token) {
      const res = await fetch('https://tech-tracker-backend.herokuapp.com/api/user-info', {
        method: "GET",
        headers: {
          'x-access-token': user.token
        }
      });
      const data = await res.json();
      console.log(data)
      if (data.status !== 'success') {
        notification(data);
        return
      }
      dispatch(login(data.user))
    }
  };
  const getCompanyInfo = async (user) => {
    const res = await fetch('https://tech-tracker-backend.herokuapp.com/api/company', {
      method: "GET",
      headers: {
        'x-access-token': user.token
      }
    });
    const data = await res.json();
    console.log(data);
    if (data.status !== 'success') {
      notification(data);
      return
    }
    dispatch(setCompany(data.company));
  };
  const getCustomerInfo = async (user, customerId) => {
    const res = await fetch(`https://tech-tracker-backend.herokuapp.com/api/customers/${customerId}`, {
      method: "GET",
      headers: {
        'x-access-token': user.token
      }
    });
    const data = await res.json();
    console.log(data);
    if (data.status !== 'success') {
      notification(data);
      return
    }
    dispatch(setCustomer(data.customer));
  }
  const getSystemInfo = async (user, customerId, systemId) => {
    const res = await fetch(`https://tech-tracker-backend.herokuapp.com/api/customers/${customerId}/systems/${systemId}`, {
      method: "GET",
      headers: {
        'x-access-token': user.token
      }
    });
    const data = await res.json();
    console.log(data);
    if (data.status !== 'success') {
      notification(data);
      return
    }
    dispatch(setSystem(data.system));
  }
  const getEquipmentInfo = async (user, customerId, systemId, equipmentId) => {
    const res = await fetch(`https://tech-tracker-backend.herokuapp.com/api/customers/${customerId}/systems/${systemId}/equipment/${equipmentId}`, {
      method: "GET",
      headers: {
        'x-access-token': user.token
      }
    });
    const data = await res.json();
    console.log(data);
    if (data.status !== 'success') {
      notification(data);
      return
    }
    dispatch(setEquipment(data.equipment));
  }
  const getWorkOrderInfo = async (user, customerId, systemId, workOrderId) => {
    const res = await fetch(`https://tech-tracker-backend.herokuapp.com/api/customers/${customerId}/systems/${systemId}/work-order/${workOrderId}`, {
      method: "GET",
      headers: {
        'x-access-token': user.token
      }
    });
    const data = await res.json();
    console.log(data);
    if (data.status !== 'success') {
      notification(data);
      return
    }
    dispatch(setWorkOrder(data.work_order));
  }



  return (
    <div>
      <AppBar />
      {alert ?
        <CustomizedSnackbars severity={alert.status} message={alert.message} clearNotification={clearNotification} />
        :
        <></>
      }
      <div className='main'>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/login'
            element={
              <PublicRoute>
                <Login notification={notification} getCompanyInfo={getCompanyInfo} />
              </PublicRoute>
            }
          />
          <Route
            path='/signup'
            element={
              <PublicRoute>
                <SignUp notification={notification} />
              </PublicRoute>
            }
          />

          <Route
            path='/profile'
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path='/profile/edit'
            element={
              <PrivateRoute>
                <EditProfile notification={notification} getUserInfo={getUserInfo} />
              </PrivateRoute>
            }
          />

          <Route
            path='/company'
            element={
              <PrivateRoute>
                <Company />
              </PrivateRoute>
            }
          />
          <Route
            path='/addcompany'
            element={
              <PrivateRoute>
                <AddCompany notification={notification} getUserInfo={getUserInfo} getCompanyInfo={getCompanyInfo} />
              </PrivateRoute>
            }
          />
          <Route
            path='/company/create'
            element={
              <PrivateRoute>
                <CreateCompany notification={notification} getUserInfo={getUserInfo} />
              </PrivateRoute>
            }
          />
          <Route
            path='/company/edit'
            element={
              <PrivateRoute>
                <EditCompany notification={notification} getUserInfo={getUserInfo} />
              </PrivateRoute>
            }
          />

          <Route
            path='/customers'
            element={
              <PrivateRoute>
                <Customers notification={notification} />
              </PrivateRoute>
            }
          />
          <Route
            path='/customers/:customerId'
            element={
              <PrivateRoute>
                <SingleCustomer notification={notification} />
              </PrivateRoute>
            }
          />
          <Route
            path='/customers/create'
            element={
              <PrivateRoute>
                <CreateCustomer notification={notification} />
              </PrivateRoute>
            }
          />
          <Route
            path='/customers/edit/:customerId'
            element={
              <PrivateRoute>
                <EditCustomer notification={notification} getCustomerInfo={getCustomerInfo} />
              </PrivateRoute>
            }
          />

          <Route
            path='/recent'
            element={
              <PrivateRoute>
                <Recent notification={notification} />
              </PrivateRoute>
            }
          />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <Dashboard notification={notification} />
              </PrivateRoute>
            }
          />
          <Route
            path='/customers/:customerId/systems/:systemId'
            element={
              <PrivateRoute>
                <SingleSystem notification={notification} />
              </PrivateRoute>
            }
          />
          <Route
            path='/customers/:customerId/systems/create'
            element={
              <PrivateRoute>
                <CreateSystem notification={notification} />
              </PrivateRoute>
            }
          />
          <Route
            path='/customers/:customerId/systems/:systemId/edit'
            element={
              <PrivateRoute>
                <EditSystem notification={notification} getSystemInfo={getSystemInfo} />
              </PrivateRoute>
            }
          />
          <Route
            path='/customers/:customerId/systems/:systemId/equipment/:equipmentId'
            element={
              <PrivateRoute>
                <Equipment notification={notification} />
              </PrivateRoute>
            }
          />
          <Route
            path='/customers/:customerId/systems/:systemId/equipment/create'
            element={
              <PrivateRoute>
                <CreateEquipment notification={notification} />
              </PrivateRoute>
            }
          />
          <Route
            path='/customers/:customerId/systems/:systemId/:equipmentId/edit'
            element={
              <PrivateRoute>
                <EditEquipment notification={notification} getEquipmentInfo={getEquipmentInfo} />
              </PrivateRoute>
            }
          />
          <Route
            path='/customers/:customerId/systems/:systemId/workorders/:workOrderId'
            element={
              <PrivateRoute>
                <WorkOrder notification={notification} getCustomerInfo={getCustomerInfo} getSystemInfo={getSystemInfo} />
              </PrivateRoute>
            }
          />
          <Route
            path='/customers/:customerId/systems/:systemId/workorders/create'
            element={
              <PrivateRoute>
                <CreateWorkOrder notification={notification} />
              </PrivateRoute>
            }
          />
          <Route
            path='/customers/:customerId/systems/:systemId/workorders/:workOrderId/edit'
            element={
              <PrivateRoute>
                <EditWorkOrder notification={notification} getWorkOrderInfo={getWorkOrderInfo} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  )
}
