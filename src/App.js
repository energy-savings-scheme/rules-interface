import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import Pages
import ActivityDefinitionPage from 'pages/ActivityDefinitionPage';
import ActivityRequirementPage from 'pages/ActivityRequirementPage';
import ActivityComparePage from 'pages/ActivityComparePage';

import CalculatePage from 'pages/calculate/CalculatePage';
import ComparePage from 'pages/ComparePage';
import Homepage from 'pages/homepage/Homepage';
import SchedulePage from 'pages/SchedulePage';
import VariablePage from 'pages/VariablePage';
import BaseEligibilityCommercialAC from 'pages/commercial_ac/BaseEligibilityCommercialAcPage';
import BaseEligibilityCommercialWH from 'pages/commercial_wh/BaseEligibilityCommercialWhPage';
import ActivityRequirementsCommercialAC from 'pages/commercial_ac/ActivityRequirementsAirCon';

// Import components
import Breadcrumb from 'components/layout/Breadcrumb';
import Footer from 'components/layout/Footer';
import Header from 'components/layout/Header';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';

// Import services
import OpenFiscaAPI from 'services/openfisca_api';
import variable_tree from 'services/variable_tree.json';

// Import styles
//import './styles/App.css';
import 'nsw-design-system/src/main.scss';
import '@fontsource/public-sans';
import '@fontsource/public-sans/600.css';
import CommercialAC from 'pages/commercial_ac/CommercialAcPage';
import CommercialWH from 'pages/commercial_wh/CommercialWhPage';

function App() {
  const [entities, setEntities] = useState([]);
  const [variables, setVariables] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [schedules, setSchedules] = useState(variable_tree);

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

    OpenFiscaAPI.listActivities()
      .then((res) => {
        setActivities(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Router>
      <Header variables={variables} />

      {loading && <SpinnerFullscreen />}

      <Switch>
        <Route path="/" exact>
          <Breadcrumb />
          <Homepage schedules={schedules} variables={variables} />
        </Route>

        <Route path="/activities" exact>
          <Breadcrumb />
          <ActivityRequirementPage activities={activities} variables={variables} />
        </Route>
        <Route path="/compare2activities" exact>
          <Breadcrumb />
          <ActivityComparePage activities={activities} variables={variables} />
        </Route>
        <Route path="/calculate" exact>
          <Breadcrumb />
          <CalculatePage entities={entities} variables={variables} />
        </Route>
        <Route path="/compare" exact>
          <Breadcrumb />
          <ComparePage entities={entities} variables={variables} />
        </Route>
        <Route path="/commercialac" exact>
          <Breadcrumb />
          <CommercialAC entities={entities} variables={variables} />
        </Route>
        <Route path="/commercialwh" exact>
          <Breadcrumb />
          <CommercialWH entities={entities} variables={variables} />
        </Route>
        <Route path="/commercialwh/base_eligibility_commercialwh" exact>
          <Breadcrumb />
          <BaseEligibilityCommercialWH
            entities={entities}
            variables={variables}
            variableToLoad="ESS__PDRS__ACP_base_scheme_eligibility"
          />
        </Route>
        <Route path="/commercialac/base_eligibility_commercialac" exact>
          <Breadcrumb />
          <BaseEligibilityCommercialAC
            entities={entities}
            variables={variables}
            variableToLoad="ESS__PDRS__ACP_base_scheme_eligibility"
          />
        </Route>
        <Route path="/commercialac/activity-requirements" exact>
          <Breadcrumb />
          <ActivityRequirementsCommercialAC
            entities={entities}
            variables={variables}
            variableToLoad="HVAC2_installation_replacement_final_activity_eligibility"
          />
        </Route>
        <Route path="/variables/:variable_name" exact>
          <Breadcrumb />
          <VariablePage entities={entities} variables={variables} />
        </Route>
        <Route path="/schedules/:schedule_name" exact>
          <Breadcrumb />
          <SchedulePage schedules={schedules} variables={variables} />
        </Route>

        <Route path="/schedules/:schedule_name/:activity_sublabel" exact>
          <Breadcrumb />
          <ActivityDefinitionPage schedules={schedules} variables={variables} />
        </Route>

        <Route path="*">Not Found</Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
