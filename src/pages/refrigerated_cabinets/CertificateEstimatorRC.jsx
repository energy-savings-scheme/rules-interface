import React, { Fragment, useState, useEffect } from 'react';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import Button from 'nsw-ds-react/button/button';
import { FormGroup, TextInput, Select } from 'nsw-ds-react/forms';
import RegistryApi from 'services/registry_api';
import OpenFiscaAPI from 'services/openfisca_api';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';
import CertificateEstimatorLoadClausesRC from './CertificatEstimatorLoadClausesRC';
import HeroBanner from 'nsw-ds-react/heroBanner/heroBanner';
import Alert from 'nsw-ds-react/alert/alert';
import { IS_DRUPAL_PAGES } from 'types/app_variables';
import { USER_TYPE_OPTIONS } from 'constant/user-type';
import {BASE_COMMERCIAL_REFRIGERATED_CABINET_ESTIMATOR_ANALYTICS_DATA} from 'constant/base-analytics-data';
import {
  updateEstimatorFormAnalytics,
  updateFeedbackFormAnalytics,
  updateSearchCaptureAnalytics,
  updateSegmentCaptureAnalytics
} from 'lib/analytics';
import { focusElement } from 'lib/helper';
import FeedbackComponent from 'components/feedback/feedback';
import MoreOptionsCard from 'components/more-options-card/more-options-card';

