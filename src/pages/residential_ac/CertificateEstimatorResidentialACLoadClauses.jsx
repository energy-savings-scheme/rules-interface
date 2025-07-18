import React, { Fragment, useEffect, useState } from 'react';

// Import services
import moment from 'moment';

// Import components
import CalculateBlock from 'components/calculate/CalculateBlock';
import Button from 'nsw-ds-react/button/button';
import OpenFiscaApi from 'services/openfisca_api';
import Alert from 'nsw-ds-react/alert/alert';
import CertificiatePrice from 'components/certificate-price/CertificiatePrice';
import {HVAC1_PDRSAug24_PDRS__postcode, HVAC1_PDRSAug24_BCA_Climate_Zone} from '../../types/openfisca_variables';
import { formatNumber } from 'lib/helper';

export default function CertificateEstimatorResidentialACLoadClauses(props) {
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
    postcode,
    zone,
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
    selectedClimateZone,
    escMinPrice,
    escMaxPrice,
    prcMinPrice,
    prcMaxPrice
  } = props;

  const bca_mapping = {
    BCA_Climate_Zone_1: 'BCA Climate Zone 1',
    BCA_Climate_Zone_2: 'BCA Climate Zone 2',
    BCA_Climate_Zone_3: 'BCA Climate Zone 3',
    BCA_Climate_Zone_4: 'BCA Climate Zone 4',
    BCA_Climate_Zone_5: 'BCA Climate Zone 5',
    BCA_Climate_Zone_6: 'BCA Climate Zone 6',
    BCA_Climate_Zone_7: 'BCA Climate Zone 7',
    BCA_Climate_Zone_8: 'BCA Climate Zone 8',
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [variable, setVariable] = useState({}); // all info about variable

  var today = new Date();
  const [calculationDate, setCalculationDate] = useState(moment(today).format('YYYY-MM-DD'));
  const [dateInvalid, setDateInvalid] = useState(false);
  const [dependencies, setDependencies] = useState([]);
  const [variableData1, setVariableData1] = useState({});
  const [variableData2, setVariableData2] = useState({});

  if (calculationResult2 === null) {
    setCalculationResult2('0');
  }

  if (calculationResult === null) {
    setCalculationResult2('0');
  }

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
        if (formItem.name === 'HVAC1_PDRSAug24_rated_AEER_input') {
          formItem.form_value = metadata['Rated AEER'];
        }

        if (formItem.name === 'HVAC1_PDRSAug24_cooling_capacity_input') {
          formItem.form_value = metadata['Cooling Capacity'];
        }

        if (formItem.name === 'HVAC1_PDRSAug24_residential_TCEC') {
          formItem.form_value = metadata[`Residential tcec_${zone}`];
        }

        if (formItem.name === 'HVAC1_PDRSAug24_residential_THEC') {
          formItem.form_value = metadata[`Residential thec_${zone}`];
        }

        if (formItem.name === 'HVAC1_PDRSAug24_heating_capacity_input') {
          formItem.form_value = metadata['Heating Capacity'];
        }

        if (formItem.name === 'HVAC1_PDRSAug24_TCSPF_mixed') {
          formItem.form_value = metadata['Residential TCSPF_mixed'];
        }
        if (formItem.name === 'HVAC1_PDRSAug24_HSPF_cold') {
          formItem.form_value = metadata['Residential HSPF_cold'];
        }
        if (formItem.name === 'HVAC1_PDRSAug24_HSPF_mixed') {
          formItem.form_value = metadata['Residential HSPF_mixed'];
        }

        if (formItem.name === 'HVAC1_PDRSAug24_input_power' && metadata['Input Power'] != '') {
          formItem.form_value = metadata['Input Power'];
        }

        if (
          formItem.name === 'HVAC1_PDRSAug24_rated_ACOP_input' &&
          metadata['Rated ACOP'] != '' &&
          metadata['Rated ACOP'] != '-'
        ) {
          formItem.form_value = metadata['Rated ACOP'];
        }
        if (formItem.name === HVAC1_PDRSAug24_PDRS__postcode) {
          formItem.form_value = postcode;
          formItem.read_only = true;
          formItem.hide = true;
        }
        if (formItem.name === HVAC1_PDRSAug24_BCA_Climate_Zone) {
          formItem.form_value = bca_mapping[selectedClimateZone];
          formItem.read_only = true;
          formItem.hide = true;
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
                    <b>Postcode: </b> {postcode}
                  </p>
                  <p>
                    <b>BCA Climate Zone: </b> {selectedClimateZone.charAt(selectedClimateZone.length - 1)}
                  </p>
                  <p>
                    <b>Brand: </b> {selectedBrand}
                  </p>
                  <p>
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
                    <b>Postcode: </b> {postcode}
                  </p>
                  <p>
                    <b>BCA Climate Zone: </b> {selectedClimateZone.charAt(selectedClimateZone.length - 1)}
                  </p>
                  <p>
                    <b>Brand: </b> {selectedBrand}
                  </p>
                  <p>
                    <b>Model: </b> {selectedModel}
                  </p>
                </div>
              </div>
            </div>
            {
              <Alert as="info" title="ESCs and PRCs" style={{ width: '80%', marginBottom: '7%' }}>
                <p>
                  {/* <h4 className="nsw-content-block__title" style={{ textAlign: 'center' }}> */}
                  Based on the information provided, your ESCs are
                  <span style={{ fontSize: '25px', paddingLeft: '10px', paddingRight: '10px' }}>
                    <b>{formatNumber(Math.floor(calculationResult2))}</b>
                  </span>
                  {/* </h4> */}
                  {/* <h4 className="nsw-content-block__title" style={{ textAlign: 'center' }}> */}
                  and your PRCs are
                  <span style={{ fontSize: '25px', paddingLeft: '10px', paddingRight: '10px' }}>
                    <b>{formatNumber(Math.floor(calculationResult))}</b>
                  </span>
                  {/* </h4> */}
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
                  Your estimated annual peak demand reduction is{' '}
                  <b>
                    {Math.floor(calculationResult) === 0
                      ? 0
                      : formatNumber(Math.round(peakDemandReductionSavingsNumber * 100) / 100)}
                  </b> kWh
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
                prcCertificates={calculationResult}
                escCertificates={calculationResult2}
                escMinPrice={escMinPrice}
                escMaxPrice={escMaxPrice}
                prcMinPrice={prcMinPrice}
                prcMaxPrice={prcMaxPrice}
              />
              <div className="nsw-col-md-9" style={{marginTop: '1.25rem'}}>
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
