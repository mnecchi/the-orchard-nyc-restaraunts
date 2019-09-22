import React from 'react';
import Common from './Common';
import { apiUrl } from '../config';

const General = () => (
  <Common
    apiUrl={apiUrl}
    title={"The NYC Restaurants Search"}
  />
);

export default General;
