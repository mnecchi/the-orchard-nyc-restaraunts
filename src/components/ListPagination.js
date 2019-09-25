import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * @param {object} props
 *    totalCount: total number of items
 *    sideItems: pages on each side of the selected one
 *    limit: number of items per page
 *    offset: index of the first item for the current page
 *    onChange: function to be called when a page is clicked
 */
const ListPagination = ({ totalCount, sideItems, limit, offset, onChange }) => {
  const paginationItems = [];

  const currPage = Math.floor(offset / limit) + 1;
  const numberOfPages = Math.ceil(totalCount / limit);

  /**
   * I want to show the current page and a number of sideItems at each side
   * For example: if the current page is 7 and sideItems 2 I want to show 5,6,7,8,9
   * If there are not enough sideItems I add the different on the other side
   * For example: current page is 2 and sideItems 2 I want 1,2,3,4,5
   * If the lower page is not 1 I add a 1 and an ellipsis at the beginning: 1 ... 4 5 6 7 8
   * The same for the upper page: 4 5 6 7 ... 10
   */

  const itemsAfter = sideItems + Math.max(0, sideItems + 1 - currPage);
  const lastItem = Math.min(numberOfPages, currPage + itemsAfter);
  const firstItem = Math.max(1, lastItem - sideItems * 2);

  // ellipsis and first page at the beginning
  if (firstItem > 1) {
    paginationItems.push(<Pagination.Item key="1">1</Pagination.Item>);
    // if the first page shown is 2 I don't need the ellipsis
    if (firstItem > 2) {
      paginationItems.push(<Pagination.Ellipsis key="start_ellipsis"/>);
    }
  }

  for (let i = firstItem; i <= lastItem; ++i) {
    paginationItems.push(<Pagination.Item key={i} active={i === currPage}>{i}</Pagination.Item>)
  }

  // ellipsis and last page at the end
  if (lastItem < numberOfPages) {
    // if the last page show is the on before the end I don't need the ellipsis
    if (lastItem < numberOfPages - 1) {
      paginationItems.push(<Pagination.Ellipsis key="end_ellipsis"/>);
    }
    paginationItems.push(<Pagination.Item key={numberOfPages}>{numberOfPages}</Pagination.Item>);
  }

  const onPaginationClick = ({ target }) => {
    // if the a valid page is clicked fire the change event with the new offset
    target.text && !isNaN(target.text) && onChange((parseInt(target.text) - 1) * limit);
  }

  // display only with there are at least two pages
  return paginationItems.length > 1 && (
    <Row data-testid="pagination">
      <Col>
        <Pagination size="sm" onClick={onPaginationClick} data-testid="pagination-items">
          {paginationItems}
        </Pagination>
      </Col>
    </Row>
  );
}

export default ListPagination;
