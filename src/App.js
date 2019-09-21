import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import RestaurantsForm from './components/RestaurantsForm';
import Loading from './components/Loading';
import RestaurantsList from './components/RestaurantsList';

const App = () => {
  const [ restaurantsFilter, setRestaurantsFilter ] = useState({});
  const [ loading, setLoading ] = useState(false);
  const [ limit, setLimit ] = useState(25);
  const [ offset, setOffset ] = useState(0);
  const [ order, setOrder ] = useState('dba');
  const [ results, setResults ] = useState();

  useEffect(() => {
    const { cuisine, minGrade} = restaurantsFilter;
    if (cuisine !== undefined && minGrade !== undefined) {
      setLoading(true);

      fetch(`https://desolate-spire-11056.herokuapp.com/restaurants?cuisine=${cuisine}&minGrade=${minGrade}&limit=${limit}&offset=${offset}`, {
        method: 'GET',
        mode: 'cors'
      }).then(response => {
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
  }, [limit, offset, order, restaurantsFilter])


  const onRestaurantsChange = (cuisine, minGrade) => {
    setRestaurantsFilter({ cuisine, minGrade });
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
