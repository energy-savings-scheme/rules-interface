import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

// Import Pages
import CalculatePage from 'pages/calculate/CalculatePage';
import Homepage from 'pages/homepage/Homepage';
import BaseEligibilityCommercialAC from 'pages/base_eligibility/BaseEligibility';
import BaseEligibilityCommercialWH from 'pages/commercial_wh/BaseEligibilityCommercialWhPage';
import ActivityRequirementsCommercialAC from 'pages/commercial_ac/ActivityRequirementsAirCon';
import ActivityRequirementsSYS1 from 'pages/commercial_motors/ActivityRequirementsSYS1';
import EligibilityPage from 'pages/homepage/EligibilityPage';
import CertificateEstimationPage from 'pages/homepage/CertificateEstimationPage';

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
import CertificateEstimatorResidentialAC from 'pages/residential_ac/CertificateEstimatorResidentialAC';
import CertificateEstimatorRC from 'pages/refrigerated_cabinets/CertificateEstimatorRC';
import CertificateEstimatorPP from 'pages/pool_pumps/CertificateEstimatorPP';
import CertificateEstimatorMotors from 'pages/commercial_motors/CertificateEstimatorMotors';
import CertificateEstimatorRefrigerators from 'pages/residential_refrigerators/CertificateEstimatorRefrigerators';
import BaseEligibility from 'pages/base_eligibility/BaseEligibility';
import ActivityRequirementsResAC from 'pages/residential_ac/ActivityRequirementsResAC';
import ActivityRequirementsSYS2 from 'pages/pool_pumps/ActivityRequirementsSYS2';
import ActivityRequirementsRF1 from 'pages/residential_refrigerators/ActivityRequirementsRF1';
import ActivityRequirementsRF2 from 'pages/refrigerated_cabinets/ActivityRequirements';
import ActivityRequirementsWH1 from 'pages/commercial_wh/ActivityRequirementsWaterHeater';
import CertificateEstimatorElectricHeatPump from 'pages/electric_residential_heat_pumps/CertificateEstimatorD17';
import CertificateEstimatorGasHeatPump from 'pages/gas_residential_heat_pumps/CertificateEstimatorD19';
import ActivityRequirementsD17 from 'pages/electric_residential_heat_pumps/ActivityRequirementsD17';
import ActivityRequirementsD19 from 'pages/gas_residential_heat_pumps/ActivityRequirementsD19';
import HotWaterEligibilityPage from 'pages/homepage/HotWaterHeaterEligibility';
import HotWaterCertificatePage from 'pages/homepage/HotWaterHeaterCertificatePage';
import ActivityRequirementsD18 from 'pages/residential_solar_water_heater_D18/ActivityRequirementsD18';
import CertificateEstimatorResidentialSolarWaterHeater from 'pages/residential_solar_water_heater_D18/CertificateEstimatorD18';
import ActivityRequirementsD20 from 'pages/residential_solar_water_heater_gas_replacement_D20/ActivityRequirementsD20';
import CertificateEstimatorResidentialGasReplacementSolarWaterHeater from 'pages/residential_solar_water_heater_gas_replacement_D20/CertificateEstimatorD20';
import ActivityRequirementsBESS1 from 'pages/BESS1/ActivityRequirementsBESS1';
import SolarBatteryEligibilityPage from 'pages/homepage/SolarBatteryEligibility';
import SolarBatteryCertificatePage from 'pages/homepage/SolarBatteryCertificatePage';
import CertificateEstimatorBESS1 from 'pages/BESS1/CertificateEstimatorBESS1';
import ActivityRequirementsBESS2 from 'pages/BESS2/ActivityRequirementsBESS2';
import CertificateEstimatorBESS2 from 'pages/BESS2/CertificateEstimatorBESS2';
import CertificateEstimatorWH2_test from 'pages/WH2_test/CertificateEstimatorWH';
import ActivityRequirementsF17 from 'pages/commercial_wh_f17/ActivityRequirementsWaterHeater';
import CommercialHotWaterHeaterEligibilityPage from 'pages/homepage/CommercialHotWaterHeaterEligibility';
import CommercialHotWaterHeaterCertificateEstimation from 'pages/homepage/CommercialHotWaterHeaterCertificatePage';
import CertificateEstimatorF17 from 'pages/commercial_wh_f17/CertificateEstimatorF17';
import CertificateEstimatorF16_gas from 'pages/commercial_wh_F16_gas/CertificateEstimatorF16_gas';
import ActivityRequirementsF16_gas from 'pages/commercial_wh_F16_gas/ActivityRequirementsWaterHeater';

