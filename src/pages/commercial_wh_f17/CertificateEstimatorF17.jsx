import React, { Fragment, useState, useEffect } from 'react';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import Button from 'nsw-ds-react/button/button';
import RegistryApi from 'services/registry_api';
import CertificateEstimatorLoadClausesF17 from './CertificateEstimatorLoadClausesF17';
import { FormGroup, TextInput, Select } from 'nsw-ds-react/forms';
import OpenFiscaApi from 'services/openfisca_api';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';
import HeroBanner from 'nsw-ds-react/heroBanner/heroBanner';
import Alert from 'nsw-ds-react/alert/alert';
import { IS_DRUPAL_PAGES } from 'types/app_variables';
import { USER_TYPE_OPTIONS } from 'constant/user-type';
import { BASE_COMMERCIAL_HEAT_PUMP_ESTIMATOR_ANALYTICS_DATA } from 'constant/base-analytics-data';
import {
  updateEstimatorFormAnalytics,
  updateFeedbackFormAnalytics,
  updateSearchCaptureAnalytics,
  updateSegmentCaptureAnalytics,
} from 'lib/analytics';
import FeedbackComponent from 'components/feedback/feedback';
import MoreOptionsCard from 'components/more-options-card/more-options-card';
import { F17_ESC_calculation } from 'types/openfisca_variables';

