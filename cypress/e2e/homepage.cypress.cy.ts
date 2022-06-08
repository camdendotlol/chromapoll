describe('the homepage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001')
  })

  it('shows the title text', () => {
    cy.contains('Chromapoll!')
  })

  it('shows the subtitle text', () => {
    cy.contains('Consensus voting with colors')
  })

  it('animates the title color properly', () => {
    const initialTextColor = '#d3d3d3'

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)

    cy.get('#chromapoll-title').should('not.have.css', 'color', initialTextColor)
  })
})