import React, { useLayoutEffect } from 'react';
import scrollIntoView from 'scroll-into-view';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { gradesEmojis } from '../config';
import ListPagination from './ListPagination';

const RestaurantsList = ({ limit, offset, order, data, onLimitChange, onOrderChange, onOffsetChange, onOpenRestaurantDetails }) => {
  useLayoutEffect(() => {
    // scroll the results into view on mount
    const list = document.getElementById('restaurants-list');
    if (list) {
      scrollIntoView(list);
    }
  }, []);

  const { results, total_count } = data || {};

  // handlers for number of results per pages, order and page navigation changes
  const onLimitInputChange = e => onLimitChange(e.target.value);
  const onOrderInputChange = e => onOrderChange(e.target.value);
  const onPaginationChange = offset => onOffsetChange(offset);

  // don't display anything at startup
  if (!Array.isArray(results)) {
    return null;
  }

  return (
    <Container className="results">
      {results.length === 0 ? <Alert variant="dark" data-testid="no-results-info">No Restaurants Found! <span role="img" aria-label="">😢</span></Alert> : (
      <div id="restaurants-list" data-testid='restaurants-list'>
        <Row>
          <Col>
            <Form>
              <Form.Row className="shadow box results-bar">
                <Form.Group md={3} as={Col}>
                  <Form.Label>Results per Page:</Form.Label>
                  <Form.Control size="sm" as="select" value={limit} onChange={onLimitInputChange} data-testid="results-per-page">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group md={3} as={Col}>
                  <Form.Label>Sort by:</Form.Label>
                  <Form.Control size="sm" as="select" value={order} onChange={onOrderInputChange} data-testid="order-by">
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
            <ListPagination totalCount={total_count} sideItems={5} limit={limit} offset={offset} onChange={onPaginationChange} />
            <Row>
              <Col>
                <Table bordered striped hover className="shadow" data-testid="restaurants-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Borough</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map(result => (
                    <tr key={result.restaurant_id} className={`result ${result.grade.toLowerCase()}-grade`} onClick={() => onOpenRestaurantDetails(result)} data-testid="restaurant-row">
                      <td>{result.dba}</td>
                      <td>{result.boro}</td>
                      <td>{result.grade} <span role="img" aria-label="">{gradesEmojis[result.grade] || ''}</span></td>
                    </tr>)
                    )}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <ListPagination totalCount={total_count} sideItems={5} limit={limit} offset={offset} onChange={onPaginationChange} />
          </Col>
        </Row>
      </div>)}
    </Container>
  )
};

export default RestaurantsList;
