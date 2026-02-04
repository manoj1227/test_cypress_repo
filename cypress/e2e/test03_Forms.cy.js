describe('Forms',()=>{

    before(()=>{
        cy.openUrl();
    })

    it('Forms - Test', ()=>{

        const firstName ="Manoj";
        const lastName ="Kumar";
        const email= "manoj.pmk8@gmail.com";
        const gender = "Male";
        const mobile = 7680067973;
        const dob = "12/08/1998";
        const subjects=["Computer Science", "Maths", "English"];
        const hobbies = ["Sports", "Music"];
        const currentAddress = "Hyderabad";
        const state = "NCR";
        const city ="Delhi";


        cy.clickOnForms();
        cy.get('.text').contains('Practice Form').click();
        cy.verifyTitleText('Practice Form');

        cy.get('#firstName').should('be.visible').type(firstName).should('have.value', firstName);
        cy.get('#lastName').should('be.visible').type(lastName).should('have.value', lastName);
        cy.get('#userEmail').type(email).should('have.value', email);
        cy.xpath(`//div//input[@name="gender"]//..//label[text()="${gender}"]`).click();
        cy.get('[name="gender"]').should('be.checked');
        cy.get('#userNumber').type(mobile).should('have.value', mobile);
        
        subjects.forEach((subject)=>{
        cy.get('#subjectsContainer').type(subject);
        cy.xpath(`(//div[text()='${subject}'])[2]`).click({force:true});
        })

       hobbies.forEach((hobby=>{
        cy.contains('label', hobby).click();
       }))

       cy.get('#uploadPicture').attachFile('/sampleFile.jpeg');
       cy.get('#currentAddress').type(currentAddress).should('have.value', currentAddress);
       cy.get('#state').click();
       cy.contains('div', state).click();
       cy.get('#city').click();
       cy.contains('div', city).click();
       cy.get('#submit').click();
    })
})