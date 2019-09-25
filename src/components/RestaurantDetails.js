import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { apiUrl, gradesEmojis } from '../config';

const RestaurantModal = ({ id }) => {
  // restaurant details
  const [ details, setDetails ] = useState({});

  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    setError(false);
    setLoading(true);

    // fetch the restaraunt details calling the API endpoint
    // /restaurants/[id]
    id && fetch(`${apiUrl}/restaurants/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network Problem!');
        }

        return response.json();
      }).then(json => {
        // details returned
        setDetails(json);
      }).catch(err => {
        // error case
        setError(true);
        setDetails([]);
      }).finally(() => {
        setLoading(false);
      });
  }, [id]);

  const { cuisine, building, street, zipcode, boro, phone, grade, last_inspection_date, violation_description } = details;

  return (
    <>
      {loading && <Spinner animation="border" data-testid="spinner" />}
      {!loading && !error && (
        <div data-testid="details">
          <Row>
            <Col><label>Cuisine</label>: <span data-testid="cuisine">{cuisine}</span></Col>
          </Row>
          <hr/>
          <Row>
            <Col>
              <Row><Col><label>Address</label></Col></Row>
              <Row><Col><span data-testid="building">{building}</span> <span data-testid="street">{street}</span></Col></Row>
              <Row><Col><span data-testid="zipcode">{zipcode}</span> <span data-testid="boro">{boro}</span></Col></Row>
            </Col>
          </Row>
          <Row>
            <Col><label>Phone</label>: <span data-testid="phone">{phone}</span></Col>
          </Row>
          <hr/>
          {grade && (
          <>
            <Row>
              <Col className={`result grade ${grade.toLowerCase()}-grade`}>
                Grade <span data-testid="grade">{grade}</span> <span role="img" aria-label="">{gradesEmojis[grade] || ''}</span>
              </Col>
            </Row>
            {last_inspection_date && (
            <Row>
              <Col><label>Last Inspection</label>: <span data-testid="inspection_date">{new Date(last_inspection_date).toLocaleDateString()}</span></Col>
            </Row>
            )}
            {violation_description && (
            <Row>
              <Col><label>Notes</label>: <span data-testid="violation_description">{violation_description}</span></Col>
            </Row>
            )}
          </>)}
        </div>
      )}
      {!loading && error && <Alert variant="danger" data-testid="error-alert">An error occured! <span role="img" aria-label="">🤬</span></Alert>}
    </>
  );
};

export default RestaurantModal;
