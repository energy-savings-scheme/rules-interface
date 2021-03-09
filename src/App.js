import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import Pages
import Homepage from 'pages/homepage/Homepage';
import SchedulePage from 'pages/SchedulePage';
import VariablePage from 'pages/VariablePage';

// Import components
import Footer from 'components/layout/Footer';
import Header from 'components/layout/Header';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';

// Import services
import { getRequest } from 'services/network_request';
import OpenFiscaAPI from 'services/openfisca_api';
import { emptyTree, sortResponse } from 'services/sortResponse';

// Import styles
import './styles/App.css';

function App() {
  const [sortedVar, setSortedVar] = useState(emptyTree());

  const [entities, setEntities] = useState([]);
  const [variables, setVariables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    OpenFiscaAPI.listEntities()
      .then((res) => {
        setEntities(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    OpenFiscaAPI.listVariables()
      .then((res) => {
        setVariables(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    //TODO: add a progress bar while loading
    getRequest('variables').then((res) => {
      let returnedData = res.data;
      let varSorted = sortResponse(returnedData);
      setSortedVar(varSorted);
    });
  }, []);

  return (
    <Router>
      <Header />

      {loading && <SpinnerFullscreen />}

      <Switch>
        <Route path="/" exact>
          <Homepage variables={variables} />
        </Route>
        <Route path="/variables/:variable_name" exact>
          <VariablePage entities={entities} variables={variables} />
        </Route>
        <Route path="/schedules/:schedule_name" exact>
          <SchedulePage entities={entities} variables={variables} />
        </Route>
        <Route path="*">Not Found</Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
