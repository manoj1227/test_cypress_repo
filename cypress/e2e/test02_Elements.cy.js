        describe('Elements',()=>{

        beforeEach(()=>{
           cy.openUrl()
        });

        it('Text Box',()=>{
        let firstName = "Manoj Kumar"
        let email = "manoj.pmk7@gmail.com"
        let address = "2-64, Raghavapatanam - 505532"

        //Verify the title of the page
        cy.title().should('eq','DEMOQA');

        cy.clickOnElements();
        cy.get('.text').contains('Text Box').click();
        cy.verifyTitleText('Text Box');

        cy.get('#userName').type(firstName).should('have.value', firstName);
        cy.get('#userEmail').type(email).should('have.value', email);
        cy.get('#currentAddress').type(address).should('have.value', address);
        cy.get('#permanentAddress').type(address).should('have.value', address);
        cy.get('#submit').click();
        })

        it('Check Box',()=>{
        const desktopTexts = ['desktop', 'notes',  'commands'];
        const downloadTexts = ['downloads','wordFile','excelFile'];
        cy.clickOnElements();
        cy.get('.text').contains('Check Box').click();
        cy.verifyTitleText('Check Box');
        cy.get('[title="Toggle"]').click();
        cy.get('.rct-checkbox').eq(1).click();

        cy.get('.text-success').then(($el)=>{
        desktopTexts.forEach(text=>{
        expect($el.text()).to.contain(text);
        })
        })

        cy.get('.rct-checkbox').eq(1).click();

        cy.get('.rct-checkbox').eq(3).click();
        cy.get('.text-success').then(($el)=>{
        downloadTexts.forEach(text=>{
        expect($el).to.contain(text);
        })
        })

        })

        it('Radio Button', ()=>{
        const answers = ['Yes', 'Impressive']
        cy.clickOnElements();
        cy.get('.text').contains('Radio Button').click();
        cy.verifyTitleText('Radio Button');
        answers.forEach(text=>{
        cy.contains('label', text).prev('input').check({force:true});
        cy.get('.text-success').should('contain.text', text).and('be.visible');
        })
        cy.get('#noRadio').should('be.disabled');
        cy.get('#noRadio').should('have.attr', "disabled");
        cy.get('#noRadio').should('have.class', "disabled");
        })

        it('WebTables',()=>{
        const firstName = "Manoj";
        const lastName ="kumar";
        const email = "manoj.pmk7@gmail.com";
        const age = 21;
        const salary =132000;
        const dept = "Automation";
        const editLastName = "Porandla";

        cy.clickOnElements();
        cy.get('.text').contains('Web Tables').click();
        cy.verifyTitleText('Web Tables');
        cy.get('[title="Delete"]').last().click();
        cy.get('#addNewRecordButton').click();

        cy.get('#firstName').type(firstName).should('have.value', firstName);
        cy.get('#lastName').type(lastName).should('have.value', lastName);
        cy.get('#userEmail').type(email).should('have.value', email);
        cy.get('#age').type(age).should('have.value', age);
        cy.get('#salary').type(salary).should('have.value', salary);
        cy.get('#department').type(dept).should('have.value', dept);
        cy.get('#submit').click();


        cy.get('[title="Edit"]').last().click();
        cy.get('#lastName').clear().type(editLastName).should('have.value', editLastName);
        cy.get('#submit').click();

        cy.get('.rt-tr.-odd').eq(1).find('.rt-td').eq(1).should('contain.text', editLastName);
        })

        it('Buttons',()=>{
        cy.clickOnElements();

        cy.get('.text').contains('Buttons').click();
        cy.verifyTitleText('Buttons');

        cy.get('.btn.btn-primary').last().click();
        cy.get('#dynamicClickMessage').should('contain.text', "You have done a dynamic click");

        cy.get('#rightClickBtn').rightclick();
        cy.get('#rightClickMessage').should('contain.text', 'You have done a right click');

        cy.get('#doubleClickBtn').dblclick();
        cy.get('#doubleClickMessage').should('contain.text', 'You have done a double click');

        })

        it('Links', ()=>{
        cy.clickOnElements();

        cy.get('.text').contains('Links').click();
        cy.verifyTitleText('Links');
        cy.get('#simpleLink').should('have.attr', 'href').and('include', "https://demoqa.com");
        cy.get('#simpleLink').invoke('removeAttr', 'target').click();;
        cy.url().should('eq', "https://demoqa.com/")
        })

        it('Links - API - Intercept', ()=>{
        cy.clickOnElements();

        cy.get('.text').contains('Links').click();
        cy.verifyTitleText('Links');

        //created api call
        cy.intercept('GET','**/created').as('created');
        cy.get('#created').click();
        cy.wait('@created').its('response.statusCode').should('eq', 201);

        //no content
        cy.intercept('GET', '**/no-content').as('nocontent');
        cy.get('#no-content').click();
        cy.wait('@nocontent').then((nocontentcall)=>{
        expect(nocontentcall.response.statusCode).to.eq(204);
        })

        //Moved
        cy.intercept('GET', '**/moved').as('moved');
        cy.get('#moved').click();
        cy.wait('@moved').then((movedcall)=>{
        expect(movedcall.response.statusCode).to.eq(301);
        expect(movedcall.request.method).to.eq('GET');
        })

        //Bad Request api
        cy.intercept('GET', '**/bad-request').as('badrequest');
        cy.get('#bad-request').click();
        cy.wait('@badrequest').then((badrequestcall)=>{
        expect(badrequestcall.response.statusCode).to.eq(400);
        expect(badrequestcall.request.method).to.eq('GET');
        })

        //unauthorized
        cy.intercept('GET', '**/unauthorized').as('unauthorized');
        cy.get('#unauthorized').click();
        cy.wait('@unauthorized').then((unauthorizedcall)=>{
        expect(unauthorizedcall.response.statusCode).to.eq(401);
        expect(unauthorizedcall.request.method).to.eq('GET');
        })

        //forbidden
        cy.intercept('GET', '**/forbidden').as('forbidden')
        cy.get('#forbidden').click();
        cy.wait('@forbidden').then((forbiddencall)=>{
        expect(forbiddencall.response.statusCode).to.eq(403);
        expect(forbiddencall.request.method).to.eq('GET');
        })

        //Not Found
        cy.intercept('GET', '**/invalid-url').as('invalidurl');
        cy.get('#invalid-url').click();
        cy.wait('@invalidurl').then((invalidurlcall)=>{
        expect(invalidurlcall.response.statusCode).to.eq(404);
        expect(invalidurlcall.request.method).to.eq('GET');
        })
        })

    it('Broken Links - Images', ()=>{
        cy.clickOnElements();

        cy.get('.text').contains('Broken Links - Images').click();
        cy.verifyTitleText('Broken Links - Images');

        // Valid Image
        cy.contains('p','Valid image').next('img').should(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(12);
        });

        // Broken Image
        cy.contains('p','Broken image').next('img').should(($img) => {
        expect($img[0].naturalWidth).to.eq(0);
        });

        // Valid Link
        cy.contains('Click Here for Valid Link')
        .invoke('attr', 'href')
        .then((url) => {
        cy.request(url).its('status').should('eq', 200);
        
        // Broken Link
        cy.contains('Click Here for Broken Link')
        .invoke('attr', 'href')
        .then((url) => {
        cy.request({ url, failOnStatusCode: false})
        .its('status')
        .should('eq', 500);
         });
    });
    })

    it('Upload and Download',()=>{
        cy.clickOnElements();

        cy.get('.text').contains('Upload and Download').click();
        cy.verifyTitleText('Upload and Download');

        //upload and Verify file
        cy.get('#uploadFile').attachFile('/sampleFile.jpeg');
        cy.get('#uploadedFilePath').contains('sampleFile.jpeg');

        //download and Verify file
        cy.get('#downloadButton').click();
        cy.readFile('cypress/downloads/sampleFile.jpeg').should('exist');
    })
    
})