export default function CertificateEstimatorRC(props) {
  const { entities, variables, RF2Brands, setVariables, setEntities, setRF2Brands } = props;

  const [formValues, setFormValues] = useState([]);
  const [stepNumber, setStepNumber] = useState(1);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [dropdownOptionsModels, setDropdownOptionsModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [models, setModels] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [calculationResult, setCalculationResult] = useState(null);
  const [calculationResult2, setCalculationResult2] = useState(null);
  const [calculationError, setCalculationError] = useState(false);
  const [calculationError2, setCalculationError2] = useState(false);
  const [postcode, setPostcode] = useState(null);
  const [zone, setZone] = useState(null);
  const [registryData, setRegistryData] = useState(true);
  const [flow, setFlow] = useState(null);
  const [persistFormValues, setPersistFormValues] = useState([]);
  const [productClassOptions, setProductClassOptions] = useState([]);
  const [selectedProductClass, setSelectedProductClass] = useState(null);
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
  const [prcMinPrice, setPrcMinPrice] = useState(0);
  const [prcMaxPrice, setPrcMaxPrice] = useState(0);

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

  useEffect(() => {
    window.scrollTo(0, 0);
    updateEstimatorFormAnalytics(BASE_COMMERCIAL_REFRIGERATED_CABINET_ESTIMATOR_ANALYTICS_DATA);
    updateFeedbackFormAnalytics(BASE_COMMERCIAL_REFRIGERATED_CABINET_ESTIMATOR_ANALYTICS_DATA);

    setDropdownOptions([{ value: '', text: 'Please select brand' }]);

    setProductClassOptions([
      { value: '', text: 'Please select product class' },
      { value: 'Class 12', text: 'Class 12' },
      { value: 'Class 13', text: 'Class 13' },
      { value: 'Class 14', text: 'Class 14' },
      { value: 'Class 15', text: 'Class 15' },
    ]);

    if (variables.length < 1) {
      OpenFiscaAPI.listEntities()
        .then((res) => {
          setEntities(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (calculationError && calculationError2 && showError) {
      focusElement("error-calculation");
    }
  }, [calculationError, calculationError2, showError])

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

  useEffect(() => {
    const fetchCertificatePrice = async function () {
      try {
        const response = await RegistryApi.getCertificatePrice()
        setEscMinPrice(Number(response.data.ESC.min_price))
        setEscMaxPrice(Number(response.data.ESC.max_price))
        setPrcMinPrice(Number(response.data.PRC.min_price))
        setPrcMaxPrice(Number(response.data.PRC.max_price))
      } catch (e) {
        console.log(e)
      }
    }

    fetchCertificatePrice()
  }, []);

  if (lastModified.length == 0) {
    RegistryApi.getRF2LastModified()
      .then((res) => {
        setLastModified(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
              focusElement("error-postcode");
            }
          } else if (persons.status === '200' && persons.code === '404') {
            setShowPostcodeError(true);
            setShowNoResponsePostcodeError(false);
            focusElement("error-postcode");
          } else if (persons.status !== '200') {
            setShowPostcodeError(false);
            setShowNoResponsePostcodeError(true);
            focusElement("error-postcode-response");
          }
        })
        .catch((err) => {
          console.log(err);
          setShowNoResponsePostcodeError(true);
          focusElement("error-postcode-response");
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
    RegistryApi.getRF2ModelsMetadata(payload)
      .then((res) => {
        setMetadata(res.data);
        setSelectedProductClass(`Class ${res.data.product_class_number}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedModel]);

  useEffect(() => {
    if (RF2Brands.length > 1) {
      RF2Brands.forEach((item) => populateDropDown({ text: item, value: item }));
    }
  }, [RF2Brands]);

  useEffect(() => {
    RegistryApi.listRF2Models(selectedBrand)
      .then((res) => {
        setModels(res.data);
        setRegistryData(true);
      })
      .catch((err) => {
        console.log(err);
        setRegistryData(false);
        focusElement("error-data-registry");
      });
  }, [selectedBrand]);

  return (
    <Fragment>
      {!IS_DRUPAL_PAGES && (
        <div style={{ marginTop: '1rem' }}>
          <HeroBanner
            wide
            style="dark"
            image={{
              alt: 'RF2',
              src: '/CommercialRefrigeratedCabinet.jpg',
            }}
            intro="Commercial"
            title="Refrigerated cabinet - certificates"
          />
        </div>
      )}

      <div className="nsw-container" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <br></br>
        <br></br>
        {!IS_DRUPAL_PAGES && stepNumber !== 3 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-10">
              <h2 className="nsw-content-block__title">
                Commercial Refrigerated Cabinet certificate estimator
              </h2>
              <br></br>
              <p className="nsw-content-block__copy">
                Estimate the energy savings certificates (ESCs) and peak reduction certificates
                (PRCs) for the Commercial refrigerated cabinet activity (F1.2 in the{' '}
                <a
                  href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/energy-savings-scheme"
                  target="_blank"
                  rel="noreferrer"
                >
                  Energy Savings Scheme
                </a>{' '}
                and RF2 in the{' '}
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
                Where possible, residential and small business air conditioner specifications are
                automatically updated at the end of each week from the{' '}
                <a
                  href="https://reg.energyrating.gov.au/comparator/product_types/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Greenhouse & Energy Minimum Standards (GEMS) Registry
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

        {!IS_DRUPAL_PAGES && stepNumber === 3 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-12">
              <h2 className="nsw-content-block__title">
                Commercial Refrigerated Cabinet certificate estimator
              </h2>
            </div>
          </div>
        )}

        <ProgressIndicator step={stepNumber} of={3} style={{ marginTop: '3rem' }} className="nsw-col-lg-10" />

        {stepNumber === 3 && loading && !showError && <SpinnerFullscreen />}

        <Fragment>
          {stepNumber === 3 && calculationError && calculationError2 && showError && (
            <Alert as="error" customTitle={
              <h3 dangerouslySetInnerHTML={{__html: "Sorry!"}}/>
            } id="error-calculation" className="nsw-col-lg-10" tabIndex="-1">
              <p>We are experiencing technical difficulties right now, please try again later.</p>
            </Alert>
          )}

          {stepNumber === 1 && (
            <div className="nsw-row">
              <div className="nsw-col" style={{ padding: 'inherit' }}>
                <div className="nsw-content-block">
                  <br></br>
                  <br></br>
                  <br></br>
                  <div className="nsw-content-block__content">
                    <p className="nsw-content-block__copy" style={{ paddingBottom: '30px' }}>
                      <b>Please answer the following questions to calculate your ESCs and PRCs</b>
                    </p>

                    <FormGroup
                      htmlId="user-type"
                      label="What is your interest in the scheme?"
                      helper="Select the option that best describes you"
                    >
                      <Select
                        htmlId="user-type"
                        className="nsw-col-lg-6"
                        options={USER_TYPE_OPTIONS}
                        onChange={(e) => {
                          setUserType(e.target.value);
                        }}
                        value={userType}
                        required
                      />
                    </FormGroup>

                    <FormGroup
                      htmlId="postcode"
                      label="Postcode"
                      helper="Postcode where the installation has taken place" // helper text (secondary label)
                      errorText="Invalid value!" // error text if invalid
                    >
                      <TextInput
                        htmlId="postcode"
                        className="nsw-col-lg-6"
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
                      htmlId="brand"
                      label="Brand"
                      helper="Select refrigerated cabinet brand" // primary question text
                      errorText="Invalid value!" // error text if invalid
                    >
                      <Select
                        htmlId="brand"
                        className="nsw-col-lg-6"
                        options={dropdownOptions}
                        onChange={(e) => {
                          setSelectedBrand(RF2Brands.find((item) => item === e.target.value));
                          setSelectedModel('');
                          setSelectedProductClass('')
                        }}
                        value={selectedBrand}
                        required
                      />
                    </FormGroup>

                    <FormGroup
                      htmlId="model"
                      label="Model"
                      helper="Select refrigerated cabinet model" // primary question text
                      errorText="Invalid value!" // error text if invalid
                    >
                      <Select
                        htmlId="model"
                        className="nsw-col-lg-6"
                        options={dropdownOptionsModels}
                        onChange={(e) => {
                          setSelectedModel(models.find((item) => item === e.target.value));
                        }}
                        value={selectedModel}
                        required
                      />
                    </FormGroup>

                    <FormGroup
                      htmlId="product-class"
                      label="Product Class"
                      helper="Refrigerated Cabinet Product Class (Product Characteristics Code)" // primary question text
                      errorText="Invalid value!" // error text if invalid
                    >
                      <Select
                        htmlId="product-class"
                        className="nsw-col-lg-6"
                        options={productClassOptions}
                        onChange={(e) => {
                          setSelectedProductClass(e.target.value);
                        }}
                        value={selectedProductClass}
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

          {stepNumber === 1 && !registryData && (
            <Alert as="error" customTitle={
              <h3 dangerouslySetInnerHTML={{__html: "Sorry! An error has occurred."}}/>
            } id="error-data-registry" className="nsw-col-lg-10" tabIndex="-1">
              <p>Unable to load data from the product registry. Please try again later.</p>
            </Alert>
          )}

          {stepNumber === 2 && loading && <SpinnerFullscreen />}

          {stepNumber === 2 && (
            <CertificateEstimatorLoadClausesRC
              variableToLoad1={'RF2_F1_2_ESSJun24_PRC_calculation'}
              variableToLoad2={'RF2_F1_2_ESSJun24_ESC_calculation'}
              variables={variables}
              setVariables={setVariables}
              entities={entities}
              metadata={metadata}
              calculationResult={calculationResult}
              calculationResult2={calculationResult2}
              setCalculationResult={setCalculationResult}
              setCalculationResult2={setCalculationResult2}
              calculationError={calculationError}
              calculationError2={calculationError2}
              setCalculationError={setCalculationError}
              setCalculationError2={setCalculationError2}
              stepNumber={stepNumber}
              setStepNumber={setStepNumber}
              postcode={postcode}
              zone={zone}
              formValues={formValues}
              setFormValues={setFormValues}
              selectedBrand={selectedBrand}
              selectedModel={selectedModel}
              backAction={(e) => {
                setStepNumber(stepNumber - 1);
              }}
              flow={flow}
              setFlow={setFlow}
              persistFormValues={persistFormValues}
              setPersistFormValues={setPersistFormValues}
              selectedProductClass={selectedProductClass}
              loading={loading}
              setLoading={setLoading}
              showError={showError}
              setShowError={setShowError}
              annualEnergySavings={'RF2_F1_2_ESSJun24_annual_energy_savings'}
              peakDemandReductionSavings={'RF2_F1_2_ESSJun24_peak_demand_annual_savings'}
              annualEnergySavingsNumber={annualEnergySavingsNumber}
              setAnnualEnergySavingsNumber={setAnnualEnergySavingsNumber}
              peakDemandReductionSavingsNumber={peakDemandReductionSavingsNumber}
              setPeakDemandReductionSavingsNumber={setPeakDemandReductionSavingsNumber}
              escMinPrice={escMinPrice}
              escMaxPrice={escMaxPrice}
              prcMinPrice={prcMinPrice}
              prcMaxPrice={prcMaxPrice}
            />
          )}

          {stepNumber === 3 && (
            <CertificateEstimatorLoadClausesRC
              variableToLoad1={'RF2_F1_2_ESSJun24_PRC_calculation'}
              variableToLoad2={'RF2_F1_2_ESSJun24_ESC_calculation'}
              variables={variables}
              setVariables={setVariables}
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
              postcode={postcode}
              zone={zone}
              formValues={formValues}
              setFormValues={setFormValues}
              selectedBrand={selectedBrand}
              selectedModel={selectedModel}
              flow={flow}
              setFlow={setFlow}
              persistFormValues={persistFormValues}
              setPersistFormValues={setPersistFormValues}
              selectedProductClass={selectedProductClass}
              loading={loading}
              setLoading={setLoading}
              showError={showError}
              setShowError={setShowError}
              annualEnergySavings={'RF2_F1_2_ESSJun24_annual_energy_savings'}
              peakDemandReductionSavings={'RF2_F1_2_ESSJun24_peak_demand_annual_savings'}
              annualEnergySavingsNumber={annualEnergySavingsNumber}
              setAnnualEnergySavingsNumber={setAnnualEnergySavingsNumber}
              peakDemandReductionSavingsNumber={peakDemandReductionSavingsNumber}
              setPeakDemandReductionSavingsNumber={setPeakDemandReductionSavingsNumber}
              escMinPrice={escMinPrice}
              escMaxPrice={escMaxPrice}
              prcMinPrice={prcMinPrice}
              prcMaxPrice={prcMaxPrice}
            />
          )}

          {stepNumber === 1 && showPostcodeError && postcode.length >= 4 && (
            <Alert as="error" customTitle={
              <h3 dangerouslySetInnerHTML={{__html: "The postcode is not valid in NSW"}}/>
            } id="error-postcode" className="nsw-col-lg-10" tabIndex="-1">
              <p>Please check your postcode and try again.</p>
            </Alert>
          )}

          {stepNumber === 1 && showNoResponsePostcodeError && postcode.length >= 4 && (
            <Alert as="error" customTitle={
              <h3 dangerouslySetInnerHTML={{__html: "Sorry!"}}/>
            } id="error-postcode-response" className="nsw-col-lg-10" tabIndex="-1">
              <p>
                We are experiencing technical difficulties validating the postcode, please try again
                later.
              </p>
            </Alert>
          )}

          {stepNumber === 1 &&
            registryData &&
            postcode &&
            postcode.length === 4 &&
            selectedBrand &&
            selectedModel &&
            selectedProductClass &&
            userType && (
              <div className="nsw-row" style={{ paddingTop: '30px', width: '80%', marginBottom: 70 }}>
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
                <MoreOptionsCard options={[{
                  title: 'Review eligibility for this activity',
                  link: '/#refrigerated-cabinet-activity-requirements'
                }]}/>
              </div>
            </div>
          )}
        </>
      )}
    </Fragment>
  );
}
