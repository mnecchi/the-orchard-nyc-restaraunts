import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { apiUrl, gradesEmojis } from '../config';

const RestaurantModal = ({ id, name, onHide }) => {
  const [ loading, setLoading ] = useState(true);
  const [ details, setDetails ] = useState({});

  useEffect(() => {
    setLoading(true);

    if (id) {
      fetch(`${apiUrl}/restaurants/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network Problem!');
          }

          return response.json();
        }).then(json => {
          console.log(json);
          setLoading(false);
          setDetails(json);
        }).catch(err => {
          console.error(err);
          setDetails([]);
        });
      }
  }, [id]);

  const { cuisine, building, street, zipcode, boro, phone, grade, violation_description } = details;

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
        {loading && <Spinner animation="border" />}
        {!loading && (
          <>
            <Row>
              <Col><label>Cuisine</label>: {cuisine}</Col>
            </Row>
            <hr/>
            <Row>
              <Col>
                <Row><Col><label>Address</label></Col></Row>
                <Row><Col>{building} {street}</Col></Row>
                <Row><Col>{zipcode} {boro}</Col></Row>
              </Col>
            </Row>
            <Row>
              <Col><label>Phone</label>: {phone}</Col>
            </Row>
            <hr/>
            {grade && (
            <>
              <Row>
                <Col className={`result grade ${grade.toLowerCase()}-grade`}>
                  Grade {grade} <span role="img" aria-label="">{gradesEmojis[grade] || ''}</span>
                </Col>
              </Row>
              <Row>
                <Col>{violation_description || '-'}</Col>
              </Row>
            </>)}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} data-testid="restaurant-modal-close">Close</Button>
      </Modal.Footer>
    </Modal>
    );
};

export default RestaurantModal;
