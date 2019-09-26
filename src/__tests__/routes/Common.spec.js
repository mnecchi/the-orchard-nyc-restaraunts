import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { queryByTestId, queryAllByTestId, queryByText } from '@testing-library/dom';
import mockedResults from '../mockedData/mockedResults.json';
import mockedCuisines from '../mockedData/mockedCuisines.json';
import Common from '../../routes/Common';

// fetch mock: I don't want to call the API each time I run the tests!
global.fetch = jest.fn();
// this needs to be mocked otherwise it throws a not implement error
window.scrollTo = jest.fn();

const props = {
  apiUrl: 'http://example.com',
  title: 'Awesome Title'
}

let container = null;

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  container = null;
});

/**
 * Rendering tests
 */
describe('Common component display correctly', () => {

  it('should display title, header and search form', async () => {
    global.fetch.mockResolvedValue({ ok: true, json: () => mockedCuisines });

    await act(async () => {
      const rendered = render(<Common {...props} />);
      container = rendered.container;
    });

    expect(document.title).toBe(props.title);
    expect(queryByTestId(container, 'header')).not.toBeNull();
    expect(queryByTestId(container, 'header-title').textContent).toBe(props.title);
    expect(queryByTestId(container, 'restaurants-form')).not.toBeNull();
    expect(queryByTestId(container, 'restaurants-list')).toBeNull();
  });

  it("if the cuisines api has an error it shouldn't crash, the cuisines filter has only the 'all' value", async () => {
    global.fetch.mockResolvedValue({ ok: false });

    await act(async () => {
      const rendered = render(<Common {...props} />);
      container = rendered.container;
    });

    const form = queryByTestId(container, 'restaurants-form');
    const cuisine = queryByTestId(form, 'cuisine');
    expect(cuisine).not.toBeNull();
    expect(cuisine.children).toHaveLength(1);
  });
});

/**
 * Behaviour tests
 */
