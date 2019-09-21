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
    <Row>
      <Col md={{ offset: 2, span: 8 }}>
        <Form onSubmit={loadRestaurants}>
          <Row>
            <Col>
              <Form.Group>
                <Row>
                  <Col>
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
                  </Col>
                </Row>
                <Row>
                  <Col>
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
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button type="submit">Submit form</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
};

export default RestaurantsForm;
