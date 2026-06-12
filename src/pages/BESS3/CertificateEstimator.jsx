import React, { Fragment, useState, useEffect } from 'react';
import { FormGroup, Select } from 'nsw-ds-react/forms';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import Button from 'nsw-ds-react/button/button';
import InfoBox from 'components/info-box/info-box';
import OpenFiscaAPI from 'services/openfisca_api';
import RegistryApi from 'services/registry_api';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';
import CalculateBlock from 'components/calculate/CalculateBlock';
import HeroBanner from 'nsw-ds-react/heroBanner/heroBanner';
import Alert from 'nsw-ds-react/alert/alert';
import {
  BESS3_PRC_calculation,
  BESS3_peak_demand_savings,
} from 'types/openfisca_variables';
import { IS_DRUPAL_PAGES } from 'types/app_variables';
import { BASE_BESS3_ESTIMATOR_ANALYTICS_DATA } from 'constant/base-analytics-data';
import { USER_TYPE_OPTIONS } from 'constant/user-type';
import {
  updateEstimatorFormAnalytics,
  updateFeedbackFormAnalytics,
  clearSearchCaptureAnalytics,
  updateSegmentCaptureAnalytics
} from 'lib/analytics';
import { formatNumber, getTodayDate, focusElement } from 'lib/helper';
import FeedbackComponent from 'components/feedback/feedback';
import CertificiatePrice from 'components/certificate-price/CertificiatePrice';
import MoreOptionsCard from 'components/more-options-card/more-options-card';

