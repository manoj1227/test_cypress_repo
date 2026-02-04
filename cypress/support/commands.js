// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('openUrl',()=>{
    cy.visit('/');
})

Cypress.Commands.add('clickOnElements', ()=>{
    //Click on the Elements card
    cy.get('.card-body h5').contains('Elements').click();
})

Cypress.Commands.add('clickOnForms', ()=>{
    //Click on the Elements card
    cy.get('.card-body h5').contains('Forms').click();
})

Cypress.Commands.add('clickOnAlerts', ()=>{
    //Click on the Elements card
    cy.get('.card-body h5').contains('Alerts, Frame & Windows').click();
})

Cypress.Commands.add('verifyTitleText',(text)=>{
    cy.get('h1').contains(text).should('be.visible');
})
