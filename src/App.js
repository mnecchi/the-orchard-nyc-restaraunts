import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import General from './routes/General';
import Thai from './routes/Thai';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => (
  <Router>
    <Route exact path="/" component={Thai} />
    <Route path="/thai" component={Thai} />
    <Route path="/all" component={General} />
  </Router>
);

export default App;
