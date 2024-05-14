import React, { Fragment, useEffect, useState } from 'react';

// Import services
import moment from 'moment';

// Import components
import CalculateBlock from 'components/calculate/CalculateBlock';

import Button from 'nsw-ds-react/button/button';
import { FormGroup, FormGroupSelect, TextInput } from 'nsw-ds-react/forms';
import { Notification } from 'nsw-ds-react/notification/notification';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import OpenFiscaApi from 'services/openfisca_api';
import Alert from 'nsw-ds-react/alert/alert';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';

export default function LoadClausesF16_gas(props) {
  const {
    variableToLoad,
    variables,
    entities,
    setStepNumber,
    stepNumber,
    formValues,
    setFormValues,
    dependencies,
    clausesForm,
    setClausesForm,
    showError,
    setShowError,
  } = props;

  console.log(variableToLoad);

  const [variable, setVariable] = useState({}); // all info about variable

  var today = new Date();
  const [calculationDate, setCalculationDate] = useState(moment(today).format('YYYY-MM-DD'));
  const [dateInvalid, setDateInvalid] = useState(false);

  const [calculationResult, setCalculationResult] = useState(null);
  const [calculationError, setCalculationError] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (stepNumber === 1) {
      setCalculationResult(null);
    }
  }, [stepNumber]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    OpenFiscaApi.getVariable(variableToLoad)
      .then((res) => {
        setVariable(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [variableToLoad]);

  const formatResultString = (result) => {
    if (typeof result === 'boolean') {
      if (result === true) {
        return 'you have met the activity eligibility requirements';
      } else {
        return 'you have NOT met the activity eligibility requirements';
      }
    }

    return JSON.stringify(result) + ' kW';
  };

  const formatBooleanToString = (result) => {
    return result === true ? 'Yes' : 'No';
  };

  if (!variable) return null;

  return (
    <div className style={{ marginBottom: '7%' }}>
      <br></br>
      {stepNumber === 2 && loading && !showError && <SpinnerFullscreen />}

      {stepNumber === 2 && calculationError && showError && (
        <Alert as="error" title="Sorry!" style={{ width: '80%' }}>
          <p>We are experiencing technical difficulties right now, please try again later.</p>
        </Alert>
      )}
      <div></div>
      <div>
        {stepNumber === 1 && (
          <Fragment>
            <div className="nsw-row">
              <div className="nsw-col">
                <br></br>
                <div className="nsw-content-block">
                  <div className="nsw-content-block__content">
                    {/* <h3 className="nsw-content-block__title">
                      What would you like to calculate savings for?
                    </h3>

                    <FormGroupSelect
                      label="What activity are you calculating savings for?" // primary label
                      helper="Select a variable below." // helper text (secondary label)
                      options={dropdownOptions}
                      value={variable.name}
                      onChange={(e) => {
                        setVariable(variables.find((item) => item.name === e.target.value));
                      }}
                    ></FormGroupSelect>
                    <FormGroup
                      label="What is the activity date?"
                      helper="What date did the energy saving activity occur?"
                      errorText="The date provided is invalid!"
                      status={dateInvalid && 'invalid'}
                    >
                      <TextInput
                        as="input"
                        type="date"
                        status={dateInvalid && 'invalid'}
                        placeholder="Enter value"
                        value={calculationDate}
                        onChange={(e) => setCalculationDate(e.target.value)}
                      />
                    </FormGroup> */}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="nsw-row">
              <div className="nsw-col">
                <Button
                  as="primary"
                  onClick={(e) => {
                    setStepNumber(stepNumber + 1);
                  }}
                  style={{ float: 'right' }}
                >
                  Check Schemes Base Eligibility
                </Button>
              </div>
            </div> */}
          </Fragment>
        )}

        {stepNumber === 1 && (
          <Fragment>
            <CalculateBlock
              calculationDate={calculationDate}
              variable={variable}
              variables={variables}
              entities={entities}
              calculationResult={calculationResult}
              setCalculationResult={setCalculationResult}
              setCalculationError={setCalculationError}
              stepNumber={stepNumber}
              setStepNumber={setStepNumber}
              formValues={formValues}
              setFormValues={setFormValues}
              backAction={(e) => {
                setStepNumber(stepNumber - 1);
              }}
              dependencies={dependencies}
              workflow={'eligibility'}
              loading={loading}
              setLoading={setLoading}
              showError={showError}
              setShowError={setShowError}
            />
          </Fragment>
        )}

        {stepNumber === 2 && calculationResult !== null && (
          <Fragment>
            {
              <div style={{ marginTop: '5%' }}>
                <Alert as="info" title="Activity Requirements" style={{ width: '80%' }}>
                  <p>
                    {/* <h4 className="nsw-content-block__title" style={{ textAlign: 'center' }}> */}
                    Based on the information you have provided{' '}
                    {formatResultString(calculationResult)}.
                  </p>
                </Alert>

                {calculationResult === false && (
                  <Alert
                    as="warning"
                    title="The following answers were ineligible:"
                    style={{ width: '80%' }}
                  >
                    <p>
                      {clausesForm.length > 0 &&
                        clausesForm.map((item, i) => (
                          <React.Fragment>
                            <br></br>
                            <br></br>
                            <div class="nsw-global-alert__title">
                              {item.metadata.display_question} :{' '}
                              {formatBooleanToString(item.form_value)}
                            </div>
                            <p style={{ whiteSpace: 'pre-line' }}>
                              {item.metadata.eligibility_clause &&
                                item.metadata.eligibility_clause.split('<br />').join('\n')}
                            </p>
                            <br></br>
                          </React.Fragment>
                        ))}
                    </p>
                  </Alert>
                )}
              </div>
            }
          </Fragment>
        )}

        {stepNumber === 2 && (
          <Fragment>
            <div className="nsw-row">
              <div
                className="nsw-col-md-9"
                style={{ padding: 'inherit', marginTop: '5%', marginBottom: '5%' }}
              >
                <Button
                  style={{ float: 'left' }}
                  as="dark"
                  onClick={(e) => {
                    setClausesForm([]);
                    setStepNumber(stepNumber - 1);
                  }}
                >
                  Check activity requirements again
                </Button>
              </div>

              <div className="nsw-col-md-12" style={{ width: '80%' }}>
                <hr
                  style={{
                    background: 'black',
                    height: '1.5px',
                  }}
                />
              </div>

              <div className="nsw-col-md-12" style={{ paddingTop: '9%', width: '80%' }}>
                <h4>More options</h4>
                <br></br>

                <div class="nsw-grid nsw-grid--spaced">
                  <div class="nsw-col nsw-col-md-4" style={{ height: '12vw' }}>
                    <div class="nsw-card nsw-card--light nullnsw-card--headline" href="/">
                      <div class="nsw-card__content null">
                        <div class="nsw-card__title">
                          <a href="#" class="nsw-card__link">
                            Back to estimator homepage
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
                          <a href="/#core-eligibility" class="nsw-card__link">
                            Check core eligibility
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
                          <a
                            href="/#commercial-gas-to-heat-pump-water-heater-certificates"
                            class="nsw-card__link"
                          >
                            Estimate certificates for this activity
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
          </Fragment>
        )}
      </div>
    </div>
  );
}
