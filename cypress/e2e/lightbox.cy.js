/// <reference types="cypress" />

describe('test: lightbox.html', () => {
    beforeEach(() => {
        cy.visit('../../lightbox.html')
    })
    
    it('Lightbox opens on click', () => {
        cy.dataCy('lightbox-overlay').click();
        cy.dataCy('lightbox').should('be.visible');        
    })

    it('Lightbox closes on click outside', () => {
        cy.dataCy('lightbox-overlay').click();
        cy.dataCy('lightbox').should('be.visible');
    })

    it('click outside closes lightbox', () => { 
        cy.dataCy('lightbox-overlay').click();
        cy.get('body').click(0, 0);
        cy.dataCy('lightbox').should('not.be.visible');
    })

    it('Clicking like updates the counters', () => {
        cy.dataCy('lightbox-overlay').click();
        cy.dataCy('lightbox').scrollTo('bottom');
        cy.dataCy('unliked-svg').click();

        //SVG icon change on lightbox
        cy.dataCy('unliked-svg').should('not.be.visible');
        cy.dataCy('liked-svg').should('be.visible');
        // Like count changes on lightbox
        cy.dataCy('like-count').should('have.text', '1');

        // Like count changes on overlay
        cy.get('body').click(0, 0);
        cy.dataCy('overlay-like-count').should('have.text', '1');
        })

    it('Clicking unlike updates the counters', () => {
        cy.dataCy('lightbox-overlay').click();
        cy.dataCy('lightbox').scrollTo('bottom');
        cy.dataCy('unliked-svg').click();
        cy.dataCy('liked-svg').click();

        //SVG icon change on lightbox
        cy.dataCy('liked-svg').should('not.be.visible');
        cy.dataCy('unliked-svg').should('be.visible');

        // Like count changes on lightbox
        cy.dataCy('like-count').should('have.text', '0');

        // Like count changes on overlay
        cy.get('body').click(0, 0);
        cy.dataCy('overlay-like-count').should('have.text', '0');
        })

    it('Adding a comment', () => {
        cy.dataCy('lightbox-overlay').click();
        cy.dataCy('lightbox').scrollTo('bottom');
        cy.dataCy('comment-input').type('Cypress is awesome!');
        cy.dataCy('comment-publish').click();

        // Check added comment
        cy.dataCy('comment-body-0').should('have.text', 'Cypress is awesome!')
        cy.dataCy('comment-author-0').should('have.text', 'johndoe')
        // Counter
        cy.dataCy('comment-text').should('have.text', 'Hide 1 comment')
        // Overlay counter
        cy.get('body').click(0, 0);
        cy.dataCy('overlay-comments-count').should('have.text', '1');
        })

    it('Impossible to publish an empty comment', () => {
        cy.dataCy('lightbox-overlay').click();
        cy.dataCy('comment-publish').should('be.disabled');
    })

    it('Impossible to publish an empty comment', () => {
        cy.dataCy('lightbox-overlay').click();
        cy.dataCy('lightbox').scrollTo('bottom');
        cy.dataCy('comment-input').type('Cypress is awesome!');
        cy.dataCy('comment-publish').click();
        cy.dataCy('comment-text').click();

        cy.dataCy('comment-body-0').should('not.be.visible')
        cy.dataCy('comment-author-0').should('not.be.visible')

    })

    it('Impossible to publish an empty comment', () => {
        cy.dataCy('lightbox-overlay').click();
        cy.dataCy('lightbox').scrollTo('bottom');
        cy.dataCy('comment-input').type('Cypress is awesome!');
        cy.dataCy('comment-publish').click();

        cy.dataCy("comment-text").should('contain.text', '1');
        cy.get('body').click(0, 0);
        cy.dataCy("overlay-comments-count").should('contain.text', '1')

    })
        //9. Tester le singulier/pluriel en fonction du nombre de commentaire.s
    it('Impossible to publish an empty comment', () => {        
        cy.dataCy('lightbox-overlay').click();
        cy.dataCy('lightbox').scrollTo('bottom');
        cy.dataCy('comment-input').type('1st comment');
        cy.dataCy('comment-publish').click();
        cy.dataCy("comment-text").should('contain.text', 'comment');
        cy.dataCy('comment-text').click();
        cy.dataCy("comment-text").should('contain.text', 'comment');

        cy.dataCy('comment-input').type('not 1st comment');
        cy.dataCy('comment-publish').click();
        cy.dataCy("comment-text").should('contain.text', 'comments');
        cy.dataCy('comment-text').click();
        cy.dataCy("comment-text").should('contain.text', 'comments');

        cy.get('body').click(0, 0);
        cy.dataCy('overlay-comments-count').should('have.text', '2');
    })


        //10. Écrire trois commentaires et tester la supression du second commentaire au clique sur la bonne croix
    it.only('3 comments, delete 2nd', () => { 
        cy.dataCy('lightbox-overlay').click();
        cy.dataCy('lightbox').scrollTo('bottom');
        cy.dataCy('comment-input').type('1st comment');
        cy.dataCy('comment-publish').click();
        cy.dataCy('comment-input').type('2nd comment');
        cy.dataCy('comment-publish').click();
        cy.dataCy('comment-input').type('3rd comment');
        cy.dataCy('comment-publish').click();

        cy.dataCy('delete-comment-svg-1').click()

        cy.dataCy("comment-text").should('contain.text', '2');
        cy.dataCy('comment-text').click();
        cy.dataCy("comment-text").should('contain.text', '2');

        cy.get('body').click(0, 0);
        cy.dataCy('overlay-comments-count').should('have.text', '2');

    })

})