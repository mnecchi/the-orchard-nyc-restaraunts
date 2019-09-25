import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { queryByTestId } from '@testing-library/dom';
import RestaurantDetails from '../../components/RestaurantDetails';

// API fetch mock
global.fetch = jest.fn();

const mockDetails = {
  cuisine: 'Indian',
  building: '1000',
  street: '5 Avenue',
  zipcode: '11111',
  boro: 'Manhattan',
  phone: '7654321098',
  grade: 'B',
  violation_description: 'Dirty!!',
  last_inspection_date: '2019-09-24T00:00:00Z'
};

let container = null;

beforeEach(() => {
  // reset the mock "functions' counter"
  jest.clearAllMocks();
});

afterEach(() => {
  container = null;
});

describe('RestaurantModal displays correctly', () => {

  /**
   * Error from the API
   */
  it('should display a spinner and display an error banner if the API returns an error', async () => {
    // mocked API call
    global.fetch.mockResolvedValueOnce({ ok: false });

    await act(async () => {
      const rendered = render(<RestaurantDetails id={4} />);
      container = rendered.container;
      expect(queryByTestId(container, 'spinner')).not.toBeNull();
    });

    expect(queryByTestId(container, 'spinner')).toBeNull();
    expect(queryByTestId(container, 'error-alert')).not.toBeNull();
  });

  /**
   * Successfully returned restaurant details
   */
  it('should display a spinner on mount and then the details', async () => {
    // mocked API call
    global.fetch.mockResolvedValueOnce({ ok: true, json: () => (mockDetails) });

    await act(async () => {
      const rendered = render(<RestaurantDetails id={4} />);
      container = rendered.container;
      expect(queryByTestId(container, 'spinner')).not.toBeNull();
    });

    // Loading Done!
    expect(queryByTestId(container, 'spinner')).toBeNull();

    // check the details are rendered and they are correct
    const details = queryByTestId(container, 'details');
    expect(details).not.toBeNull();
    expect(queryByTestId(details, 'cuisine').textContent).toBe(mockDetails.cuisine);
    expect(queryByTestId(details, 'building').textContent).toBe(mockDetails.building);
    expect(queryByTestId(details, 'street').textContent).toBe(mockDetails.street);
    expect(queryByTestId(details, 'zipcode').textContent).toBe(mockDetails.zipcode);
    expect(queryByTestId(details, 'boro').textContent).toBe(mockDetails.boro);
    expect(queryByTestId(details, 'phone').textContent).toBe(mockDetails.phone);
    expect(queryByTestId(details, 'grade').textContent).toBe(mockDetails.grade);
    expect(queryByTestId(details, 'violation_description').textContent).toBe(mockDetails.violation_description);
    expect(queryByTestId(details, 'inspection_date').textContent).toBe(new Date(mockDetails.last_inspection_date).toLocaleDateString());
  });

  /**
   * Check there are no empty lines rendered if the result doesn't have
   * any last inspection date and violation description
   */
  it("if there are no inspection and violation description don't show them", async () => {
    // mocked API call
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => ({
        ...mockDetails,
        grade: 'Unknown',
        last_inspection_date: null,
        violation_description: null
      })
    });

    await act(async () => {
      const rendered = render(<RestaurantDetails id={4} />);
      container = rendered.container;
    });

    // check violation and inspection date are not rendered
    expect(queryByTestId(container, 'spinner')).toBeNull();
    expect(queryByTestId(container, 'violation_description')).toBeNull();
    expect(queryByTestId(container, 'inspection_date')).toBeNull();
  });
});
