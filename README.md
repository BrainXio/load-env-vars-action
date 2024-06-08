# load-env-vars

## Overview

Hey there, wonderful human! 🤖 `load-env-vars` is a GitHub Action that loads environment variables from specified artifact files. This action helps streamline your CI/CD pipeline by dynamically setting environment variables based on the content of these files.

## Usage

### Workflow Example

To use this action, add the following step to your GitHub Actions workflow:

```yaml
name: CI/CD Pipeline

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Create artifact files
        run: |
          mkdir -p artifacts
          echo "my-app" > artifacts/app_name.txt
          echo "12345" > artifacts/build_id.txt
          echo "builder-01" > artifacts/builder_id.txt
          echo "v1.0.0" > artifacts/image_tag.txt
          echo "latest" > artifacts/latest_tag.txt

      - name: Load Environment Variables
        uses: your-username/load-env-vars@v1
        with:
          app-name-path: artifacts/app_name.txt
          build-id-path: artifacts/build_id.txt
          builder-id-path: artifacts/builder_id.txt
          image-tag-path: artifacts/image_tag.txt
          latest-tag-path: artifacts/latest_tag.txt
          image-version: "-beta"

      - name: Verify Environment Variables
        run: |
          echo "APP_NAME=$APP_NAME"
          echo "BUILD_ID=$BUILD_ID"
          echo "BUILDER_ID=$BUILDER_ID"
          echo "IMAGE_TAG=$IMAGE_TAG"
          echo "LATEST_TAG=$LATEST_TAG"
```

### Inputs

- `app-name-path`: Path to the file containing the APP_NAME.
- `build-id-path`: Path to the file containing the BUILD_ID.
- `builder-id-path`: Path to the file containing the BUILDER_ID.
- `image-tag-path`: Path to the file containing the IMAGE_TAG.
- `latest-tag-path`: Path to the file containing the LATEST_TAG.
- `image-version`: Image version to append to the IMAGE_TAG and LATEST_TAG.

### Outputs

This action does not produce any direct outputs. It sets environment variables that can be used in subsequent steps of your workflow.

### Security and Best Practices

**Environment Variables**: Ensure all necessary environment variables are set.

**File Paths**: Validate and sanitize file paths to prevent security vulnerabilities.

**Error Handling**: Properly handle errors to avoid unexpected failures.

## Contributing

We welcome contributions to improve the action. Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the Unlicense License. See the [LICENSE](LICENSE) file for details.
