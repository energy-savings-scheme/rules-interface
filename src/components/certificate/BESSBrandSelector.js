import { useEffect, useState } from 'react';
import { FormGroup, Select, TextInput } from 'nsw-ds-react/forms';
import Button from 'nsw-ds-react/button/button';
import Alert from 'nsw-ds-react/alert/alert';
import RegistryApi from 'services/registry_api';

export default function BESSBrandSelector(props) {
  const {
    brands,
    usableBatteryCapacityName,
    postcodeName,
    setStepNumber,
    setPersistFormValues,
    persistFormValues,
    selectedBrand,
    setSelectedBrand,
    selectedModel,
    setSelectedModel,
    postcode,
    setPostcode,
  } = props;
  const [registryDataLoaded, setRegistryDataLoaded] = useState(true);
  const [brandOptions, setBrandOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [lastModified, setLastModified] = useState(null);
  const [showPostcodeError, setShowPostcodeError] = useState(false);
  const [showNoResponsePostcodeError, setShowNoResponsePostcodeError] = useState(false);

  useEffect(() => {
    setBrandOptions([{ text: 'Please select brand', value: '' }]);
    setModelOptions([{ text: 'Please select model', value: '' }]);

    if (!lastModified) {
      RegistryApi.getResidentialSolarBatteryLastModified()
        .then((res) => {
          setRegistryDataLoaded(true);
          setLastModified(res.data);
        })
        .catch((err) => {
          setRegistryDataLoaded(false);
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (postcode && postcode.length <= 4) {
      // delete existing postcode form values first
      const filteredFormValues = persistFormValues.filter((item) => item.name !== postcodeName);

      setPersistFormValues([...filteredFormValues, { name: postcodeName, form_value: postcode }]);

      setShowPostcodeError(false);
    }
  }, [postcode]);

  const validatePostcode = (postcode) => {
    // Reset
    setShowNoResponsePostcodeError(false);
    setShowPostcodeError(false);

    setPostcode(postcode);

    if (['2817', '2818', '2819'].includes(postcode)) {
      setStepNumber(2);
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
              setStepNumber(2);
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
    if (brands.length > 0) {
      brands.forEach((brand) =>
        setBrandOptions((options) => {
          return [...options, { text: brand, value: brand }];
        }),
      );
    }
  }, [brands]);

  useEffect(() => {
    if (!selectedBrand) return;

    setModelOptions([{ text: 'Please select model', value: '' }]);
    setSelectedModel(null);

    RegistryApi.getResidentialSolarBatteryModels(selectedBrand)
      .then((res) => {
        setRegistryDataLoaded(true);
        if (res.data.length) {
          res.data.forEach((model) =>
            setModelOptions((options) => {
              return [...options, { text: model, value: model }];
            }),
          );
        }
      })
      .catch((err) => {
        setRegistryDataLoaded(false);
        console.log(err);
      });
  }, [selectedBrand]);

  useEffect(() => {
    if (!selectedBrand || !selectedModel) return;

    // delete existing BESS1_V5Nov24_usable_battery_capacity form values first
    const filteredFormValues = persistFormValues.filter(
      (item) => item.name !== usableBatteryCapacityName,
    );
    setPersistFormValues(filteredFormValues);

    const payload = {
      brand: selectedBrand,
      model: selectedModel,
    };

    RegistryApi.getResidentialSolarBatteryMetadata(payload)
      .then((res) => {
        setRegistryDataLoaded(true);
        setPersistFormValues([
          ...filteredFormValues,
          { name: usableBatteryCapacityName, form_value: res.data.usableBatteryCapacity },
        ]);
      })
      .catch((err) => {
        setRegistryDataLoaded(false);
        console.log(err);
      });
  }, [selectedModel]);

  return (
    <div>
      <div className="nsw-row">
        <div className="nsw-col" style={{ padding: 'inherit' }}>
          <div className="nsw-content-block">
            <br></br>
            <br></br>
            <br></br>
            <div className="nsw-content-block__content">
              <h5 className="nsw-content-block__copy" style={{ paddingBottom: '30px' }}>
                <b>Please answer the following questions to calculate your PRCs</b>
              </h5>

              <FormGroup
                label="Postcode"
                helper="Postcode where the installation has taken place" // primary question text
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
                helper="Select solar battery brand" // primary question text
                errorText="Invalid value!" // error text if invalid
              >
                <Select
                  style={{ maxWidth: '50%', marginBottom: '1%' }}
                  options={brandOptions}
                  onChange={(e) => {
                    setSelectedBrand(brands.find((item) => item === e.target.value));
                  }}
                  value={selectedBrand}
                  required
                />
              </FormGroup>

              <FormGroup
                label="Model"
                helper="Select solar battery model" // primary question text
                errorText="Invalid value!" // error text if invalid
              >
                <Select
                  style={{ maxWidth: '50%' }}
                  options={modelOptions}
                  onChange={(e) => {
                    setSelectedModel(e.target.value);
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

      {showPostcodeError && postcode.length >= 4 && (
        <Alert as="error" title="The postcode is not valid in NSW">
          <p>Please check your postcode and try again.</p>
        </Alert>
      )}

      {showNoResponsePostcodeError && postcode.length >= 4 && (
        <Alert as="error" title="Sorry!">
          <p>
            We are experiencing technical difficulties validating the postcode, please try again
            later.
          </p>
        </Alert>
      )}

      {!registryDataLoaded && (
        <Alert as="error" title="Sorry! An error has occurred.">
          <p>Unable to load data from the product registry. Please try again later.</p>
        </Alert>
      )}

      {registryDataLoaded && selectedModel && (
        <div className="nsw-row" style={{ paddingTop: '30px', width: '80%' }}>
          <div className="nsw-col" style={{ padding: 'inherit' }}>
            <Button
              as="dark"
              onClick={(e) => {
                validatePostcode(postcode);
              }}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
