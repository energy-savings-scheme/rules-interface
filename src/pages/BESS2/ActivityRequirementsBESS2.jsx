import React, { Fragment, useState, useEffect } from 'react';

import VariableSearchBar from 'pages/homepage/VariableSearchBar';

import Card, { CardCopy } from 'nsw-ds-react/card/card';
import { ContentBlock } from 'nsw-ds-react/content-block/contenBlock';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import LoadClauses from './LoadClausesActReq';
import OpenFiscaAPI from 'services/openfisca_api';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';
import HeroBanner from 'nsw-ds-react/heroBanner/heroBanner';
import LoadClausesBESS2 from './LoadClausesActReq';
import {
  BESS2_V5Nov24_installation_final_activity_eligibility,
  HVAC2_ACOP_eligible,
  HVAC2_AEER_greater_than_minimum,
  HVAC2_equipment_replaced,
  HVAC2_HSPF_cold_eligible,
  HVAC2_HSPF_mixed_eligible,
  HVAC2_installed_centralised_system_common_area_BCA_Class2_building,
  HVAC2_TCPSF_greater_than_minimum,
} from 'types/openfisca_variables';
import { IS_DRUPAL_PAGES } from 'types/app_variables';

export default function ActivityRequirementsBESS2(props) {
  const { entities, variables, setEntities, setVariables, loading, setLoading } = props;

  const [formValues, setFormValues] = useState([]);
  const [stepNumber, setStepNumber] = useState(1);
  const [dependencies, setDependencies] = useState([]);
  const [variableToLoad, setVariableToLoad] = useState(
    BESS2_V5Nov24_installation_final_activity_eligibility,
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

      const names = [
        HVAC2_equipment_replaced,
        HVAC2_installed_centralised_system_common_area_BCA_Class2_building,
        HVAC2_AEER_greater_than_minimum,
        HVAC2_TCPSF_greater_than_minimum,
        HVAC2_HSPF_mixed_eligible,
        HVAC2_HSPF_cold_eligible,
        HVAC2_ACOP_eligible,
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
      <br></br>
      {!IS_DRUPAL_PAGES && (
        <HeroBanner
          wide
          style="dark"
          image={{
            alt: 'commercial ac',
            src: 'BESS2.jpg',
          }}
          intro="Residential"
          title="Sign a solar battery up to a demand response contract - eligibility"
        />
      )}

      <div className="nsw-container" style={{ marginBottom: '10%' }}>
        <br></br>
        <br></br>
        {!IS_DRUPAL_PAGES && stepNumber !== 2 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-12">
              <br></br>
              <p className="nsw-content-block__copy">
                Answer the following questions to check if you meet the eligibility requirements for
                the residential solar battery demand response activity (BESS2 in the{' '}
                <a
                  href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/peak-demand-reduction-scheme"
                  target="_blank"
                >
                  Peak Demand Reduction Scheme
                </a>{' '}
                ). This activity is for the signup of a 'behind the meter' residential solar battery
                to a demand response contract. A key requirement of this activity is that there is a
                solar PV and battery system installed at the address.
              </p>
              <p className="nsw-content-block__copy">
                Note that this activity is only eligible for the Peak Demand Reduction Scheme, and
                is not eligible for the Energy Savings Scheme.
              </p>
              <p className="nsw-content-block__copy">
                Please keep in mind that the results are a guide only and cannot be promoted or
                published.
              </p>
            </div>
          </div>
        )}

        {/* {stepNumber === 2 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-12">
              <h2 className="nsw-content-block__title">
                Solar water heater activity eligibility check
              </h2>
            </div>
          </div>
        )} */}

        <ProgressIndicator step={stepNumber} of={2} style={{ width: '80%' }} />

        <Fragment>
          {loading && <SpinnerFullscreen />}
          {!loading && (
            <LoadClausesBESS2
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
