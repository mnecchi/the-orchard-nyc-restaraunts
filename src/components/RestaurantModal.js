import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import RestaurantDetails from './RestaurantDetails';

const RestaurantModal = ({ id, name, onHide }) => {
  return (
    <Modal
      show={!!id}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
      data-testid="restaurant-modal"
    >
      <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        {name}
      </Modal.Title>
      </Modal.Header>
      <Modal.Body className="details">
        <RestaurantDetails id={id} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} data-testid="restaurant-modal-close">Close</Button>
      </Modal.Footer>
    </Modal>
    );
};

export default RestaurantModal;
