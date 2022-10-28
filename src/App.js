import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';

// Import Pages
import CalculatePage from 'pages/calculate/CalculatePage';
import Homepage from 'pages/homepage/Homepage';
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
import RegistryApi from 'services/registry_api';
import CertificateEstimatorHVAC from 'pages/commercial_ac/CertificateEstimator';
import CertificateEstimatorWH from 'pages/commercial_wh/CertificateEstimatorWH';

function App() {
  const [entities, setEntities] = useState([]);
  const [variables, setVariables] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hvacBrands, setHvacBrands] = useState([]);
  const [hvacModels, setHvacModels] = useState([]);
  const [whBrands, setWhBrands] = useState([]);

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
  }, []);

  return (
    <Router>
      <Header variables={variables} />

      {loading && <SpinnerFullscreen />}

      <Breadcrumb />
      
      <Routes>
        <Route exact path="/" element={<Homepage schedules={schedules} variables={variables} />} />

        <Route exact path="/calculate" element={<CalculatePage schedules={schedules} variables={variables} />} />

        <Route exact path="/commercialac" element={<CommercialAC schedules={schedules} variables={variables} />} />

        <Route exact path="/commercialwh" element={<CommercialWH schedules={schedules} variables={variables} />} />

        <Route exact path="/commercialwh/base_eligibility_commercialwh" element={<BaseEligibilityCommercialWH entities={entities}
          variables={variables}
          variableToLoad="ESS__PDRS__ACP_base_scheme_eligibility"
          setEntities={setEntities}
          setVariables={setVariables}
          setLoading={setLoading} />} />

        <Route exact path="/commercialac/base_eligibility_commercialac" element={<BaseEligibilityCommercialAC entities={entities}
          variables={variables}
          variableToLoad="ESS__PDRS__ACP_base_scheme_eligibility"
          setEntities={setEntities}
          setVariables={setVariables}
          setLoading={setLoading} />} />

        <Route exact path="/commercialac/activity-requirements" element={<ActivityRequirementsCommercialAC entities={entities}
          variables={variables}
          variableToLoad="HVAC2_installation_replacement_final_activity_eligibility"
          setEntities={setEntities}
          setVariables={setVariables}
          setLoading={setLoading} />} />

        <Route exact path="/commercialac/certificate-estimator" element={<CertificateEstimatorHVAC entities={entities}
          variables={variables}
          hvacBrands={hvacBrands}
          loading={loading}
          setEntities={setEntities}
          setVariables={setVariables}
          setLoading={setLoading}
          setHvacBrands={setHvacBrands} />} />

        <Route exact path="/commercialwh/certificate-estimator" element={<CertificateEstimatorWH entities={entities}
          variables={variables}
          brands={whBrands}
          setEntities={setEntities}
          setVariables={setVariables}
          setLoading={setLoading} />} />

        <Route path="*">Not Found</Route>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
