import React, { Fragment, useState, useEffect } from 'react';

import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import OpenFiscaAPI from 'services/openfisca_api';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';
import CertificateEstimatorLoadClausesBESS2 from './CertificateEstimatorLoadClausesBESS2';
import HeroBanner from 'nsw-ds-react/heroBanner/heroBanner';
import Alert from 'nsw-ds-react/alert/alert';
import {
  BESS2_V5Nov24_PDRS__postcode,
  BESS2_V5Nov24_peak_demand_annual_savings,
  BESS2_V5Nov24_PRC_calculation,
  BESS2_V5Nov24_usable_battery_capacity,
} from 'types/openfisca_variables';
import BESSBrandSelector from 'components/certificate/BESSBrandSelector';
import { IS_DRUPAL_PAGES } from 'types/app_variables';
import {BASE_BESS2_ESTIMATOR_ANALYTICS_DATA} from 'constant/base-analytics-data';
import {
  updateEstimatorFormAnalytics,
  updateFeedbackFormAnalytics,
} from 'lib/analytics';
import FeedbackComponent from 'components/feedback/feedback';
import MoreOptionsCard from 'components/more-options-card/more-options-card';

export default function CertificateEstimatorBESS2(props) {
  const { entities, variables, setVariables, brands, setEntities } = props;

  const [formValues, setFormValues] = useState([]);
  const [stepNumber, setStepNumber] = useState(1);
  const [metadata, setMetadata] = useState(null);
  const [calculationResult, setCalculationResult] = useState(null);
  const [calculationResult2, setCalculationResult2] = useState(null);
  const [calculationError, setCalculationError] = useState(false);
  const [calculationError2, setCalculationError2] = useState(false);
  const [variableData1, setVariableData1] = useState({});
  const [variableData2, setVariableData2] = useState({});
  const [persistFormValues, setPersistFormValues] = useState([]);
  const [flow, setFlow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [annualEnergySavingsNumber, setAnnualEnergySavingsNumber] = useState(0);
  const [peakDemandReductionSavingsNumber, setPeakDemandReductionSavingsNumber] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [postcode, setPostcode] = useState(null);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    updateEstimatorFormAnalytics(BASE_BESS2_ESTIMATOR_ANALYTICS_DATA);
    updateFeedbackFormAnalytics(BASE_BESS2_ESTIMATOR_ANALYTICS_DATA);

    if (variables.length < 1) {
      OpenFiscaAPI.listEntities()
        .then((res) => {
          setEntities(res.data);
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
    OpenFiscaAPI.getVariable(BESS2_V5Nov24_PRC_calculation)
      .then((res) => {
        setVariableData1(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    OpenFiscaAPI.getVariable(BESS2_V5Nov24_PRC_calculation)
      .then((res) => {
        setVariableData2(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [variables, entities]);

  return (
    <Fragment>
      {!IS_DRUPAL_PAGES && (
        <div style={{ marginTop: '1rem' }}>
          <HeroBanner
            wide
            style="dark"
            image={{
              alt: 'commercial wh',
              src: 'BESS2.jpg',
            }}
            intro="Residential"
            title="Sign a solar battery up to a demand response contract  - certificates"
          />
        </div>
      )}

      <div className="nsw-container">
        <br></br>
        <br></br>
        {!IS_DRUPAL_PAGES && stepNumber !== 3 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-10">
              <p className="nsw-content-block__copy">
                Answer the following questions to estimate the peak reduction certificates (PRCs)
                for the residential solar battery activity (BESS2 in the{' '}
                <a
                  href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/peak-demand-reduction-scheme"
                  target="_blank"
                  rel="noreferrer"
                >
                  Peak Demand Reduction Scheme
                </a>{' '}
                ). This activity is for the signup of a 'behind the meter' residential solar battery
                to a demand response contract, often called a virtual power plant (VPP). A key
                requirement of this activity is that there is already a solar PV system installed at
                the address.
                <p className="nsw-content-block__copy">
                  Note that this activity is only eligible for the Peak Demand Reduction scheme, and
                  is not eligible for the Energy Savings Scheme.
                </p>
              </p>
              <p className="nsw-content-block__copy">
                A battery register for this activity is currently under development. Once the
                registry is implemented, battery specifications will be automatically updated at the
                end of each week based on brand and model.
              </p>
              <p className="nsw-content-block__copy">
                Please keep in mind that the results are a guide only and cannot be promoted or
                published.
              </p>
            </div>
          </div>
        )}

        <ProgressIndicator step={stepNumber} of={3} style={{ width: '80%' }} />

        {stepNumber === 3 && loading && !showError && <SpinnerFullscreen />}

        <Fragment>
          {stepNumber === 3 && calculationError && calculationError2 && showError && (
            <Alert as="error" title="Sorry!" style={{ width: '80%' }}>
              <p>We are experiencing technical difficulties right now, please try again later.</p>
            </Alert>
          )}

          {stepNumber === 1 && loading && <SpinnerFullscreen />}

          {stepNumber === 1 && (
            <BESSBrandSelector
              brands={brands}
              usableBatteryCapacityName={BESS2_V5Nov24_usable_battery_capacity}
              postcodeName={BESS2_V5Nov24_PDRS__postcode}
              persistFormValues={persistFormValues}
              setPersistFormValues={setPersistFormValues}
              formValues={formValues}
              setStepNumber={setStepNumber}
              setSelectedBrand={setSelectedBrand}
              selectedBrand={selectedBrand}
              setSelectedModel={setSelectedModel}
              selectedModel={selectedModel}
              postcode={postcode}
              setPostcode={setPostcode}
              userType={userType}
              setUserType={setUserType}
            />
          )}

          {stepNumber === 2 && loading && <SpinnerFullscreen />}

          {stepNumber === 2 && (
            <CertificateEstimatorLoadClausesBESS2
              variableData1={variableData1}
              variableData2={variableData2}
              annualEnergySavings={BESS2_V5Nov24_peak_demand_annual_savings}
              peakDemandReductionSavings={BESS2_V5Nov24_peak_demand_annual_savings}
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
              selectedBrand={selectedBrand}
              selectedModel={selectedModel}
              postcode={postcode}
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

          {stepNumber === 3 && (
            <CertificateEstimatorLoadClausesBESS2
              variableData1={variableData1}
              variableData2={variableData2}
              annualEnergySavings={BESS2_V5Nov24_peak_demand_annual_savings}
              peakDemandReductionSavings={BESS2_V5Nov24_peak_demand_annual_savings}
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
      {stepNumber === 3 && (
        <>
          <FeedbackComponent />
          {!IS_DRUPAL_PAGES && (
            <div className="nsw-container">
              <div
                className="nsw-row"
                style={{
                  padding: 'inherit',
                  marginTop: '5%',
                  marginBottom: '5%',
                }}
              >
                <MoreOptionsCard options={[{
                  title: 'Review eligibility for this activity',
                  link: '/#residential-solar-battery-demand-response-eligibility'
                }]}/>
              </div>
            </div>
          )}
        </>
      )}
    </Fragment>
  );
}
