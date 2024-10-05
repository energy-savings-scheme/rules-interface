import {
  readFileSync,
  writeFileSync,
  copyFileSync,
  mkdirSync,
  existsSync,
  rmSync,
  readdirSync,
} from 'fs';

import * as child from 'child_process';

const build = () => {
  const srcFolder = './src';
  const buildFolder = './build';
  const distFolder = './dist';
  const tempFolder = `${distFolder}/temp`;
  const filesFolder = `${distFolder}/files`;
  const appFilename = 'App.js';
  const appTempPath = `${tempFolder}/${appFilename}`;
  const appOriginalPath = `${srcFolder}/${appFilename}`;
  const envOriginalPath = './.env';
  const envTempPath = `${tempFolder}/.env`;

  const fileContent: string = readFileSync(appOriginalPath, { encoding: 'utf8' });
  const routes = getAllRoutes(fileContent);

  // create necessary folders
  createFolder(distFolder);
  createFolder(tempFolder);
  createFolder(filesFolder);

  console.log('Backing up original App.js file ...');
  backup(appOriginalPath, appTempPath);
  console.log('Backup done.\n');

  console.log('Backing up original .env file ...');
  backup(envOriginalPath, envTempPath);
  console.log('Backup done.\n');

  overrideEnv();

  // Process per route
  for (const route of routes) {
    // Skip route '/', '*' & empty route
    const pathRegex: RegExp = /(?<=path=")([^"]*)/g;
    const pathRoute = route[0].match(pathRegex)?.[0];
    console.log(`Building route ${pathRoute} ...`);

    if (pathRoute === '/' || pathRoute === '*' || pathRoute === '') {
      continue;
    }

    // Remove build folder first
    if (existsSync(buildFolder)) {
      rmSync(buildFolder, { recursive: true, force: true });
    }

    let routeTag = route[0];

    if (pathRoute) {
      // Replace existing route path with '/'
      routeTag = routeTag.replace(pathRoute, '/');
    }

    const routeFileContent = fileContent.replace(
      /<Switch>([\s\S])*<\/Switch>/g,
      `<Switch>${routeTag}</Switch>`,
    );
    writeFileSync(appOriginalPath, routeFileContent);

    console.log(`Executing command "npm run build"`);
    child.execSync('npm run build', { stdio: ['pipe', 'ignore'] });
    writeRouteFile(filesFolder, buildFolder, pathRoute?.replace('/', ''));
    console.log(`Building route ${pathRoute} done.\n`);
  }

  console.log('Restoring original App.js file ...');
  restore(appOriginalPath, appTempPath);
  console.log('Restore done.');

  console.log('Restoring original .env file ...');
  restore(envOriginalPath, envTempPath);
  console.log('Restore done.');

  // Remove temp folder
  if (existsSync(tempFolder)) {
    rmSync(tempFolder, { recursive: true, force: true });
  }
};

const getAllRoutes = (fileContent: string) => {
  const regex: RegExp = /<Route ([\s\S]*?)(.)<\/Route>/g;
  const routes = fileContent.matchAll(regex);

  return routes;
};

const backup = (originalFile: string, backupFile: string): void => {
  copyFileSync(originalFile, backupFile);
};

const restore = (originalFile: string, backupFile: string): void => {
  // Restore original file
  copyFileSync(backupFile, originalFile);
};

const createFolder = (folder: string): void => {
  if (!existsSync(folder)) {
    mkdirSync(folder);
  }
};

const overrideEnv = () => {
  if (!existsSync('./.env.prod')) {
    return;
  }

  console.log('Overriding .env ...');
  copyFileSync('./.env.prod', './.env');
  console.log('Overriding done.\n');
};

const writeRouteFile = (
  filesFolder: string,
  buildFolder: string,
  route: string | undefined,
): void => {
  if (!existsSync(buildFolder)) {
    console.log('No build folder');
    return;
  }

  // Skip generate file for route '/' & '*' or no route
  if (route === '/' || route === '' || route === '*') {
    return;
  }

  const jsFolder = `${buildFolder}/static/js`;
  const jsFolderFiles = readdirSync(jsFolder);
  const jsFiles = jsFolderFiles.filter((file) => file.match(/.*\.js$/g));
  const routeFilename = `${route?.replace(/-/gm, '_')}.js`;
  const routePath = `${filesFolder}/${routeFilename}`;

  if (jsFiles.length > 0) {
    console.log(`Writing ${routeFilename} ...`);
    const jsContent = readFileSync(`${jsFolder}/${jsFiles[0]}`, { encoding: 'utf-8' });
    writeFileSync(routePath, jsContent);
    console.log(`Writing ${routeFilename} done.`);
  }
};

build();