export default function CertificateEstimatorF17(props) {
  const { entities, variables, brands } = props;

  const [formValues, setFormValues] = useState([]);
  const [stepNumber, setStepNumber] = useState(1);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [dropdownOptionsModels, setDropdownOptionsModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [models, setModels] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [calculationResult, setCalculationResult] = useState(null);
  const [calculationError, setCalculationError] = useState(false);
  const [calculationError2, setCalculationError2] = useState(false);
  const [postcode, setPostcode] = useState(null);
  const [calculationResult2, setCalculationResult2] = useState(null);
  const [zone, setZone] = useState(0);
  const [registryData, setRegistryData] = useState(true);
  const [persistFormValues, setPersistFormValues] = useState([]);
  const [flow, setFlow] = useState(null);
  const [showPostcodeError, setShowPostcodeError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showNoResponsePostcodeError, setShowNoResponsePostcodeError] = useState(false);
  const [lastModified, setLastModified] = useState('');
  const [annualEnergySavingsNumber, setAnnualEnergySavingsNumber] = useState(0);
  const [peakDemandReductionSavingsNumber, setPeakDemandReductionSavingsNumber] = useState(0);
  const [userType, setUserType] = useState('');
  const [escMinPrice, setEscMinPrice] = useState(0);
  const [escMaxPrice, setEscMaxPrice] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    updateEstimatorFormAnalytics(BASE_COMMERCIAL_HEAT_PUMP_ESTIMATOR_ANALYTICS_DATA);
    updateFeedbackFormAnalytics(BASE_COMMERCIAL_HEAT_PUMP_ESTIMATOR_ANALYTICS_DATA);
  }, []);

  useEffect(() => {
    if (annualEnergySavingsNumber < 0) {
      setAnnualEnergySavingsNumber(0);
    }
  }, [annualEnergySavingsNumber]);

  useEffect(() => {
    if (peakDemandReductionSavingsNumber < 0) {
      setPeakDemandReductionSavingsNumber(0);
    }
  }, [peakDemandReductionSavingsNumber]);

  // For brands
  const populateDropDown = (newOption) => {
    setDropdownOptions((prev) => {
      return [...prev, newOption];
    });
  };

  // For models   {text: abc, value: abc}
  const populateModelDropDown = (newOption) => {
    setDropdownOptionsModels((prev) => {
      return [...prev, newOption];
    });
  };

  useEffect(() => {
    if (postcode && postcode.length < 4) {
      setShowPostcodeError(false);
    }
  }, [postcode]);

  RegistryApi.getCommercialWHLastModified('commercial_wh')
    .then((res) => {
      setLastModified(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  const validatePostcode = (postcode) => {
    if (['2817', '2818', '2819'].includes(postcode)) {
      setFlow(null);
      setStepNumber(stepNumber + 1);
      setShowPostcodeError(false);
    } else {
      RegistryApi.getPostcodeValidation(postcode)
        .then((res) => {
          const persons = res.data;
          if (
            persons.status === '200' &&
            persons.code === '200' &&
            persons.data.postcode &&
            persons.data.postcode === postcode
          ) {
            if (persons.data['state'] === 'NSW') {
              setShowPostcodeError(false);
              setShowNoResponsePostcodeError(false);
              setFlow(null);
              setStepNumber(stepNumber + 1);
            } else {
              setShowPostcodeError(true);
              setShowNoResponsePostcodeError(false);
            }
          } else if (persons.status === '200' && persons.code === '404') {
            setShowPostcodeError(true);
            setShowNoResponsePostcodeError(false);
          } else if (persons.status !== '200') {
            setShowPostcodeError(false);
            setShowNoResponsePostcodeError(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setShowNoResponsePostcodeError(true);
        });
    }
  };

  useEffect(() => {
    setDropdownOptionsModels([{ value: '', text: 'Please select model' }]);
    models.forEach((item) => populateModelDropDown({ text: item, value: item }));
  }, [models]);

  useEffect(() => {
    if (!selectedBrand) return null;
    if (!selectedModel) return null;

    var payload = {
      brand: selectedBrand,
      model: selectedModel,
    };
    RegistryApi.getWHModelsMetadata(payload)
      .then((res) => {
        setMetadata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedModel]);

  useEffect(() => {
    setDropdownOptions([{ value: '', text: 'Please select brand' }]);

    brands.forEach((item) => populateDropDown({ text: item, value: item }));
  }, [brands]);

  useEffect(() => {
    RegistryApi.listWHModels(selectedBrand)
      .then((res) => {
        setModels(res.data);
        setRegistryData(true);
      })
      .catch((err) => {
        console.log(err);
        setRegistryData(false);
      });
  }, [selectedBrand]);

  useEffect(() => {
    const payload = {
      buildings: {
        building_1: {
          F17_ESS__postcode: { '2023-01-01': postcode },
          WH1_get_HP_zone_by_BCA_climate_zone: { '2023-01-01': null },
        },
      },
      persons: {
        person1: {},
      },
    };

    OpenFiscaApi.postCalculate(payload)
      .then((res) => {
        var result =
          res.data.buildings.building_1['WH1_get_HP_zone_by_BCA_climate_zone']['2023-01-01'];
        setZone(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postcode]);

  useEffect(() => {
    const fetchCertificatePrice = async function () {
      try {
        const response = await RegistryApi.getCertificatePrice()
        setEscMinPrice(Number(response.data.ESC.min_price))
        setEscMaxPrice(Number(response.data.ESC.max_price))
      } catch (e) {
        console.log(e)
      }
    }

    fetchCertificatePrice()
  }, []);

  return (
    <Fragment>
      {/* Search section */}
      {!IS_DRUPAL_PAGES && (
        <div style={{ marginTop: '1rem' }}>
          <HeroBanner
            wide
            style="dark"
            image={{
              alt: 'commercial wh',
              src: '/F17(optimised).jpg',
            }}
            intro="Commercial"
            title="Install a new air source heat pump - certificates"
          />
        </div>
      )}

      <div className="nsw-container">
        <br></br>
        <br></br>
        {!IS_DRUPAL_PAGES && stepNumber !== 3 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-10">
              <p className="nsw-content-block__copy">
                Estimate the energy savings certificates (ESCs) for the commercial heat pump water
                heater activity (F17 in the{' '}
                <a
                  href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/energy-savings-scheme"
                  target="_blank"
                  rel="noreferrer"
                >
                  Energy Savings Scheme
                </a>
                ) by answering the following questions. Note that a replacement activity will not
                generate ESCs.
              </p>
              <p className="nsw-content-block__copy">
                Note that this activity is only eligible for the Energy Savings Scheme, and is not
                eligible for the Peak Demand Reduction scheme. As this is a new installation
                activity, replacement to a heat pump will not generate certificates.
              </p>
              <p className="nsw-content-block__copy">
                Where possible, commercial heat pump water heater specifications are automatically
                pulled in at the end of each week from the{' '}
                <a
                  href="https://tessa.energysustainabilityschemes.nsw.gov.au/ipart?id=accepted_products"
                  target="_blank"
                  rel="noreferrer"
                >
                  Independent Pricing and Regulatory Tribunal (IPART) Product Registry
                </a>{' '}
                based on brand and model, but you may also enter your own values.
              </p>
              <p className="nsw-content-block__copy">
                Please keep in mind that the results are a guide only and cannot be promoted or
                published.
              </p>
            </div>
          </div>
        )}

        {/* {stepNumber === 3 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-10">
              <h2 className="nsw-content-block__title">
                Commercial Heat Pump Water Heater certificate estimator
              </h2>
            </div>
          </div>
        )} */}

        <ProgressIndicator step={stepNumber} of={3} style={{ width: '80%' }} />

        {stepNumber === 3 && loading && !showError && <SpinnerFullscreen />}

        <Fragment>
          {stepNumber === 3 && calculationError && calculationError2 && showError && (
            <Alert as="error" title="Sorry!" style={{ width: '80%' }}>
              <p>We are experiencing technical difficulties right now, please try again later.</p>
            </Alert>
          )}

          {stepNumber === 1 && (
            <div className="nsw-row">
              <div className="nsw-col" style={{ padding: 'inherit' }}>
                <div className="nsw-content-block">
                  <br></br>
                  <br></br>
                  <div className="nsw-content-block__content">
                    <h5 className="nsw-content-block__copy" style={{ paddingBottom: '30px' }}>
                      <b>Please answer the following questions to calculate your ESCs</b>
                    </h5>

                    <FormGroup
                      label="What is your interest in the scheme?"
                      helper="Select the option that best describes you"
                      htmlId="user-type"
                    >
                      <Select
                        htmlId="user-type"
                        style={{ maxWidth: '50%' }}
                        options={USER_TYPE_OPTIONS}
                        onChange={(e) => {
                          setUserType(e.target.value);
                        }}
                        value={userType}
                        required
                      />
                    </FormGroup>

                    <FormGroup
                      label="Postcode"
                      helper="Postcode where the installation has taken place" // helper text (secondary label)
                      errorText="Invalid value!" // error text if invalid
                    >
                      <TextInput
                        style={{ maxWidth: '50%' }}
                        as="input"
                        type="number"
                        placeholder="Enter postcode"
                        value={postcode}
                        onChange={(e) => {
                          setPostcode(e.target.value);
                        }}
                        required
                      />
                    </FormGroup>
                    <FormGroup
                      label="Brand"
                      helper="Select commercial water heater brand" // primary question text
                      errorText="Invalid value!" // error text if invalid
                    >
                      <Select
                        style={{ maxWidth: '50%' }}
                        options={dropdownOptions}
                        onChange={(e) => {
                          setSelectedBrand(brands.find((item) => item === e.target.value));
                          setSelectedModel('');
                        }}
                        value={selectedBrand}
                        required
                      />
                    </FormGroup>

                    <FormGroup
                      label="Model"
                      helper="Select commercial water heater model" // primary question text
                      errorText="Invalid value!" // error text if invalid
                    >
                      <Select
                        style={{ maxWidth: '50%' }}
                        options={dropdownOptionsModels}
                        onChange={(e) => {
                          setSelectedModel(models.find((item) => item === e.target.value));
                        }}
                        value={selectedModel}
                        required
                      />
                    </FormGroup>

                    <p style={{ fontSize: '14px', marginBottom: '2%' }}>
                      {' '}
                      Updated from product registry: {lastModified}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {stepNumber === 2 && (
            <CertificateEstimatorLoadClausesF17
              variableToLoad1={F17_ESC_calculation}
              variableToLoad2={F17_ESC_calculation}
              annualEnergySavings={'F17_annual_energy_savings'}
              peakDemandReductionSavings={'F17_annual_energy_savings'}
              variables={variables}
              entities={entities}
              metadata={metadata}
              calculationResult={calculationResult}
              setCalculationResult={setCalculationResult}
              calculationError={calculationError}
              calculationError2={calculationError2}
              setCalculationError={setCalculationError}
              setCalculationError2={setCalculationError2}
              zone={zone}
              postcode={postcode}
              calculationResult2={calculationResult2}
              setCalculationResult2={setCalculationResult2}
              stepNumber={stepNumber}
              setStepNumber={setStepNumber}
              persistFormValues={persistFormValues}
              setPersistFormValues={setPersistFormValues}
              formValues={formValues}
              setFormValues={setFormValues}
              flow={flow}
              setFlow={setFlow}
              selectedBrand={selectedBrand}
              selectedModel={selectedModel}
              loading={loading}
              setLoading={setLoading}
              showError={showError}
              setShowError={setShowError}
              annualEnergySavingsNumber={annualEnergySavingsNumber}
              setAnnualEnergySavingsNumber={setAnnualEnergySavingsNumber}
              peakDemandReductionSavingsNumber={peakDemandReductionSavingsNumber}
              setPeakDemandReductionSavingsNumber={setPeakDemandReductionSavingsNumber}
              backAction={(e) => {
                setStepNumber(stepNumber - 1);
              }}
              escMinPrice={escMinPrice}
              escMaxPrice={escMaxPrice}
            />
          )}

          {stepNumber === 1 && !registryData && (
            <Alert as="error" title="Sorry! An error has occurred.">
              <p>Unable to load data from the product registry. Please try again later.</p>
            </Alert>
          )}

          {stepNumber === 2 && loading && <SpinnerFullscreen />}

          {stepNumber === 1 && showPostcodeError && postcode.length >= 4 && (
            <Alert as="error" title="The postcode is not valid in NSW">
              <p>Please check your postcode and try again.</p>
            </Alert>
          )}

          {stepNumber === 1 && showNoResponsePostcodeError && postcode.length >= 4 && (
            <Alert as="error" title="Sorry!">
              <p>
                We are experiencing technical difficulties validating the postcode, please try again
                later.
              </p>
            </Alert>
          )}

          {stepNumber === 3 && (
            <CertificateEstimatorLoadClausesF17
              variableToLoad1={F17_ESC_calculation}
              variableToLoad2={F17_ESC_calculation}
              annualEnergySavings={'F17_annual_energy_savings'}
              peakDemandReductionSavings={'F17_annual_energy_savings'}
              variables={variables}
              entities={entities}
              metadata={metadata}
              calculationResult={calculationResult}
              setCalculationResult={setCalculationResult}
              calculationError={calculationError}
              setCalculationError={setCalculationError}
              calculationResult2={calculationResult2}
              setCalculationResult2={setCalculationResult2}
              stepNumber={stepNumber}
              setStepNumber={setStepNumber}
              formValues={formValues}
              setFormValues={setFormValues}
              persistFormValues={persistFormValues}
              setPersistFormValues={setPersistFormValues}
              selectedBrand={selectedBrand}
              selectedModel={selectedModel}
              flow={flow}
              setFlow={setFlow}
              loading={loading}
              setLoading={setLoading}
              showError={showError}
              setShowError={setShowError}
              annualEnergySavingsNumber={annualEnergySavingsNumber}
              setAnnualEnergySavingsNumber={setAnnualEnergySavingsNumber}
              peakDemandReductionSavingsNumber={peakDemandReductionSavingsNumber}
              setPeakDemandReductionSavingsNumber={setPeakDemandReductionSavingsNumber}
              escMinPrice={escMinPrice}
              escMaxPrice={escMaxPrice}
            />
          )}

          {stepNumber === 1 &&
            registryData &&
            postcode &&
            postcode.length === 4 &&
            selectedBrand &&
            selectedModel &&
            userType && (
              <div className="nsw-row" style={{ paddingTop: '30px', width: '80%' }}>
                <div className="nsw-col" style={{ padding: 'inherit' }}>
                  <Button
                    as="dark"
                    onClick={(e) => {
                      validatePostcode(postcode);
                      updateSearchCaptureAnalytics(postcode, selectedBrand, selectedModel);
                      updateSegmentCaptureAnalytics(userType);
                    }}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
        </Fragment>
      </div>
      {stepNumber === 3 && (
        <>
          <FeedbackComponent />
          {!IS_DRUPAL_PAGES && (
            <div className="nsw-container">
              <div
                className="nsw-row"
                style={{
                  padding: 'inherit',
                  marginTop: '5%',
                  marginBottom: '5%',
                }}
              >
                <MoreOptionsCard
                  options={[
                    {
                      title: 'Review eligibility for this activity',
                      link: '/#commercial-new-heat-pump-water-heater-eligibility',
                    },
                  ]}
                />
              </div>
            </div>
          )}
        </>
      )}
    </Fragment>
  );
}
