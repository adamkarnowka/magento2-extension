'use strict';

require('./commands');

before(() => {
  cy.task('setConfig', {
    websiteId: 1,
    config: {
      storeSettings: [
        {
          storeId: 0,
          slug: 'cypress-testadminslug'
        },
        {
          storeId: 1,
          slug: 'cypress-testslug'
        }
      ]
    }
  });
});

beforeEach(() => {
  Cypress.cy.onUncaughtException = function() {
    console.log('FRONTEND_ERROR');
    return false;
  };
});

afterEach(() => {
  cy.wait(4000);
  cy.task('clearEvents');
});

Cypress.on('uncaught:exception', (err, runnable) => { // eslint-disable-line no-unused-vars
  cy.task('log', err.toString());
  return false;
});

Cypress.on('fail', (error, runnable) => {
  debugger;
  console.log('FAILING TEST', error, runnable);

  throw error;
});
