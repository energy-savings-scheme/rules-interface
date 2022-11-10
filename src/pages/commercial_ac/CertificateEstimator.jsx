import React, { Fragment, useState, useEffect } from 'react';

// import VariableSearchBar from 'pages/homepage/VariableSearchBar';

// import Card, { CardCopy } from 'nsw-ds-react/card/card';
// import { ContentBlock } from 'nsw-ds-react/content-block/contenBlock';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
// import LoadClauses from './LoadClauses';
// import DropDownMenu from 'components/form_elements/DropDownMenu';
import Button from 'nsw-ds-react/button/button';
// import { FormGroupSelect } from 'nsw-ds-react/forms';
import { FormGroup, TextInput, Select } from 'nsw-ds-react/forms';
import RegistryApi from 'services/registry_api';
import CertificateEstimatorLoadClauses from './CertificatEstimatorLoadClauses';
import OpenFiscaAPI from 'services/openfisca_api';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';
import OpenFiscaApi from 'services/openfisca_api';
import Notification from 'nsw-ds-react/notification/notification';

export default function CertificateEstimatorHVAC(props) {
  const {
    entities,
    variables,
    hvacBrands,
    setVariables,
    setEntities,
    setHvacBrands,
    loading,
    setLoading,
  } = props;

  // const [formValues, setFormValues] = useState([]);
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

  useEffect(() => {
    window.scrollTo(0, 0);

    setDropdownOptions([{ value: '', text: 'Please select brand' }]);

    if (variables.length < 1) {
      OpenFiscaAPI.listEntities()
        .then((res) => {
          setEntities(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (entities.length < 1) {
      OpenFiscaAPI.listVariables()
        .then((res) => {
          setVariables(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (hvacBrands.length < 1) {
      RegistryApi.getCommercialHVACBrands()
        .then((res) => {
          setHvacBrands(res.data);
          setLoading(false);
          setRegistryData(true);
        })
        .catch((err) => {
          console.log(err);
          setRegistryData(false);
        });
    }
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
    RegistryApi.getHvacModelsMetadata(payload)
      .then((res) => {
        setMetadata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(metadata);
  }, [selectedModel]);

  useEffect(() => {
    if (hvacBrands.length > 1) {
      hvacBrands.forEach((item) => populateDropDown({ text: item, value: item }));
    }
  }, [hvacBrands]);

  useEffect(() => {
    console.log(selectedBrand);

    RegistryApi.listHvacModels(selectedBrand)
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
          HVAC2_PDRS__postcode: { '2021-01-01': postcode },
          HVAC2_get_climate_zone_by_postcode: { '2021-01-01': null },
        },
      },
      persons: {
        person1: {},
      },
    };

    OpenFiscaApi.postCalculate(payload)
      .then((res) => {
        var result =
          res.data.buildings.building_1['HVAC2_get_climate_zone_by_postcode']['2021-01-01'];
        setZone(result);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(zone);
  }, [postcode]);

  return (
    <Fragment>
      {/* Search section */}
      <br></br>
      <div className="nsw-layout">
        <div class="nsw-hero-banner nsw-hero-banner--dark">
          <div class="nsw-hero-banner__container">
            <div class="nsw-hero-banner__wrapper">
              <div class="nsw-hero-banner__box">
                <img
                  class="nsw-hero-banner__image"
                  src="/commercialac/HVAC2Hero.jpeg"
                  alt=""
                  style={{ top: '80%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="nsw-container">
        <div className="nsw-grid nsw-grid--spaced">
          <div className="nsw-col nsw-col-md-12">
            <br></br>
            <br></br>
            <h2 className="nsw-content-block__title">
              Energy Savings Scheme and Peak Demand Reduction Scheme Certificate Estimator
            </h2>
            <br></br>
            <p className="nsw-content-block__copy">
              Estimate your ESCs and PRCs for the Commercial Air Conditioner Activity (F4 in the ESS
              and HVAC2 in the PDRS) by answering the following questions.
            </p>
            <p className="nsw-content-block__copy">
              Please keep in mind that the results are indicative only and cannot be promoted or
              published.{' '}
            </p>
          </div>
        </div>

        <p className="nsw-content-block__copy">
          <b> Commercial air conditioner certificate estimator</b>
        </p>

        <ProgressIndicator step={stepNumber} of={3} />

        <Fragment>
          {stepNumber === 1 && (
            <div className="nsw-row">
              <div className="nsw-col" style={{ padding: 'inherit' }}>
                <div className="nsw-content-block">
                  <br></br>
                  <br></br>
                  <br></br>
                  <div className="nsw-content-block__content">
                    <h5 className="nsw-content-block__copy">
                      <b>Answer the following questions to calculate your ESCs and PRCs</b>
                    </h5>

                    <FormGroup
                      label="Postcode"
                      helper="What is your postcode?" // helper text (secondary label)
                      errorText="Invalid value!" // error text if invalid
                    >
                      <TextInput
                        style={{ maxWidth: '50%' }}
                        as="input"
                        type="number"
                        placeholder="Enter value"
                        value={postcode}
                        onChange={(e) => {
                          setPostcode(e.target.value);
                        }}
                        required
                      />
                    </FormGroup>
                    <FormGroup
                      label="Brand"
                      helper="Select commercial air conditioner brand" // primary question text
                      errorText="Invalid value!" // error text if invalid
                    >
                      <Select
                        style={{ maxWidth: '50%' }}
                        options={dropdownOptions}
                        onChange={(e) => {
                          setSelectedBrand(hvacBrands.find((item) => item === e.target.value));
                        }}
                        value={selectedBrand}
                        required
                      />
                    </FormGroup>

                    <FormGroup
                      label="Model"
                      helper="Select commercial air conditioner model" // primary question text
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
                  </div>
                </div>
              </div>
            </div>
          )}

          {stepNumber === 1 && !registryData && (
            <Notification as="error" title="Sorry! An error has occurred.">
              <p>Unable to load data from the product registry. Please try again later.</p>
            </Notification>
          )}

          {stepNumber === 2 && loading && <SpinnerFullscreen />}

          {stepNumber === 2 && (
            <CertificateEstimatorLoadClauses
              variableToLoad1={'HVAC2_PRC_calculation'}
              variableToLoad2={'HVAC2_ESC_calculation'}
              variables={variables}
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
              backAction={(e) => {
                setStepNumber(stepNumber - 1);
              }}
            />
          )}

          {stepNumber === 3 && (
            <CertificateEstimatorLoadClauses
              variableToLoad1={'HVAC2_PRC_calculation'}
              variableToLoad2={'HVAC2_ESC_calculation'}
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
              zone={zone}
            />
          )}

          {/* {stepNumber === 3 && !calculationResult && !calculationResult2 && <SpinnerFullscreen />} */}

          {stepNumber === 3 && calculationError && calculationError2 && <SpinnerFullscreen />}

          {stepNumber === 1 &&
            registryData &&
            postcode &&
            postcode.length === 4 &&
            selectedBrand &&
            selectedModel && (
              <div className="nsw-row">
                <div className="nsw-col">
                  <Button
                    as="primary"
                    onClick={(e) => {
                      setStepNumber(stepNumber + 1);
                    }}
                    style={{ float: 'right' }}
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
