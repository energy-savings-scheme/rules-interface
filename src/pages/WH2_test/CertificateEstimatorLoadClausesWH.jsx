import React, { Fragment, useEffect, useState } from 'react';

// Import services
import moment from 'moment';

// Import components
import CalculateBlock from 'components/calculate/CalculateBlock';
import Button from 'nsw-ds-react/button/button';
import OpenFiscaApi from 'services/openfisca_api';
import Alert from 'nsw-ds-react/alert/alert';

export default function CertificateEstimatorLoadClausesWHtest(props) {
  const {
    variableToLoad1,
    variableToLoad2,
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
    zone,
    postcode,
    formValues,
    setFormValues,
    selectedBrand,
    selectedModel,
    flow,
    setFlow,
    persistFormValues,
    setPersistFormValues,
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

  console.log(variableToLoad1);
  console.log(variableToLoad2);
  console.log(metadata);
  console.log('**********');
  console.log(zone);
  console.log(stepNumber);

  const [variable, setVariable] = useState({}); // all info about variable

  var today = new Date();
  const [calculationDate, setCalculationDate] = useState(moment(today).format('YYYY-MM-DD'));
  const [dateInvalid, setDateInvalid] = useState(false);

  // const [formValues, setFormValues] = useState([]);
  const [dependencies, setDependencies] = useState([]);
  const [variableData1, setVariableData1] = useState([]);
  const [variableData2, setVariableData2] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    OpenFiscaApi.getVariable(variableToLoad1)
      .then((res) => {
        setVariableData1(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [variableToLoad1]);

  useEffect(() => {
    OpenFiscaApi.getVariable(variableToLoad2)
      .then((res) => {
        setVariableData2(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [variableToLoad2]);

  console.log(variableData1);
  console.log(variableData2);

  function addElement(arr, obj) {
    const { length } = arr;
    const id = length + 1;
    const found = arr.some((el) => el.name === obj.name);
    if (!found) arr.push(obj);
    return arr;
  }

  useEffect(() => {
    if (variables) {
      const variable1 = variables.find((item) => item.name === variableToLoad1);
      const variable2 = variables.find((item) => item.name === variableToLoad2);

      const offsprings1 = variable1.metadata.input_offspring;
      const offsprings2 = variable2.metadata.input_offspring;

      const children1 = variables.filter((item) => offsprings1.includes(item.name));
      const children2 = variables.filter((item) => offsprings2.includes(item.name));

      console.log(children1);
      console.log(children2);

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

      console.log(array1);

      array1.map((formItem) => {
        console.log(metadata);
        if (formItem.name === 'WH2_test_annual_energy_savings') {
          formItem.form_value = metadata[`annual_energy_savings_${zone}`];
        }
        if (formItem.name === 'WH2_test_com_peak_load') {
          formItem.form_value = metadata[`ComPkLoad_zone_${zone}`];
        }
        if (formItem.name === 'WH2_test_HP_capacity_factor') {
          formItem.form_value = metadata['HPCap'];
        }
        if (formItem.name === 'WH2_test_HP_elec') {
          formItem.form_value = metadata[`HPElec_zone_${zone}`];
        }
        if (formItem.name === 'WH2_test_HP_gas') {
          formItem.form_value = metadata[`HPGas_zone_${zone}`];
        }
        // Remove whcap
        // if (formItem.name === 'WH1_WH_capacity_factor') {
        //   formItem.form_value = metadata['WHCap'];
        // }
        if (formItem.name === 'WH2_test_PDRS__postcode') {
          formItem.form_value = postcode;
          formItem.read_only = true;
        }
      });

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
    }
  }, [variableData1, variableData2]);

  const formatResultString = (result) => {
    if (typeof result === 'boolean') {
      return JSON.stringify(result);
    }

    return JSON.stringify(result) + ' kW';
  };

  if (!variable) return null;

  console.log('******', selectedModel);

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
              zone={zone}
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
              selectedBrand={selectedBrand}
              selectedModel={selectedModel}
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
        )}

        {stepNumber === 3 && !calculationError && !calculationError2 && (
          <Fragment>
            {
              <Alert as="info" title="ESCs and PRCs" style={{ width: '80%' }}>
                <p>
                  {/* <h4 className="nsw-content-block__title" style={{ textAlign: 'center' }}> */}
                  Based on the information provided, your ESCs are
                  <span style={{ fontSize: '25px', paddingLeft: '10px', paddingRight: '10px' }}>
                    <b>{Math.floor(calculationResult2)}</b>
                  </span>
                  {/* </h4> */}
                  {/* <h4 className="nsw-content-block__title" style={{ textAlign: 'center' }}> */}
                  and your PRCs are
                  <span style={{ fontSize: '25px', paddingLeft: '10px', paddingRight: '10px' }}>
                    <b>{Math.floor(calculationResult)}</b>
                  </span>
                  {/* </h4> */}
                </p>
                <p>
                  Your estimated annual energy savings are{' '}
                  <b>
                    <b>
                      {Math.floor(calculationResult2) === 0
                        ? 0
                        : Math.round(annualEnergySavingsNumber * 100) / 100}
                    </b>{' '}
                    kWh{' '}
                  </b>
                </p>
                <p>
                  Your estimated annual peak demand reduction is{' '}
                  <b>
                    <b>
                      {Math.floor(calculationResult) === 0
                        ? 0
                        : Math.round(peakDemandReductionSavingsNumber * 100) / 100}
                    </b>{' '}
                    kWh{' '}
                  </b>
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

        {(stepNumber === 3 && calculationError) ||
          (stepNumber === 3 && calculationError2 && (
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
                    setStepNumber(stepNumber - 2);
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
                            href="/#commercial-water-heater-activity-requirements"
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
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
