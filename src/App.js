import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import RestaurantsForm from './components/RestaurantsForm';
import Loading from './components/Loading';
import RestaurantsList from './components/RestaurantsList';
import { apiUrl } from './config';

const App = () => {
  const [ cuisine, setCuisine ] = useState();
  const [ minGrade, setMinGrade ] = useState();
  const [ loading, setLoading ] = useState(false);
  const [ limit, setLimit ] = useState(25);
  const [ offset, setOffset ] = useState(0);
  const [ order, setOrder ] = useState('dba');
  const [ results, setResults ] = useState();

  useEffect(() => {
    if (cuisine !== undefined && minGrade !== undefined) {
      setLoading(true);

      const queryOptions = {
        cuisine, minGrade, limit, offset, order
      };
      const queryString = Object.keys(queryOptions).reduce((acc, option) => {
        acc.push(`${option}=${queryOptions[option]}`);
        return acc;
      } , []).join('&');

      fetch(`${apiUrl}?${queryString}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network Problem!');
          }

          return response.json();
        }).then(json => {
          setResults(json);
        }).catch(err => {
          console.error(err.message);
        }).finally(() => {
          setLoading(false);
        });
    }
  }, [limit, offset, order, cuisine, minGrade])


  const onRestaurantsChange = (cuisine, minGrade) => {
    setOffset(0);
    setCuisine(cuisine);
    setMinGrade(minGrade);
  }

  const onLimitChange = limit => {
    setLimit(limit);
  }

  const onOrderChange = order => {
    setOrder(order);
  }

  const onOffsetChange = offset => {
    setOffset(offset);
  }

  return (
    <Container>
      <Header />
      <RestaurantsForm onChange={onRestaurantsChange} />
      {loading ?
        <Loading /> :
        <RestaurantsList
          data={results}
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
}

export default App;
