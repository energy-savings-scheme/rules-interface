import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import Pages
// import CalculatePage from 'pages/calculate/CalculatePage';
// import Homepage from 'pages/homepage/Homepage';
// import BaseEligibilityCommercialAC from 'pages/commercial_ac/BaseEligibilityCommercialAcPage';
// import BaseEligibilityCommercialWH from 'pages/commercial_wh/BaseEligibilityCommercialWhPage';
// import ActivityRequirementsCommercialAC from 'pages/commercial_ac/ActivityRequirementsAirCon';

// Import components
import Breadcrumb from 'components/layout/Breadcrumb';
// import Footer from 'components/layout/Footer';
// import Header from 'components/layout/Header';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';

// Import services
import OpenFiscaAPI from 'services/openfisca_api';
import variable_tree from 'services/variable_tree.json';

// Import styles
//import './styles/App.css';
import 'nsw-design-system/src/main.scss';
import '@fontsource/public-sans';
import '@fontsource/public-sans/600.css';
// import CommercialAC from 'pages/commercial_ac/CommercialAcPage';
// import CommercialWH from 'pages/commercial_wh/CommercialWhPage';
import RegistryApi from 'services/registry_api';
import CertificateEstimatorHVAC from 'pages/commercial_ac/CertificateEstimator';
// import CertificateEstimatorWH from 'pages/commercial_wh/CertificateEstimatorWH';
// import CertificateEstimatorResidentialAC from 'pages/residential_ac/CertificateEstimatorResidentialAC';
// import CertificateEstimatorRC from 'pages/refrigerated_cabinets/CertificateEstimatorRC';

function App() {
  const [entities, setEntities] = useState([]);
  const [variables, setVariables] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hvacBrands, setHvacBrands] = useState([]);
  const [hvacModels, setHvacModels] = useState([]);
  const [whBrands, setWhBrands] = useState([]);
  const [RF2Brands, setRF2Brands] = useState([]);

  const [schedules, setSchedules] = useState(variable_tree);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

    RegistryApi.getCommercialHVACBrands()
      .then((res) => {
        setHvacBrands(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    RegistryApi.getCommercialWHBrands()
      .then((res) => {
        setWhBrands(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    RegistryApi.getRF2Brands()
      .then((res) => {
        setRF2Brands(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Router>
      {/* <Header variables={variables} /> */}

      {loading && <SpinnerFullscreen />}

      <Switch>
        {/* <Route path="/" exact>
          <Breadcrumb />
          <Homepage schedules={schedules} variables={variables} />
        </Route> */}
        {/* <Route path="/calculate" exact>
          <Breadcrumb />
          <CalculatePage entities={entities} variables={variables} />
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
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/commercialac/base_eligibility_commercialac" exact>
          <Breadcrumb />
          <BaseEligibilityCommercialAC
            entities={entities}
            variables={variables}
            variableToLoad="ESS__PDRS__ACP_base_scheme_eligibility"
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/commercialac/activity-requirements" exact>
          <Breadcrumb />
          <ActivityRequirementsCommercialAC
            entities={entities}
            variables={variables}
            variableToLoad="HVAC2_installation_replacement_final_activity_eligibility"
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/commercial-ac-estimator" exact>
          <Breadcrumb />
          <CertificateEstimatorHVAC
            entities={entities}
            variables={variables}
            hvacBrands={hvacBrands}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
            setHvacBrands={setHvacBrands}
          />
        </Route>
        <Route path="/commercial-wh-estimator" exact>
          <Breadcrumb />
          <CertificateEstimatorWH
            entities={entities}
            variables={variables}
            brands={whBrands}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/residential-ac-estimator" exact>
          <Breadcrumb />
          <CertificateEstimatorResidentialAC
            entities={entities}
            variables={variables}
            hvacBrands={hvacBrands}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
            setHvacBrands={setHvacBrands}
          />
        </Route>
        <Route path="/refrigerated-cabinet-estimator" exact>
          <Breadcrumb />
          <CertificateEstimatorRC
            entities={entities}
            variables={variables}
            RF2Brands={RF2Brands}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
            setRF2Brands={setRF2Brands}
          />
        </Route> */}
        {/* <Route path="*">Not Found</Route> */}
        <Route path="*">
          <Breadcrumb />
          <CertificateEstimatorHVAC
            entities={entities}
            variables={variables}
            hvacBrands={hvacBrands}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
            setHvacBrands={setHvacBrands}
          />
           </Route>
      </Switch>

      {/* <Footer /> */}
    </Router>
  );
}

export default App;
