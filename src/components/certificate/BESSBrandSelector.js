import { useEffect, useState } from 'react';
import { FormGroup, Select } from 'nsw-ds-react/forms';
import Button from 'nsw-ds-react/button/button';
import Alert from 'nsw-ds-react/alert/alert';
import RegistryApi from 'services/registry_api';

export default function BESSBrandSelector(props) {
  const {
    brands,
    usableBatteryCapacityName,
    setStepNumber,
    setPersistFormValues,
    persistFormValues,
  } = props;
  const [registryDataLoaded, setRegistryDataLoaded] = useState(true);
  const [brandOptions, setBrandOptions] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [modelOptions, setModelOptions] = useState([]);
  const [lastModified, setLastModified] = useState(null);

  useEffect(() => {
    setBrandOptions([{ text: 'Please select brand', value: '' }]);

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
                setStepNumber(2);
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
