import React, { useRef }from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const RestaurantsForm = ({ onChange }) => {

  const cuisineTypeInput = useRef();
  const minGradeInput = useRef();

  const loadRestaurants = event => {
    event.preventDefault();
    event.stopPropagation();
    onChange(cuisineTypeInput.current.value, minGradeInput.current.value);
  }

  return (
    <Row className={"search-box"}>
      <Col md={{ offset: 2, span: 8 }}>
        <Form className="search-form box shadow" onSubmit={loadRestaurants}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Type of cuisine</Form.Label>
              <Form.Control size="lg" as="select" ref={cuisineTypeInput}>
                <option value="">Whatever!</option>
                <option>Thai</option>
                <option>Indian</option>
                <option>Chinese</option>
                <option>Japanese</option>
                <option>Italian</option>
              </Form.Control>
              <Form.Text className="text-muted">
                What do you fancy today?
              </Form.Text>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Minimum Grade</Form.Label>
              <Form.Control size="lg" as="select" ref={minGradeInput}>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
                <option>E</option>
                <option>F</option>
              </Form.Control>
              <Form.Text className="text-muted">
                Are you feeling lucky?
              </Form.Text>
            </Form.Group>
          </Form.Row>
          <Form.Row className={"form-button"}>
            <Button size="lg" type="submit">Let's go! I'm starving! <span role="img" aria-label="">😩</span></Button>
          </Form.Row>
        </Form>
      </Col>
    </Row>
  )
};

export default RestaurantsForm;
