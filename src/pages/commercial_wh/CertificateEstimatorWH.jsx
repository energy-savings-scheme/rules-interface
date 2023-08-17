import React, { Fragment, useState, useEffect } from 'react';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import Button from 'nsw-ds-react/button/button';
import RegistryApi from 'services/registry_api';
import CertificateEstimatorLoadClausesWH from './CertificateEstimatorLoadClausesWH';
import { FormGroup, TextInput, Select } from 'nsw-ds-react/forms';
import OpenFiscaApi from 'services/openfisca_api';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';
import HeroBanner from 'nsw-ds-react/heroBanner/heroBanner';
import Alert from 'nsw-ds-react/alert/alert';
import { format, previousSunday } from 'date-fns';
import axios from 'axios';

export default function CertificateEstimatorWH(props) {
  const { entities, variables, brands, loading, setLoading } = props;

  const [formValues, setFormValues] = useState([]);
  const [stepNumber, setStepNumber] = useState(1);
  const [dependencies, setDependencies] = useState([]);
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const validatePostcode = (postcode) => {
    RegistryApi.getPostcodeValidation(postcode)
      .then((res) => {
        const persons = res.data;
        console.log(res);
        if (
          (persons.status === '200') &
          (persons.data.postcode === postcode) &
          (persons.data.state === 'NSW')
        ) {
          setFlow(null);
          setStepNumber(stepNumber + 1);
          setShowPostcodeError(false);
        } else {
          setShowPostcodeError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowPostcodeError(true);
      });
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
    console.log(payload);
    RegistryApi.getWHModelsMetadata(payload)
      .then((res) => {
        setMetadata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(metadata);
  }, [selectedModel]);

  useEffect(() => {
    setDropdownOptions([{ value: '', text: 'Please select brand' }]);

    brands.forEach((item) => populateDropDown({ text: item, value: item }));
  }, [brands]);

  useEffect(() => {
    console.log(selectedBrand);

    RegistryApi.listWHModels(selectedBrand)
      .then((res) => {
        setModels(res.data);
        setRegistryData(true);
      })
      .catch((err) => {
        console.log(err);
        setRegistryData(false);
      });

    console.log(models);
  }, [selectedBrand]);

  useEffect(() => {
    const payload = {
      buildings: {
        building_1: {
          WH1_PDRS__postcode: { '2021-01-01': postcode },
          WH1_get_zone_by_postcode: { '2021-01-01': null },
        },
      },
      persons: {
        person1: {},
      },
    };

    OpenFiscaApi.postCalculate(payload)
      .then((res) => {
        var result = res.data.buildings.building_1['WH1_get_zone_by_postcode']['2021-01-01'];
        setZone(result);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log('********');
    console.log(zone);
  }, [postcode]);

  return (
    <Fragment>
      {/* Search section */}
      <br></br>
      <HeroBanner
        wide
        style="dark"
        image={{
          alt: 'commercial wh',
          src: '/commercial_wh/WH1_Activity_Page_Hero.jpeg',
        }}
        intro="Energy Savings Scheme and Peak Demand Reduction Scheme"
        title="Safeguard certificate estimator"
      />

      <div className="nsw-container">
        <br></br>
        <br></br>

        {stepNumber !== 3 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-10">
              <h2 className="nsw-content-block__title">
                Commercial Heat Pump Water Heater certificate estimator
              </h2>
              {/* <h5 className="nsw-content-block__copy">
              Energy Savings Scheme and Peak Demand Reduction Scheme
            </h5> */}
              <br></br>
              <p className="nsw-content-block__copy">
                Answer the following questions to estimate the energy savings certificates (ESCs)
                and peak reduction certificates (PRCs) for the Commercial Heat Pump Water Heater
                Activity (F16 in the{' '}
                <a
                  href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/energy-savings-scheme"
                  target="_blank"
                >
                  Energy Savings Scheme
                </a>{' '}
                and WH1 in the{' '}
                <a
                  href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/peak-demand-reduction-scheme"
                  target="_blank"
                >
                  Peak Demand Reduction Scheme
                </a>
                ).
              </p>
              <p className="nsw-content-block__copy">
                Where possible, commercial heat pump water heater specifications are automatically
                updated at the end of each week from the{' '}
                <a
                  href="https://tessa.energysustainabilityschemes.nsw.gov.au/ipart?id=accepted_products"
                  target="_blank"
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

        {stepNumber === 3 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-10">
              <h2 className="nsw-content-block__title">
                Commercial Heat Pump Water Heater certificate estimator
              </h2>
            </div>
          </div>
        )}

        <ProgressIndicator step={stepNumber} of={3} style={{ width: '80%' }} />

        <Fragment>
          {stepNumber === 1 && (
            <div className="nsw-row">
              <div className="nsw-col" style={{ padding: 'inherit' }}>
                <div className="nsw-content-block">
                  <br></br>
                  <br></br>
                  <div className="nsw-content-block__content">
                    <h5 className="nsw-content-block__copy" style={{ paddingBottom: '30px' }}>
                      <b>Please answer the following questions to calculate your ESCs and PRCs</b>
                    </h5>

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
                      Updated from product registry:{' '}
                      {format(previousSunday(new Date()), 'MMMM d, Y')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {stepNumber === 2 && (
            <CertificateEstimatorLoadClausesWH
              variableToLoad1={'WH1_PRC_calculation'}
              variableToLoad2={'WH1_ESC_calculation'}
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
              backAction={(e) => {
                setStepNumber(stepNumber - 1);
              }}
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

          {stepNumber === 3 && (
            <CertificateEstimatorLoadClausesWH
              // calculationDate={calculationDate}
              variableToLoad1={'WH1_PRC_calculation'}
              variableToLoad2={'WH1_ESC_calculation'}
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
            />
          )}

          {stepNumber === 1 &&
            registryData &&
            postcode &&
            postcode.length === 4 &&
            selectedBrand &&
            selectedModel && (
              <div className="nsw-row" style={{ paddingTop: '30px', width: '80%' }}>
                <div className="nsw-col" style={{ padding: 'inherit' }}>
                  <Button
                    as="dark"
                    onClick={(e) => {
                      validatePostcode(postcode);
                      // setFlow(null);
                      // setStepNumber(stepNumber + 1);
                    }}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
        </Fragment>
      </div>
    </Fragment>
  );
}
