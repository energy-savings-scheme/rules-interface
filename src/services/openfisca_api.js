import DjangoApiBase from 'services/django_api_base';
import OpenFiscaApiBase from 'services/openfisca_api_base';

// Note the change in url for openfisca-djangoapi
function getVariable(variable_name) {
  return DjangoApiBase({
    url: `/variables/${variable_name}/`,
    method: 'GET',
  });
}

function getParameters() {
  return DjangoApiBase({
    url: '/parameters/',
    method: 'GET',
  });
}

function listEntities() {
  return DjangoApiBase({
    url: '/entities/',
    method: 'GET',
  });
}

function listVariables(params) {
  return DjangoApiBase({
    url: '/variables/',
    method: 'GET',
    params: params,
  });
}

function listActivities(params) {
  return DjangoApiBase({
    url: '/activities/',
    method: 'GET',
    params: params,
  });
}

function postDependencies(payload) {
  return DjangoApiBase({
    url: '/dependencies/',
    method: 'POST',
    data: payload,
  });
}

function postTrace(payload) {
  return DjangoApiBase({
    url: '/trace/',
    method: 'POST',
    data: payload,
  });
}

function postCalculate(payload) {
  return OpenFiscaApiBase({
    url: '/calculate',
    method: 'POST',
    data: payload,
  });
}

const OpenFiscaApi = {
  getVariable,
  getParameters,
  listEntities,
  listVariables,
  listActivities,
  postDependencies,
  postTrace,
  postCalculate,
};

export default OpenFiscaApi;
