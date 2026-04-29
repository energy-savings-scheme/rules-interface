# Energy Security Safeguard - Rule Dashboard

This is the frontend application for the Energy Security Safeguard "Rules Dashboard".

Functionality:

- Presents the contents of the ["openfisca_nsw_safeguard"](https://github.com/energy-savings-scheme/openfisca_nsw_safeguard) OpenFisca ruleset in a graphical frontend web application.
- Displays relationships between OpenFisca Variables. This includes the ability to compare Variables.
- Performs calculations on OpenFisca Variables.

![image](https://user-images.githubusercontent.com/33742989/126919827-e55d93b7-6486-4317-9cbe-94e6feab12f4.png)
**Application stack**

- The "Rule Dashboard" repo assumes the above application stack.
- The stack comprises of the ['OpenFisca-Core API'](https://github.com/energy-savings-scheme/openfisca_nsw_safeguard) and the ['Django API'](https://github.com/energy-savings-scheme/openfisca-djangoapi)

## Prerequisite
- Docker Engine - [Installation Guide](https://docs.docker.com/engine/install/)
- Docker Compose - [Installation Guide](https://docs.docker.com/compose/install/)
- Node Version Manager (NVM) - [Installation Guide](https://github.com/nvm-sh/nvm#installing-and-updating)

## How to Run

### Prepare Configuration
- Create new .env file in root folder
- Copy all environment variable definition from .env.example to .env
- Fill in .env file with appropriate value

### Build Application
```sh
docker-compose build
```

### Run Application
```sh
docker-compose up -d
```


## Test

### Prepare Configuration
- Create new .env file packages/test/ folder
- Copy all environment variable definition from packages/test/.env.example to packages/test/.env
- Fill in packages/test/.env file with appropriate value

### Install packages dependency
```sh
cd packages/test
nvm use
yarn install
```

### How to Run
- *Before run the test, make sure the rule interface application is running, if you want to run the test for local application.*
- *Make sure you already set node runtime version.*
#### Set node runtime version
```sh
cd packages/test
nvm use
```

#### Run the test
```sh
npm run test
```

To run in the browser (*visually*) and with the dashboard
```sh
npm run cypress:open
```

## Deployment

For deployment, it all happening through CI/CD in Github workflow.
All workflows defined in *.github/workflows/*.

Deployment to _**DEV**_ and _**UAT/STAGING**_ are automatically, but to deploy to _**PROD**_ it need to be triggered manually from Github Actions.

## Notes
- We have separate workflow for automated test, defined in _.github/workflows/automated-test-{ENV}.yml_. This workflow usually used by users to have test in PROD and it always triggered on Monday morning.

_ENV can _**PROD / DEV**_ depends on which environment we want the test to be run_.