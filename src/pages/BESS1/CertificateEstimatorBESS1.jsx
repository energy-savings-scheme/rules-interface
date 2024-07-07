import React, { Fragment, useState, useEffect } from 'react';

import VariableSearchBar from 'pages/homepage/VariableSearchBar';

import Card, { CardCopy } from 'nsw-ds-react/card/card';
import { ContentBlock } from 'nsw-ds-react/content-block/contenBlock';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import DropDownMenu from 'components/form_elements/DropDownMenu';
import Button from 'nsw-ds-react/button/button';
import { FormGroupSelect } from 'nsw-ds-react/forms';
import { FormGroup, TextInput, Select } from 'nsw-ds-react/forms';
import RegistryApi from 'services/registry_api';
import OpenFiscaAPI from 'services/openfisca_api';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';
import OpenFiscaApi from 'services/openfisca_api';
import Notification from 'nsw-ds-react/notification/notification';
// import CertificateEstimatorLoadClausesMotors from './CertificateEstimatorLoadClausesMotors';
import CertificateEstimatorLoadClausesBESS1 from './CertificateEstimatorLoadClausesBESS1';
import HeroBanner from 'nsw-ds-react/heroBanner/heroBanner';
import Alert from 'nsw-ds-react/alert/alert';

export default function CertificateEstimatorBESS1(props) {
  const { entities, variables, setVariables, setEntities } = props;

  const [formValues, setFormValues] = useState([]);
  const [stepNumber, setStepNumber] = useState(1);
  const [metadata, setMetadata] = useState(null);
  const [calculationResult, setCalculationResult] = useState(null);
  const [calculationResult2, setCalculationResult2] = useState(null);
  const [calculationError, setCalculationError] = useState(false);
  const [calculationError2, setCalculationError2] = useState(false);
  const [postcode, setPostcode] = useState(null);
  const [registryData, setRegistryData] = useState(true);
  const [variableData1, setVariableData1] = useState([]);
  const [variableData2, setVariableData2] = useState([]);
  const [persistFormValues, setPersistFormValues] = useState([]);
  const [flow, setFlow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [annualEnergySavingsNumber, setAnnualEnergySavingsNumber] = useState(0);
  const [peakDemandReductionSavingsNumber, setPeakDemandReductionSavingsNumber] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (variables.length < 1) {
      OpenFiscaAPI.listEntities()
        .then((res) => {
          setEntities(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (entities.length < 1) {
      OpenFiscaAPI.listVariables()
        .then((res) => {
          setVariables(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (annualEnergySavingsNumber < 0) {
      setAnnualEnergySavingsNumber(0);
    }
  }, [annualEnergySavingsNumber]);

  useEffect(() => {
    if (peakDemandReductionSavingsNumber < 0) {
      setPeakDemandReductionSavingsNumber(0);
    }
  }, [peakDemandReductionSavingsNumber]);

  useEffect(() => {
    OpenFiscaAPI.getVariable('BESS1_PDRSAug24_PRC_calculation')
      .then((res) => {
        setVariableData1(res.data);
        console.log(res.data);
        console.log('here!!');
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    OpenFiscaAPI.getVariable('BESS1_PDRSAug24_PRC_calculation')
      .then((res) => {
        setVariableData2(res.data);
        console.log(res.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [variables, entities]);

  return (
    <Fragment>
      <br></br>
      <HeroBanner
        wide
        style="dark"
        image={{
          alt: 'commercial wh',
          src: 'BESS1.jpg',
        }}
        intro="Residential"
        title="Install a new household solar battery - certificates"
      />

      <div className="nsw-container">
        <br></br>
        <br></br>
        {stepNumber !== 2 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-10">
              <p className="nsw-content-block__copy">
              Answer the following questions to estimate the peak reduction certificates (PRCs) for the residential solar battery activity (BESS1 in the
                <a
                  href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/energy-savings-scheme"
                  target="_blank"
                >
                  Peak Demand Reduction Scheme
                </a>{' '}
                ) This activity is for the installation of a new ‘behind the meter’ solar battery at a residential address. A key requirement of this activity is that there is already a solar PV system installed at the address.
                <p className="nsw-content-block__copy">
                Note that this activity is only eligible for the Peak Demand Reduction scheme, and is not eligible for the Energy Savings Scheme. As this is a new installation activity, a replacement activity will not generate certificates.
                </p>
              </p>
              <p className="nsw-content-block__copy">
              A battery register for this activity is currently under development. Once the registry is implemented, battery specifications will be automatically updated at the end of each week based on brand and model.
              </p>
              <p className="nsw-content-block__copy">
              Please keep in mind that the results are a guide only and cannot be promoted or published.
              </p>
            </div>
          </div>
        )}

        <ProgressIndicator step={stepNumber} of={2} style={{ width: '80%' }} />

        {stepNumber === 2 && loading && !showError && <SpinnerFullscreen />}

        <Fragment>
          {stepNumber === 2 && calculationError && calculationError2 && showError && (
            <Alert as="error" title="Sorry!" style={{ width: '80%' }}>
              <p>We are experiencing technical difficulties right now, please try again later.</p>
            </Alert>
          )}

          {stepNumber === 1 && loading && <SpinnerFullscreen />}

          {stepNumber === 1 && (
            <CertificateEstimatorLoadClausesBESS1
              variableData1={variableData1}
              variableData2={variableData2}
              annualEnergySavings={'BESS1_PDRSAug24_peak_demand_annual_savings'}
              peakDemandReductionSavings={'BESS1_PDRSAug24_peak_demand_annual_savings'}
              annualEnergySavingsNumber={annualEnergySavingsNumber}
              setAnnualEnergySavingsNumber={setAnnualEnergySavingsNumber}
              peakDemandReductionSavingsNumber={peakDemandReductionSavingsNumber}
              setPeakDemandReductionSavingsNumber={setPeakDemandReductionSavingsNumber}
              variables={variables}
              entities={entities}
              metadata={metadata}
              calculationResult={calculationResult}
              calculationResult2={calculationResult2}
              setCalculationResult={setCalculationResult}
              setCalculationResult2={setCalculationResult2}
              calculationError={calculationError}
              calculationError2={calculationError2}
              setCalculationError={setCalculationError}
              setCalculationError2={setCalculationError2}
              stepNumber={stepNumber}
              setStepNumber={setStepNumber}
              persistFormValues={persistFormValues}
              setPersistFormValues={setPersistFormValues}
              formValues={formValues}
              setFormValues={setFormValues}
              flow={flow}
              setFlow={setFlow}
              loading={loading}
              setLoading={setLoading}
              showError={showError}
              setShowError={setShowError}
              backAction={(e) => {
                setStepNumber(stepNumber - 1);
              }}
            />
          )}

          {stepNumber === 2 && (
            <CertificateEstimatorLoadClausesBESS1
              variableData1={variableData1}
              variableData2={variableData2}
              annualEnergySavings={'BESS1_PDRSAug24_peak_demand_annual_savings'}
              peakDemandReductionSavings={'BESS1_PDRSAug24_peak_demand_annual_savings'}
              annualEnergySavingsNumber={annualEnergySavingsNumber}
              setAnnualEnergySavingsNumber={setAnnualEnergySavingsNumber}
              peakDemandReductionSavingsNumber={peakDemandReductionSavingsNumber}
              setPeakDemandReductionSavingsNumber={setPeakDemandReductionSavingsNumber}
              variables={variables}
              entities={entities}
              metadata={metadata}
              calculationResult={calculationResult}
              setCalculationResult={setCalculationResult}
              calculationError={calculationError}
              setCalculationError={setCalculationError}
              calculationResult2={calculationResult2}
              setCalculationResult2={setCalculationResult2}
              stepNumber={stepNumber}
              setStepNumber={setStepNumber}
              formValues={formValues}
              setFormValues={setFormValues}
              persistFormValues={persistFormValues}
              setPersistFormValues={setPersistFormValues}
              flow={flow}
              setFlow={setFlow}
              loading={loading}
              setLoading={setLoading}
              showError={showError}
              setShowError={setShowError}
            />
          )}
        </Fragment>
      </div>
    </Fragment>
  );
}
