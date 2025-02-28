## Project Setup

1. Clone the repository:
https://github.com/navinkumarparmar/task_db.git

2. Install dependencies:
npm install


3. Run the development server:
npm run start


4. Run tests:
npm run test




CI/CD Pipeline

Overview

This project uses GitHub Actions for Continuous Integration (CI). The pipeline performs:

Linting: Runs ESLint to ensure code quality.

Unit Testing: Runs test cases automatically.

Workflow

The GitHub Actions workflow is defined in .github/workflows/ci.yml. It runs on:

Every push to master and newfeature01 branches.

Every pull request to master.

CI/CD Workflow Steps

Checkout Repository: Fetches the latest code.

Set up Node.js: Installs the required Node.js version.

Install Dependencies: Installs project dependencies using npm install.

Run ESLint: Ensures code follows best practices.

Run Tests: Executes unit tests using Jest