describe('Audio Player', () => {
  it('plays audio', () => {
    cy.visit('/')
    cy.get('.composition-name:first').click()
    cy.get('#play-btn').click()
    cy.wait(5000)
    cy.get('#player-play-btn').click()
  })
})
