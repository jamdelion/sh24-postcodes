# SH:24 Postcode Checker

A simple web app built with React, Vite and TypeScript to check if a UK postcode is within a service area. 

## Tech Stack

- React 18
- Vite (fast build tool)
- TypeScript
- React Query (for data fetching)
- MSW for API mocking in tests
- Jest + React Testing Library for unit and integration tests
- Cypress for end-to-end tests

---

## Getting Started

### Prerequisites

- Node.js v16 or later
- npm or yarn

### Installation

1. Clone and install dependencies

```bash
git clone https://github.com/jamdelion/sh24-postcodes.git
cd sh24-postcodes
npm install
```


### Running the app locally

```bash
npm run dev
```

### Run tests (unit and integration)

```bash
npm run test
```

You can also run individual test files by adding a search term, e.g. to run the postcode validation tests:

```bash
npm run test postcode
```

### Run end-to-end tests

```bash
npm run cypress:run
```

To see the e2e tests running in a headless browser, run:

```bash
npm run cypress:open
```

Then click through to 'E2E Testing' --> 'Chrome'  --> 'Start E2E Testing in Chrome' --> 'app.cy.js'. 
