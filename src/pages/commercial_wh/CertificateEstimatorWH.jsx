import React, { Fragment, useState, useEffect } from 'react';

import VariableSearchBar from 'pages/homepage/VariableSearchBar';

import Card, { CardCopy } from 'nsw-ds-react/card/card';
import { ContentBlock } from 'nsw-ds-react/content-block/contenBlock';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import DropDownMenu from 'components/form_elements/DropDownMenu';
import Button from 'nsw-ds-react/button/button';
import { FormGroupSelect } from 'nsw-ds-react/forms';
import RegistryApi from 'services/registry_api';
import CertificateEstimatorLoadClausesWH from './CertificateEstimatorLoadClausesWH';
import { FormGroup, TextInput, Select } from 'nsw-ds-react/forms';
import OpenFiscaApi from 'services/openfisca_api';

export default function CertificateEstimatorWH(props) {
  const { entities, variables, brands } = props;

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
  const [postcode, setPostcode] = useState(null);
  const [calculationResult2, setCalculationResult2] = useState(null);
  const [zone, setZone] = useState(0);

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
      })
      .catch((err) => {
        console.log(err);
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
      <div className="nsw-layout">
        <div class="nsw-hero-banner nsw-hero-banner--dark">
          <div class="nsw-hero-banner__container">
            <div class="nsw-hero-banner__wrapper">
              <div class="nsw-hero-banner__box">
                <img
                  class="nsw-hero-banner__image"
                  src="/commercial_wh/WH1_Activity_Page_Hero.jpeg"
                  alt=""
                  style={{ top: '50%' }}
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
              Estimate your ESCs and PRCs for the Commercial Heat Pump Water Heater Activity (F16 in
              the ESS and WH1 in the PDRS) by answering the following questions. Please keep in mind
              that the results are indicative only and cannot be promoted or published.{' '}
            </p>
          </div>
        </div>

        <p className="nsw-content-block__copy">
          <b> Commercial heat pump water heater certificate estimator </b>
        </p>
        <ProgressIndicator step={stepNumber} of={3} />

        <Fragment>
          {stepNumber === 1 && (
            <div className="nsw-row">
              <div className="nsw-col" style={{ padding: 'inherit' }}>
                <div className="nsw-content-block">
                  <br></br>
                  <br></br>
                  <div className="nsw-content-block__content">
                    <h5 className="nsw-content-block__copy">
                      <b>Answer the following questions to calculate your ESCs and PRCs</b>
                    </h5>

                    <FormGroup
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
              setCalculationError={setCalculationError}
              zone={zone}
              postcode={postcode}
              calculationResult2={calculationResult2}
              setCalculationResult2={setCalculationResult2}
              stepNumber={stepNumber}
              setStepNumber={setStepNumber}
              backAction={(e) => {
                setStepNumber(stepNumber - 1);
              }}
            />
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
              // calculationResult={calculationResult}
              // setCalculationResult={setCalculationResult}
              // setCalculationError={setCalculationError}
              //   dependencies={dependencies}
              stepNumber={stepNumber}
              setStepNumber={setStepNumber}
              //   formValues={formValues}
              //   setFormValues={setFormValues}
            />
          )}

          {stepNumber !== 3 && stepNumber !== 2 && (
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
      <section class="nsw-section nsw-section--off-white" style={{ backgroundColor: '#F5F5F5' }}>
        <div class="nsw-container">
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <br></br>
              <br></br>
              <h2 className="nsw-col nsw-content-block__title">
                Check your eligibility and estimate certificates
              </h2>
              <div class="nsw-grid">
                <div className="nsw-col nsw-col-md-4">
                  <Card
                    headline="Review schemes base eligibility, activity requirements and estimate certificates"
                    link="base_eligibility_commercialwh/"
                    image="/commercialac/navigation_row/full_flow_card.jpeg"
                  >
                    {/* <p class="nsw-card__copy" style={{ fontSize: '21px', color: '#202D61' }}><b>
                        Review schemes base eligibility, activity requirements and estimate certificates</b></p> */}
                  </Card>
                </div>
                <div className="nsw-col nsw-col-md-4">
                  <Card
                    headline="Check activity requirements and estimate certificates"
                    link="compare2activities"
                    image="/commercialac/navigation_row/activity_certificates.png"
                  >
                    {/* <p class="nsw-card__copy" style={{ fontSize: '21px', color: '#202D61' }}><b>
                        Check activity requirements and estimate certificates</b></p> */}
                  </Card>
                </div>
                <div className="nsw-col nsw-col-md-4">
                  <Card
                    headline="Estimate certificates only"
                    link="compare2activities"
                    image="/commercialac/navigation_row/certificates_only.jpg"
                  >
                    {/* <p class="nsw-card__copy" style={{ fontSize: '21px', color: '#202D61' }}><b>
                        Estimate certificates only</b></p> */}
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}