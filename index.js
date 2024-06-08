const core = require('@actions/core');
const fs = require('fs');
const path = require('path');

try {
  // Get inputs
  const appNamePath = core.getInput('app-name-path');
  const buildIdPath = core.getInput('build-id-path');
  const builderIdPath = core.getInput('builder-id-path');
  const imageTagPath = core.getInput('image-tag-path');
  const latestTagPath = core.getInput('latest-tag-path');
  const imageVersion = core.getInput('image-version');

  const paths = [appNamePath, buildIdPath, builderIdPath, imageTagPath, latestTagPath];
  const names = ['APP_NAME', 'BUILD_ID', 'BUILDER_ID', 'IMAGE_TAG', 'LATEST_TAG'];

  paths.forEach((filePath, index) => {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8').trim();
    const envValue = index < 3 ? fileContent : fileContent + imageVersion;

    core.exportVariable(names[index], envValue);
    core.info(`${names[index]}=${envValue}`);
  });

} catch (error) {
  core.setFailed(`Action failed with error ${error}`);
}
