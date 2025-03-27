import React, { Fragment, useState, useEffect } from 'react';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import Button from 'nsw-ds-react/button/button';
import OpenFiscaAPI from 'services/openfisca_api';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';
import CertificateEstimatorLoadClausesRefrigerators from './CertificateEstimatorLoadClausesRefrigerators';
import HeroBanner from 'nsw-ds-react/heroBanner/heroBanner';
import Alert from 'nsw-ds-react/alert/alert';
import { IS_DRUPAL_PAGES } from 'types/app_variables';
import FeedbackComponent from 'components/feedback/feedback';
import MoreOptionsCard from 'components/more-options-card/more-options-card';
import {
  BASE_RESIDENTIAL_REFRIGERATOR_ESTIMATOR_ANALYTICS_DATA,
} from 'constant/base-analytics-data';
import {
  updateEstimatorFormAnalytics,
  updateFeedbackFormAnalytics,
  clearSearchCaptureAnalytics
} from 'lib/analytics';
import {
  C1_PDRSAug24_ESC_calculation,
  C1_PDRSAug24_energy_savings
} from 'types/openfisca_variables';

export default function CertificateEstimatorRefrigerators(props) {
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
  const [variableData1, setVariableData1] = useState({});
  const [variableData2, setVariableData2] = useState({});
  const [persistFormValues, setPersistFormValues] = useState([]);
  const [flow, setFlow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [annualEnergySavingsNumber, setAnnualEnergySavingsNumber] = useState(0);
  const [peakDemandReductionSavingsNumber, setPeakDemandReductionSavingsNumber] = useState(0);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    clearSearchCaptureAnalytics();
    updateEstimatorFormAnalytics(BASE_RESIDENTIAL_REFRIGERATOR_ESTIMATOR_ANALYTICS_DATA);
    updateFeedbackFormAnalytics(BASE_RESIDENTIAL_REFRIGERATOR_ESTIMATOR_ANALYTICS_DATA)

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
    OpenFiscaAPI.getVariable(C1_PDRSAug24_ESC_calculation)
      .then((res) => {
        setVariableData1(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    OpenFiscaAPI.getVariable(C1_PDRSAug24_ESC_calculation)
      .then((res) => {
        setVariableData2(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Fragment>
      {!IS_DRUPAL_PAGES && (
        <div style={{ marginTop: '1rem' }}>
          <HeroBanner
            wide
            style="dark"
            image={{
              alt: 'res ref',
              src: 'ResidentialFridgeFreezerRemoval.jpeg',
            }}
            intro="Residential and small business"
            title="Spare refrigerator or freezer - certificates"
          />
        </div>
      )}

      <div className="nsw-container">
        <br></br>
        <br></br>
        {!IS_DRUPAL_PAGES && stepNumber !== 2 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-10">
              <h2 className="nsw-content-block__title">
                Spare Refrigerator or Freezer Removal certificate estimator
              </h2>
              <br></br>
              <p className="nsw-content-block__copy">
                Estimate the energy savings certificates (ESCs) for the Residential and small
                business spare refrigerator or freezer removal activity (C1 in the{' '}
                <a
                  href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/energy-savings-scheme"
                  target="_blank"
                  rel="noreferrer"
                >
                  Energy Savings Scheme
                </a>
                ) by answering the following questions. This activity is for the removal of a spare
                non-primary refrigerator or freezer.
              </p>
              <p className="nsw-content-block__copy">
                Note that this activity is only eligible for the Energy Savings Scheme, and is not
                eligible for the Peak Demand Reduction scheme.
              </p>
              <p className="nsw-content-block__copy">
                Please keep in mind that the results are a guide only and cannot be promoted or
                published.
              </p>
            </div>
          </div>
        )}

        {!IS_DRUPAL_PAGES && stepNumber === 2 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-12">
              <h2 className="nsw-content-block__title">
                Spare Refrigerator or Freezer Removal certificate estimator
              </h2>
            </div>
          </div>
        )}

        <ProgressIndicator step={stepNumber} of={2} style={{ width: '80%' }} />

        {stepNumber === 2 && loading && !showError && <SpinnerFullscreen />}

        <Fragment>
          {stepNumber === 1 && loading && <SpinnerFullscreen />}

          {stepNumber === 2 && calculationError && calculationError2 && showError && (
            <Alert as="error" title="Sorry!" style={{ width: '80%' }}>
              <p>We are experiencing technical difficulties right now, please try again later.</p>
            </Alert>
          )}

          {stepNumber === 1 && (
            <CertificateEstimatorLoadClausesRefrigerators
              variableData1={variableData1}
              variableData2={variableData2}
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
              backAction={(e) => {
                setStepNumber(stepNumber - 1);
              }}
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
              annualEnergySavings={C1_PDRSAug24_energy_savings}
              peakDemandReductionSavings={C1_PDRSAug24_energy_savings}
              annualEnergySavingsNumber={annualEnergySavingsNumber}
              setAnnualEnergySavingsNumber={setAnnualEnergySavingsNumber}
              peakDemandReductionSavingsNumber={peakDemandReductionSavingsNumber}
              setPeakDemandReductionSavingsNumber={setPeakDemandReductionSavingsNumber}
              userType={userType}
              setUserType={setUserType}
            />
          )}

          {stepNumber === 2 && (
            <CertificateEstimatorLoadClausesRefrigerators
              variableData1={variableData1}
              variableData2={variableData2}
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
              annualEnergySavings={C1_PDRSAug24_energy_savings}
              peakDemandReductionSavings={C1_PDRSAug24_energy_savings}
              annualEnergySavingsNumber={annualEnergySavingsNumber}
              setAnnualEnergySavingsNumber={setAnnualEnergySavingsNumber}
              peakDemandReductionSavingsNumber={peakDemandReductionSavingsNumber}
              setPeakDemandReductionSavingsNumber={setPeakDemandReductionSavingsNumber}
              userType={userType}
              setUserType={setUserType}
            />
          )}

          {stepNumber === 1 && registryData && postcode && postcode.length === 4 && (
            <div className="nsw-row" style={{ paddingTop: '30px' }}>
              <div className="nsw-col" style={{ padding: 'inherit', width: '80%' }}>
                <Button
                  as="dark"
                  onClick={(e) => {
                    setFlow('forward');
                    setStepNumber(stepNumber + 1);
                    updateEstimatorFormAnalytics({
                      sf_postcode: postcode
                    });
                  }}
                  style={{ float: 'right' }}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </Fragment>
      </div>
      {stepNumber === 2 && (
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
                  link: '/#residential-refrigeration-activity-requirements'
                }]}/>
              </div>
            </div>
          )}
        </>
      )}
    </Fragment>
  );
}
