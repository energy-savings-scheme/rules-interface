import React, { useEffect, useState } from 'react';
import OpenFiscaApi from 'services/openfisca_api';

import Button from 'nsw-ds-react/button/button';
import Alert from 'nsw-ds-react/alert/alert';

import { Spinner } from 'react-bootstrap';

import RegistryApi from 'services/registry_api';
import {
  BESS1_V5Nov24_PDRS__postcode,
  BESS1_V5Nov24_PRC_calculation,
  BESS2_V5Nov24_PDRS__postcode,
  BESS2_V5Nov24_PRC_calculation,
  C1_PDRSAug24_ESC_calculation,
  C1_PDRSAug24_PDRS__postcode,
  F7_PDRSAug24_ESC_calculation,
  F7_PDRSAug24_PDRS__postcode,
  HVAC1_PDRSAug24_BCA_Climate_Zone,
  HVAC2_PDRSAug24_BCA_Climate_Zone,
  F16_electric_PDRSDec24_ESC_calculation,
  WH1_F16_electric_PDRSAug24_PRC_calculation,
  F16_gas_ESC_calculation,
  SYS2_PDRSAug24_replacement_final_activity_eligibility,
  ESS__PDRS__ACP_base_scheme_eligibility,
  BESS1_PDRSAug24_PDRS__postcode,
  BESS2_PDRSAug24_PDRS__postcode,
  BESS1_PDRSAug24_PRC_calculation,
  BESS2_PDRSAug24_PRC_calculation,
  D17_ESSJun24_ESC_calculation,
  D18_ESSJun24_ESC_calculation,
  D19_ESSJun24_ESC_calculation,
  D20_ESSJun24_ESC_calculation,
  F17_ESC_calculation
} from 'types/openfisca_variables';

