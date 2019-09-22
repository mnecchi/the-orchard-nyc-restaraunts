import React, { useState, useEffect } from 'react';

const Common = ({ apiUrl, RenderComponent, ...props }) => {
  const [ cuisine, setCuisine ] = useState(props.cuisine);
  const [ minGrade, setMinGrade ] = useState(props.minGrade);
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
  }, [limit, offset, order, cuisine, minGrade, apiUrl])


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
    <RenderComponent
      loading={loading}
      data={results}
      limit={limit}
      offset={offset}
      order={order}
      onRestaurantsChange={onRestaurantsChange}
      onLimitChange={onLimitChange}
      onOrderChange={onOrderChange}
      onOffsetChange={onOffsetChange}
    />
  );



}

export default Common;
