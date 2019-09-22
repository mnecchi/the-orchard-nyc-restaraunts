import React from 'react';
import Container from 'react-bootstrap/Container';
import Header from '../components/Header';
import RestaurantsForm from '../components/RestaurantsForm';
import Loading from '../components/Loading';
import RestaurantsList from '../components/RestaurantsList';
import Common from './Common';
import { apiUrl } from '../config';

const RenderComponent = ({
  loading,
  data,
  limit,
  offset,
  order,
  onLimitChange,
  onOrderChange,
  onOffsetChange,
  onRestaurantsChange
}) => (
  <Container>
    <Header />
    <RestaurantsForm onChange={onRestaurantsChange} />
    {loading ?
      <Loading /> :
      <RestaurantsList
        data={data}
        limit={limit}
        offset={offset}
        order={order}
        onLimitChange={onLimitChange}
        onOrderChange={onOrderChange}
        onOffsetChange={onOffsetChange}
      />
    }
  </Container>
);

const General = () => (
  <Common
    RenderComponent={RenderComponent}
    apiUrl={apiUrl}
  />
);

export default General;
