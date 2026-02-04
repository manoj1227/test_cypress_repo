describe('Alerts, Windows, Iframes',()=>{

    beforeEach(()=>{
        cy.openUrl();
    })
    it('Windows',()=>{
         
        cy.clickOnAlerts();
        cy.get('.text').contains('Browser Windows').click();
        cy.verifyTitleText('Browser Windows');

        let newTabUrl;
        cy.window().then((win) => {
        cy.stub(win, 'open').callsFake((url) => {
            newTabUrl = url
            })
        })

        cy.contains('New Tab').click()

        cy.then(() => {
            cy.visit(newTabUrl)
        })

        cy.get('#sampleHeading')
            .should('have.text', 'This is a sample page')
        })

    it.only('Alerts',()=>{

        cy.clickOnAlerts();
        cy.get('.text').contains('Alerts').click();
        cy.verifyTitleText('Alerts');

        cy.get('#alertButton').click();

        // cy.on('window:alert', (text) => {
        //     expect(text).to.eq('You clicked a button')
        // })
        
        
        cy.get('#timerAlertButton').click();

        cy.get('#confirmButton').click();

        cy.on('window:confirm',()=>{
            false
        })

        // cy.get('#promtButton').click();
         })

    })