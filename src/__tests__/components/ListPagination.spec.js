import React from 'react';
import { render } from '@testing-library/react';
import { getByTestId } from '@testing-library/dom';
import ListPagination from '../../components/ListPagination';

it('renders without crashing', () => {
  const { container } = render(<ListPagination totalCount={810} sideItems={3} limit={25} offset={0} />);
  const pagination = getByTestId(container, 'pagination');
});