import { Float } from 'types/value_type';
import {
  clearSearchCaptureAnalytics,
  submitEstimatorFormAnalytics,
  updatePostCodeAnalytics,
} from 'lib/analytics';

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

  const Workflow = {
    ELIGIBILITY: 'eligibility',
    CERTIFICATES: 'certificates',
  };

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
        variable.name === C1_PDRSAug24_PDRS__postcode ||
        variable.name === F7_PDRSAug24_PDRS__postcode
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
    if (item.value_type === Float) {
      item.form_value = parseFloat(item.form_value);
    }

    return item;
  };

  const validateUserType = () => {
    const userType = document.querySelector('select#user-type');

    if (!userType.value) {
      document.querySelector('select#user-type').reportValidity();
      document.querySelector('select#user-type').setCustomValidity('Please select an item in the list.')
      return false
    }

    return true
  }

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
      if (variable.name === HVAC1_PDRSAug24_BCA_Climate_Zone) {
        const option = dropdownOptionsClimateZone.find(
          (option) => option.text === variable.form_value,
        );
        if (option) {
          return { ...variable, form_value: option.value };
        }
      }

      if (variable.name === HVAC2_PDRSAug24_BCA_Climate_Zone) {
        variable.form_value = variable.form_value.replaceAll(' ', '_');
      }

      return variable;
    });

    formValues = formValues.map((variable) => {
      if (variable.name === HVAC1_PDRSAug24_BCA_Climate_Zone) {
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

    if (workflow === Workflow.ELIGIBILITY) {
      if (!validateUserType()) {
        setLoading(false);
        return false
      }
      formValues
        .filter((x) => x.hide === false)
        .map((variable) => {
          const variable_entity = entities.find((item) => item.name === variable.entity);

          payload[variable_entity.plural][`${variable_entity.name}_1`][`${variable.name}`] = {
            [date]: validateDataType(variable).form_value,
          };
        });
    } else {
      // special variable below are certificate pages that has only 2 steps.
      const specialVariables = [
        C1_PDRSAug24_ESC_calculation,
        F7_PDRSAug24_ESC_calculation,
        BESS1_PDRSAug24_PRC_calculation,
        BESS2_PDRSAug24_PRC_calculation
      ]
      if (specialVariables.includes(variable.name)) {
        if (!validateUserType()) {
          setLoading(false);
          return false
        }
      }
      formValues.map((variable) => {
        const variable_entity = entities.find((item) => item.name === variable.entity);

        payload[variable_entity.plural][`${variable_entity.name}_1`][`${variable.name}`] = {
          [date]: validateDataType(variable).form_value,
        };
      });
    }

    OpenFiscaApi.postCalculate(payload)
      .then((res) => {
        var result = res.data[entity.plural][`${entity.name}_1`][variable.name][date];
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

    if (workflow !== Workflow.ELIGIBILITY) {
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

      OpenFiscaApi.postCalculate(payload_peak_demand)
        .then((res) => {
          var result =
            res.data[entity.plural][`${entity.name}_1`][peakDemandReductionSavings][date];
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

      OpenFiscaApi.postCalculate(payload2)
        .then((res) => {
          var result = res.data[entity2.plural][`${entity2.name}_1`][variable2.name][date];
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

      OpenFiscaApi.postCalculate(annual_energy_savings)
        .then((res) => {
          var result = res.data[entity.plural][`${entity.name}_1`][annualEnergySavings][date];
          setAnnualEnergySavingsNumber(result);
          setShowError(false);
        })
        .catch((err) => {
          setShowError(true);
        })
        .finally(() => {});
    }

    if (stepNumber === 1 && workflow !== Workflow.ELIGIBILITY) {
      formValues.map((variable) => {
        if (
          variable.name === C1_PDRSAug24_PDRS__postcode ||
          variable.name === F7_PDRSAug24_PDRS__postcode ||
          variable.name === BESS1_V5Nov24_PDRS__postcode ||
          variable.name === BESS2_V5Nov24_PDRS__postcode ||
          variable.name === BESS1_PDRSAug24_PDRS__postcode ||
          variable.name === BESS2_PDRSAug24_PDRS__postcode
        ) {
          if (['2817', '2818', '2819'].includes(variable.form_value)) {
            setFlow(null);
            setStepNumber(stepNumber + 1);
            setShowPostcodeError(false);
          } else {
            RegistryApi.getPostcodeValidation(variable.form_value)
              .then((res) => {
                const persons = res.data;
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
                    updatePostCodeAnalytics(variable.form_value);
                    submitEstimatorFormAnalytics()
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
      setStepNumber(stepNumber + 1);
    }

    if (stepNumber !== 1 && workflow === Workflow.CERTIFICATES) {
      submitEstimatorFormAnalytics()
    }

    if (workflow !== Workflow.ELIGIBILITY) {
      setPersistFormValues(formValues);
    } else {
      // remove post code property before sending to analytics
      clearSearchCaptureAnalytics()
      submitEstimatorFormAnalytics()
    }
  };

  return (
    <form onSubmit={handleCalculate}>
      <div className="nsw-content-block">
        <div className="nsw-content-block__content">
          {workflow === Workflow.CERTIFICATES &&
            (variable.name === F16_electric_PDRSDec24_ESC_calculation ||
              variable.name === WH1_F16_electric_PDRSAug24_PRC_calculation ||
              variable.name === F16_gas_ESC_calculation ||
              variable.name === D17_ESSJun24_ESC_calculation ||
              variable.name === D18_ESSJun24_ESC_calculation ||
              variable.name === D19_ESSJun24_ESC_calculation ||
              variable.name === D20_ESSJun24_ESC_calculation ||
              variable.name === F17_ESC_calculation
            ) ? (
            // for now we just need to update the copy right now, this is just temporary solution
            // that's why we adding this template below.
            // F16 shouldn't have PRC anymore.
            // TODO: Need to do refactor and find a good way on how to display this section properly.
            <h5 className="nsw-content-block__copy" style={{ paddingBottom: '30px' }}>
              <b>Please answer the following questions to calculate your ESCs</b>
            </h5>
          ) : workflow === Workflow.CERTIFICATES &&
            (variable.name === BESS1_V5Nov24_PRC_calculation ||
              variable.name === BESS2_V5Nov24_PRC_calculation) ? (
            <h5 className="nsw-content-block__copy" style={{ paddingBottom: '30px' }}>
              <b>Please answer the following questions to calculate your PRCs</b>
            </h5>
          ) : workflow === Workflow.CERTIFICATES &&
            (variable.name === C1_PDRSAug24_ESC_calculation ||
              variable.name === F7_PDRSAug24_ESC_calculation ||
              variable.name === BESS1_PDRSAug24_PRC_calculation ||
              variable.name === BESS2_PDRSAug24_PRC_calculation ) ? (
                <></>
          ) : workflow === Workflow.CERTIFICATES ? (
            <h5 className="nsw-content-block__copy" style={{ paddingBottom: '30px' }}>
              <b>Please answer the following questions to calculate your ESCs and PRCs</b>
            </h5>
          ) : (
            <h5 className="nsw-content-block__copy">
              <b>Check if you meet the following requirements</b>
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
              ) : workflow === Workflow.ELIGIBILITY ? (
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
              ) : workflow === Workflow.ELIGIBILITY ? (
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
