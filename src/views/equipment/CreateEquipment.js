import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

export default function CreateEquipment({ notification }) {
  const params = useParams();
  const user = useSelector((state) => state.auth.user);

  const [redirect, setRedirect] = useState(false);
  const [equipment_class, setEquipmentClass] = useState();

  const sendToFlask = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://127.0.0.1:5000/api/customers/${params.customerId}/systems/${params.systemId}/create-equipment`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': user.token
      },
      body: JSON.stringify({
        equipment_class: e.target.equipment_class.value,
        brand: e.target.brand.value,
        model_no: e.target.model_no.value,
        serial_no: e.target.serial_no.value,
        year: e.target.year.value,
        equipment_type: ((equipment_class !== 'packaged') ? e.target.equipment_type.value : 'Package Unit'),
        notes: e.target.notes.value,
        fuel_type: ((equipment_class === 'heating' || equipment_class === 'packaged') ? e.target.fuel_type.value : ''),
        refrigerant_type: ((equipment_class === 'cooling' || equipment_class === 'packaged') ? e.target.refrigerant_type.value : '')
      })
    });
    const data = await res.json();
    console.log(data);

    if (data.status === 'success') {
      notification(data);
      setRedirect(true);
    }
    else {
      notification(data);
    }
  }

  const handleChange = (event) => {
    setEquipmentClass(event.target.value);
  };

  return redirect ?
    (<Navigate to={`/customers/${params.customerId}/systems/${params.systemId}`} />)
    :
    (
      <div className='flex-box-container'>
        <div className="row gx-0 justify-content-center w-100 mt-2">
          <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-4">
            <div className="floating-box">
              <form className="form-group row" onSubmit={(e) => sendToFlask(e)}>
                <h4 className="title">
                  Enter equipment information
                </h4>
                <div className="col-sm-12 mb-2">
                  <select defaultValue="select" className="form-control form-control-lg" name="equipment_class" required="True" onChange={handleChange}>
                    <option value="select" disabled>Select Equipment Type</option>
                    <option value="air_handler">Air Handler</option>
                    <option value="heating">Heating</option>
                    <option value="cooling">Cooling</option>
                    <option value="packaged">Packaged Unit</option>
                  </select>
                </div>
                {equipment_class === 'air_handler' &&
                  <div className="col-sm-12 mb-3">
                    <select className="form-control form-control-lg" name="equipment_type">
                      <option value="A/C Only">A/C Only</option>
                      <option value="Heat Pump Only">Heat Pump Only</option>
                      <option value="Heat Pump w/ Electric Heat">Heat Pump w/ Electric Heat</option>
                      <option value="Mini Split">Mini Split</option>
                    </select>
                  </div>
                }
                {equipment_class === 'heating' &&
                  <div className="col-sm-12 mb-3">
                    <select className="form-control form-control-lg" name="equipment_type">
                      <option value="Furnace">Furnace</option>
                      <option value="Water Boiler">Water Boiler</option>
                      <option value="Steam Boiler">Steam Boiler</option>
                    </select>
                  </div>
                }
                {equipment_class === 'cooling' &&
                  <div className="col-sm-12 mb-3">
                    <select className="form-control form-control-lg" name="equipment_type">
                      <option value="Condenser">Condenser</option>
                      <option value="Heat Pump">Heat Pump</option>
                      <option value="Mini Split">Mini Split</option>
                      <option value="Evaporator Coil">Evaporator coil</option>
                      <option value="Chiller">Chiller</option>
                    </select>
                  </div>
                }
                <div className="col-sm-12 mb-2">
                  <input className="form-control form-control-lg" name="brand" placeholder="Brand" required="True" type="text" />
                </div>
                <div className="col-sm-12 mb-2">
                  <input className="form-control form-control-lg" name="model_no" placeholder="Model Number" required="True" type="text" />
                </div>
                <div className="col-sm-12 mb-3">
                  <input className="form-control form-control-lg" name="serial_no" placeholder="Serial Number" required="True" type="text" />
                </div>
                <div className="col-sm-12 mb-3">
                  <input className="form-control form-control-lg" name="year" placeholder="Install/Mfg. year" required="True" type="text" />
                </div>
                {(equipment_class === 'heating' || equipment_class === 'packaged') &&
                  <div className="col-sm-12 mb-3">
                    <select defaultValue="select" className="form-control form-control-lg" name="fuel_type">
                      <option value="select" disabled>Select Fuel Type</option>
                      <option value="Electric">Electric</option>
                      <option value="Natural Gas">Natural Gas</option>
                      <option value="Propane">Propane</option>
                      <option value="Fuel Oil">Fuel Oil</option>
                    </select>
                  </div>
                }
                {(equipment_class === 'cooling' || equipment_class === 'packaged') &&
                  <div className="col-sm-12 mb-3">
                    <select defaultValue="select" className="form-control form-control-lg" name="refrigerant_type">
                      <option value="select" disabled>Select Refrigerant Type</option>
                      <option value="R410a">R410a</option>
                      <option value="R22">R22</option>
                      <option value="R404a">R404a</option>
                      <option value="R407c">R407c</option>
                      <option value="R134a">R134a</option>
                      <option value="R717">R717</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                }
                <div className="col-sm-12 mb-3">
                  <textarea className="form-control form-control-lg" name="notes" placeholder="Equipment notes" />
                </div>
                <div className="col-sm-12 d-grid mb-3">
                  <Button variant="contained" size='large' type='submit'>CREATE EQUIPMENT</Button>
                </div>
                <div className="cancel center">
                  <Link className='col-sm-12 d-grid' to={`/customers/${params.customerId}/systems/${params.systemId}`}>
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
