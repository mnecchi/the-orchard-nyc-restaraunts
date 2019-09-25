import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { queryByTestId } from '@testing-library/dom';
import ListPagination from '../../components/ListPagination';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Pagination renders correctly', () => {
  /**
   * It shouldn't render if there's only one page
   */
  it("shouldn't display if there's only one page", () => {
    const { container } = render(<ListPagination totalCount={9} sideItems={3} limit={10} offset={0} />);
    const pagination = queryByTestId(container, 'pagination');
    expect(pagination).toBeNull();
  });

  /**
   * The first page is the current one, there are two side items and 10 pages.
   * Since the first page is selected the side items are all moved to the right
   */
  it('should display 1* 2 3 4 5 ... 10', () => {
    const { container } = render(<ListPagination totalCount={98} sideItems={2} limit={10} offset={0} />);
    const pagination = queryByTestId(container, 'pagination');

		expect(pagination).not.toBeNull();
		const paginationItems = queryByTestId(pagination, 'pagination-items').children;
		expect(paginationItems.length).toBe(7);

    expect(paginationItems[0].textContent).toBe("1(current)");
    for (let i = 1; i < 5; ++i) {
      expect(paginationItems[i].textContent).toBe((i+1).toString());
    }
    expect(paginationItems[5].textContent).toBe("…More");
    expect(paginationItems[6].textContent).toBe("10");
  });

  /**
   * The last page is the current one, there are two side items and 10 pages.
   * Since the last page is selected the side items are all moved to the left
   */
  it('should display 1 ... 6 7 8 9 10*', () => {
    const { container } = render(<ListPagination totalCount={98} sideItems={2} limit={10} offset={90} />);
    const pagination = queryByTestId(container, 'pagination');

		expect(pagination).not.toBeNull();
		const paginationItems = queryByTestId(pagination, 'pagination-items').children;
    expect(paginationItems.length).toBe(7);

    expect(paginationItems[0].textContent).toBe("1");
    expect(paginationItems[1].textContent).toBe("…More");
    for (let i = 2; i < 5; ++i) {
      expect(paginationItems[i].textContent).toBe((i+4).toString());
    }
    expect(paginationItems[6].textContent).toBe("10(current)");
  });

  /**
   * Page 5 is the current one, there is one side item and 10 pages.
   * Page 5 has 1 side item each side and there are ellipsis after the first page and
   * before the last one.
   */
  it('should display 1 ... 4 5* 6 ... 10', () => {
    const { container } = render(<ListPagination totalCount={98} sideItems={1} limit={10} offset={40} />);
    const pagination = queryByTestId(container, 'pagination');

    expect(pagination).not.toBeNull();
		const paginationItems = queryByTestId(pagination, 'pagination-items').children;
    expect(paginationItems.length).toBe(7);
    expect(paginationItems[0].textContent).toBe("1");
    expect(paginationItems[1].textContent).toBe("…More");
    expect(paginationItems[2].textContent).toBe("4");
    expect(paginationItems[3].textContent).toBe("5(current)");
    expect(paginationItems[4].textContent).toBe("6");
    expect(paginationItems[5].textContent).toBe("…More");
    expect(paginationItems[6].textContent).toBe("10");
  });

  /**
   * Page 5 is the current one, there are 3 side items and 9 pages.
   * All the pages must be shown
   */
  it('should display 1 2 3 4 5* 6 7 8 9', () => {
    const { container } = render(<ListPagination totalCount={88} sideItems={3} limit={10} offset={40} />);
    const pagination = queryByTestId(container, 'pagination');

    expect(pagination).not.toBeNull();
		const paginationItems = queryByTestId(pagination, 'pagination-items').children;
    expect(paginationItems.length).toBe(9);
    for (let i=0;i < 9; ++i) {
      expect(paginationItems[i].textContent).toBe(i !== 4 ? (i + 1).toString() : '5(current)')
    }
  });
});

describe('Pagination works as expected', () => {
  /**
   * No pagination change fired if the already selected page is clicked
   */
  it("clicking on the current selected item doesn't do anything", () => {
    const onChange = jest.fn();
    const { container } = render(<ListPagination totalCount={88} sideItems={3} limit={10} offset={40} onChange={onChange} />);
    const pagination = queryByTestId(container, 'pagination');
    fireEvent.click(queryByTestId(pagination, 'pagination-items').children[4].firstChild);
    expect(onChange).not.toHaveBeenCalled();
  });

  /**
   * No pagination change fired if the ellipsis is clicked
   */
  it("clicking on the ellipsis doesn't do anything", () => {
    const onChange = jest.fn();
    const { container } = render(<ListPagination totalCount={98} sideItems={1} limit={10} offset={40} onChange={onChange}/>);
		const pagination = queryByTestId(container, 'pagination');

		fireEvent.click(queryByTestId(pagination, 'pagination-items').children[5].firstChild);
    expect(onChange).not.toHaveBeenCalled();
  });

  /**
   * If a page is clicked the change must be fire with the new
   * offset as a param
   */
  it("clicking on a page number fires the change", () => {
    const onChange = jest.fn();
    const { container } = render(<ListPagination totalCount={88} sideItems={3} limit={10} offset={40} onChange={onChange} />);
    const pagination = queryByTestId(container, 'pagination');

    fireEvent.click(queryByTestId(pagination, 'pagination-items').children[2].firstChild);
    expect(onChange).toHaveBeenCalledWith(20);
  })
});
