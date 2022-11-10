import { React, useEffect } from 'react';

import CalculateForm from 'components/calculate/CalculateForm';
import DateInput from 'components/form_elements/DateInput';
import FormTextInput from 'components/form_elements/FormTextInput';
import DropDownMenu from 'components/form_elements/DropDownMenu';
import RadioButton from 'components/form_elements/RadioButton';

export default function CalculateBlock(props) {
  const {
    variables,
    variable,
    variable2,
    entities,
    calculationDate = '2021-01-01',
    calculationResult,
    calculationResult2,
    setCalculationResult,
    setCalculationResult2,
    setCalculationError,
    setCalculationError2,
    stepNumber,
    setStepNumber,
    formValues,
    setFormValues,
    backAction,
    dependencies,
    metadata,
    zone,
    workflow,
  } = props;

  if (metadata) {
    console.log(metadata);
  }

  if (zone) {
    console.log(zone);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const removeItem = (obj, toRemove) => {
    const findIndex = obj.findIndex((a) => a.name === toRemove);
    findIndex !== -1 && obj.splice(findIndex, 1);
  };

  const renderFormField = (formItem) => {
    if (
      formItem.name === 'Base_registered_ACP' &&
      (formItem.form_value === false || formItem.default_value === false)
    ) {
      if (formValues.find((o) => o.name === 'Base_engaged_ACP') === undefined) {
        formValues.push(dependencies.find((o) => o.name === 'Base_engaged_ACP'));
      }
    }

    if (
      formItem.name === 'Base_registered_ACP' &&
      (formItem.form_value === false || formItem.default_value === false)
    ) {
      if (formValues.find((o) => o.name === 'Base_engaged_ACP') === undefined) {
        formValues.push(dependencies.find((o) => o.name === 'Base_engaged_ACP'));
      }
    } else if (
      formItem.name === 'Base_registered_ACP' &&
      (formItem.form_value === true || formItem.default_value === true)
    ) {
      if (formValues.find((o) => o.name === 'Base_engaged_ACP') !== undefined) {
        removeItem(formValues, 'Base_engaged_ACP');
      }
    }

    if (
      formItem.name === 'HVAC2_new_equipment_cooling_capacity' &&
      (formItem.form_value === false || formItem.default_value === false)
    ) {
      if (formValues.find((o) => o.name === 'HVAC2_AEER_greater_than_minimum') === undefined) {
        formValues.push(dependencies.find((o) => o.name === 'HVAC2_AEER_greater_than_minimum'));
      }
      if (formValues.find((o) => o.name === 'HVAC2_TCPSF_greater_than_minimum') !== undefined) {
        removeItem(formValues, 'HVAC2_TCPSF_greater_than_minimum');
      }
    } else if (
      formItem.name === 'HVAC2_new_equipment_cooling_capacity' &&
      (formItem.form_value === true || formItem.default_value === true)
    ) {
      if (formValues.find((o) => o.name === 'HVAC2_TCPSF_greater_than_minimum') === undefined) {
        formValues.push(dependencies.find((o) => o.name === 'HVAC2_TCPSF_greater_than_minimum'));
      }

      if (formValues.find((o) => o.name === 'HVAC2_AEER_greater_than_minimum') !== undefined) {
        removeItem(formValues, 'HVAC2_AEER_greater_than_minimum');
      }
    }

    // Installation or Replacement
    if (
      formItem.name === 'HVAC2_installation' &&
      (formItem.form_value === false || formItem.default_value === false)
    ) {
      if (formValues.find((o) => o.name === 'HVAC2_equipment_replaced') === undefined) {
        formValues.push(dependencies.find((o) => o.name === 'HVAC2_equipment_replaced'));
      }
      if (formValues.find((o) => o.name === 'HVAC2_Installed_by_qualified_person') !== undefined) {
        removeItem(formValues, 'HVAC2_Installed_by_qualified_person');
        console.log(formValues);
      }
      if (formValues.find((o) => o.name === 'HVAC2_equipment_removed') === undefined) {
        formValues.push(dependencies.find((o) => o.name === 'HVAC2_equipment_removed'));
      }
    } else if (
      formItem.name === 'HVAC2_installation' &&
      (formItem.form_value === true || formItem.default_value === true)
    ) {
      console.log('i am here in else');
      if (formValues.find((o) => o.name === 'HVAC2_equipment_replaced') !== undefined) {
        removeItem(formValues, 'HVAC2_equipment_replaced');
      }
      if (formValues.find((o) => o.name === 'HVAC2_Installed_by_qualified_person') === undefined) {
        formValues.push(dependencies.find((o) => o.name === 'HVAC2_Installed_by_qualified_person'));
      }
      if (formValues.find((o) => o.name === 'HVAC2_equipment_removed') !== undefined) {
        removeItem(formValues, 'HVAC2_equipment_removed');
      }
    }

    if (
      formItem.name === 'HVAC2_residential_building' &&
      (formItem.form_value === true || formItem.default_value === true)
    ) {
      if (
        formValues.find(
          (o) => o.name === 'HVAC2_installed_centralised_system_common_area_BCA_Class2_building',
        ) === undefined
      ) {
        formValues.push(
          dependencies.find(
            (o) => o.name === 'HVAC2_installed_centralised_system_common_area_BCA_Class2_building',
          ),
        );
      }
    } else if (
      formItem.name === 'HVAC2_residential_building' &&
      (formItem.form_value === false || formItem.default_value === false)
    ) {
      if (
        formValues.find(
          (o) => o.name === 'HVAC2_installed_centralised_system_common_area_BCA_Class2_building',
        ) !== undefined
      ) {
        removeItem(
          formValues,
          'HVAC2_installed_centralised_system_common_area_BCA_Class2_building',
        );
      }
    }

    const setItemValue = (e) => {
      // Helper function which sets the value for formItem when the HTML input element's
      // onChange event is triggered

      if (formItem.name === 'Base_registered_ACP') {
        if (e.target.value === 'false') {
          if (formValues.find((o) => o.name === 'Base_engaged_ACP') === undefined) {
            formValues.push(dependencies.find((o) => o.name === 'Base_engaged_ACP'));
          }
        } else if (e.target.value === 'true') {
          removeItem(formValues, 'Base_engaged_ACP');
        }
      }

      if (formItem.name === 'HVAC2_residential_building') {
        if (e.target.value === 'true') {
          if (
            formValues.find(
              (o) =>
                o.name === 'HVAC2_installed_centralised_system_common_area_BCA_Class2_building',
            ) === undefined
          ) {
            formValues.push(
              dependencies.find(
                (o) =>
                  o.name === 'HVAC2_installed_centralised_system_common_area_BCA_Class2_building',
              ),
            );
          }
          console.log(formValues);
        } else {
          removeItem(
            formValues,
            'HVAC2_installed_centralised_system_common_area_BCA_Class2_building',
          );
          console.log(formValues);
        }
      }

      if (formItem.name === 'HVAC2_installation') {
        if (e.target.value === 'false') {
          console.log('i am in false ~');
          if (formValues.find((o) => o.name === 'HVAC2_equipment_replaced') === undefined) {
            formValues.push(dependencies.find((o) => o.name === 'HVAC2_equipment_replaced'));
          }
          if (formValues.find((o) => o.name === 'HVAC2_equipment_removed') === undefined) {
            formValues.push(dependencies.find((o) => o.name === 'HVAC2_equipment_removed'));
          }
          removeItem(formValues, 'HVAC2_Installed_by_qualified_person');
          console.log(formValues);
        } else {
          removeItem(formValues, 'HVAC2_equipment_replaced');
          removeItem(formValues, 'HVAC2_equipment_removed');

          if (
            formValues.find((o) => o.name === 'HVAC2_Installed_by_qualified_person') === undefined
          ) {
            formValues.push(
              dependencies.find((o) => o.name === 'HVAC2_Installed_by_qualified_person'),
            );
          }
        }
      }

      if (formItem.name === 'HVAC2_equipment_replaced') {
        if (e.target.value === 'true') {
          if (formValues.find((o) => o.name === 'HVAC2_equipment_removed') === undefined) {
            formValues.push(dependencies.find((o) => o.name === 'HVAC2_equipment_removed'));
          }
        } else {
          removeItem(formValues, 'HVAC2_equipment_removed');
          removeItem(formValues, 'HVAC2_Installed_by_qualified_person');
          console.log(formValues);
        }
      }

      // cooling capacity path
      if (formItem.name === 'HVAC2_new_equipment_cooling_capacity') {
        if (e.target.value === 'true') {
          if (formValues.find((o) => o.name === 'HVAC2_TCPSF_greater_than_minimum') === undefined) {
            formValues.push(
              dependencies.find((o) => o.name === 'HVAC2_TCPSF_greater_than_minimum'),
            );
          }
          removeItem(formValues, 'HVAC2_AEER_greater_than_minimum');

          console.log(formValues);
        } else {
          if (formValues.find((o) => o.name === 'HVAC2_AEER_greater_than_minimum') === undefined) {
            formValues.push(dependencies.find((o) => o.name === 'HVAC2_AEER_greater_than_minimum'));
          }
          removeItem(formValues, 'HVAC2_TCPSF_greater_than_minimum');
        }
      }

      // Not added for page load
      if (formItem.name === 'HVAC2_climate_zone') {
        const heating_capacity = formValues.find(
          (o) => o.name === 'HVAC2_new_equipment_heating_capacity',
        ).form_value;
        console.log(heating_capacity);

        if (
          (e.target.value === 'hot_zone' || e.target.value === 'average_zone') &&
          heating_capacity === true
        ) {
          console.log('hot zone true');
          if (formValues.find((o) => o.name === 'HVAC2_HSPF_mixed') === undefined) {
            formValues.push(dependencies.find((o) => o.name === 'HVAC2_HSPF_mixed'));
          }
          removeItem(formValues, 'HVAC2_HSPF_cold');
          removeItem(formValues, 'HVAC2_ACOP');
        }

        if (e.target.value === 'cold_zone' && heating_capacity === true) {
          console.log('i am in here cold zone and true');
          if (formValues.find((o) => o.name === 'HVAC2_HSPF_cold') === undefined) {
            formValues.push(dependencies.find((o) => o.name === 'HVAC2_HSPF_cold'));
          }
          removeItem(formValues, 'HVAC2_HSPF_mixed');
          removeItem(formValues, 'HVAC2_ACOP');
        }
      }

      // Heating capacity with different climate zone paths
      // Not added for page load
      if (formItem.name === 'HVAC2_new_equipment_heating_capacity') {
        const climateZone = formValues.find((o) => o.name === 'HVAC2_climate_zone').form_value;
        if (e.target.value === 'true' && climateZone === 'hot_zone') {
          if (formValues.find((o) => o.name === 'HVAC2_HSPF_mixed') === undefined) {
            formValues.push(dependencies.find((o) => o.name === 'HVAC2_HSPF_mixed'));
          }
          removeItem(formValues, 'HVAC2_HSPF_cold');
          removeItem(formValues, 'HVAC2_ACOP');
        }
        if (e.target.value === 'true' && climateZone === 'average_zone') {
          if (formValues.find((o) => o.name === 'HVAC2_HSPF_mixed') === undefined) {
            formValues.push(dependencies.find((o) => o.name === 'HVAC2_HSPF_mixed'));
          }
          removeItem(formValues, 'HVAC2_HSPF_cold');
          removeItem(formValues, 'HVAC2_ACOP');
        }
        if (e.target.value === 'true' && climateZone === 'cold_zone') {
          if (formValues.find((o) => o.name === 'HVAC2_HSPF_cold') === undefined) {
            formValues.push(dependencies.find((o) => o.name === 'HVAC2_HSPF_cold'));
          }
          removeItem(formValues, 'HVAC2_HSPF_mixed');
          removeItem(formValues, 'HVAC2_ACOP');
        }
        if (e.target.value === 'false') {
          if (formValues.find((o) => o.name === 'HVAC2_ACOP') === undefined) {
            formValues.push(dependencies.find((o) => o.name === 'HVAC2_ACOP'));
          }
          removeItem(formValues, 'HVAC2_HSPF_mixed');
          removeItem(formValues, 'HVAC2_HSPF_cold');
        }
      }

      setFormValues(
        [...formValues].map((item) => {
          console.log(formValues);
          if (item.name === formItem.name) {
            if (formItem.value_type === 'Boolean') {
              return { ...item, form_value: e.target.value === 'true' ? true : false };
            } else {
              return { ...item, form_value: e.target.value };
            }
          } else {
            return item;
          }
        }),
      );
    };

    switch (formItem.value_type) {
      case 'Float':
        return <FormTextInput formItem={formItem} setItemValue={setItemValue} />;
      case 'Int':
        return <FormTextInput formItem={formItem} setItemValue={setItemValue} />;
      case 'Date':
        return <DateInput formItem={formItem} setItemValue={setItemValue} />;
      case 'String':
        return <DropDownMenu formItem={formItem} setItemValue={setItemValue} />;
      case 'Boolean':
        return <RadioButton formItem={formItem} setItemValue={setItemValue} />;
    }
  };

  return (
    <CalculateForm
      calculationDate={calculationDate}
      variable={variable}
      variable2={variable2}
      entities={entities}
      formValues={formValues}
      setFormValues={setFormValues}
      calculationResult={calculationResult}
      calculationResult2={calculationResult2}
      setCalculationResult={setCalculationResult}
      setCalculationResult2={setCalculationResult2}
      setCalculationError={setCalculationError}
      setCalculationError2={setCalculationError2}
      stepNumber={stepNumber}
      setStepNumber={setStepNumber}
      dependencies={dependencies}
      workflow={workflow}
      backAction={(e) => {
        setStepNumber(stepNumber - 1);
      }}
    >
      {formValues.map((formItem, index) => renderFormField(formItem))}
    </CalculateForm>
  );
}
