import React, { Fragment, useEffect, useState } from 'react';

// Import services
import moment from 'moment';

// Import components
import CalculateBlock from 'components/calculate/CalculateBlock';
import Button from 'nsw-ds-react/button/button';
import OpenFiscaApi from 'services/openfisca_api';
import Alert from 'nsw-ds-react/alert/alert';
import CertificiatePrice from 'components/certificate-price/CertificiatePrice';
import { formatNumber } from 'lib/helper';

export default function CertificateEstimatorLoadClausesD18(props) {
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
    escMinPrice,
    escMaxPrice,
  } = props;

  const [variable, setVariable] = useState({}); // all info about variable

  var today = new Date();
  const [calculationDate, setCalculationDate] = useState(moment(today).format('YYYY-MM-DD'));

  // const [formValues, setFormValues] = useState([]);
  const [dependencies, setDependencies] = useState([]);
  const [variableData1, setVariableData1] = useState({});
  const [variableData2, setVariableData2] = useState({});

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

  function addElement(arr, obj) {
    const { length } = arr;
    const id = length + 1;
    const found = arr.some((el) => el.name === obj.name);
    if (!found) arr.push(obj);
    return arr;
  }

  useEffect(() => {
    if (Object.keys(variableData1).length && Object.keys(variableData2).length) {
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

      array1.map((formItem) => {
        if (formItem.name === 'D18_ESSJun24_system_size') {
          formItem.form_value = metadata[`System_size_zone_${zone}`];

          const dic = {
            medium: 'system_size_medium',
            small: 'system_size_small',
          };

          formItem.form_value = dic[metadata[`System_size_zone_${zone}`].toLowerCase()];
        }

        if (formItem.name === 'D18_ESSJun24_Be') {
          formItem.form_value = metadata[`Be_annual_electrical_energy_usage_zone_${zone}`];
        }

        if (formItem.name === 'D18_ESSJun24_Bs') {
          formItem.form_value = metadata[`Bs_annual_supplementary_energy_zone_${zone}`];
        }

        if (formItem.name === 'D18_ESSJun24_PDRS__postcode') {
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

        {stepNumber === 3 && (
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
              <Alert as="info" title="ESCs" style={{ width: '80%', marginBottom: '7%' }}>
                <p>
                  {/* <h4 className="nsw-content-block__title" style={{ textAlign: 'center' }}> */}
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
                  </b> kWh
                </p>
                <p>
                  As this activity is only eligible for the Energy Savings Scheme, it generates
                  Energy Savings Certificates (ESCs) only and does not generate Peak Reduction
                  Certificates (PRCs).
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
                    setStepNumber(stepNumber - 2);
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
  );
}
