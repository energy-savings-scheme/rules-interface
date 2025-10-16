import React, { Fragment, useEffect, useState } from 'react';

// Import services
import moment from 'moment';

// Import components
import CalculateBlock from 'components/calculate/CalculateBlock';
import Button from 'nsw-ds-react/button/button';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';
import Alert from 'nsw-ds-react/alert/alert';
import { FormGroup, Select } from 'nsw-ds-react/forms';
import { USER_TYPE_OPTIONS } from 'constant/user-type';
import {updateSegmentCaptureAnalytics} from 'lib/analytics';
import CertificiatePrice from 'components/certificate-price/CertificiatePrice';
import { formatNumber } from 'lib/helper';

export default function CertificateEstimatorLoadClausesMotors(props) {
  const {
    variableData1,
    variableData2,
    variables,
    entities,
    setStepNumber,
    stepNumber,
    metadata,
    calculationError,
    calculationError2,
    setCalculationError,
    setCalculationError2,
    calculationResult,
    setCalculationResult,
    calculationResult2,
    setCalculationResult2,
    flow,
    setFlow,
    persistFormValues,
    setPersistFormValues,
    formValues,
    setFormValues,
    loading,
    setLoading,
    showError,
    setShowError,
    annualEnergySavings,
    peakDemandReductionSavings,
    annualEnergySavingsNumber,
    setAnnualEnergySavingsNumber,
    peakDemandReductionSavingsNumber,
    setPeakDemandReductionSavingsNumber,
    userType,
    setUserType,
    escMinPrice,
    escMaxPrice,
    postcode,
    setPostcode,
  } = props;

  const [variable, setVariable] = useState({}); // all info about variable

  var today = new Date();
  const [calculationDate, setCalculationDate] = useState(moment(today).format('YYYY-MM-DD'));
  const [dependencies, setDependencies] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function addElement(arr, obj) {
    const found = arr.some((el) => el.name === obj.name);
    if (!found) arr.push(obj);
    return arr;
  }

  useEffect(() => {
    if (Object.keys(variableData1).length === 0 || Object.keys(variableData2).length == 0) {
      setLoading(true);
    } else {
      setLoading(false);

      const children1 = variableData1.input_offsprings;
      const children2 = variableData2.input_offsprings;

      // Define the original array (at a minimum include the Implementation Date)
      var array1 = [];
      var array2 = [];

      children1.map((child) => {
        array1.push({ ...child, form_value: '', invalid: false });
      });

      children2.map((child) => {
        array2.push({ ...child, form_value: '', invalid: false });
      });

      array2.forEach((item) => addElement(array1, item));

      if (persistFormValues.length > 1 && flow === 'backward') {
        array1.map((e) => {
          let found = persistFormValues.find((f) => e.name === f.name);
          if (found !== undefined) {
            e['form_value'] = found['form_value'];
          }
          return e;
        });
      }

      array1.sort((a, b) => a.metadata.sorting - b.metadata.sorting);

      setFormValues(array1);

      const names = [
        'F7_PDRSAug24_existing_equipment_rated_output',
        'F7_PDRSAug24_existing_equipment_no_of_poles',
        'F7_PDRSAug24_existing_equipment_motor_frequency',
      ];
      array2 = array1.filter((item) => names.includes(item.name));
      setDependencies(array2);
    }
  }, [variableData1, variableData2]);

  if (!variable) return null;

  return (
    <div className>
      <div style={{ marginTop: 70, marginBottom: 70 }}>
        {stepNumber === 1 && (
          <Fragment>
            <h5 className="nsw-content-block__copy" style={{ paddingBottom: '30px' }}>
              <b>Please answer the following questions to calculate your ESCs</b>
            </h5>
            <FormGroup
              label="What is your interest in the scheme?"
              helper="Select the option that best describes you"
              htmlId="user-type"
            >
              <Select
                htmlId="user-type"
                style={{ maxWidth: '50%', marginBottom: '2.5%' }}
                options={USER_TYPE_OPTIONS}
                onChange={(e) => {
                  setUserType(e.target.value);
                  updateSegmentCaptureAnalytics(e.target.value);
                }}
                value={userType}
                required
              />
            </FormGroup>
            <CalculateBlock
              calculationDate={calculationDate}
              variable={variableData1}
              variable2={variableData2}
              variables={variables}
              entities={entities}
              calculationResult={calculationResult}
              calculationResult2={calculationResult2}
              setCalculationResult={setCalculationResult}
              setCalculationResult2={setCalculationResult2}
              setCalculationError={setCalculationError}
              setCalculationError2={setCalculationError2}
              calculationError={calculationError}
              calculationError2={calculationError2}
              stepNumber={stepNumber}
              setStepNumber={setStepNumber}
              setPostcode={setPostcode}
              formValues={formValues}
              setFormValues={setFormValues}
              backAction={(e) => {
                setStepNumber(stepNumber - 1);
              }}
              dependencies={dependencies}
              metadata={metadata}
              workflow={'certificates'}
              flow={flow}
              setFlow={setFlow}
              persistFormValues={persistFormValues}
              setPersistFormValues={setPersistFormValues}
              loading={loading}
              setLoading={setLoading}
              showError={showError}
              setShowError={setShowError}
              annualEnergySavings={annualEnergySavings}
              peakDemandReductionSavings={peakDemandReductionSavings}
              annualEnergySavingsNumber={annualEnergySavingsNumber}
              setAnnualEnergySavingsNumber={setAnnualEnergySavingsNumber}
              peakDemandReductionSavingsNumber={peakDemandReductionSavingsNumber}
              setPeakDemandReductionSavingsNumber={setPeakDemandReductionSavingsNumber}
            />
          </Fragment>
        )}

        {stepNumber === 2 && !calculationError && !calculationError2 && (
          <Fragment>
            <div
              className="nsw-global-alert nsw-global-alert--light js-global-alert"
              role="alert"
              style={{ width: '80%', marginBottom: '7%' }}
            >
              <div className="nsw-global-alert__wrapper">
                <div className="nsw-global-alert__content">
                  <p>
                    <b>Postcode: </b> {postcode}
                  </p>
                </div>
              </div>
            </div>

            {
              <Alert as="info" title="ESCs" style={{ width: '80%', marginBottom: '7%' }}>
                <p>
                  Based on the information provided, your ESCs are
                  <span style={{ fontSize: '25px', paddingLeft: '10px', paddingRight: '10px' }}>
                    <b>{formatNumber(Math.floor(calculationResult2))}</b>
                  </span>
                </p>
                <p>
                  Your estimated annual energy savings are{' '}
                  <b>
                    {Math.floor(calculationResult2) === 0
                      ? 0
                      : formatNumber(Math.round(annualEnergySavingsNumber * 100) / 100)}
                  </b> MWh
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

        {stepNumber === 1 && loading && <SpinnerFullscreen />}

        {(stepNumber === 2 && calculationError === true) ||
          (stepNumber === 2 && calculationError2 === true && (
            <Alert as="error" title="Sorry! An error has occurred.">
              <p>An error occurred during calculation. Try re-running the calculation</p>
            </Alert>
          ))}

        {stepNumber === 2 && (
          <Fragment>
            <div
              className="nsw-row"
              style={{
                paddingLeft: 'inherit',
                paddingRight: 'inherit',
                width: '80%',
              }}
            >
              <CertificiatePrice
                escCertificates={calculationResult2}
                escMinPrice={escMinPrice}
                escMaxPrice={escMaxPrice}
              />
              <div className="nsw-col-md-9" style={{ marginTop: '1.25rem' }}>
                <Button
                  style={{ float: 'left' }}
                  as="dark-outline-solid"
                  onClick={(e) => {
                    setFlow('backward');
                    setStepNumber(stepNumber - 1);
                  }}
                >
                  Estimate certificates again
                </Button>
              </div>

              {/* <div className="nsw-col-md-3" style={{ paddingTop: '30px' }}>
                <Button
                  style={{ float: 'right' }}
                  as="dark"
                  link="/#certificate-estimation"
                  onClick={(e) => {
                    // setStepNumber(stepNumber - 1);
                  }}
                >
                  Change activity
                </Button>
              </div> */}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
