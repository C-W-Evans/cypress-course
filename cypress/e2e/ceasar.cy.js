/// <reference types="cypress" />

describe('test: ceasar.html', () => {
    beforeEach(() => {
        cy.visit('../../ceasar.html')
    })

it('displays I for G - key : 2', () => {
    
    // completion du formulaire
    cy.dataCy('cypher-key').clear().type('2')
    cy.dataCy('cypher-msg').type('G')

    // validation du formulaire
    cy.dataCy('cypher-btn').click()

    // verification du resultat (message chiffré)
    cy.dataCy('cypher-output').should('have.text', 'I')
    })
})