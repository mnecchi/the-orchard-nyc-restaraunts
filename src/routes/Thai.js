import React from 'react';
import Common from './Common';
import { apiUrl } from '../config';

const General = () => (
  <Common
    apiUrl={apiUrl}
    cuisine={'Thai'}
    minGrade={'F'}
    title={"The Papaya Orchard Search 🇹🇭"}
    headerClassName={"thai"}
    hide={['cuisine', 'minGrade']}
  />
);

export default General;
