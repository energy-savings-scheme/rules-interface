import React, { Fragment, useState, useEffect } from 'react';

import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import Button from 'nsw-ds-react/button/button';
import { FormGroup, TextInput, Select } from 'nsw-ds-react/forms';
import RegistryApi from 'services/registry_api';
import CertificateEstimatorLoadClauses from './CertificatEstimatorLoadClauses';
import OpenFiscaAPI from 'services/openfisca_api';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';
import OpenFiscaApi from 'services/openfisca_api';
import HeroBanner from 'nsw-ds-react/heroBanner/heroBanner';
import Alert from 'nsw-ds-react/alert/alert';
import { IS_DRUPAL_PAGES } from 'types/app_variables';
import { USER_TYPE_OPTIONS } from 'constant/user-type';
import { BASE_COMMERCIAL_AC_ESTIMATOR_ANALYTICS_DATA } from 'constant/base-analytics-data';
import {
  updateEstimatorFormAnalytics,
  updateFeedbackFormAnalytics,
  updateSearchCaptureAnalytics,
  updateSegmentCaptureAnalytics,
} from 'lib/analytics';
import FeedbackComponent from 'components/feedback/feedback';
import MoreOptionsCard from 'components/more-options-card/more-options-card';

export default function CertificateEstimatorHVAC(props) {
  const { entities, variables, hvacBrands, setVariables, setEntities, setHvacBrands } = props;

  const [BCAzone, setBCAZone] = useState(null);

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
  const [showNoResponsePostcodeError, setShowNoResponsePostcodeError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [lastModified, setLastModified] = useState('');
  const [annualEnergySavingsNumber, setAnnualEnergySavingsNumber] = useState(0);
  const [peakDemandReductionSavingsNumber, setPeakDemandReductionSavingsNumber] = useState(0);
  const [selectedClimateZone, setSelectedClimateZone] = useState('');
  const [dropdownOptionsClimateZone, setDropdownOptionsClimateZone] = useState([]);
  const [userType, setUserType] = useState('');
  const [escMinPrice, setEscMinPrice] = useState(0);
  const [escMaxPrice, setEscMaxPrice] = useState(0);
  const [prcMinPrice, setPrcMinPrice] = useState(0);
  const [prcMaxPrice, setPrcMaxPrice] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    updateEstimatorFormAnalytics(BASE_COMMERCIAL_AC_ESTIMATOR_ANALYTICS_DATA);
    updateFeedbackFormAnalytics(BASE_COMMERCIAL_AC_ESTIMATOR_ANALYTICS_DATA);
    setDropdownOptions([{ value: '', text: 'Please select brand' }]);

    setDropdownOptionsClimateZone([
      { text: 'BCA Climate Zone 1', value: 'BCA_Climate_Zone_1' },
      { text: 'BCA Climate Zone 2', value: 'BCA_Climate_Zone_2' },
      { text: 'BCA Climate Zone 3', value: 'BCA_Climate_Zone_3' },
      { text: 'BCA Climate Zone 4', value: 'BCA_Climate_Zone_4' },
      { text: 'BCA Climate Zone 5', value: 'BCA_Climate_Zone_5' },
      { text: 'BCA Climate Zone 6', value: 'BCA_Climate_Zone_6' },
      { text: 'BCA Climate Zone 7', value: 'BCA_Climate_Zone_7' },
      { text: 'BCA Climate Zone 8', value: 'BCA_Climate_Zone_8' },
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

    if (lastModified.length === 0) {
      RegistryApi.getCommercialHVACLastModified('commercial_hvac')
        .then((res) => {
          setLastModified(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

  const getClimateZoneText = (value) => {
    const zoneMapping = {
      1: 'BCA_Climate_Zone_1',
      2: 'BCA_Climate_Zone_2',
      3: 'BCA_Climate_Zone_3',
      4: 'BCA_Climate_Zone_4',
      5: 'BCA_Climate_Zone_5',
      6: 'BCA_Climate_Zone_6',
      7: 'BCA_Climate_Zone_7',
      8: 'BCA_Climate_Zone_8',
    };
    return zoneMapping[value] || '';
  };

  useEffect(() => {
    if (postcode && postcode.length < 4) {
      setShowPostcodeError(false);
    }
  }, [postcode]);

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
    if (parseInt(calculationResult) === 0) {
      setAnnualEnergySavingsNumber(0);
    }
  }, [calculationResult]);

  useEffect(() => {
    if (parseInt(calculationResult2) === 0) {
      setPeakDemandReductionSavingsNumber(0);
    }
  }, [calculationResult2]);

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
    if (!postcode) return;

    const payload = {
      buildings: {
        building_1: {
          HVAC2_PDRSAug24_PDRS__postcode: { '2021-01-01': postcode },
          HVAC2_PDRSAug24_get_climate_zone_by_postcode: { '2021-01-01': null },
        },
      },
      persons: {
        person1: {},
      },
    };

    OpenFiscaApi.postCalculate(payload)
      .then((res) => {
        var result =
          res.data.buildings.building_1['HVAC2_PDRSAug24_get_climate_zone_by_postcode'][
            '2021-01-01'
          ];
        setZone(result);
      })
      .catch((err) => {
        console.log(err);
      });

    const payload_bca = {
      buildings: {
        building_1: {
          HVAC2_PDRSAug24_PDRS__postcode: { '2021-01-01': postcode },
          HVAC2_PDRSAug24_BCA_climate_zone_by_postcode: { '2021-01-01': null },
        },
      },
      persons: {
        person1: {},
      },
    };

    if (postcode.length === 4) {
      OpenFiscaApi.postCalculate(payload_bca)
        .then((res) => {
          var result =
            res.data.buildings.building_1['HVAC2_PDRSAug24_BCA_climate_zone_by_postcode'][
              '2021-01-01'
            ];
          setBCAZone(result);
          setSelectedClimateZone(getClimateZoneText(result));
        })
        .catch((err) => {
          console.log(err);
        });
      setSelectedClimateZone(BCAzone);
    }
  }, [postcode]);

  return (
    <Fragment>
      {!IS_DRUPAL_PAGES && (
        <div style={{ marginTop: '1rem' }}>
          <HeroBanner
            wide
            style="dark"
            image={{
              alt: 'commercial ac',
              src: '/commercialac/HVAC2Hero.jpeg',
            }}
            intro="Commercial"
            title="Air conditioner - certificates"
          />
        </div>
      )}

      <div className="nsw-container">
        <br></br>
        <br></br>
        {!IS_DRUPAL_PAGES && stepNumber !== 3 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-10">
              <h2 className="nsw-content-block__title">
                Commercial Air Conditioner certificate estimator
              </h2>
              <br></br>
              <p className="nsw-content-block__copy">
                Answer the following questions to estimate the energy savings certificates (ESCs)
                and peak reduction certificates (PRCs) for the Residential and Small Business Air
                Conditioner Activity (F4 in the{' '}
                <a
                  href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/energy-savings-scheme"
                  target="_blank"
                  rel="noreferrer"
                >
                  Energy Savings Scheme
                </a>{' '}
                and HVAC2 in the{' '}
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
            <div className="nsw-col nsw-col-md-10">
              <h2 className="nsw-content-block__title">
                Commercial Air Conditioner certificate estimator
              </h2>
            </div>
          </div>
        )}

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
                  <br></br>
                  <div className="nsw-content-block__content">
                    <h5 className="nsw-content-block__copy" style={{ paddingBottom: '30px' }}>
                      <b>Please answer the following questions to calculate your ESCs and PRCs</b>
                    </h5>

                    <FormGroup
                      label="What is your interest in the scheme?"
                      helper="Select the option that best describes you"
                      htmlId="user-type"
                    >
                      <Select
                        htmlId="user-type"
                        style={{ maxWidth: '50%', marginBottom: '1%' }}
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

                    {postcode && postcode.length === 4 && (
                      <FormGroup
                        label="BCA Climate Zone"
                        helper={
                          <span
                            dangerouslySetInnerHTML={{
                              __html:
                                'Certain postcodes can belong to multiple climate zones, check your <a href="https://www.abcb.gov.au/resources/climate-zone-map" target="_blank">BCA Climate Zone on the map</a>',
                            }}
                          />
                        } // primary question text
                        errorText="Invalid value!" // error text if invalid
                      >
                        <Select
                          style={{ maxWidth: '50%' }}
                          options={dropdownOptionsClimateZone}
                          onChange={(e) => {
                            setSelectedClimateZone(e.target.value);
                          }}
                          value={selectedClimateZone}
                          required
                        />
                      </FormGroup>
                    )}
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
                          setSelectedModel('');
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
            <Alert as="error" title="Sorry! An error has occurred.">
              <p>Unable to load data from the product registry. Please try again later.</p>
            </Alert>
          )}

          {stepNumber === 2 && loading && <SpinnerFullscreen />}

          {stepNumber === 2 && (
            <CertificateEstimatorLoadClauses
              variableToLoad1={'HVAC2_PDRSAug24_PRC_calculation'}
              variableToLoad2={'HVAC2_PDRSAug24_ESC_calculation'}
              annualEnergySavings={'HVAC2_PDRSAug24_annual_energy_savings'}
              peakDemandReductionSavings={'HVAC2_PDRSAug24_peak_demand_annual_savings'}
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
              selectedModel={selectedModel}
              backAction={(e) => {
                setStepNumber(stepNumber - 1);
              }}
              flow={flow}
              setFlow={setFlow}
              persistFormValues={persistFormValues}
              setPersistFormValues={setPersistFormValues}
              loading={loading}
              setLoading={setLoading}
              showError={showError}
              setShowError={setShowError}
              annualEnergySavingsNumber={annualEnergySavingsNumber}
              setAnnualEnergySavingsNumber={setAnnualEnergySavingsNumber}
              peakDemandReductionSavingsNumber={peakDemandReductionSavingsNumber}
              setPeakDemandReductionSavingsNumber={setPeakDemandReductionSavingsNumber}
              selectedClimateZone={selectedClimateZone}
              escMinPrice={escMinPrice}
              escMaxPrice={escMaxPrice}
              prcMinPrice={prcMinPrice}
              prcMaxPrice={prcMaxPrice}
            />
          )}

          {stepNumber === 3 && (
            <CertificateEstimatorLoadClauses
              variableToLoad1={'HVAC2_PDRSAug24_PRC_calculation'}
              variableToLoad2={'HVAC2_PDRSAug24_ESC_calculation'}
              annualEnergySavings={'HVAC2_PDRSAug24_annual_energy_savings'}
              peakDemandReductionSavings={'HVAC2_PDRSAug24_peak_demand_annual_savings'}
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
              loading={loading}
              setLoading={setLoading}
              showError={showError}
              setShowError={setShowError}
              annualEnergySavingsNumber={annualEnergySavingsNumber}
              setAnnualEnergySavingsNumber={setAnnualEnergySavingsNumber}
              peakDemandReductionSavingsNumber={peakDemandReductionSavingsNumber}
              setPeakDemandReductionSavingsNumber={setPeakDemandReductionSavingsNumber}
              selectedClimateZone={selectedClimateZone}
              escMinPrice={escMinPrice}
              escMaxPrice={escMaxPrice}
              prcMinPrice={prcMinPrice}
              prcMaxPrice={prcMaxPrice}
            />
          )}

          {/* {stepNumber === 3 && calculationError && calculationError2 && <SpinnerFullscreen />} */}

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
                      link: '/#commercial-ac-activity-requirements',
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
