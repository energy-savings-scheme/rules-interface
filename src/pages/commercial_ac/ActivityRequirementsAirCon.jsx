import React, { Fragment, useState, useEffect } from 'react';

import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import LoadClauses from './LoadClauses';
import OpenFiscaAPI from 'services/openfisca_api';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';
import HeroBanner from 'nsw-ds-react/heroBanner/heroBanner';
import { IS_DRUPAL_PAGES } from 'types/app_variables';

export default function ActivityRequirementsCommercialAC(props) {
  const { entities, variables, loading, setLoading } = props;

  const [formValues, setFormValues] = useState([]);
  const [stepNumber, setStepNumber] = useState(1);
  const [dependencies, setDependencies] = useState([]);
  const [variableToLoad, setVariableToLoad] = useState(
    'HVAC2_installation_replacement_final_activity_eligibility',
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

      const names = [
        'HVAC2_equipment_replaced',
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

      setFormValues(array);
      setDependencies(dep_arr);
      setLoading(false);
    }
  }, [variable]);

  useEffect(() => {
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
  }, [stepNumber]);

  return (
    <Fragment>
      {!IS_DRUPAL_PAGES && (
        <div style={{ marginTop: '1rem' }}>
          <HeroBanner
            wide
            style="dark"
            image={{
              alt: 'commercial ac',
              src: 'base_elig_hero.jpg',
            }}
            intro="Commercial"
            title="Air conditioner - eligibility"
          />
        </div>
      )}

      <div className="nsw-container" style={{ marginBottom: '10%', marginTop: '1rem' }}>
        {!IS_DRUPAL_PAGES && stepNumber !== 2 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-12">
              <h2 className="nsw-content-block__title">
                Commercial Air Conditioner activity eligibility check
              </h2>
              <br></br>
              <p className="nsw-content-block__copy">
                Answer the following questions to check if you meet the eligibility requirements for
                the for the Commercial Air Conditioner Activity (F4 in the{' '}
                <a
                  href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/energy-savings-scheme"
                  target="_blank"
                  rel="noreferrer"
                >
                  Energy Savings Scheme
                </a>{' '}
                and HVAC2 in the{' '}
                <a
                  href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/peak-demand-reduction-scheme"
                  target="_blank"
                  rel="noreferrer"
                >
                  Peak Demand Reduction Scheme
                </a>
                ).
              </p>
              <p className="nsw-content-block__copy">
                If ineligible, you will be shown the ineligible answers and their corresponding rule
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
                Commercial Air Conditioner activity eligibility check
              </h2>
            </div>
          </div>
        )}

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
