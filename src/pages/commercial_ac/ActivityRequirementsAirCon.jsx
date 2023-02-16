import React, { Fragment, useState, useEffect } from 'react';

import VariableSearchBar from 'pages/homepage/VariableSearchBar';

import Card, { CardCopy } from 'nsw-ds-react/card/card';
import { ContentBlock } from 'nsw-ds-react/content-block/contenBlock';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import LoadClauses from './LoadClauses';
import OpenFiscaAPI from 'services/openfisca_api';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';
import HeroBanner from 'nsw-ds-react/heroBanner/heroBanner';

export default function ActivityRequirementsCommercialAC(props) {
  const { entities, variables, setEntities, setVariables, loading, setLoading } = props;

  const [formValues, setFormValues] = useState([]);
  const [stepNumber, setStepNumber] = useState(1);
  const [dependencies, setDependencies] = useState([]);
  const [variableToLoad, setVariableToLoad] = useState(
    'HVAC2_installation_replacement_final_activity_eligibility',
  );
  const [clausesForm, setClausesForm] = useState([]);

  console.log(variables);

  if (formValues.length === 0) {
    setLoading(true);
  } else if (variables.length === 0) {
    setLoading(true);
  } else if (variables.length === 0) {
    setLoading(true);
  } else {
    setLoading(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    if (variables.length < 1) {
      OpenFiscaAPI.listEntities()
        .then((res) => {
          setEntities(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (entities.length < 1) {
      OpenFiscaAPI.listVariables()
        .then((res) => {
          setVariables(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (variables.length > 0 && stepNumber === 1) {
      console.log(variableToLoad);
      console.log(variables);
      const variable = variables.find((item) => item.name === variableToLoad);
      console.log(variable);
      const offsprings = variable.metadata.input_offspring;

      console.log(offsprings);
      const children = variables.filter((item) => offsprings.includes(item.name));
      console.log(children);

      // Define the original array (at a minimum include the Implementation Date)
      var array = [];

      var dep_arr = [];

      children.map((child) => {
        array.push({ ...child, form_value: '', invalid: false, hide: false });
      });

      array.sort((a, b) => a.metadata.sorting - b.metadata.sorting);

      console.log(array);

      const names = [
        'HVAC2_installed_by_qualified_person',
        'HVAC2_equipment_replaced',
        'HVAC2_equipment_removed',
        'HVAC2_installed_centralised_system_common_area_BCA_Class2_building',
        'HVAC2_AEER_greater_than_minimum',
        'HVAC2_TCPSF_greater_than_minimum',
        'HVAC2_HSPF_mixed_eligible',
        'HVAC2_HSPF_cold_eligible',
        'HVAC2_ACOP_eligible',
      ];

      dep_arr = array.filter((item) => names.includes(item.name));
      array.find((item) => {
        if (names.includes(item.name)) {
          item.hide = true;
        }
      });

      dep_arr = dep_arr.map((obj, i) => ({ ...obj, hide: true }));

      console.log(dep_arr);

      setFormValues(array);
      setDependencies(dep_arr);
      setLoading(false);
    }
  }, [variables, variableToLoad, stepNumber]);

  useEffect(() => {
    console.log(formValues);
    console.log(clausesForm);

    let new_arr = [];

    formValues
      .filter((x) => x.hide === false)
      .map((child) => {
        if (
          child.form_value !== child.default_value &&
          new_arr.find((o) => o.name === child.name) === undefined &&
          child.value_type === 'Boolean'
        )
          new_arr.push(child);
      });
    setClausesForm(new_arr);

    console.log(clausesForm);
  }, [stepNumber]);

  return (
    <Fragment>
      {/* Search section */}
      <br></br>
      <HeroBanner
        wide
        style="dark"
        image={{
          alt: 'commercial ac',
          src: 'base_elig_hero.jpg',
        }}
        intro="Energy Savings Scheme and Peak Demand Reduction Scheme"
        title="Safeguard Certificate Estimator"
      />

      <div className="nsw-container" style={{ marginBottom: '10%' }}>
        <div className="nsw-grid nsw-grid--spaced">
          <div className="nsw-col nsw-col-md-12">
            <br></br>
            <br></br>
            <h2 className="nsw-content-block__title">
            Commercial Air Conditioner Activity eligibility check
            </h2>
            <br></br>
            <p className="nsw-content-block__copy">
            The following questions assess the eligibility requirements for the Commercial Air Conditioner Activity (F4 in the Energy Savings Scheme and HVAC2 in the Peak Demand Reduction Scheme).
            </p>
            <p className="nsw-content-block__copy">
            Answer the questions and click the button below to check your eligibility. If ineligible, you will be shown the ineligible answers and their corresponding rule clauses.
            </p>
            <p className="nsw-content-block__copy">
            Please keep in mind that the results are indicative only and cannot be promoted or published.
            </p>
          </div>
        </div>

        <ProgressIndicator step={stepNumber} of={2} style={{ width: '80%' }} />

        <Fragment>
          {loading && <SpinnerFullscreen />}
          {!loading && (
            <LoadClauses
              variableToLoad={variableToLoad}
              variables={variables}
              entities={entities}
              stepNumber={stepNumber}
              setStepNumber={setStepNumber}
              formValues={formValues}
              dependencies={dependencies}
              setFormValues={setFormValues}
              clausesForm={clausesForm}
              setClausesForm={setClausesForm}
              backAction={(e) => {
                setStepNumber(stepNumber - 1);
              }}
            />
          )}
        </Fragment>
      </div>
    </Fragment>
  );
}
