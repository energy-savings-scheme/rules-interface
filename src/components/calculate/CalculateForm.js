import React, { useEffect, useState } from 'react';
import OpenFiscaApi from 'services/openfisca_api';

import Button from 'nsw-ds-react/button/button';
import Alert from 'nsw-ds-react/alert/alert';

import { Spinner } from 'react-bootstrap';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';
import axios from 'axios';
import RegistryApi from 'services/registry_api';

export default function CalculateForm(props) {
  const {
    variable,
    variable2,
    entities,
    calculationDate,
    calculationResult,
    setCalculationResult,
    setCalculationError,
    setCalculationError2,
    stepNumber,
    setStepNumber,
    backAction,
    dependencies,
    setCalculationResult2,
    calculationResult2,
    workflow,
    selectedModel,
    selectedBrand,
    flow,
    setFlow,
    setFormValues,
    persistFormValues,
    setPersistFormValues,
    loading,
    setLoading,
    showError,
    setShowError,
    postcode,
    annualEnergySavings,
    peakDemandReductionSavings,
    annualEnergySavingsNumber,
    setAnnualEnergySavingsNumber,
    peakDemandReductionSavingsNumber,
    setPeakDemandReductionSavingsNumber,
  } = props;

  var { formValues } = props;

  const [showPostcodeError, setShowPostcodeError] = useState(false);
  const [showNoResponsePostcodeError, setShowNoResponsePostcodeError] = useState(false);
  const [dropdownOptionsClimateZone, setDropdownOptionsClimateZone] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    setDropdownOptionsClimateZone([
      { text: 'BCA Climate Zone 1', value: 'BCA_Climate_Zone_1' },
      { text: 'BCA Climate Zone 2', value: 'BCA_Climate_Zone_2' },
      { text: 'BCA Climate Zone 3', value: 'BCA_Climate_Zone_3' },
      { text: 'BCA Climate Zone 4', value: 'BCA_Climate_Zone_4' },
      { text: 'BCA Climate Zone 5', value: 'BCA_Climate_Zone_5' },
      { text: 'BCA Climate Zone 6', value: 'BCA_Climate_Zone_6' },
      { text: 'BCA Climate Zone 7', value: 'BCA_Climate_Zone_7' },
      { text: 'BCA Climate Zone 8', value: 'BCA_Climate_Zone_8' },
    ]);
  }, []);

  useEffect(() => {
    formValues.map((variable) => {
      if (
        variable.name === 'C1_PDRSAug24_PDRS__postcode' ||
        variable.name === 'F7_PDRSAug24_PDRS__postcode'
      ) {
        if (variable.form_value.length < 4) {
          setShowPostcodeError(false);
        }
      }
    });
  }, [formValues]);

  const validateDataType = (item) => {
    // OpenFisca requires payload data to be correctly typed.
    // eg. a Float value cannot be 'stringified'.
    // So in this function we check the value_type attribute, and
    // parse the input value accordingly.
    if (item.value_type === 'Float') {
      item.form_value = parseFloat(item.form_value);
    }

    return item;
  };

  console.log(variable);
  console.log(variable2);
  console.log(postcode);

  const handleCalculate = (e) => {
    e.preventDefault();

    setLoading(true);
    setCalculationError(true);

    if (variable2) {
      setCalculationError2(true);
    }

    const entity = entities.find((item) => item.name === variable.entity);

    // Set implementation date from DateInput component - and pop item from formValues
    const date = calculationDate;
    formValues = formValues.filter((item) => item.name !== 'Implementation Date');

    formValues = formValues.map((variable) => {
      if (variable.name === 'HVAC1_PDRSAug24_BCA_Climate_Zone') {
        const option = dropdownOptionsClimateZone.find(
          (option) => option.text === variable.form_value,
        );
        if (option) {
          return { ...variable, form_value: option.value };
        }
      }
      return variable;
    });

    formValues = formValues.map((variable) => {
      if (variable.name === 'HVAC2_PDRSAug24_BCA_Climate_Zone') {
        const option = dropdownOptionsClimateZone.find(
          (option) => option.text === variable.form_value,
        );
        if (option) {
          return { ...variable, form_value: option.value };
        }
      }
      return variable;
    });

    var payload = {
      persons: { person1: {} },
      [entity.plural]: { [`${entity.name}_1`]: { [variable.name]: { [date]: null } } },
    };

    if (workflow === 'eligibility') {
      formValues
        .filter((x) => x.hide === false)
        .map((variable) => {
          const variable_entity = entities.find((item) => item.name === variable.entity);

          payload[variable_entity.plural][`${variable_entity.name}_1`][`${variable.name}`] = {
            [date]: validateDataType(variable).form_value,
          };
        });
    } else {
      formValues.map((variable) => {
        const variable_entity = entities.find((item) => item.name === variable.entity);

        payload[variable_entity.plural][`${variable_entity.name}_1`][`${variable.name}`] = {
          [date]: validateDataType(variable).form_value,
        };
      });
    }

    console.log('payload', payload);

    console.log(loading);
    OpenFiscaApi.postCalculate(payload)
      .then((res) => {
        var result = res.data[entity.plural][`${entity.name}_1`][variable.name][date];
        console.log(res.data);
        setCalculationResult(result);
        setCalculationError(false);
        setLoading(true);
        setShowError(false);
      })
      .catch((err) => {
        setCalculationResult(null);
        setCalculationError(true);
        setShowError(true);
      })
      .finally(() => {
        setLoading(false);
      });

    if (workflow !== 'eligibility') {
      console.log(peakDemandReductionSavings);
      var payload_peak_demand = {
        persons: { person1: {} },
        [entity.plural]: {
          [`${entity.name}_1`]: { [peakDemandReductionSavings]: { [date]: null } },
        },
      };

      formValues.map((variable) => {
        const variable_entity = entities.find((item) => item.name === variable.entity);

        payload_peak_demand[variable_entity.plural][`${variable_entity.name}_1`][
          `${variable.name}`
        ] = {
          [date]: validateDataType(variable).form_value,
        };
      });

      console.log('peak demand payload', payload_peak_demand);

      OpenFiscaApi.postCalculate(payload_peak_demand)
        .then((res) => {
          var result =
            res.data[entity.plural][`${entity.name}_1`][peakDemandReductionSavings][date];
          console.log(result);
          setPeakDemandReductionSavingsNumber(result);
          setShowError(false);
        })
        .catch((err) => {
          setShowError(true);
        })
        .finally(() => {});
    }

    if (variable2) {
      const entity2 = entities.find((item) => item.name === variable2.entity);
      var payload2 = {
        persons: { person1: {} },
        [entity2.plural]: { [`${entity2.name}_1`]: { [variable2.name]: { [date]: null } } },
      };

      formValues.map((variable) => {
        const variable_entity2 = entities.find((item) => item.name === variable.entity);

        payload2[variable_entity2.plural][`${variable_entity2.name}_1`][`${variable.name}`] = {
          [date]: validateDataType(variable).form_value,
        };
      });

      console.log(payload2);

      OpenFiscaApi.postCalculate(payload2)
        .then((res) => {
          var result = res.data[entity2.plural][`${entity2.name}_1`][variable2.name][date];
          console.log(res.data);
          setCalculationResult2(result);
          setCalculationError2(false);
          setLoading(true);
          setShowError(false);
        })
        .catch((err) => {
          setCalculationResult2(null);
          setCalculationError2(true);
          console.log(err);
          setShowError(true);
        })
        .finally(() => {
          setLoading(false);
        });

      // ANNUAL ENERGY SAVINGS API
      var annual_energy_savings = {
        persons: { person1: {} },
        [entity.plural]: { [`${entity.name}_1`]: { [annualEnergySavings]: { [date]: null } } },
      };

      formValues.map((variable) => {
        const variable_entity = entities.find((item) => item.name === variable.entity);

        annual_energy_savings[variable_entity.plural][`${variable_entity.name}_1`][
          `${variable.name}`
        ] = {
          [date]: validateDataType(variable).form_value,
        };
      });

      console.log('annual energy savings', annual_energy_savings);

      OpenFiscaApi.postCalculate(annual_energy_savings)
        .then((res) => {
          var result = res.data[entity.plural][`${entity.name}_1`][annualEnergySavings][date];
          console.log(res.data);
          setAnnualEnergySavingsNumber(result);
          setShowError(false);
        })
        .catch((err) => {
          setShowError(true);
        })
        .finally(() => {});
    }

    if (stepNumber === 1 && workflow !== 'eligibility') {
      formValues.map((variable) => {
        if (
          variable.name === 'C1_PDRSAug24_PDRS__postcode' ||
          variable.name === 'F7_PDRSAug24_PDRS__postcode' ||
          variable.name === 'BESS1_PDRSAug24_PDRS__postcode' ||
          variable.name === 'BESS2_PDRSAug24_PDRS__postcode'
        ) {
          if (['2817', '2818', '2819'].includes(variable.form_value)) {
            setFlow(null);
            setStepNumber(stepNumber + 1);
            setShowPostcodeError(false);
          } else {
            RegistryApi.getPostcodeValidation(variable.form_value)
              .then((res) => {
                const persons = res.data;
                console.log(res);
                if (
                  persons.status === '200' &&
                  persons.code === '200' &&
                  persons.data.postcode &&
                  persons.data.postcode === variable.form_value
                ) {
                  if (persons.data['state'] === 'NSW') {
                    setShowPostcodeError(false);
                    setFlow(null);
                    setStepNumber(stepNumber + 1);
                  } else {
                    setShowPostcodeError(true);
                    setShowNoResponsePostcodeError(false);
                  }
                } else if (persons.status === '200' && persons.code === '404') {
                  setShowPostcodeError(true);
                  setShowNoResponsePostcodeError(false);
                } else if (persons.status !== '200') {
                  setShowPostcodeError(false);
                  setShowNoResponsePostcodeError(true);
                }
              })
              .catch((err) => {
                console.log(err);
                setShowNoResponsePostcodeError(true);
              });
          }
        }
      });
    } else {
      console.log('here......');
      setStepNumber(stepNumber + 1);
    }

    if (workflow !== 'eligibility') {
      setPersistFormValues(formValues);
    }
  };

  return (
    <form onSubmit={handleCalculate}>
      <div className="nsw-content-block">
        <div className="nsw-content-block__content">
          {workflow === 'certificates' ? (
            <h5 className="nsw-content-block__copy" style={{ paddingBottom: '30px' }}>
              <b>Please answer the following questions to calculate your ESCs and PRCs</b>
            </h5>
          ) : (
            <h5 className="nsw-content-block__copy">
              {' '}
              <b> Check if you meet the following requirements </b>
            </h5>
          )}
        </div>
      </div>

      {props.children}

      {stepNumber === 1 && showPostcodeError && (
        <Alert as="error" title="The postcode is not valid in NSW">
          <p>Please check your postcode and try again.</p>
        </Alert>
      )}

      {stepNumber === 1 && showNoResponsePostcodeError && (
        <Alert as="error" title="Sorry!">
          <p>
            We are experiencing technical difficulties validating the postcode, please try again
            later.
          </p>
        </Alert>
      )}

      {stepNumber === 2 && (
        <div className="nsw-row" style={{ width: '80%', paddingTop: '50px' }}>
          <div className="nsw-col-md-9">
            {stepNumber !== 1 && (
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
            )}
          </div>

          <div className="nsw-col-md-3">
            <Button as="dark" type="submit" style={{ float: 'right' }}>
              {loading ? (
                <Spinner animation="border" role="status" size="lg">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : workflow === 'eligibility' ? (
                'Check eligibility'
              ) : (
                'Calculate certificates'
              )}
            </Button>
          </div>
        </div>
      )}

      {stepNumber === 1 && (
        <div className="nsw-row" style={{ width: '80%', paddingTop: '50px' }}>
          <div className="nsw-col-md-3">
            <Button as="dark" type="submit" style={{ float: 'left' }}>
              {loading ? (
                <Spinner animation="border" role="status" size="lg">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : workflow === 'eligibility' ? (
                'Check eligibility'
              ) : (
                'Calculate certificates'
              )}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
