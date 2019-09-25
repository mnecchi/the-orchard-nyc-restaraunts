import React, {
  useState,
  useEffect
} from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Header from '../components/Header';
import Loading from '../components/Loading';
import RestaurantsList from '../components/RestaurantsList';
import RestaurantsForm from '../components/RestaurantsForm';
import RestaurantModal from '../components/RestaurantModal';

const Common = ({
  apiUrl,
  title,
  headerClassName,
  hide,
  ...props
}) => {
  // search criteria
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [boro, setBoro] = useState('');
  const [cuisine, setCuisine] = useState(props.cuisine || '');
  const [minGrade, setMinGrade] = useState(props.minGrade || 'A');

  // limit and sorting
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(0);
  const [order, setOrder] = useState('dba');

  // search results
  const [results, setResults] = useState();

  // selected restaurant (details are open in a modal)
  const [selectedRestaurant, setSelectedRestaurant] = useState({});

  // async states
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(false);

  /**
   * Set the html title
   */
  useEffect(() => {
    document.title = title;
  }, [title]);

  /**
   * Start the API fetch call
   */
  useEffect(() => {

    // must be run only after the form has been submitted
    if (!submit) {
      return;
    }

    setError(false);
    setLoading(true);

    // build the query string
    const queryOptions = {
      dba: name,
      street,
      boro,
      cuisine,
      minGrade,
      limit,
      offset,
      order
    };
    const queryString = Object.keys(queryOptions)
      .reduce((acc, option) => {
        acc.push(`${option}=${queryOptions[option]}`);
        return acc;
      }, [])
      .join('&');

    // call the API
    fetch(`${apiUrl}/restaurants?${queryString}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network Problem!');
        }

        return response.json();
      }).then(json => {
        // results returned
        setResults(json);
      }).catch(() => {
        // an error occured
        setResults([]);
        setError(true);
      }).finally(() => {
        setLoading(false);
      });
  }, [submit, name, street, boro, limit, offset, order, cuisine, minGrade, apiUrl]);

  // handler for the form submit
  const onRestaurantsChange = ({
    cuisine,
    minGrade,
    name,
    street,
    boro
  }) => {
    setOffset(0);
    setCuisine(cuisine);
    setMinGrade(minGrade);
    setName(name);
    setStreet(street);
    setBoro(boro);
    setSubmit(true);
  }

  // handlers for limit, pagination navigation (offset) and order of the list
  const onLimitChange = limit => setLimit(limit);
  const onOrderChange = order => setOrder(order);
  const onOffsetChange = offset => setOffset(offset);

  // handler for the click on a results' row -> opens a modal
  const onOpenRestaurantDetails = restaurant => setSelectedRestaurant(restaurant);

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
          onOpenRestaurantDetails={onOpenRestaurantDetails}
        />
      }
      {error && <Alert variant="danger" data-testid="generic-fetch-error">An error occured! <span role="img" aria-label="">🤬</span></Alert>}
      <RestaurantModal id={selectedRestaurant.restaurant_id} name={selectedRestaurant.dba} onHide={() => setSelectedRestaurant({})} />
    </Container>
  );
}

export default Common;