function App() {
  const [entities, setEntities] = useState([]);
  const [variables, setVariables] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hvacBrands, setHvacBrands] = useState([]);
  const [hvacModels, setHvacModels] = useState([]);
  const [whBrands, setWhBrands] = useState([]);
  const [RF2Brands, setRF2Brands] = useState([]);
  const [PoolPumpBrands, setPoolPumpBrands] = useState([]);
  const [resHPBrands, setresHPBrands] = useState([]);
  const [resSolarWaterHeaterBrands, setResSolarWaterHeaterBrands] = useState([]);
  const [resSolarBatteryBrands, setResSolarBatteryBrands] = useState([]);

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

    RegistryApi.getPoolPumpBrands()
      .then((res) => {
        setPoolPumpBrands(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    RegistryApi.getResidentialHeatPumpBrands()
      .then((res) => {
        setresHPBrands(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    RegistryApi.getResidentialSolarWaterHeaterBrands()
      .then((res) => {
        setResSolarWaterHeaterBrands(res.data);
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

    RegistryApi.getResidentialSolarBatteryBrands()
      .then((res) => {
        setResSolarBatteryBrands(res.data);
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
      <Header variables={variables} />

      {loading && <SpinnerFullscreen />}

      <Switch>
        <Route path="/" exact>
          <Breadcrumb />
          <Homepage />
        </Route>

        <Route path="/eligibility" exact>
          <Breadcrumb />
          <EligibilityPage />
        </Route>

        <Route path="/certificate-estimation" exact>
          <Breadcrumb />
          <CertificateEstimationPage />
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

        <Route path="/commercial-electric-to-heat-pump-water-heater-certificates" exact>
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

        <Route path="/commercial-wh-test-estimator" exact>
          <Breadcrumb />
          <CertificateEstimatorWH2_test
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
        </Route>
        <Route path="/residential-pool-pump-certificates" exact>
          <Breadcrumb />
          <CertificateEstimatorPP
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
            setPoolPumpBrands={setPoolPumpBrands}
            PoolPumpBrands={PoolPumpBrands}
          />
        </Route>
        <Route path="/commercial-motors-estimator" exact>
          <Breadcrumb />
          <CertificateEstimatorMotors
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/residential-refrigerators-estimator" exact>
          <Breadcrumb />
          <CertificateEstimatorRefrigerators
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/gas-heat-pumps-estimator" exact>
          <Breadcrumb />
          <CertificateEstimatorGasHeatPump
            entities={entities}
            variables={variables}
            brands={resHPBrands}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/electric-heat-pumps-estimator" exact>
          <Breadcrumb />
          <CertificateEstimatorElectricHeatPump
            entities={entities}
            variables={variables}
            brands={resHPBrands}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/residential-solar-water-heater-estimator" exact>
          <Breadcrumb />
          <CertificateEstimatorResidentialSolarWaterHeater
            entities={entities}
            variables={variables}
            brands={resSolarWaterHeaterBrands}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/residential-gas-replacement-solar-water-heater-estimator" exact>
          <Breadcrumb />
          <CertificateEstimatorResidentialGasReplacementSolarWaterHeater
            entities={entities}
            variables={variables}
            brands={resSolarWaterHeaterBrands}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>

        <Route path="/residential-solar-battery-certificates" exact>
          <Breadcrumb />
          <CertificateEstimatorBESS1
            entities={entities}
            variables={variables}
            brands={resSolarBatteryBrands}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/residential-solar-battery-demand-response-certificates" exact>
          <Breadcrumb />
          <CertificateEstimatorBESS2
            entities={entities}
            variables={variables}
            resSolarBatteryBrands={resSolarBatteryBrands}
            setResSolarBatteryBrands={setResSolarBatteryBrands}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/core-eligibility" exact>
          <Breadcrumb />
          <BaseEligibility
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/hot-water-heater-eligibility" exact>
          <Breadcrumb />
          <HotWaterEligibilityPage
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/hot-water-heater-certificate" exact>
          <Breadcrumb />
          <HotWaterCertificatePage
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/solar-battery-eligibility" exact>
          <Breadcrumb />
          <SolarBatteryEligibilityPage
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/solar-battery-certificates" exact>
          <Breadcrumb />
          <SolarBatteryCertificatePage
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/commercial-ac-activity-requirements" exact>
          <Breadcrumb />
          <ActivityRequirementsCommercialAC
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/residential-ac-activity-requirements" exact>
          <Breadcrumb />
          <ActivityRequirementsResAC
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/commercial-motors-activity-requirements" exact>
          <Breadcrumb />
          <ActivityRequirementsSYS1
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/residential-pool-pump-eligibility" exact>
          <Breadcrumb />
          <ActivityRequirementsSYS2
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/residential-refrigeration-activity-requirements" exact>
          <Breadcrumb />
          <ActivityRequirementsRF1
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/refrigerated-cabinet-activity-requirements" exact>
          <Breadcrumb />
          <ActivityRequirementsRF2
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/commercial-heat-pump-water-heater-eligibility" exact>
          <Breadcrumb />
          <CommercialHotWaterHeaterEligibilityPage
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/commercial-heat-pump-water-heater-certificates" exact>
          <Breadcrumb />
          <CommercialHotWaterHeaterCertificateEstimation
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/commercial-electric-to-heat-pump-water-heater-eligibility" exact>
          <Breadcrumb />
          <ActivityRequirementsWH1
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/commercial-new-heat-pump-water-heater-eligibility" exact>
          <Breadcrumb />
          <ActivityRequirementsF17
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/commercial-new-heat-pump-water-heater-certificates" exact>
          <Breadcrumb />
          <CertificateEstimatorF17
            entities={entities}
            variables={variables}
            loading={loading}
            brands={whBrands}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/commercial-gas-to-heat-pump-water-heater-eligibility" exact>
          <Breadcrumb />
          <ActivityRequirementsF16_gas
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/commercial-gas-to-heat-pump-water-heater-certificates" exact>
          <Breadcrumb />
          <CertificateEstimatorF16_gas
            entities={entities}
            variables={variables}
            loading={loading}
            brands={whBrands}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>

        <Route path="/electric-residential-heat-pump-activity-requirements" exact>
          <Breadcrumb />
          <ActivityRequirementsD17
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/gas-residential-heat-pump-activity-requirements" exact>
          <Breadcrumb />
          <ActivityRequirementsD19
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/residential-solar-water-heater-activity-requirements" exact>
          <Breadcrumb />
          <ActivityRequirementsD18
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/residential-solar-gas-water-heater-activity-requirements" exact>
          <Breadcrumb />
          <ActivityRequirementsD20
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/residential-solar-battery-eligibility" exact>
          <Breadcrumb />
          <ActivityRequirementsBESS1
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>

        <Route path="/residential-solar-battery-demand-response-eligibility" exact>
          <Breadcrumb />
          <ActivityRequirementsBESS2
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="*">Not Found</Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
