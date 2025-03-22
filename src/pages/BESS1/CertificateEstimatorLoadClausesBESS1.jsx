import React, { Fragment, useEffect, useState } from 'react';

// Import services
import moment from 'moment';

// Import components
import CalculateBlock from 'components/calculate/CalculateBlock';
import Button from 'nsw-ds-react/button/button';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';
import Alert from 'nsw-ds-react/alert/alert';
import {
  BESS1_V5Nov24_PDRS__postcode,
  BESS1_V5Nov24_PRC_calculation,
} from '../../types/openfisca_variables';
import { IS_DRUPAL_PAGES } from 'types/app_variables';

export default function CertificateEstimatorLoadClausesBESS1(props) {
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
    selectedBrand,
    selectedModel,
    postcode,
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
    if (Object.keys(variableData1).length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
      if (Object.keys(variableData1).length === 0 || Object.keys(variableData2).length === 0) {
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

        array1.forEach((formItem) => {
          if (formItem.name === BESS1_V5Nov24_PDRS__postcode) {
            formItem.form_value = postcode;
            formItem.read_only = true;
          }
        });

        if (persistFormValues.length > 0) {
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
          'SYS1_existing_equipment_rated_output',
          'SYS1_existing_equipment_no_of_poles',
          'SYS1_existing_equipment_motor_frequency',
        ];
        array2 = array1.filter((item) => names.includes(item.name));
        setDependencies(array2);
      }
    }
  }, [variableData1, variableData2]);

  if (!variable) return null;

  return (
    <div className>
      <div style={{ marginTop: 70, marginBottom: 70 }}>
        {stepNumber === 2 && (
          <Fragment>
            <div
              class="nsw-global-alert nsw-global-alert--light js-global-alert"
              role="alert"
              style={{ width: '80%', marginBottom: '7%' }}
            >
              <div class="nsw-global-alert__wrapper">
                <div class="nsw-global-alert__content">
                  {/* <div class="nsw-global-alert__title"></div> */}
                  <p>
                    {' '}
                    <b>Brand: </b> {selectedBrand}{' '}
                  </p>
                  <p>
                    {' '}
                    <b>Model: </b> {selectedModel}
                  </p>
                </div>
              </div>
            </div>

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

        {stepNumber === 3 && !calculationError && !calculationError2 && (
          <Fragment>
            {
              <Alert as="info" title="PRCs" style={{ width: '80%' }}>
                <p>
                  Based on the information provided, your PRCs are
                  <span style={{ fontSize: '25px', paddingLeft: '10px', paddingRight: '10px' }}>
                    <b>{Math.floor(calculationResult)}</b>
                  </span>
                </p>
                <p>
                  Your estimated annual contribution to reducing peak summer energy demand is{' '}
                  <b>
                    <b>
                      {' '}
                      {Math.floor(calculationResult) === 0
                        ? 0
                        : Math.round(peakDemandReductionSavingsNumber * 100) / 100}
                    </b>{' '}
                    kWh{' '}
                  </b>
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

        {stepNumber === 1 && loading && <SpinnerFullscreen />}

        {(stepNumber === 2 && calculationError === true) ||
          (stepNumber === 2 && calculationError2 === true && (
            <Alert as="error" title="Sorry! An error has occurred.">
              <p>An error occurred during calculation. Try re-running the calculation</p>
            </Alert>
          ))}

        {stepNumber === 3 && (
          <Fragment>
            <div
              className="nsw-row"
              style={{
                paddingLeft: 'inherit',
                paddingRight: 'inherit',
                paddingTop: '30px',
                width: '80%',
              }}
            >
              <div className="nsw-col-md-9" style={{ padding: 'inherit' }}>
                <Button
                  style={{ float: 'left' }}
                  as="dark-outline-solid"
                  onClick={(e) => {
                    setFlow('backward');
                    setStepNumber(1);
                  }}
                >
                  Estimate certificates again
                </Button>
              </div>
            </div>
            <div
              className="nsw-row"
              style={{
                padding: 'inherit',
                marginTop: '5%',
                marginBottom: '5%',
              }}
            >
              <div className="nsw-col-md-12" style={{ width: '80%' }}>
                <hr
                  style={{
                    background: 'black',
                    height: '1.5px',
                  }}
                />
              </div>

              {!IS_DRUPAL_PAGES && (
                <div className="nsw-col-md-12" style={{ paddingTop: '9%', width: '80%' }}>
                  <h4>More options</h4>
                  <br></br>

                  <div class="nsw-grid nsw-grid--spaced">
                    <div class="nsw-col nsw-col-md-4" style={{ height: '12vw' }}>
                      <div class="nsw-card nsw-card--light nullnsw-card--headline" href="/">
                        <div class="nsw-card__content null">
                          <div class="nsw-card__title">
                            <a href="#" class="nsw-card__link">
                              Back to estimator homepage
                            </a>
                          </div>
                          <span
                            class="material-icons nsw-material-icons nsw-card__icon"
                            focusable="false"
                            aria-hidden="true"
                          >
                            east
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="nsw-col nsw-col-md-4" style={{ height: '12vw' }}>
                      <div class="nsw-card nsw-card--light nullnsw-card--headline" href="/">
                        <div class="nsw-card__content null">
                          <div class="nsw-card__title">
                            <a href="/#core-eligibility" class="nsw-card__link">
                              Check core eligibility
                            </a>
                          </div>
                          <span
                            class="material-icons nsw-material-icons nsw-card__icon"
                            focusable="false"
                            aria-hidden="true"
                          >
                            east
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="nsw-col nsw-col-md-4" style={{ height: '12vw' }}>
                      <div class="nsw-card nsw-card--light nullnsw-card--headline" href="/">
                        <div class="nsw-card__content null">
                          <div class="nsw-card__title">
                            <a
                              href="/#commercial-motors-activity-requirements"
                              class="nsw-card__link"
                            >
                              Review eligibility for this activity
                            </a>
                          </div>
                          <span
                            class="material-icons nsw-material-icons nsw-card__icon"
                            focusable="false"
                            aria-hidden="true"
                          >
                            east
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
