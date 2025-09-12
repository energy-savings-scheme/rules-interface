import DjangoApiBase from 'services/django_api_base';
import OpenFiscaApiBase from 'services/openfisca_api_base';
import RegistryApiBase from './registry_api_base';

// Note the change in url for openfisca-djangoapi
function getCommercialHVACBrands() {
  return RegistryApiBase({
    url: `/commercial_hvac/brands`,
    method: 'GET',
  });
}

function getCommercialHVACLastModified() {
  return RegistryApiBase({
    url: `/commercial_hvac/last_modified`,
    method: 'GET',
  });
}

function listHvacModels(brandName) {
  return RegistryApiBase({
    url: `/commercial_hvac/brands/${brandName}/models`,
    method: 'GET',
  });
}

function getHvacModelsMetadata(payload) {
  return RegistryApiBase({
    url: `/commercial_hvac/metadata`,
    method: 'POST',
    data: payload,
  });
}

function getCommercialWHBrands() {
  return RegistryApiBase({
    url: `/commercial_wh/brands`,
    method: 'GET',
  });
}

function getCommercialWHLastModified() {
  return RegistryApiBase({
    url: `/commercial_wh/last_modified`,
    method: 'GET',
  });
}

function listWHModels(brandName) {
  return RegistryApiBase({
    url: `/commercial_wh/brands/${brandName}/models`,
    method: 'GET',
  });
}

function getWHModelsMetadata(payload) {
  return RegistryApiBase({
    url: `/commercial_wh/metadata`,
    method: 'POST',
    data: payload,
  });
}

function getRF2Brands() {
  return RegistryApiBase({
    url: `/refrigerated_cabinets/brands`,
    method: 'GET',
  });
}

function getRF2LastModified() {
  return RegistryApiBase({
    url: `/refrigerated_cabinets/last_modified`,
    method: 'GET',
  });
}

function listRF2Models(brandName) {
  return RegistryApiBase({
    url: `/refrigerated_cabinets/brands/${brandName}/models`,
    method: 'GET',
  });
}

function getRF2ModelsMetadata(payload) {
  return RegistryApiBase({
    url: `/refrigerated_cabinets/metadata`,
    method: 'POST',
    data: payload,
  });
}

function getResidentialHeatPumpBrands() {
  return RegistryApiBase({
    url: `/residential_heat_pumps/brands`,
    method: 'GET',
  });
}

function getResidentialHeatPumpLastModified() {
  return RegistryApiBase({
    url: `/residential_heat_pumps/last_modified`,
    method: 'GET',
  });
}

function getResidentialHeatPumpModels(brandName) {
  return RegistryApiBase({
    url: `/residential_heat_pumps/brands/${brandName}/models`,
    method: 'GET',
  });
}

function getResidentialHeatPumpModelsMetadata(payload) {
  return RegistryApiBase({
    url: `/residential_heat_pumps/metadata`,
    method: 'POST',
    data: payload,
  });
}
function getResidentialSolarWaterHeaterBrands() {
  return RegistryApiBase({
    url: `/residential_solar_water_heater/brands`,
    method: 'GET',
  });
}

function getResidentialSolarWaterHeaterLastModified() {
  return RegistryApiBase({
    url: `/residential_solar_water_heater/last_modified`,
    method: 'GET',
  });
}

function getResidentialSolarWaterHeaterModels(brandName) {
  return RegistryApiBase({
    url: `/residential_solar_water_heater/brands/${brandName}/models`,
    method: 'GET',
  });
}

function getResidentialSolarWaterHeaterMetadata(payload) {
  return RegistryApiBase({
    url: `/residential_solar_water_heater/metadata`,
    method: 'POST',
    data: payload,
  });
}

function getResidentialSolarBatteryBrands() {
  return RegistryApiBase({
    url: `/bess/brands`,
    method: 'GET',
  });
}

function getResidentialSolarBatteryLastModified() {
  return RegistryApiBase({
    url: `/bess/last_modified`,
    method: 'GET',
  });
}

function getResidentialSolarBatteryModels(brandName) {
  return RegistryApiBase({
    url: `/bess/brands/${brandName}/models`,
    method: 'GET',
  });
}

function getResidentialSolarBatteryMetadata(payload) {
  return RegistryApiBase({
    url: `/bess/metadata`,
    method: 'POST',
    data: payload,
  });
}

function getPoolPumpBrands() {
  return RegistryApiBase({
    url: `/pool_pumps/brands`,
    method: 'GET',
  });
}

function getPoolPumpLastModified() {
  return RegistryApiBase({
    url: `/pool_pumps/last_modified`,
    method: 'GET',
  });
}

function listPoolPumpModels(brandName) {
  return RegistryApiBase({
    url: `/pool_pumps/brands/${brandName}/models`,
    method: 'GET',
  });
}

function getPoolPumpMetadata(payload) {
  return RegistryApiBase({
    url: `/pool_pumps/metadata`,
    method: 'POST',
    data: payload,
  });
}

function getPostcodeValidation(postcode) {
  return RegistryApiBase({
    url: `/postcode/${postcode}`,
    method: 'GET',
  });
}

function getCertificatePrice() {
  return RegistryApiBase({
    url: '/certificate-price',
    method: 'GET',
  })
}

function sendToGoogleAnalytics(payload) {
  return RegistryApiBase({
    url: '/send-google-analytic',
    method: 'POST',
    data: payload
  })
}

const RegistryApi = {
  getCommercialHVACBrands,
  getCommercialHVACLastModified,
  getCommercialWHBrands,
  getCommercialWHLastModified,
  listHvacModels,
  getHvacModelsMetadata,
  listWHModels,
  getWHModelsMetadata,
  getRF2LastModified,
  getRF2Brands,
  listRF2Models,
  getRF2ModelsMetadata,
  getPoolPumpBrands,
  getPoolPumpLastModified,
  listPoolPumpModels,
  getPoolPumpMetadata,
  getPostcodeValidation,
  getResidentialHeatPumpLastModified,
  getResidentialHeatPumpBrands,
  getResidentialHeatPumpModels,
  getResidentialHeatPumpModelsMetadata,
  getResidentialSolarWaterHeaterLastModified,
  getResidentialSolarWaterHeaterBrands,
  getResidentialSolarWaterHeaterModels,
  getResidentialSolarWaterHeaterMetadata,
  getResidentialSolarBatteryLastModified,
  getResidentialSolarBatteryBrands,
  getResidentialSolarBatteryModels,
  getResidentialSolarBatteryMetadata,
  getCertificatePrice,
  sendToGoogleAnalytics
};

export default RegistryApi;
