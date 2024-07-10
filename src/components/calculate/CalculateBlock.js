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
    selectedBrand,
    selectedModel,
    flow,
    setFlow,
    persistFormValues,
    setPersistFormValues,
    secDep,
    setSecDep,
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

  if (metadata) {
    console.log(metadata);
  }

  if (zone) {
    console.log(zone);
  }

  console.log('form values', formValues);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const removeItem = (obj, toRemove) => {
    const findIndex = obj.findIndex((a) => a.name === toRemove);
    findIndex !== -1 && obj.splice(findIndex, 1);
  };

  const renderFormField = (formItem) => {
    var arr = [];
    arr = formValues.map((x) => ({ ...x }));

    console.log(dependencies);
    if (
      formItem.name === 'Base_meets_mandatory_requirement' &&
      (formItem.form_value === true || formItem.default_value === true)
    ) {
      formValues.find((v) => v.name === 'Base_basix_affected_development').hide = false;
    } else if (
      formItem.name === 'Base_meets_mandatory_requirement' &&
      (formItem.form_value === false || formItem.default_value === false)
    ) {
      formValues.find((v) => v.name === 'Base_basix_affected_development').hide = true;
    }

    if (
      formItem.name === 'RF2_GEMS_product_class_5' &&
      (formItem.form_value === true || formItem.default_value === true)
    ) {
      formValues.find((v) => v.name === 'RF2_EEI_under_51').hide = false;
      formValues.find((v) => v.name === 'RF2_EEI_under_81').hide = true;
    } else if (
      formItem.name === 'RF2_GEMS_product_class_5' &&
      (formItem.form_value === false || formItem.default_value === false)
    ) {
      formValues.find((v) => v.name === 'RF2_EEI_under_51').hide = true;
      formValues.find((v) => v.name === 'RF2_EEI_under_81').hide = false;
    }

    if (
      formItem.name === 'Base_tradeable_certificates' &&
      (formItem.form_value === true || formItem.default_value === true)
    ) {
      formValues.find((v) => v.name === 'Base_replacement_water_heater_certificates').hide = false;
    } else if (
      formItem.name === 'Base_tradeable_certificates' &&
      (formItem.form_value === false || formItem.default_value === false)
    ) {
      formValues.find((v) => v.name === 'Base_replacement_water_heater_certificates').hide = true;
    }

    if (formItem.name === 'SYS1_replacement_activity') {
      if (formItem.default_value === true || formItem.form_value === true) {
        if (
          formValues.find((o) => o.name === 'SYS1_existing_equipment_rated_output') === undefined
        ) {
          formValues.push(
            dependencies.find((o) => o.name === 'SYS1_existing_equipment_rated_output'),
          );
        }
        if (
          formValues.find((o) => o.name === 'SYS1_existing_equipment_motor_frequency') === undefined
        ) {
          formValues.push(
            dependencies.find((o) => o.name === 'SYS1_existing_equipment_motor_frequency'),
          );
        }
        if (
          formValues.find((o) => o.name === 'SYS1_existing_equipment_no_of_poles') === undefined
        ) {
          formValues.push(
            dependencies.find((o) => o.name === 'SYS1_existing_equipment_no_of_poles'),
          );
        }
      } else if (formItem.default_value === false || formItem.form_value === false) {
        removeItem(formValues, 'SYS1_existing_equipment_rated_output');
        removeItem(formValues, 'SYS1_existing_equipment_motor_frequency');
        removeItem(formValues, 'SYS1_existing_equipment_no_of_poles');
      }
    }

    if (
      formItem.name === 'RF2_equipment_replaced' &&
      (formItem.form_value === false || formItem.default_value === false)
    ) {
      formValues.find((v) => v.name === 'RF2_installation').hide = false;
      formValues.find((v) => v.name === 'RF2_legal_disposal').hide = true;
    } else if (
      formItem.name === 'RF2_equipment_replaced' &&
      (formItem.form_value === true || formItem.default_value === true)
    ) {
      formValues.find((v) => v.name === 'RF2_installation').hide = true;
      formValues.find((v) => v.name === 'RF2_legal_disposal').hide = false;
    }

    if (
      formItem.name === 'HVAC2_new_equipment_cooling_capacity' &&
      (formItem.form_value === false || formItem.default_value === false)
    ) {
      formValues.find((v) => v.name === 'HVAC2_AEER_greater_than_minimum').hide = false;
      formValues.find((v) => v.name === 'HVAC2_TCPSF_greater_than_minimum').hide = true;
    } else if (
      formItem.name === 'HVAC2_new_equipment_cooling_capacity' &&
      (formItem.form_value === true || formItem.default_value === true)
    ) {
      formValues.find((v) => v.name === 'HVAC2_TCPSF_greater_than_minimum').hide = false;
      formValues.find((v) => v.name === 'HVAC2_AEER_greater_than_minimum').hide = true;
    }

    if (
      formItem.name === 'HVAC1_new_equipment_cooling_capacity' &&
      (formItem.form_value === false || formItem.default_value === false)
    ) {
      formValues.find((v) => v.name === 'HVAC1_AEER_greater_than_minimum').hide = false;
      formValues.find((v) => v.name === 'HVAC1_TCPSF_greater_than_minimum').hide = true;
    } else if (
      formItem.name === 'HVAC1_new_equipment_cooling_capacity' &&
      (formItem.form_value === true || formItem.default_value === true)
    ) {
      formValues.find((v) => v.name === 'HVAC1_TCPSF_greater_than_minimum').hide = false;
      formValues.find((v) => v.name === 'HVAC1_AEER_greater_than_minimum').hide = true;
    }

    if (
      formItem.name === 'HVAC2_residential_building' &&
      (formItem.form_value === true || formItem.default_value === true)
    ) {
      formValues.find(
        (v) => v.name === 'HVAC2_installed_centralised_system_common_area_BCA_Class2_building',
      ).hide = false;
    } else if (
      formItem.name === 'HVAC2_residential_building' &&
      (formItem.form_value === false || formItem.default_value === false)
    ) {
      formValues.find(
        (v) => v.name === 'HVAC2_installed_centralised_system_common_area_BCA_Class2_building',
      ).hide = true;
    }

    const setItemValue = (e) => {
      if (formItem.name === 'SYS2_multiple_speed') {
        if (e.target.value === 'true') {
          formValues.find((v) => v.name === 'SYS2_single_speed_input_power').hide = true;
          formValues.find((v) => v.name === 'SYS2_multiple_speeds_input_power').hide = false;
          setFormValues(formValues);
        } else if (e.target.value === 'false') {
          formValues.find((v) => v.name === 'SYS2_single_speed_input_power').hide = false;
          formValues.find((v) => v.name === 'SYS2_multiple_speeds_input_power').hide = true;
          setFormValues(formValues);
        }
      }

      if (formItem.name === 'SYS1_replacement_activity') {
        if (e.target.value === 'true') {
          if (
            formValues.find((o) => o.name === 'SYS1_existing_equipment_rated_output') === undefined
          ) {
            formValues.push(
              dependencies.find((o) => o.name === 'SYS1_existing_equipment_rated_output'),
            );
          }
          if (
            formValues.find((o) => o.name === 'SYS1_existing_equipment_motor_frequency') ===
            undefined
          ) {
            formValues.push(
              dependencies.find((o) => o.name === 'SYS1_existing_equipment_motor_frequency'),
            );
          }
          if (
            formValues.find((o) => o.name === 'SYS1_existing_equipment_no_of_poles') === undefined
          ) {
            formValues.push(
              dependencies.find((o) => o.name === 'SYS1_existing_equipment_no_of_poles'),
            );
          }
        } else if (e.target.value === 'false') {
          removeItem(formValues, 'SYS1_existing_equipment_rated_output');
          removeItem(formValues, 'SYS1_existing_equipment_motor_frequency');
          removeItem(formValues, 'SYS1_existing_equipment_no_of_poles');
        }
      }

      if (formItem.name === 'HVAC2_residential_building') {
        if (e.target.value === 'true') {
          formValues.find(
            (v) => v.name === 'HVAC2_installed_centralised_system_common_area_BCA_Class2_building',
          ).hide = false;
        } else {
          formValues.find(
            (v) => v.name === 'HVAC2_installed_centralised_system_common_area_BCA_Class2_building',
          ).hide = true;
        }
      }

      if (formItem.name === 'Base_removing_or_replacing') {
        if (e.target.value === 'true') {
          formValues.find((v) => v.name === 'Base_resold_reused_or_refurbished').hide = false;
          formValues.find((v) => v.name === 'Base_disposal_of_equipment').hide = false;
        } else {
          formValues.find((v) => v.name === 'Base_resold_reused_or_refurbished').hide = true;
          formValues.find((v) => v.name === 'Base_disposal_of_equipment').hide = true;
        }
      }

      if (formItem.name === 'Base_tradeable_certificates') {
        if (e.target.value === 'true') {
          formValues.find(
            (v) => v.name === 'Base_replacement_water_heater_certificates',
          ).hide = false;
          formValues.find(
            (v) => v.name === 'Base_replacement_solar_water_heater_certificates',
          ).hide = true;
        } else {
          formValues.find(
            (v) => v.name === 'Base_replacement_water_heater_certificates',
          ).hide = true;
          formValues.find(
            (v) => v.name === 'Base_replacement_solar_water_heater_certificates',
          ).hide = true;
        }
      }

      if (formItem.name === 'Base_replacement_water_heater_certificates') {
        if (e.target.value === 'true') {
          formValues.find(
            (v) => v.name === 'Base_replacement_solar_water_heater_certificates',
          ).hide = true;
        } else if (e.target.value === 'false') {
          formValues.find(
            (v) => v.name === 'Base_replacement_solar_water_heater_certificates',
          ).hide = false;
          setFormValues(formValues);
        }
      }

      if (formItem.name === 'Base_meets_mandatory_requirement') {
        if (e.target.value === 'true') {
          formValues.find((v) => v.name === 'Base_basix_affected_development').hide = false;
        } else {
          formValues.find((v) => v.name === 'Base_basix_affected_development').hide = true;
        }
      }

      // cooling capacity path
      if (formItem.name === 'RF2_equipment_replaced') {
        if (e.target.value === 'true') {
          formValues.find((v) => v.name === 'RF2_installation').hide = true;
        } else {
          formValues.find((v) => v.name === 'RF2_installation').hide = false;
        }
      }

      if (formItem.name === 'RF2_GEMS_product_class_5') {
        if (e.target.value === 'true') {
          formValues.find((v) => v.name === 'RF2_EEI_under_51').hide = false;
          formValues.find((v) => v.name === 'RF2_EEI_under_81').hide = true;
        } else {
          formValues.find((v) => v.name === 'RF2_EEI_under_51').hide = true;
          formValues.find((v) => v.name === 'RF2_EEI_under_81').hide = false;
        }
      }

      if (formItem.name === 'WH1_equipment_replaced') {
        if (e.target.value === 'true') {
          formValues.find((v) => v.name === 'WH1_installation').hide = true;
          formValues.find((v) => v.name === 'WH1_equipment_replaces_electric').hide = false;
          setFormValues(formValues);
        } else if (e.target.value === 'false') {
          formValues.find((v) => v.name === 'WH1_installation').hide = false;
          formValues.find((v) => v.name === 'WH1_equipment_replaces_electric').hide = true;
          setFormValues(formValues);
        }
      }

      // cooling capacity path
      if (formItem.name === 'HVAC2_new_equipment_cooling_capacity') {
        if (e.target.value === 'true') {
          formValues.find((v) => v.name === 'HVAC2_TCPSF_greater_than_minimum').hide = false;
          formValues.find((v) => v.name === 'HVAC2_AEER_greater_than_minimum').hide = true;
        } else {
          formValues.find((v) => v.name === 'HVAC2_AEER_greater_than_minimum').hide = false;
          formValues.find((v) => v.name === 'HVAC2_TCPSF_greater_than_minimum').hide = true;
        }
      }

      if (formItem.name === 'HVAC1_new_equipment_cooling_capacity') {
        if (e.target.value === 'true') {
          formValues.find((v) => v.name === 'HVAC1_TCPSF_greater_than_minimum').hide = false;
          formValues.find((v) => v.name === 'HVAC1_AEER_greater_than_minimum').hide = true;
        } else {
          formValues.find((v) => v.name === 'HVAC1_AEER_greater_than_minimum').hide = false;
          formValues.find((v) => v.name === 'HVAC1_TCPSF_greater_than_minimum').hide = true;
        }
      }

      // Not added for page load
      if (formItem.name === 'HVAC2_climate_zone') {
        const heating_capacity = formValues.find(
          (o) => o.name === 'HVAC2_new_equipment_heating_capacity',
        ).form_value;

        if (
          (e.target.value === 'hot_zone' || e.target.value === 'average_zone') &&
          heating_capacity === true
        ) {
          formValues.find((v) => v.name === 'HVAC2_HSPF_mixed_eligible').hide = false;
          formValues.find((v) => v.name === 'HVAC2_HSPF_cold_eligible').hide = true;
          formValues.find((v) => v.name === 'HVAC2_ACOP_eligible').hide = true;
        }

        if (
          (e.target.value === 'hot_zone' || e.target.value === 'average_zone') &&
          heating_capacity === false
        ) {
          formValues.find((v) => v.name === 'HVAC2_HSPF_mixed_eligible').hide = true;
          formValues.find((v) => v.name === 'HVAC2_HSPF_cold_eligible').hide = true;
          formValues.find((v) => v.name === 'HVAC2_ACOP_eligible').hide = false;
        }

        if (e.target.value === 'cold_zone' && heating_capacity === true) {
          formValues.find((v) => v.name === 'HVAC2_HSPF_cold_eligible').hide = false;
          formValues.find((v) => v.name === 'HVAC2_HSPF_mixed_eligible').hide = true;
          formValues.find((v) => v.name === 'HVAC2_ACOP_eligible').hide = true;
        }

        if (e.target.value === 'cold_zone' && heating_capacity === false) {
          formValues.find((v) => v.name === 'HVAC2_HSPF_cold_eligible').hide = true;
          formValues.find((v) => v.name === 'HVAC2_HSPF_mixed_eligible').hide = true;
          formValues.find((v) => v.name === 'HVAC2_ACOP_eligible').hide = false;
        }
      }

      if (formItem.name === 'HVAC1_climate_zone') {
        const heating_capacity = formValues.find(
          (o) => o.name === 'HVAC1_new_equipment_heating_capacity',
        ).form_value;

        if (
          (e.target.value === 'hot_zone' || e.target.value === 'average_zone') &&
          heating_capacity === true
        ) {
          formValues.find((v) => v.name === 'HVAC1_HSPF_mixed_eligible').hide = false;
          formValues.find((v) => v.name === 'HVAC1_HSPF_cold_eligible').hide = true;
          formValues.find((v) => v.name === 'HVAC1_ACOP_eligible').hide = true;
        }

        if (
          (e.target.value === 'hot_zone' || e.target.value === 'average_zone') &&
          heating_capacity === false
        ) {
          formValues.find((v) => v.name === 'HVAC1_HSPF_mixed_eligible').hide = true;
          formValues.find((v) => v.name === 'HVAC1_HSPF_cold_eligible').hide = true;
          formValues.find((v) => v.name === 'HVAC1_ACOP_eligible').hide = false;
        }

        if (e.target.value === 'cold_zone' && heating_capacity === true) {
          formValues.find((v) => v.name === 'HVAC1_HSPF_cold_eligible').hide = false;
          formValues.find((v) => v.name === 'HVAC1_HSPF_mixed_eligible').hide = true;
          formValues.find((v) => v.name === 'HVAC1_ACOP_eligible').hide = true;
        }

        if (e.target.value === 'cold_zone' && heating_capacity === false) {
          formValues.find((v) => v.name === 'HVAC1_HSPF_cold_eligible').hide = true;
          formValues.find((v) => v.name === 'HVAC1_HSPF_mixed_eligible').hide = true;
          formValues.find((v) => v.name === 'HVAC1_ACOP_eligible').hide = false;
        }
      }

      // Heating capacity with different climate zone paths
      // Not added for page load
      if (formItem.name === 'HVAC2_new_equipment_heating_capacity') {
        const climateZone = formValues.find((o) => o.name === 'HVAC2_climate_zone').form_value;
        if (e.target.value === 'true' && climateZone === 'hot_zone') {
          formValues.find((v) => v.name === 'HVAC2_HSPF_mixed_eligible').hide = false;
          formValues.find((v) => v.name === 'HVAC2_HSPF_cold_eligible').hide = true;
          formValues.find((v) => v.name === 'HVAC2_ACOP_eligible').hide = true;
        }
        if (e.target.value === 'true' && climateZone === 'average_zone') {
          formValues.find((v) => v.name === 'HVAC2_HSPF_mixed_eligible').hide = false;
          formValues.find((v) => v.name === 'HVAC2_HSPF_cold_eligible').hide = true;
          formValues.find((v) => v.name === 'HVAC2_ACOP_eligible').hide = true;
        }
        if (e.target.value === 'true' && climateZone === 'cold_zone') {
          formValues.find((v) => v.name === 'HVAC2_HSPF_cold_eligible').hide = false;
          formValues.find((v) => v.name === 'HVAC2_HSPF_mixed_eligible').hide = true;
          formValues.find((v) => v.name === 'HVAC2_ACOP_eligible').hide = true;
        }
        if (e.target.value === 'false') {
          formValues.find((v) => v.name === 'HVAC2_HSPF_cold_eligible').hide = true;
          formValues.find((v) => v.name === 'HVAC2_HSPF_mixed_eligible').hide = true;
          formValues.find((v) => v.name === 'HVAC2_ACOP_eligible').hide = false;
        }
      }

      if (formItem.name === 'HVAC1_new_equipment_heating_capacity') {
        const climateZone = formValues.find((o) => o.name === 'HVAC1_climate_zone').form_value;
        if (e.target.value === 'true' && climateZone === 'hot_zone') {
          formValues.find((v) => v.name === 'HVAC1_HSPF_mixed_eligible').hide = false;
          formValues.find((v) => v.name === 'HVAC1_HSPF_cold_eligible').hide = true;
          formValues.find((v) => v.name === 'HVAC1_ACOP_eligible').hide = true;
        }
        if (e.target.value === 'true' && climateZone === 'average_zone') {
          formValues.find((v) => v.name === 'HVAC1_HSPF_mixed_eligible').hide = false;
          formValues.find((v) => v.name === 'HVAC1_HSPF_cold_eligible').hide = true;
          formValues.find((v) => v.name === 'HVAC1_ACOP_eligible').hide = true;
        }
        if (e.target.value === 'true' && climateZone === 'cold_zone') {
          formValues.find((v) => v.name === 'HVAC1_HSPF_cold_eligible').hide = false;
          formValues.find((v) => v.name === 'HVAC1_HSPF_mixed_eligible').hide = true;
          formValues.find((v) => v.name === 'HVAC1_ACOP_eligible').hide = true;
        }
        if (e.target.value === 'false') {
          formValues.find((v) => v.name === 'HVAC1_HSPF_cold_eligible').hide = true;
          formValues.find((v) => v.name === 'HVAC1_HSPF_mixed_eligible').hide = true;
          formValues.find((v) => v.name === 'HVAC1_ACOP_eligible').hide = false;
        }
      }

      if (formItem.name === 'SYS2_equipment_registered_in_GEMS') {
        if (e.target.value === 'true') {
          formValues.find((v) => v.name === 'SYS2_voluntary_labelling_scheme').hide = true;
        } else if (e.target.value === 'false') {
          formValues.find((v) => v.name === 'SYS2_voluntary_labelling_scheme').hide = false;
        }
      }

      if (formItem.name === 'WH1_storage_volume') {
        if (e.target.value === 'less_than_or_equal_to_700_L') {
          formValues.find((v) => v.name === 'WH1_certified').hide = false;
        } else {
          formValues.find((v) => v.name === 'WH1_certified').hide = true;
        }
      }

      if (formItem.name === 'F17_storage_volume') {
        if (e.target.value === 'less_than_or_equal_to_700_L') {
          formValues.find((v) => v.name === 'F17_certified').hide = false;
        } else {
          formValues.find((v) => v.name === 'F17_certified').hide = true;
        }
      }

      let abc = [...formValues].map((item) => {
        if (item.name === formItem.name) {
          if (formItem.value_type === 'Boolean') {
            return { ...item, form_value: e.target.value === 'true' ? true : false };
          } else {
            return { ...item, form_value: e.target.value };
          }
        } else {
          return item;
        }
      });

      setFormValues(abc);
    };

    if (
      formItem.name !== 'HVAC1_TCSPF_mixed' &&
      formItem.name !== 'HVAC1_HSPF_cold' &&
      formItem.name !== 'HVAC1_HSPF_mixed' &&
      formItem.name !== 'HVAC2_TCSPF_mixed' &&
      formItem.name !== 'HVAC2_HSPF_mixed' &&
      formItem.name !== 'HVAC2_HSPF_cold'
    ) {
      if (formItem.value_type == 'Float') {
        return (
          <div key={formItem.name}>
            <FormTextInput formItem={formItem} setItemValue={setItemValue} />
          </div>
        );
      } else if (formItem.value_type == 'Int') {
        return (
          <div key={formItem.name}>
            <FormTextInput formItem={formItem} setItemValue={setItemValue} />
          </div>
        );
      } else if (formItem.value_type == 'Date') {
        return (
          <div key={formItem.name}>
            <DateInput formItem={formItem} setItemValue={setItemValue} />
          </div>
        );
      } else if (formItem.value_type == 'String' && formItem.name === 'RF2_product_class') {
        return (
          <div key={formItem.name}>
            <FormTextInput formItem={formItem} setItemValue={setItemValue} />
          </div>
        );
      } else if (
        formItem.value_type == 'String' &&
        formItem.name === 'HVAC1_PDRSAug24_BCA_Climate_Zone'
      ) {
        return (
          <div key={formItem.name}>
            <FormTextInput formItem={formItem} setItemValue={setItemValue} />
          </div>
        );
      } else if (
        formItem.value_type == 'String' &&
        formItem.name === 'HVAC2_PDRSAug24_BCA_Climate_Zone'
      ) {
        return (
          <div key={formItem.name}>
            <FormTextInput formItem={formItem} setItemValue={setItemValue} />
          </div>
        );
      } else if (
        formItem.value_type == 'String' &&
        formItem.name === 'RF2_F1_2_ESSJun24_product_class'
      ) {
        return (
          <div key={formItem.name}>
            <FormTextInput formItem={formItem} setItemValue={setItemValue} />
          </div>
        );
      } else if (formItem.value_type == 'String' && formItem.name !== 'RF2_product_class') {
        return (
          <div key={formItem.name}>
            <DropDownMenu formItem={formItem} setItemValue={setItemValue} />
          </div>
        );
      } else if (
        formItem.value_type == 'String' &&
        formItem.name !== 'RF2_F1_2_ESSJun24_product_class'
      ) {
        return (
          <div key={formItem.name}>
            <DropDownMenu formItem={formItem} setItemValue={setItemValue} />
          </div>
        );
      } else if (
        formItem.value_type == 'Boolean' &&
        workflow === 'eligibility' &&
        formItem.hide === false
      ) {
        return (
          <div key={formItem.name}>
            <RadioButton formItem={formItem} setItemValue={setItemValue} />
          </div>
        );
      } else if (
        formItem.value_type == 'Boolean' &&
        workflow === 'activity' &&
        formItem.hide === false
      ) {
        return (
          <div key={formItem.name}>
            <RadioButton formItem={formItem} setItemValue={setItemValue} />
          </div>
        );
      } else if (formItem.value_type == 'Boolean' && workflow === 'certificates') {
        return (
          <div key={formItem.name}>
            <RadioButton formItem={formItem} setItemValue={setItemValue} />
          </div>
        );
      }
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
      selectedBrand={selectedBrand}
      selectedModel={selectedModel}
      backAction={(e) => {
        setStepNumber(stepNumber - 1);
      }}
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
    >
      {formValues.map((formItem, index) => renderFormField(formItem))}
    </CalculateForm>
  );
}