export default function CertificateEstimatorBESS3(props) {
  const { entities, variables } = props;
  const [formValues, setFormValues] = useState([]);
  const [stepNumber, setStepNumber] = useState(1);
  const [calculationResult, setCalculationResult] = useState(null);
  const [peakDemandReductionSavingsNumber, setPeakDemandReductionSavingsNumber] = useState(0);
  const [postcode, setPostcode] = useState(null);
  const [userType, setUserType] = useState('');
  const [variableData1, setVariableData1] = useState(null);
  const [variableData2, setVariableData2] = useState(null);
  const [flow, setFlow] = useState(null);
  const [persistFormValues, setPersistFormValues] = useState([]);
  const [prcMinPrice, setPrcMinPrice] = useState(0);
  const [prcMaxPrice, setPrcMaxPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [calculationError, setCalculationError] = useState(false);
  const [calculationError2, setCalculationError2] = useState(false);
  const [isUserTypeValid, setIsUserTypeValid] = useState(true);
  const [userTypeError, setUserTypeError] = useState('');

  function onValidateUserType(isValid, errorMessage) {
    setIsUserTypeValid(isValid);
    setUserTypeError(errorMessage);
  }

  useEffect(async () => {
    window.scrollTo(0, 0);
    clearSearchCaptureAnalytics();
    updateEstimatorFormAnalytics(BASE_BESS3_ESTIMATOR_ANALYTICS_DATA);
    updateFeedbackFormAnalytics(BASE_BESS3_ESTIMATOR_ANALYTICS_DATA);

    try {
      const [variable1, variable2] = await Promise.all([
        OpenFiscaAPI.getVariable(BESS3_PRC_calculation),
        OpenFiscaAPI.getVariable(BESS3_PRC_calculation),
      ]);
      setVariableData1(variable1.data);
      setVariableData2(variable2.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching variable data:', error);
      setLoading(false);
    }

    try {
      const response = await RegistryApi.getCertificatePrice()
      setPrcMinPrice(Number(response.data.PRC.min_price))
      setPrcMaxPrice(Number(response.data.PRC.max_price))
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (variableData1 != null && variableData2 != null) {
      const children1 = variableData1.input_offsprings;
      // Define the original array (at a minimum include the Implementation Date)
      var array1 = [];

      children1.map((child) => {
        array1.push({ ...child, form_value: '', invalid: false });
      });

      array1.sort((a, b) => a.metadata.sorting - b.metadata.sorting);
      setFormValues(array1);
    }
  }, [variableData1, variableData2]);

  useEffect(() => {
    if (peakDemandReductionSavingsNumber < 0) {
      setPeakDemandReductionSavingsNumber(0);
    }
  }, [peakDemandReductionSavingsNumber]);

  useEffect(() => {
    if (stepNumber === 2 && calculationError && showError) {
      focusElement("error-calculation");
    }
  }, [stepNumber, calculationError, showError])

  return (
    <Fragment>
      {!IS_DRUPAL_PAGES && (
        <div style={{ marginTop: '1rem' }}>
          <HeroBanner
            wide
            style="dark"
            image={{
              alt: 'Solar battery system - certificates',
              src: 'BESS3.jpg',
            }}
            intro="Residential and small business"
            title="Install a new multi-dwelling solar battery system - certificates"
          />
        </div>
      )}

      <div className="nsw-container" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <br></br>
        <br></br>
        {!IS_DRUPAL_PAGES && stepNumber !== 2 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-10">
              <p className="nsw-content-block__copy">Estimate the peak reduction certificates (PRCs) for the multi-dwelling residential solar battery incentive
                (BESS3 in <a
                  href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/peak-demand-reduction-scheme"
                  target="_blank"
                  rel="noreferrer"
                >
                  Peak Demand Reduction Scheme
                </a>{' '}). This incentive is for the installation of a new 'behind the meter' solar battery at a multi-dwelling residential address.
              </p>
              <p className="nsw-content-block__copy">
                Note that this activity is only eligible for the Peak Demand Reduction scheme, and is not eligible for the Energy Savings Scheme.
              </p>
              <p className="nsw-content-block__copy">
                Please keep in mind that the results are indicative only and cannot be promoted or published.
              </p>
            </div>
          </div>
        )}

        <ProgressIndicator step={stepNumber} of={2} style={{ marginTop: '3rem' }} className="nsw-col-lg-10" />

        {stepNumber === 2 && loading && !showError && <SpinnerFullscreen />}

        <Fragment>
          {(stepNumber === 2 && calculationError && showError && 
            <Alert as="error" customTitle={
              <h3 dangerouslySetInnerHTML={{__html: "Sorry!"}}/>
            } id="error-calculation" className="nsw-col-lg-10" tabIndex="-1">
              <p>We are experiencing technical difficulties right now, please try again later.</p>
            </Alert>
          )}

          {stepNumber === 1 && loading && <SpinnerFullscreen />}

          <div data-ui-name="initial-form">
            <div style={{ marginTop: 70, marginBottom: 70 }}>
              {stepNumber === 1 && (variableData1 && variableData2) && (
                <Fragment>
                  <p className="nsw-content-block__copy" style={{ paddingBottom: '30px' }}>
                    <b>Please answer the following questions to calculate your PRCs</b>
                  </p>
      
                  <FormGroup
                    htmlId="user-type"
                    label="What is your interest in the scheme?"
                    helper="Select the option that best describes you"
                    status={isUserTypeValid ? '' : 'invalid'}
                    statusText={userTypeError}
                    style={{ marginBottom: '4%' }}
                  >
                    <Select
                      htmlId="user-type"
                      data-ui-name="user-type"
                      className="nsw-col-lg-6"
                      options={USER_TYPE_OPTIONS}
                      onChange={(e) => {
                        setUserType(e.target.value);
                        updateSegmentCaptureAnalytics(e.target.value);
                      }}
                      value={userType}
                      status={isUserTypeValid ? '' : 'invalid'}
                      required
                    />
                  </FormGroup>
      
                  <CalculateBlock
                    calculationDate={getTodayDate()}
                    variable={variableData1}
                    // variable2={variableData2}
                    variables={variables}
                    entities={entities}
                    calculationResult={calculationResult}
                    // calculationResult2={calculationResult2}
                    setCalculationResult={setCalculationResult}
                    // setCalculationResult2={setCalculationResult2}
                    setCalculationError={setCalculationError}
                    // setCalculationError2={setCalculationError2}
                    calculationError={calculationError}
                    // calculationError2={calculationError2}
                    stepNumber={stepNumber}
                    setStepNumber={setStepNumber}
                    setPostcode={setPostcode}
                    formValues={formValues}
                    setFormValues={setFormValues}
                    backAction={(e) => {
                      setStepNumber(stepNumber - 1);
                    }}
                    // dependencies={dependencies}
                    // metadata={metadata}
                    workflow={'certificates'}
                    flow={flow}
                    setFlow={setFlow}
                    persistFormValues={persistFormValues}
                    setPersistFormValues={setPersistFormValues}
                    loading={loading}
                    setLoading={setLoading}
                    showError={showError}
                    setShowError={setShowError}
                    // annualEnergySavings={BESS3_peak_demand_savings}
                    // annualEnergySavingsNumber={annualEnergySavingsNumber}
                    // setAnnualEnergySavingsNumber={setAnnualEnergySavingsNumber}
                    peakDemandReductionSavings={BESS3_peak_demand_savings}
                    peakDemandReductionSavingsNumber={peakDemandReductionSavingsNumber}
                    setPeakDemandReductionSavingsNumber={setPeakDemandReductionSavingsNumber}
                    onValidateUserType={onValidateUserType}
                  />
                </Fragment>
              )}
      
              {stepNumber === 2 && !calculationError && (
                <Fragment>
                  <InfoBox postcode={postcode} />
                  {
                    <Alert
                      as="info"
                      customTitle={<h3 dangerouslySetInnerHTML={{ __html: 'PRCs' }} />}
                      className="nsw-col-lg-10"
                      style={{ marginBottom: '7%' }}
                    >
                      <p>
                        Based on the information provided, your PRCs are
                        <span style={{ fontSize: '25px', paddingLeft: '10px', paddingRight: '10px' }}>
                          <b data-ui-name="prc">{formatNumber(Math.floor(calculationResult))}</b>
                        </span>
                      </p>
                      <p>
                        Your estimated contribution to reducing peak summer energy demand over the
                        lifetime of the equipment is{' '}
                        <b data-ui-name="apdr">
                          {Math.floor(calculationResult) === 0
                            ? 0
                            : formatNumber(Math.round(peakDemandReductionSavingsNumber * 100) / 100)}
                        </b>{' '}
                        kW
                      </p>
                      <p>
                        As this activity is only eligible for the Peak Demand Reduction Scheme, it
                        generates Peak Reduction Certificates (PRCs) only and does not generate Energy
                        Savings Certificates (ESCs).
                      </p>
                      <p>
                        If you are receiving an estimation of 0 certificates, the brand and model may not
                        be generating enough energy savings to earn certificates, or the new installation
                        or replacement activity you have chosen may be ineligible.
                      </p>
                    </Alert>
                  }
                </Fragment>
              )}
      
              {stepNumber === 2 && loading && <SpinnerFullscreen />}
      
              {stepNumber === 2 && (
                <Fragment>
                  <div
                    className="nsw-row nsw-col-lg-10"
                    style={{
                      paddingLeft: 'inherit',
                      paddingRight: 'inherit',
                    }}
                  >
                    {/* Temporary hide Certificate Price for now to prevent misinterpretation and misuse */}
                    <CertificiatePrice
                      prcCertificates={calculationResult}
                      prcMinPrice={prcMinPrice}
                      prcMaxPrice={prcMaxPrice}
                    />
                    <div className="nsw-col-md-9" style={{ marginBottom: '1.25rem' }}>
                      <Button
                        style={{ float: 'left' }}
                        as="dark-outline-solid"
                        data-ui-name="recalculate"
                        onClick={(e) => {
                          setFlow('backward');
                          setStepNumber(1);
                        }}
                      >
                        Estimate certificates again
                      </Button>
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
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
                <MoreOptionsCard
                  options={[
                    {
                      title: 'Review eligibility for this activity',
                      link: '/#residential-apartments-battery-eligibility',
                    },
                  ]}
                />
              </div>
            </div>
          )}
        </>
      )}
    </Fragment>
  );
}