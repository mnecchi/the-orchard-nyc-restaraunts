import React from 'react';
import Header from '../components/Header';
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
  onOffsetChange
}) => (
  <>
    <Header className="thai" title="The NYC Healthier Thai Restaurants Search" />
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
  </>
);

const General = () => (
  <Common
    RenderComponent={RenderComponent}
    apiUrl={apiUrl}
    cuisine={'Thai'}
    minGrade={'B'}
  />
);

export default General;
