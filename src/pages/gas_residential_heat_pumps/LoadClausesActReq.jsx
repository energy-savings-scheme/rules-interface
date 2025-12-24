import React, { Fragment, useEffect, useState } from 'react';

// Import services
import moment from 'moment';

// Import components
import CalculateBlock from 'components/calculate/CalculateBlock';
import { focusElement } from 'lib/helper';
import Button from 'nsw-ds-react/button/button';
import OpenFiscaApi from 'services/openfisca_api';
import Alert from 'nsw-ds-react/alert/alert';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';

export default function LoadClausesD19(props) {
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
    onValidateUserType,
  } = props;

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

  useEffect(() => {
    if (calculationError && showError) {
      focusElement('error-calculation');
    }
  }, [calculationError, showError]);

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
      {stepNumber === 2 && loading && !showError && <SpinnerFullscreen />}

      {stepNumber === 2 && calculationError && showError && (
        <Alert
          as="error"
          customTitle={<h3 dangerouslySetInnerHTML={{ __html: 'Sorry!' }} />}
          id="error-calculation"
          className="nsw-col-lg-10"
          tabIndex="-1"
        >
          <p>We are experiencing technical difficulties right now, please try again later.</p>
        </Alert>
      )}

      <div>
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
              onValidateUserType={onValidateUserType}
            />
          </Fragment>
        )}

        {stepNumber === 2 && calculationResult !== null && (
          <Fragment>
            {
              <div style={{ marginTop: '5%' }}>
                <Alert
                  as="info"
                  customTitle={<h3 dangerouslySetInnerHTML={{ __html: 'Activity Requirements' }} />}
                  className="nsw-col-lg-10"
                >
                  <p>
                    {/* <h4 className="nsw-content-block__title" style={{ textAlign: 'center' }}> */}
                    Based on the information you have provided{' '}
                    {formatResultString(calculationResult)}.
                  </p>
                </Alert>

                {calculationResult === false && (
                  <Alert
                    as="warning"
                    customTitle={
                      <h3
                        dangerouslySetInnerHTML={{
                          __html: 'The following answers were ineligible:',
                        }}
                      />
                    }
                    className="nsw-col-lg-10"
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
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
