describe('Tables',()=>{

    beforeEach(()=>{
        cy.visit('https://www.w3schools.com/html/html_tables.asp');
    })

    it('Test - Tables', ()=>{
        cy.get('table#customers tbody tr td:nth-child(2)').last().each(($text)=>{
            //verify last row data
            cy.wrap($text).invoke('text').should('include','Giovanni Rovelli');
            cy.wrap($text).should('contain.text','Giovanni Rovelli');
        })

        cy.get('table#customers tbody tr td:nth-child(2)').eq(2).each(($coldata)=>{
           cy.wrap($coldata).invoke('text').should('include','Roland Mendel');
        })
    })
})