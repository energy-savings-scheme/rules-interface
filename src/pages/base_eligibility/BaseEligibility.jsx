import React, { Fragment, useState, useEffect } from 'react';
import Card, { CardCopy } from 'nsw-ds-react/card/card';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import OpenFiscaAPI from 'services/openfisca_api';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';
import LoadClausesBaseEligibility from './LoadClausesBaseEligibility';
import HeroBanner from 'nsw-ds-react/heroBanner/heroBanner';

export default function BaseEligibility(props) {
  const { entities, variables, setEntities, setVariables, loading, setLoading } = props;

  const [formValues, setFormValues] = useState([]);
  const [stepNumber, setStepNumber] = useState(1);
  const [dependencies, setDependencies] = useState([]);
  const [variableToLoad, setVariableToLoad] = useState('ESS__PDRS__ACP_base_scheme_eligibility');
  const [persistFormValues, setPersistFormValues] = useState([]);
  const [clausesForm, setClausesForm] = useState([]);
  const [secDep, setSecDep] = useState([]);

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
        'Base_resold_reused_or_refurbished',
        'Base_disposal_of_equipment',
        'Base_basix_affected_development',
        'Base_engaged_ACP',
        'Base_replacement_water_heater_certificates',
        'Base_replacement_solar_water_heater_certificates',
      ];

      var second_dep = [];

      dep_arr = array.filter((item) => names.includes(item.name));

      dep_arr = dep_arr.map((obj, i) => ({ ...obj, hide: true }));

      array.find((item) => {
        if (item.name === 'Base_replacement_solar_water_heater_certificates') {
          console.log(' in here' + item.name);
          item.hide = true;
        }
      });

      setFormValues(array);
      setDependencies(dep_arr);
      setLoading(false);
      setSecDep(second_dep);
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
            <h2 className="nsw-content-block__title">Schemes Base Eligibility Requirements</h2>
            <br></br>
            <p className="nsw-content-block__copy">
              The following questions assess the basic eligibility requirements for the Energy
              Savings Scheme and Peak Demand Reduction Scheme. Answer the questions and click the
              button below to check your eligibility. If ineligible, you will be shown the
              ineligible answers and their corresponding rule clauses.
            </p>
          </div>
        </div>

        <ProgressIndicator step={stepNumber} of={2} style={{ width: '80%' }} />

        <Fragment>
          {loading && <SpinnerFullscreen />}
          {!loading && (
            <LoadClausesBaseEligibility
              variableToLoad={variableToLoad}
              variables={variables}
              entities={entities}
              stepNumber={stepNumber}
              setStepNumber={setStepNumber}
              formValues={formValues}
              dependencies={dependencies}
              setFormValues={setFormValues}
              persistFormValues={persistFormValues}
              setPersistFormValues={setPersistFormValues}
              clausesForm={clausesForm}
              setClausesForm={setClausesForm}
              secDep={secDep}
              setSecDep={setSecDep}
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