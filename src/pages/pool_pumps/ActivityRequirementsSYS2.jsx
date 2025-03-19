import React, { Fragment, useState, useEffect } from 'react';

import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import OpenFiscaAPI from 'services/openfisca_api';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';
import HeroBanner from 'nsw-ds-react/heroBanner/heroBanner';
import LoadClausesSYS2 from './LoadClausesActivityReqSYS2';
import { IS_DRUPAL_PAGES } from 'types/app_variables';

export default function ActivityRequirementsSYS2(props) {
  const { entities, variables, setEntities, setVariables, loading, setLoading } = props;

  const [formValues, setFormValues] = useState([]);
  const [stepNumber, setStepNumber] = useState(1);
  const [dependencies, setDependencies] = useState([]);
  const [variableToLoad, setVariableToLoad] = useState(
    'SYS2_PDRSAug24_replacement_final_activity_eligibility',
  );
  const [variable, setVariable] = useState({});
  const [clausesForm, setClausesForm] = useState([]);
  const [showError, setShowError] = useState(false);

  if (formValues.length === 0) {
    setLoading(true);
  } else {
    setLoading(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [stepNumber]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    OpenFiscaAPI.getVariable(variableToLoad)
      .then((res) => {
        setVariable(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [variableToLoad]);

  useEffect(() => {
    if (Object.keys(variable).length && stepNumber === 1) {
      const children = variable.input_offsprings;

      // Define the original array (at a minimum include the Implementation Date)
      var array = [];

      var dep_arr = [];

      children.map((child) => {
        array.push({ ...child, form_value: '', invalid: false, hide: false });
      });

      array.sort((a, b) => a.metadata.sorting - b.metadata.sorting);

      const names = ['SYS2_PDRSAug24_existing_equipment_removed'];

      dep_arr = array.filter((item) => names.includes(item.name));
      array.find((item) => {
        if (item.name === 'SYS2_PDRSAug24_existing_equipment_removed') {
          item.hide = true;
        }
      });

      dep_arr = dep_arr.map((obj, i) => ({ ...obj, hide: true }));

      array.map((obj) => dep_arr.find((o) => o.name === obj.name) || obj);

      setFormValues(array);
      setDependencies(dep_arr);
      setLoading(false);
    }
  }, [variable]);

  useEffect(() => {
    console.log(formValues);
    console.log(clausesForm);

    let new_arr = [];

    formValues
      .filter((x) => x.hide === false)
      .map((child) => {
        console.log(child);
        if (
          (child.form_value !== child.default_value &&
            new_arr.find((o) => o.name === child.name) === undefined &&
            child.value_type === 'Boolean') ||
          child.value_type === 'String'
        ) {
          new_arr.push(child);
        }
      });

    setClausesForm(new_arr);
  }, [stepNumber]);

  return (
    <Fragment>
      {/* Search section */}
      {!IS_DRUPAL_PAGES && (
        <div style={{ marginTop: '1rem' }}>
          <HeroBanner
            wide
            style="dark"
            image={{
              alt: 'commercial ac',
              src: 'base_elig_hero.jpg',
            }}
            intro="Residential and small business"
            title="Pool pump - eligibility"
          />
        </div>
      )}

      <div className="nsw-container" style={{ marginBottom: '10%', marginTop: '1rem' }}>
        {!IS_DRUPAL_PAGES && stepNumber !== 2 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-12">
              <h2 className="nsw-content-block__title">
                Residential and Small Business Pool Pump activity eligibility check
              </h2>
              <br></br>
              <p className="nsw-content-block__copy">
                Answer the following questions to check if you meet the eligibility requirements for
                the Residential and small business pool pumps activity (D5 in the{' '}
                <a
                  href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/energy-savings-scheme"
                  target="_blank"
                >
                  Energy Savings Scheme
                </a>{' '}
                and SYS2 in the{' '}
                <a
                  href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/peak-demand-reduction-scheme"
                  target="_blank"
                >
                  Peak Demand Reduction Scheme
                </a>
                ). This activity is for the the new installation or replacement of a high efficiency
                pool pump.
              </p>
              <p className="nsw-content-block__copy">
                If you're ineligible, we'll show you why and give you the corresponding rule
                clauses.
              </p>
              <p className="nsw-content-block__copy">
                Please keep in mind that the results are a guide only and cannot be promoted or
                published.
              </p>
            </div>
          </div>
        )}

        {stepNumber === 2 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-12">
              <h2 className="nsw-content-block__title">
                Residential and Small Business Pool Pump activity eligibility check
              </h2>
            </div>
          </div>
        )}

        <ProgressIndicator step={stepNumber} of={2} style={{ width: '80%' }} />

        <Fragment>
          {loading && <SpinnerFullscreen />}
          {!loading && (
            <LoadClausesSYS2
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
              showError={showError}
              setShowError={setShowError}
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
