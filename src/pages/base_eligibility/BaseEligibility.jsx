import React, { Fragment, useState, useEffect } from 'react';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import OpenFiscaAPI from 'services/openfisca_api';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';
import LoadClausesBaseEligibility from './LoadClausesBaseEligibility';
import HeroBanner from 'nsw-ds-react/heroBanner/heroBanner';
import { IS_DRUPAL_PAGES } from 'types/app_variables';
import {USER_TYPE_OPTIONS} from 'constant/user-type';
import {BASE_CORE_ELIGIBILITY_ANALYTICS_DATA} from 'constant/base-analytics-data';
import { FormGroup, Select } from '../../nsw-ds-react/forms';
import {updateEstimatorFormAnalytics, updateFeedbackFormAnalytics} from 'lib/analytics';
import {ESS__PDRS__ACP_base_scheme_eligibility} from 'types/openfisca_variables';
import FeedbackComponent from 'components/feedback/feedback';

export default function BaseEligibility(props) {
  const { entities, variables, setEntities, setVariables, loading, setLoading } = props;

  const [formValues, setFormValues] = useState([]);
  const [stepNumber, setStepNumber] = useState(1);
  const [dependencies, setDependencies] = useState([]);
  const [variableToLoad, setVariableToLoad] = useState(ESS__PDRS__ACP_base_scheme_eligibility);
  const [variable, setVariable] = useState({});
  const [persistFormValues, setPersistFormValues] = useState([]);
  const [clausesForm, setClausesForm] = useState([]);
  const [secDep, setSecDep] = useState([]);
  const [showError, setShowError] = useState(false);
  const [userType, setUserType] = useState('');

  if (formValues.length === 0) {
    setLoading(true);
  } else {
    setLoading(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    updateEstimatorFormAnalytics(BASE_CORE_ELIGIBILITY_ANALYTICS_DATA)
    updateFeedbackFormAnalytics(BASE_CORE_ELIGIBILITY_ANALYTICS_DATA)
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
  }, []);

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
        'Base_basix_affected_development',
        'Base_replacement_water_heater_certificates',
        'Base_replacement_solar_water_heater_certificates',
        'Base_disposal_of_equipment',
        'Base_resold_reused_or_refurbished',
      ];

      var second_dep = [];

      dep_arr = array.filter((item) => names.includes(item.name));

      dep_arr = dep_arr.map((obj, i) => ({ ...obj, hide: true }));

      array.find((item) => {
        if (item.name === 'Base_replacement_solar_water_heater_certificates') {
          item.hide = true;
        }
      });

      setFormValues(array);
      setDependencies(dep_arr);
      setLoading(false);
      setSecDep(second_dep);
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
        ) {
          new_arr.push(child);
        }

        if (child.name === 'Implementation_date' && child.form_value === 'before_april_1_2022') {
          new_arr.push(child);
        }
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
            intro="Energy Savings Scheme and Peak Demand Reduction Scheme"
            title="Safeguard Certificate Estimator"
          />
        </div>
      )}

      <div className="nsw-container" style={{ marginTop: '1rem' }}>
        {!IS_DRUPAL_PAGES && stepNumber !== 2 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-10">
              <h2 className="nsw-content-block__title">Core eligibility requirements</h2>
              <br></br>
              <p className="nsw-content-block__copy">
                The following questions assess the core eligibility requirements for the{' '}
                <a
                  href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/energy-savings-scheme"
                  target="_blank"
                >
                  Energy Savings Scheme
                </a>{' '}
                and{' '}
                <a
                  href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/peak-demand-reduction-scheme"
                  target="_blank"
                >
                  Peak Demand Reduction Scheme
                </a>
                .{' '}
              </p>
              <p className="nsw-content-block__copy">
                Answer the questions and check your eligibility. If ineligible, you will be shown
                the relevant answers and their corresponding rule clauses.
              </p>
              <p className="nsw-content-block__copy">
                Please note the results are a guide only and cannot be promoted or published.
              </p>
            </div>
          </div>
        )}

        {stepNumber === 2 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-10">
              <h2 className="nsw-content-block__title">Core eligibility requirements</h2>
            </div>
          </div>
        )}

        <ProgressIndicator step={stepNumber} of={2} style={{ width: '80%' }} />

        <Fragment>
          {loading && <SpinnerFullscreen />}
          {!loading && (
            <>
              {stepNumber === 1 && (
                <FormGroup
                label="What is your interest in the scheme?"
                helper="Select the option that best describes you"
                className="nsw-m-bottom-xs nsw-m-top-md"
                htmlId="user-type"
              >
                <Select
                  htmlId="user-type"
                  style={{ maxWidth: '50%' }}
                  options={USER_TYPE_OPTIONS}
                  onChange={(e) => {
                    setUserType(e.target.value);
                    updateEstimatorFormAnalytics({
                      userType: e.target.value
                    })
                  }}
                  value={userType}
                  required
                />
              </FormGroup>
              )}
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
                showError={showError}
                setShowError={setShowError}
                backAction={(e) => {
                  setStepNumber(stepNumber - 1);
                }}
              />
            </>
          )}
        </Fragment>
      </div>
      {stepNumber === 2 && (
        <>
          <FeedbackComponent />
          {!IS_DRUPAL_PAGES && (
            <div className="nsw-container">
              <div className="nsw-col-md-12" style={{ paddingTop: '9%', width: '80%' }}>
                <h4>More options</h4>
                <br></br>
                <div class="nsw-grid nsw-grid--spaced">
                  <div class="nsw-col nsw-col-md-4" style={{ height: '12vw' }}>
                    <div class="nsw-card nsw-card--light nullnsw-card--headline" href="/">
                      <div class="nsw-card__content null">
                        <div class="nsw-card__title">
                          <a href="#certificate-estimation" class="nsw-card__link">
                            Estimate certificates for an activity
                          </a>
                        </div>
                        <span
                          class="material-icons nsw-material-icons nsw-card__icon"
                          focusable="false"
                          aria-hidden="true"
                        >
                        east
                      </span>
                      </div>
                    </div>
                  </div>

                  <div class="nsw-col nsw-col-md-4" style={{ height: '12vw' }}>
                    <div class="nsw-card nsw-card--light nullnsw-card--headline" href="/">
                      <div class="nsw-card__content null">
                        <div class="nsw-card__title">
                          <a href="#eligibility" class="nsw-card__link">
                            Check eligibility for an activity
                          </a>
                        </div>
                        <span
                          class="material-icons nsw-material-icons nsw-card__icon"
                          focusable="false"
                          aria-hidden="true"
                        >
                        east
                      </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Fragment>
  );
}
