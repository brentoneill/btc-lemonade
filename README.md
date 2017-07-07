# Get up and running
1. Install yarn: `npm install -g yarn`

2. Install deps using yarn: `yarn`

3. Run Webpack dev server for local dev: `yarn start`

4. Open up your browser and head to `http://localhost:4000`

Webpack will re-compile on file save and auto refresh the browser.


# Testing

This repo runs React Component unit tests through Enzyme (https://github.com/airbnb/enzyme), with Karma as the runner.

To run tests, type `yarn test`.

This will fire up Karma, transpile our TypeScript (with ES6/7) files, and run our tests in watch mode.

Tests will re-run on file save (both component and test files).
