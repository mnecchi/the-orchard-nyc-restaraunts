import React, { useRef , useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const App = () => {
  const [ cuisine, setCuisine ] = useState();
  const [ minGrade, setMinGrade ] = useState();
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    if (cuisine !== undefined && minGrade !== undefined) {
      setLoading(true);

      fetch(`https://desolate-spire-11056.herokuapp.com/restaurants?cuisine=${cuisine}&minGrade=${minGrade}`, {
        method: 'GET',
        mode: 'cors'
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network Problem!');
        }

        return response.json();
      }).then(json => {
        console.log(json);
      }).catch(err => {
        console.error(err.message)
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [cuisine, minGrade])

  const cuisineTypeInput = useRef();
  const minGradeInput = useRef();

  const loadRestaurants = event => {
    event.preventDefault();
    event.stopPropagation();

    setCuisine(cuisineTypeInput.current.value);
    setMinGrade(minGradeInput.current.value);
  }


  return (
    <Container>
      <Row>
        <Col>
          <Jumbotron>
            Header
          </Jumbotron>
        </Col>
      </Row>
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
      <Row>
        <Col md="6"></Col>
        <Col>
          {loading && <Spinner animation="border" />}
        </Col>
        <Col md="6"></Col>
      </Row>
    </Container>
  );
}

export default App;
