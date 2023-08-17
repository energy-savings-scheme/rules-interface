import React, { Fragment, useState, useEffect } from 'react';

import VariableSearchBar from 'pages/homepage/VariableSearchBar';

import Card, { CardCopy } from 'nsw-ds-react/card/card';
import { ContentBlock } from 'nsw-ds-react/content-block/contenBlock';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import LoadClauses from './LoadClauses';
import DropDownMenu from 'components/form_elements/DropDownMenu';
import Button from 'nsw-ds-react/button/button';
import { FormGroupSelect } from 'nsw-ds-react/forms';
import { FormGroup, TextInput, Select } from 'nsw-ds-react/forms';
import RegistryApi from 'services/registry_api';
import CertificateEstimatorLoadClauses from './CertificatEstimatorLoadClauses';
import OpenFiscaAPI from 'services/openfisca_api';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';
import OpenFiscaApi from 'services/openfisca_api';
import Notification from 'nsw-ds-react/notification/notification';
import HeroBanner from 'nsw-ds-react/heroBanner/heroBanner';
import Alert from 'nsw-ds-react/alert/alert';
import { compareAsc, format, previousSunday } from 'date-fns';
import axios from 'axios';
import ReactSelect from 'react-select';

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
  const [showPostcodeError, setShowPostcodeError] = useState(false);

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
    setDropdownOptionsModels([{ value: '', label: 'Please select model' }]);
    models.forEach((item) => populateModelDropDown({ label: item, value: item }));
  }, [models]);

  useEffect(() => {
    if (!selectedBrand) return null;
    if (!selectedModel) return null;

    var payload = {
      brand: selectedBrand,
      model: selectedModel.value,
    };
    RegistryApi.getHvacModelsMetadata(payload)
      .then((res) => {
        setMetadata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedModel]);

  useEffect(() => {
    if (hvacBrands.length > 1) {
      hvacBrands.forEach((item) => populateDropDown({ text: item, value: item }));
    }
  }, [hvacBrands]);

  useEffect(() => {
    RegistryApi.listHvacModels(selectedBrand)
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postcode]);

  const handleChange = (selectedOption) => {
    console.log(selectedOption);
    setSelectedModel(selectedOption);
  };

  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontWeight: state.isSelected ? 'bold' : 'normal',
      color: state.data.color,
      backgroundColor: '#495054',
      fontColor: 'white',
      fontSize: state.selectProps.myFontSize,
      border: '#495054',
    }),
  };

  return (
    <Fragment>
      <br></br>
      <HeroBanner
        wide
        style="dark"
        image={{
          alt: 'commercial ac',
          src: '/commercialac/HVAC2Hero.jpeg',
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
                Commercial Air Conditioner certificate estimator
              </h2>
              <br></br>
              <p className="nsw-content-block__copy">
                Answer the following questions to estimate the energy savings certificates (ESCs)
                and peak reduction certificates (PRCs) for the Residential and Small Business Air
                Conditioner Activity (D16 in the{' '}
                <a
                  href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/energy-savings-scheme"
                  target="_blank"
                >
                  Energy Savings Scheme
                </a>{' '}
                and HVAC2 in the{' '}
                <a
                  href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/peak-demand-reduction-scheme"
                  target="_blank"
                >
                  Peak Demand Reduction Scheme
                </a>
                ).
              </p>
              <p className="nsw-content-block__copy">
                Where possible, residential and small business air conditioner specifications are
                automatically updated at the end of each week from the{' '}
                <a href="https://reg.energyrating.gov.au/comparator/product_types/" target="_blank">
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
        <br></br>

        {stepNumber === 3 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-10">
              <h2 className="nsw-content-block__title">
                Commercial Air Conditioner certificate estimator
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
                        style={{ maxWidth: '50%', marginBottom: '1%' }}
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
                      helper="Select commercial air conditioner brand" // primary question text
                      errorText="Invalid value!" // error text if invalid
                    >
                      <Select
                        style={{ maxWidth: '50%', marginBottom: '1%' }}
                        options={dropdownOptions}
                        onChange={(e) => {
                          setSelectedBrand(hvacBrands.find((item) => item === e.target.value));
                        }}
                        value={selectedBrand}
                        required
                      />
                    </FormGroup>

                    <FormGroup
                      style={{ width: '50%', padding: '5px' }}
                      label="Model"
                      helper="Select commercial air conditioner model" // primary question text
                      errorText="Invalid value!" // error text if invalid
                    >
                      <ReactSelect
                        options={dropdownOptionsModels}
                        onChange={handleChange}
                        value={selectedModel}
                        isSearchable={true}
                        styles={styles}
                        minMenuHeight="100px"
                        placeholder="Please select model"
                        components={{
                          IndicatorSeparator: () => null,
                        }}
                      />
                      {/* <Select
                        style={{ maxWidth: '50%' }}
                        options={dropdownOptionsModels}
                        onChange={(e) => {
                          setSelectedModel(models.find((item) => item === e.target.value));
                        }}
                        value={selectedModel}
                        required
                      /> */}
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

          {stepNumber === 1 && !registryData && (
            <Alert as="error" title="Sorry! An error has occurred.">
              <p>Unable to load data from the product registry. Please try again later.</p>
            </Alert>
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
              formValues={formValues}
              setFormValues={setFormValues}
              selectedBrand={selectedBrand}
              selectedModel={selectedModel.value}
              backAction={(e) => {
                setStepNumber(stepNumber - 1);
              }}
              flow={flow}
              setFlow={setFlow}
              persistFormValues={persistFormValues}
              setPersistFormValues={setPersistFormValues}
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
              formValues={formValues}
              setFormValues={setFormValues}
              selectedBrand={selectedBrand}
              selectedModel={selectedModel.value}
              flow={flow}
              setFlow={setFlow}
              persistFormValues={persistFormValues}
              setPersistFormValues={setPersistFormValues}
            />
          )}

          {stepNumber === 3 && calculationError && calculationError2 && <SpinnerFullscreen />}

          {stepNumber === 1 && showPostcodeError && postcode.length >= 4 && (
            <Alert as="error" title="The postcode is not valid in NSW">
              <p>Please check your postcode and try again.</p>
            </Alert>
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
