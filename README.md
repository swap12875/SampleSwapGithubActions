# GitHub Actions Demo

This project demonstrates practical usage of GitHub Actions for CI/CD workflows.

## Features

- Automated testing on push and pull requests
- Multi-Node.js version testing (16.x, 18.x)
- Automated deployment on main branch
- Simple Express.js API

## Workflow Explanation

The GitHub Actions workflow (`.github/workflows/ci-cd.yml`) does the following:

1. **Triggers**: The workflow runs on:
   - Push to main branch
   - Pull requests to main branch

2. **Test Job**:
   - Runs on Ubuntu latest
   - Tests on Node.js 16.x and 18.x
   - Installs dependencies and runs tests

3. **Deploy Job**:
   - Runs only after successful tests
   - Only triggers on main branch
   - Placeholder for deployment commands

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run tests:
   ```bash
   npm test
   ```

3. Start server:
   ```bash
   npm start
   ```
