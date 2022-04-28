import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

export default function Equipment() {
  const params = useParams();
  const equipment = useSelector((state) => state.equipment.equipment);

  return (
    <div className='flex-box-container'>
      <div className="row gx-0 justify-content-center w-100 mt-2">
        <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-4">
          <div className="floating-box">
            <div className='row'>
              <div className="cancel center mb-1">
                <Link className='col-sm-12 d-grid text-decoration-none' to={`/customers/${params.customerId}/systems/${params.systemId}`}>
                  <Button variant="contained" size='large' color='info'>BACK TO SYSTEM</Button>
                </Link>
              </div>
              <h4 className="title">
                Equipment Profile
              </h4>
              <div className="col-sm-12 mb-2">
                Type:
                <h3>{equipment.equipment_type}</h3>
              </div>
              <div className="col-sm-12 mb-2">
                Brand:
                <h3>{equipment.brand}</h3>
              </div>
              <div className="col-sm-12 mb-2">
                Model:
                <h3>{equipment.model_no}</h3>
              </div>
              <div className="col-sm-12 mb-2">
                Serial:
                <h3>{equipment.serial_no}</h3>
              </div>
              <div className="col-sm-12 mb-2">
                Install/Mfg. year:
                <h3>{equipment.year}</h3>
              </div>
              {((equipment.equipment_class === 'heating') || (equipment.equipment_class === 'packaged')) &&
                <div className="col-sm-12 mb-2">
                  Fuel Type:
                  <h3>{equipment.fuel_type}</h3>
                </div>
            }
            {(equipment.equipment_class === 'cooling' || equipment.equipment_class === 'packaged') &&
                <div className="col-sm-12 mb-2">
                  Refrigerant Type:
                  <h3>{equipment.refrigerant_type}</h3>
                </div>
            }
              <div className="col-sm-12 mb-2">
                Notes:
                <h3>{equipment.notes}</h3>
              </div>
              <div className="edit-footer">
                <Link className="box-footer-margins " to={`/customers/${params.customerId}/systems/${params.systemId}/${params.equipmentId}/edit`}>
                  Edit Equipment Info
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
