import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const RestaurantModal = ({ restaurant, onHide }) => {
  const [ loading, setLoading ] = useState(true);
  const [ details, setDetails ] = useState({});

  useEffect(() => {
    setLoading(true);

    new Promise(resolve => {
      window.setTimeout(() => {
        resolve({
          boro: 'BRONX',
          cuisine: 'Thai',
          building: '1007',
          street: '37 STREET',
          zipcode: '10001',
          phone: '5252454254',
          grade: 'A',
          violation_description: 'Facility not vermin proof. Harborage or conditions conducive to attracting vermin to the premises and/or allowing vermin to exist.',
          critical_flag: 'Not Critical'
        });
      }, 5000);
    }).then(restaurant => {
      setLoading(false);
      setDetails(restaurant);
    })
  }, []);

  return (
    <Modal
      show={!!restaurant.restaurant_id}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        {restaurant.dba}
      </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && <Spinner animation="border" />}
        {!loading && (
          <>
            <p>
              Cuisine: {details.cuisine}
            </p>
            <p>
              {details.building} {details.street}
              {details.zipcode} {details.boro}
            </p>
            <p>
              Tel: {details.phone}
            </p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
      <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
};

export default RestaurantModal;
