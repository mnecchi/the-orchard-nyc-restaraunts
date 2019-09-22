import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ListPagination = ({ totalCount, sideItems, limit, offset, onChange }) => {
  let numberOfPages = 0;
  const paginationItems = [];

  if (totalCount !== undefined) {
    numberOfPages = Math.ceil(totalCount / limit);
    const currPage = Math.floor(offset / limit) + 1;

    const afterItems = sideItems + Math.max(0, sideItems + 1 - currPage);
    const lastItem = Math.min(numberOfPages, currPage + afterItems);
    const firstItem = Math.max(1, lastItem - 10);

    if (firstItem > 1) {
      paginationItems.push(<Pagination.Item key="1">1</Pagination.Item>);
      if (firstItem > 2) {
        paginationItems.push(<Pagination.Ellipsis key="start_ellipsis"/>);
      }
    }

    for (let i = firstItem; i <= lastItem; ++i) {
      paginationItems.push(<Pagination.Item key={i} active={i === currPage}>{i}</Pagination.Item>)
    }

    if (lastItem < numberOfPages) {
      if (lastItem < numberOfPages - 1) {
        paginationItems.push(<Pagination.Ellipsis key="end_ellipsis"/>);
      }
      paginationItems.push(<Pagination.Item key={numberOfPages}>{numberOfPages}</Pagination.Item>);
    }
  }

  const onPaginationClick = ({ target }) => {
    target.text && onChange((parseInt(target.text) - 1) * limit);
  }

  return paginationItems.length > 1 && (
    <Row>
      <Col>
        <Pagination size="sm" onClick={onPaginationClick}>
          {paginationItems}
        </Pagination>
      </Col>
    </Row>
  );
}

export default ListPagination;
