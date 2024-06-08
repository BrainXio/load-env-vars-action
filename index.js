const core = require('@actions/core');
const fs = require('fs');

try {
  // Get inputs
  const appNamePath = core.getInput('app-name-path');
  const buildIdPath = core.getInput('build-id-path');
  const builderIdPath = core.getInput('builder-id-path');
  const imageTagPath = core.getInput('image-tag-path');
  const latestTagPath = core.getInput('latest-tag-path');
  const imageVersion = core.getInput('image-version');

  core.info(`Reading files from paths: 
  appNamePath: ${appNamePath},
  buildIdPath: ${buildIdPath},
  builderIdPath: ${builderIdPath},
  imageTagPath: ${imageTagPath},
  latestTagPath: ${latestTagPath}`);

  // Read files and set environment variables
  const appName = fs.readFileSync(appNamePath, 'utf8').trim();
  const buildId = fs.readFileSync(buildIdPath, 'utf8').trim();
  const builderId = fs.readFileSync(builderIdPath, 'utf8').trim();
  const imageTag = fs.readFileSync(imageTagPath, 'utf8').trim() + imageVersion;
  const latestTag = fs.readFileSync(latestTagPath, 'utf8').trim() + imageVersion;

  core.exportVariable('APP_NAME', appName);
  core.exportVariable('BUILD_ID', buildId);
  core.exportVariable('BUILDER_ID', builderId);
  core.exportVariable('IMAGE_TAG', imageTag);
  core.exportVariable('LATEST_TAG', latestTag);

  core.info(`APP_NAME=${appName}`);
  core.info(`BUILD_ID=${buildId}`);
  core.info(`BUILDER_ID=${builderId}`);
  core.info(`IMAGE_TAG=${imageTag}`);
  core.info(`LATEST_TAG=${latestTag}`);

} catch (error) {
  core.setFailed(`Action failed with error ${error}`);
}
