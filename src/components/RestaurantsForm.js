/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect }from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { apiUrl, boros, grades, gradesEmojis } from '../config';

const RestaurantsForm = ({ onChange, hide, loading, ...props }) => {

  // search criteria
  const [ name, setName ] = useState(props.name || '');
  const [ street, setStreet ] = useState(props.street || '');
  const [ boro, setBoro ] = useState(props.boro || '');
  const [ cuisine, setCuisine ] = useState(props.cuisine || '');
  const [ minGrade, setMinGrade ] = useState(props.minGrade);
  const [ cuisines, setCuisines ] = useState([]);

  // fetch the cuisines (endpoint /cuisines)
  // done only on component mount
  useEffect(() => {
    // there's no need to call the api
    // if the form doesn't include the cuisine filter (Thai route for example)
    if (!hide.includes('cuisine')) {
      fetch(`${apiUrl}/cuisines`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network Problem!');
        }

        return response.json();
      }).then(json => {
        // cuisines return successfully
        setCuisines(json);
      }).catch(() => {
        // if there's an error just avoid displaying the cuisines
        setCuisines([]);
      })
    }
  }, []);

  // handlers for filters controls changes
  const onNameChange = e => setName(e.target.value);
  const onStreetChange = e => setStreet(e.target.value);
  const onBoroChange = e => setBoro(e.target.value);
  const onCuisineChange = e => setCuisine(e.target.value);
  const onMinGradeChange = e => setMinGrade(e.target.value);

  // form submit
  const onFormSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    onChange({ name, street, boro, cuisine, minGrade });
  };

  return (
    <Row className={"search-box"}>
      <Col md={{ offset: 2, span: 8 }}>
        <Form className="search-form box shadow" onSubmit={onFormSubmit} data-testid="restaurants-form">
          {!hide.includes('name') && (
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Restaurant Name</Form.Label>
              <Form.Control size="lg" as="input" defaultValue={name} onChange={onNameChange} data-testid="name" />
              <Form.Text className="text-muted">
                So...what's this place called?
              </Form.Text>
            </Form.Group>
          </Form.Row>
          )}
          {!hide.includes('street') && (
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Street</Form.Label>
              <Form.Control size="lg" as="input" defaultValue={street} onChange={onStreetChange} data-testid="street" />
              <Form.Text className="text-muted">
                Which street?
              </Form.Text>
            </Form.Group>
          </Form.Row>
          )}
          {!hide.includes('boro') && (
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Borough</Form.Label>
              <Form.Control size="lg" as="select" defaultValue={boro} onChange={onBoroChange} data-testid="boro">
                <option value="">Don't mind</option>
                {boros.map((value, index) => <option key={index}>{value}</option>)}
              </Form.Control>
              <Form.Text className="text-muted">
                Which borough?
              </Form.Text>
            </Form.Group>
          </Form.Row>
          )}
          {!hide.includes('cuisine') && (
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Type of cuisine</Form.Label>
              <Form.Control size="lg" as="select" defaultValue={cuisine} onChange={onCuisineChange} data-testid="cuisine">
                <option value="">Whatever!</option>
                {cuisines.map((item, index) => <option key={index}>{item.cuisine}</option>)}
              </Form.Control>
              <Form.Text className="text-muted">
                What do you fancy today?
              </Form.Text>
            </Form.Group>
          </Form.Row>
          )}
          {!hide.includes('minGrade') && (
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Minimum Grade</Form.Label>
              <Form.Control size="lg" as="select" defaultValue={minGrade} onChange={onMinGradeChange} data-testid="minGrade">
                {grades.map((grade, index) => <option key={index} value={grade}>{`${grade} ${gradesEmojis[grade]}`}</option>)}
              </Form.Control>
              <Form.Text className="text-muted">
                Are you feeling lucky?
              </Form.Text>
            </Form.Group>
          </Form.Row>
          )}
          <Form.Row className={"form-button"}>
            <Button disabled={loading} size="lg" type="submit" data-testid="submit">Let's go! I'm starving! <span role="img" aria-label="">😩</span></Button>
          </Form.Row>
        </Form>
      </Col>
    </Row>
  )
};

export default RestaurantsForm;
