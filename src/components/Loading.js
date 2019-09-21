import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => (
  <Row>
    <Col md="4"></Col>
    <Col className="text-center">
      <Spinner animation="border" />
    </Col>
    <Col md="4"></Col>
  </Row>
);

export default Loading;
