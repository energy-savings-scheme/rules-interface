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

## To serve locally:

#### Ensure you have installed the necessary requirements on your machine

Installation process may differ on Windows/Mac/Linux. If unsure, Google the steps for your operating systems.

- Node.JS and NPM (https://www.npmjs.com/get-npm)
- Yarn (https://classic.yarnpkg.com/en/docs/install/#debian-stable)

#### Launch the app locally

In the project directory, you can run:

```bash
# Copy the .env.example, and set the variable correctly
cp .env.example .env

# Use NVM if available, otherwise make sure npm is version 14
nvm use
npm i

npm run start

# Open the http://localhost:3000
```
