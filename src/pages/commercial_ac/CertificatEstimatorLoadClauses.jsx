import React, { Fragment, useEffect, useState } from 'react';

// Import services
import moment from 'moment';

// Import components
import CalculateBlock from 'components/calculate/CalculateBlock';
import Button from 'nsw-ds-react/button/button';
import { Alert } from 'nsw-ds-react/alert/alert';
import OpenFiscaApi from 'services/openfisca_api';

export default function CertificateEstimatorLoadClauses(props) {
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
  } = props;

  console.log(variableToLoad1);
  console.log(variableToLoad2);
  console.log(metadata);
  console.log(postcode);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [variable, setVariable] = useState({}); // all info about variable

  var today = new Date();
  const [calculationDate, setCalculationDate] = useState(moment(today).format('YYYY-MM-DD'));

  // const [formValues, setFormValues] = useState([]);
  const [dependencies, setDependencies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [variableData1, setVariableData1] = useState([]);
  const [variableData2, setVariableData2] = useState([]);

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
        if (formItem.name === 'HVAC2_rated_AEER_input') {
          console.log(formItem.form_value);
          formItem.form_value = metadata['Rated AEER'];
        }

        if (formItem.name === 'HVAC2_cooling_capacity_input') {
          formItem.form_value = metadata['Cooling Capacity'];
        }

        if (formItem.name === 'HVAC2_heating_capacity_input') {
          formItem.form_value = metadata['Heating Capacity'];
        }

        if (formItem.name === 'HVAC2_commercial_TCEC') {
          formItem.form_value = metadata[`Commercial tcec_${zone}`];
        }

        if (formItem.name === 'HVAC2_commercial_THEC') {
          formItem.form_value = metadata[`Commercial thec_${zone}`];
        }

        if (formItem.name === 'HVAC2_input_power' && metadata['Input Power'] != '') {
          formItem.form_value = metadata['Input Power'];
        }

        if (
          formItem.name === 'HVAC2_rated_ACOP_input' &&
          metadata['Rated ACOP'] != '' &&
          metadata['Rated ACOP'] != '-'
        ) {
          formItem.form_value = metadata['Rated ACOP'];
        }
        if (formItem.name === 'HVAC2_PDRS__postcode') {
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

  if (!variable) return null;

  return (
    <div className>
      <div style={{ marginTop: 70, marginBottom: 70 }}>
        {stepNumber === 2 && (
          <Fragment>
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
            />
          </Fragment>
        )}

        {stepNumber === 3 && !calculationError && !calculationError2 && (
          <Fragment>
            {
              <Alert as="info" title="ESCs and PRCs" style={{ width: '80%' }}>
                <p>
                  {/* <h4 className="nsw-content-block__title" style={{ textAlign: 'center' }}> */}
                  Based on the information provided, your ESCs are
                  <span style={{ fontSize: '25px', paddingLeft: '10px', paddingRight: '10px' }}>
                    <b>{Math.round(calculationResult2)}</b>
                  </span>
                  {/* </h4> */}
                  {/* <h4 className="nsw-content-block__title" style={{ textAlign: 'center' }}> */}
                  and your PRCs are
                  <span style={{ fontSize: '25px', paddingLeft: '10px', paddingRight: '10px' }}>
                    <b>{Math.round(calculationResult)}</b>
                  </span>
                  {/* </h4> */}
                </p>
              </Alert>
            }
          </Fragment>
        )}

        {(stepNumber === 3 && calculationError === true) ||
          (stepNumber === 3 && calculationError2 === true && (
            <Alert as="error" title="Sorry! An error has occurred.">
              <p>An error occurred during calculation. Try re-running the calculation</p>
            </Alert>
          ))}

        {stepNumber === 3 && (
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
                  setStepNumber(stepNumber - 1);
                }}
              >
                Back
              </Button>
            </div>

            <div className="nsw-col-md-3" style={{ paddingTop: '30px' }}>
              <Button
                style={{ float: 'right' }}
                as="dark"
                link="/"
                onClick={(e) => {
                  // setStepNumber(stepNumber - 1);
                }}
              >
                Start Over
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