describe('Common works as expected', () => {

  /**
   * This is an helper function used in the following tests.
   * It simulates the loading of the page and the user setting
   * the search criteria and then hitting submit
   */
  const performSearch = async mockedResults => {
    const searchCriteria = {
      dba: 'Sushi',
      street: '27 street',
      boro: 'Queens',
      cuisine: 'Japanese',
      minGrade: 'C'
    };

    global.fetch.mockResolvedValueOnce({ ok: true, json: () => mockedCuisines })
    await act(async () => {
      // component mount: fetch cuisines
      const rendered = render(<Common {...props} />);
      container = rendered.container;
    });

    const form = queryByTestId(container, 'restaurants-form');
    fireEvent.change(queryByTestId(form, 'name'), { target: { value: searchCriteria.dba } });
    fireEvent.change(queryByTestId(form, 'street'), { target: { value: searchCriteria.street } });
    fireEvent.change(queryByTestId(form, 'boro'), { target: { value: searchCriteria.boro } });
    fireEvent.change(queryByTestId(form, 'cuisine'), { target: { value: searchCriteria.cuisine } });
    fireEvent.change(queryByTestId(form, 'minGrade'), { target: { value: searchCriteria.minGrade } });

    global.fetch.mockResolvedValueOnce({ ok: true, json: () => mockedResults });
    await act(async () => {
      // call the API
      fireEvent.click(queryByTestId(form, 'submit'));
    });

    expect(global.fetch).toHaveBeenCalledTimes(2); // fetch cuisines + fetch results
    // check that the query string matches the search criteria
    expect(global.fetch.mock.calls[1][0]).toStrictEqual(expect.stringContaining(`dba=${searchCriteria.dba}`));
    expect(global.fetch.mock.calls[1][0]).toStrictEqual(expect.stringContaining(`street=${searchCriteria.street}`));
    expect(global.fetch.mock.calls[1][0]).toStrictEqual(expect.stringContaining(`boro=${searchCriteria.boro}`));
    expect(global.fetch.mock.calls[1][0]).toStrictEqual(expect.stringContaining(`cuisine=${searchCriteria.cuisine}`));
    expect(global.fetch.mock.calls[1][0]).toStrictEqual(expect.stringContaining(`minGrade=${searchCriteria.minGrade}`));
  };

  describe('Perform a search', () => {

    /**
     * Check that the results of the search are shown in a list
     */
    it('should show a list of results', async () => {
      await performSearch(mockedResults);

      const table = queryByTestId(container, 'restaurants-table');
      expect(table).not.toBeNull();
      expect(queryAllByTestId(table, 'restaurant-row')).toHaveLength(mockedResults.results.length)
    });

    /**
     * A 'no results found' message must be displayed if the API returns
     * an empty array as result
     */
    it('should display a message if no results are returned', async () => {
      await performSearch({ results: [], total_count: 0 });

      expect(queryByTestId(container, 'restaurants-table')).toBeNull();
      expect(queryByTestId(container, 'no-results-info')).not.toBeNull();
    });

    /**
     * Message for an error from the API
     */
    it('should display an error message if something goes wrong in the api call', async () => {
      global.fetch.mockResolvedValueOnce({ ok: true, json: () => mockedCuisines });
      await act(async () => {
        // component mount: fetch cuisines
        const rendered = render(<Common {...props} />);
        container = rendered.container;
      });

      global.fetch.mockResolvedValueOnce({ ok: false });
      await act(async () => {
        // call the API
        fireEvent.click(queryByTestId(queryByTestId(container, 'restaurants-form'), 'submit'));
      });

      expect(queryByTestId(container, 'generic-fetch-error')).not.toBeNull();
    });

    /**
     * When the user clicks a results' row a restaurant details modal must be shown
     */
    it('clicking on a result row should open a modal', async () => {
      await performSearch(mockedResults);

      // mock for the restaurant details API call
      global.fetch.mockResolvedValue({ ok: true, json: () => mockedResults.results[5] });

      const table = queryByTestId(container, 'restaurants-table');
      const rows = queryAllByTestId(table, 'restaurant-row');
      await act(async () => {
        fireEvent.click(rows[5]);
      });

      // cuisines fetch + restaurants fetch + restaurant detail fetch
      expect(global.fetch).toHaveBeenCalledTimes(3);
      // the endpoint for the restaurant details must be something like /restaurants/[id]
      expect(global.fetch.mock.calls[2][0]).toStrictEqual(expect.stringContaining(`/restaurants/${mockedResults.results[5].restaurant_id}`));

      // check the modal is shown
      const modal = queryByTestId(document, 'restaurant-modal');
      expect(modal).not.toBeNull();
      // close the modal
      fireEvent.click(queryByTestId(modal, 'restaurant-modal-close'));
    });
  });

  describe('Change order, number of items per page and current page', () => {

    /**
     * Number of results per page
     */
    it('should fire a new api request when changing the number of items per page', async () => {
      await performSearch(mockedResults);

      global.fetch.mockResolvedValueOnce({ ok: true, json: jest.fn() });
      const limit = 50;

      const select = queryByTestId(queryByTestId(container, 'restaurants-list'), 'results-per-page');
      await act(async () => {
        fireEvent.change(select, { target: { value: limit } });
      });

      // cuisines fetch + restaurants fetch + change limit
      expect(global.fetch).toHaveBeenCalledTimes(3);
      expect(global.fetch.mock.calls[2][0]).toStrictEqual(expect.stringContaining(`limit=${limit}`));
    });

    /**
     * Order of results
     */
    it('should fire a new api request when changing order', async () => {
      await performSearch(mockedResults);

      global.fetch.mockResolvedValueOnce({ ok: true, json: jest.fn() });
      const order = 'boro';

      const select = queryByTestId(queryByTestId(container, 'restaurants-list'), 'order-by');
      await act(async () => {
        fireEvent.change(select, { target: { value: order } });
      });

      // cuisines fetch + restaurants fetch + change order
      expect(global.fetch).toHaveBeenCalledTimes(3);
      expect(global.fetch.mock.calls[2][0]).toStrictEqual(expect.stringContaining(`order=${order}`));
    });

    /**
     * Pages navigation with pagination
     */
    it('should fire a new api request when changing page', async () => {
      await performSearch(mockedResults);

      const pageNumber = 2;

      global.fetch.mockResolvedValue({ ok: true, json: jest.fn() });
      const paginations = queryAllByTestId(container, 'pagination');
      await act(async () => {
        fireEvent.click(queryByText(paginations[0], `${pageNumber}`));
      });

      // cuisines fetch + restaurants fetch + change page
      expect(global.fetch).toHaveBeenCalledTimes(3);
      expect(global.fetch.mock.calls[2][0]).toStrictEqual(expect.stringContaining(`offset=${(pageNumber - 1) * 25}`));
    });
  });
});
