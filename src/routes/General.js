import React from 'react';
import Common from './Common';
import { apiUrl } from '../config';

const General = () => (
  <Common
    apiUrl={apiUrl}
    title={"The Big Apple Orchard Search 🍎"}
  />
);

export default General;
