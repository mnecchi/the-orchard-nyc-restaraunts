import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

const Header = ({ title, className }) => {
  return (
    <Row>
      <Col>
        <Jumbotron fluid className={['text-center', className || ''].join(' ')}>
          <h1>{title}</h1>
        </Jumbotron>
      </Col>
    </Row>
  );
};

export default Header;
