import React, { useState, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';

const RestaurantsList = ({ limit, offset, order, data, onLimitChange, onOrderChange, onOffsetChange }) => {
  const { results, total_count } = data || {};

  const limitInput = useRef();
  const orderInput = useRef();

  const onLimitInputChange = () => {
    onLimitChange(limitInput.current.value);
  };

  const onOrderInputChange = () => {
    onOrderChange(orderInput.current.value);
  };

  const onPaginationClick = ({ target }) => {
    onOffsetChange((parseInt(target.text) - 1) * limit);
  }

  if (!Array.isArray(results) || results.length === 0) {
    return null;
  }

  console.log(offset);

  let numberOfPages = 0;
  const paginationItems = [];
  if (total_count !== undefined) {
    numberOfPages = Math.ceil(total_count / limit);
    const currPage = Math.floor(offset / limit) + 1;

    console.log(currPage);

    for (let i = 1; i <= numberOfPages; ++i) {
      paginationItems.push(<Pagination.Item key={i} active={i === currPage}>{i}</Pagination.Item>)
    }
  }

  return (
    <>
      <Row>
        <Col>
          <Form>
            <Form.Row>
              <Form.Group md={3} as={Col}>
                <Form.Label>Results per Page:</Form.Label>
                <Form.Control size="sm" as="select" value={limit} ref={limitInput} onChange={onLimitInputChange}>
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </Form.Control>
              </Form.Group>
              <Form.Group md={3} as={Col}>
                <Form.Label>Sort by:</Form.Label>
                <Form.Control size="sm" as="select" value={order} ref={orderInput} onChange={onOrderInputChange}>
                  <option value="dba">Name</option>
                  <option value="boro">Borough</option>
                  <option value="grade">Grade</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table bordered striped>
            <thead>
              <tr>
                <th>Name</th>
                <th>Borough</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {results.map(result => <tr key={result.restaurant_id}>
                <td>{result.dba}</td>
                <td>{result.boro}</td>
                <td>{result.grade}</td>
              </tr>)}
            </tbody>
          </Table>
        </Col>
      </Row>
      {paginationItems.length > 1 && (
      <Row>
        <Col>
          <Pagination size="sm" onClick={onPaginationClick}>
            {paginationItems}
          </Pagination>
        </Col>
      </Row>
      )}
    </>
  )
};

export default RestaurantsList;
