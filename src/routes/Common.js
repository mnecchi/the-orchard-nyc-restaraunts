import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Header from '../components/Header';
import Loading from '../components/Loading';
import RestaurantsList from '../components/RestaurantsList';
import RestaurantsForm from '../components/RestaurantsForm';

const Common = ({ apiUrl, title, headerClassName, hide, ...props }) => {
  const [ name, setName ] = useState('');
  const [ street, setStreet ] = useState('');
  const [ boro, setBoro ] = useState('');
  const [ cuisine, setCuisine ] = useState(props.cuisine || '');
  const [ minGrade, setMinGrade ] = useState(props.minGrade || 'A');
  const [ loading, setLoading ] = useState(false);
  const [ limit, setLimit ] = useState(25);
  const [ offset, setOffset ] = useState(0);
  const [ order, setOrder ] = useState('dba');
  const [ results, setResults ] = useState();
  const [ submit, setSubmit ] = useState(false);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    if (!submit) {
      return;
    }

    setError(false);
    setLoading(true);

    const queryOptions = {
      name, street, boro, cuisine, minGrade, limit, offset, order
    };
    const queryString = Object.keys(queryOptions)
      .reduce((acc, option) => {
        acc.push(`${option}=${queryOptions[option]}`);
        return acc;
      } , [])
      .join('&');

    fetch(`${apiUrl}?${queryString}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network Problem!');
        }

        return response.json();
      }).then(json => {
        setResults(json);
      }).catch(err => {
        setResults([]);
        setError(true);
      }).finally(() => {
        setLoading(false);
      });
  }, [submit, name, street, boro, limit, offset, order, cuisine, minGrade, apiUrl]);

  const onRestaurantsChange = ({ cuisine, minGrade, name, street, boro }) => {
    setOffset(0);
    setCuisine(cuisine);
    setMinGrade(minGrade);
    setName(name);
    setStreet(street);
    setBoro(boro);
    setSubmit(true);
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
    <Container className="main shadow">
      <Header title={title} className={headerClassName || ''}/>
      <RestaurantsForm
        loading={loading}
        name={name}
        street={street}
        boro={boro}
        cuisine={cuisine}
        minGrade={minGrade}
        onChange={onRestaurantsChange}
        hide={hide || []}
      />
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
      {error && <Alert variant="danger">An error occured! <span role="img" aria-label="">🤬</span></Alert>}
    </Container>
  );



}

export default Common;
