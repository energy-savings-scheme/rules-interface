import React, { Fragment, useState, useEffect } from 'react';

import Card from 'nsw-ds-react/card/card';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import OpenFiscaAPI from 'services/openfisca_api';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';
import HeroBanner from 'nsw-ds-react/heroBanner/heroBanner';
import LoadClausesF16_gas from './LoadClausesF16_gas';
import { IS_DRUPAL_PAGES } from 'types/app_variables';

export default function ActivityRequirementsF16_gas(props) {
  const { entities, variables, setEntities, setVariables, loading, setLoading } = props;

  const [formValues, setFormValues] = useState([]);
  const [stepNumber, setStepNumber] = useState(1);
  const [dependencies, setDependencies] = useState([]);
  const [variableToLoad, setVariableToLoad] = useState(
    'F16_gas_installation_replacement_final_activity_eligibility',
  );
  const [clausesForm, setClausesForm] = useState([]);
  const [showError, setShowError] = useState(false);

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
  }, [stepNumber]);

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
      const variable = variables.find((item) => item.name === variableToLoad);
      const offsprings = variable.metadata.input_offspring;
      const children = variables.filter((item) => offsprings.includes(item.name));

      // Define the original array (at a minimum include the Implementation Date)
      var array = [];

      var dep_arr = [];

      children.map((child) => {
        array.push({ ...child, form_value: '', invalid: false, hide: false });
      });

      array.sort((a, b) => a.metadata.sorting - b.metadata.sorting);

      const names = ['F17_certified'];

      dep_arr = array.filter((item) => names.includes(item.name));

      array.find((item) => {
        if (names.includes(item.name)) {
          item.hide = true;
        }
      });

      dep_arr = dep_arr.map((obj, i) => ({ ...obj, hide: true }));

      array.map((obj) => dep_arr.find((o) => o.name === obj.name) || obj);

      setFormValues(array);
      setDependencies(dep_arr);
      setLoading(false);
    }
  }, [variables, variableToLoad, stepNumber]);

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
      {/* Search section */}
      {!IS_DRUPAL_PAGES && (
        <div style={{ marginTop: '1rem' }}>
          <HeroBanner
            wide
            style="dark"
            image={{
              alt: 'commercial ac',
              src: '/F16(optimised).jpg',
            }}
            intro="Commercial"
            title="Gas water heater replacement with an air source heat pump - eligibility"
          />
        </div>
      )}

      <div className="nsw-container" style={{ marginBottom: '10%', marginTop: '1rem' }}>
        <br></br>
        <br></br>
        {!IS_DRUPAL_PAGES && stepNumber !== 2 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-12">
              {/* <h2 className="nsw-content-block__title">
                Install  
              </h2> */}
              <br></br>
              <p className="nsw-content-block__copy">
                Answer the following questions to check if you meet the eligibility requirements for
                the commercial heat pump water heater activity (F16 in the{' '}
                <a
                  href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/energy-savings-scheme"
                  target="_blank"
                >
                  Energy Savings Scheme
                </a>
                ). This activity is for replacement of an existing gas water heater with an (air
                source) heat pump water heater.
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
        {/* 
        {stepNumber === 2 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-12">
              <h2 className="nsw-content-block__title">
                Commercial Heat Pump Water Heater activity eligibility check
              </h2>
            </div>
          </div>
        )} */}

        <ProgressIndicator step={stepNumber} of={2} style={{ width: '80%' }} />

        <Fragment>
          {loading && <SpinnerFullscreen />}
          {!loading && (
            <LoadClausesF16_gas
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
      {!IS_DRUPAL_PAGES && (
        <section className="nsw-section nsw-section--off-white" style={{ backgroundColor: '#F5F5F5' }}>
          <div className="nsw-container" style={{ paddingBottom: '4rem' }}>
            <div className="nsw-layout">
              <div className="nsw-layout__main">
                <br></br>
                <br></br>
                <h2 className="nsw-col nsw-content-block__title">
                  Check your eligibility and estimate certificates
                </h2>
                <br></br>
                <div className="nsw-grid">
                  <div className="nsw-col nsw-col-md-4">
                    <Card
                      headline="Review schemes base eligibility, activity requirements and estimate certificates"
                      link="base_eligibility_commercialac/"
                      image="/commercialac/navigation_row/full_flow_card.jpeg"
                    ></Card>
                  </div>
                  <div className="nsw-col nsw-col-md-4">
                    <Card
                      headline="Check activity requirements and estimate certificates"
                      link="activity-requirements/"
                      image="/commercialac/navigation_row/activity_certificates.png"
                    ></Card>
                  </div>
                  <div className="nsw-col nsw-col-md-4">
                    <Card
                      headline="Estimate certificates only"
                      link="compare2activities"
                      image="/commercialac/navigation_row/certificates_only.jpg"
                    ></Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
}
