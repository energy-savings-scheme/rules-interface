import React, { Fragment, useEffect, useState } from 'react';

// Import services
import moment from 'moment';

// Import components
import CalculateBlock from 'components/calculate/CalculateBlock';
import InfoBox from 'components/info-box/info-box';
import Button from 'nsw-ds-react/button/button';
import OpenFiscaApi from 'services/openfisca_api';
import Alert from 'nsw-ds-react/alert/alert';
import CertificiatePrice from 'components/certificate-price/CertificiatePrice';
import {
  F16_electric_PDRSDec24_PDRS__postcode,
  F16_electric_PDRSDec24_number_of_heat_pumps,
  F16_electric_PDRSDec24_total_heat_pump_thermal_capacity,
  F16_electric_PDRSDec24_com_peak_load,
  F16_electric_PDRSDec24_HP_capacity_factor,
  F16_electric_PDRSDec24_HP_elec,
  F16_electric_PDRSDec24_HP_gas,
  WH1_F16_electric_PDRSAug24_annual_energy_savings,
  WH1_F16_electric_PDRSAug24_volumetric_capacity
} from 'types/openfisca_variables';
import { formatNumber } from 'lib/helper';

export default function CertificateEstimatorLoadClausesWH(props) {
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
        if (formItem.name === WH1_F16_electric_PDRSAug24_annual_energy_savings) {
          formItem.form_value = metadata[`annual_energy_savings_${zone}`];
        }
        if (formItem.name === F16_electric_PDRSDec24_com_peak_load) {
          formItem.form_value = metadata[`ComPkLoad_zone_${zone}`];
        }
        if (formItem.name === F16_electric_PDRSDec24_HP_capacity_factor) {
          formItem.form_value = metadata[`HPCap`];
        }
        if (formItem.name === F16_electric_PDRSDec24_HP_elec) {
          formItem.form_value = metadata[`HPElec_zone_${zone}`];
        }
        if (formItem.name === F16_electric_PDRSDec24_HP_gas) {
          formItem.form_value = metadata[`HPGas_zone_${zone}`];
        }
        if (formItem.name === F16_electric_PDRSDec24_number_of_heat_pumps) {
          formItem.form_value = metadata['number_of_heat_pumps']
          formItem.hide = true;
        }
        if (formItem.name === F16_electric_PDRSDec24_total_heat_pump_thermal_capacity) {
          formItem.form_value = metadata['total_heat_pump_thermal_capacity']
          formItem.hide = true;
        }
        if (formItem.name === WH1_F16_electric_PDRSAug24_volumetric_capacity) {
          formItem.form_value = metadata['volumetric capacity'];
        }

        // Remove whcap
        // if (formItem.name === 'WH1_WH_capacity_factor') {
        //   formItem.form_value = metadata['WHCap'];
        // }
        if (formItem.name === F16_electric_PDRSDec24_PDRS__postcode) {
          formItem.form_value = postcode;
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
            <InfoBox 
              postcode={postcode}
              brand={selectedBrand}
              model={selectedModel}
            />
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
          <InfoBox 
            postcode={postcode}
            brand={selectedBrand}
            model={selectedModel}
          />
        )}

        {stepNumber === 3 && !calculationError && !calculationError2 && (
          <Fragment>
            {
              <Alert as="info" customTitle={
                <h3 dangerouslySetInnerHTML={{__html: "ESCs"}}/>
              } className="nsw-col-lg-10" style={{ marginBottom: '7%' }}>
                <p>
                  {/* <h4 className="nsw-content-block__title" style={{ textAlign: 'center' }}> */}
                  Based on the information provided, your ESCs are
                  <span style={{ fontSize: '25px', paddingLeft: '10px', paddingRight: '10px' }}>
                    <b>{formatNumber(Math.floor(calculationResult2))}</b>
                  </span>
                  {/* </h4> */}
                  {/* <h4 className="nsw-content-block__title" style={{ textAlign: 'center' }}> */}
                  {/* </h4> */}
                </p>
                <p>
                  Your estimated energy savings over the lifetime of the equipment are{' '}
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

        {(stepNumber === 3 && calculationError) ||
          (stepNumber === 3 && calculationError2 && (
            <Alert as="error" customTitle={
              <h3 dangerouslySetInnerHTML={{__html: "Sorry! An error has occurred."}}/>
            }>
              <p>An error occurred during calculation. Try re-running the calculation</p>
            </Alert>
          ))}

        {stepNumber === 3 && (
          <Fragment>
            <div
              className="nsw-row nsw-col-lg-10"
              style={{
                paddingLeft: 'inherit',
                paddingRight: 'inherit',
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
