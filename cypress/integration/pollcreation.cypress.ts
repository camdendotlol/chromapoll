describe('poll creation', () => {
  beforeEach(() => {
    cy.request('GET', 'http://localhost:3001/api/test/reset')

    cy.visit('http://localhost:3001/create')
  })

  it('works with valid parameters', () => {
    cy.get('#title').type('test poll')
    cy.get('#choice0Name').type('option a')
    cy.get('#choice1Name').type('option b')

    cy.get('#submit-button').click()

    cy.contains('test poll')
    cy.get('#vote-box').contains('option a')
    cy.get('#vote-box').contains('option b')
  })

  it('works with custom colors', () => {
    cy.get('#title').type('test poll')
    cy.get('#choice0Name').type('option a')
    cy.get('#choice1Name').type('option b')

    cy.get('#choice0Color').invoke('val', '#ff0000').click()
    cy.get('#choice1Color').invoke('val', '#0000ff').click()

    cy.get('#submit-button').click()

    cy.get('#vote-box').find('div').find('table').find('tbody').children().eq(0)
      .should('have.css', 'background-color', 'rgb(255, 0, 0)')

    cy.get('#vote-box').find('div').find('table').find('tbody').children().eq(1)
      .should('have.css', 'background-color', 'rgb(0, 0, 255)')
  })

  it('does not work with missing title', () => {
    cy.get('#choice0Name').type('option a')
    cy.get('#choice1Name').type('option b')

    cy.get('#submit-button').click()

    cy.contains('Title is required.')
  })

  it('does not work with missing choice name', () => {
    cy.get('#choice0Name').type('option a')
    // skipping option b

    cy.get('#submit-button').click()

    cy.contains('At least one choice is missing a label')
  })

  it('properly supports additional choices', () => {
    // add a random number of between 1 and 6 choices
    const extraChoices = Math.ceil(Math.random() * 6)

    const array = Array.from({length: extraChoices})

    cy.wrap(array).each(() => {
      cy.get('#add-choice-button').click()
    })

    // check for the extra choices plus the two original choices
    cy.get('#poll-creation-form').find('.choice-item-div').should('have.length', extraChoices + 2)
  })

  it('properly supports removing choices', () => {
    const extraChoices = Math.ceil(Math.random() * 6)

    cy.wrap(Array.from({ length: extraChoices })).each(() => {
      cy.get('#add-choice-button').click()
    })

    const choicesToRemove = Math.floor(Math.random() * extraChoices)

    cy.wrap(Array.from({ length: choicesToRemove })).each(() => {
      cy.get('#remove-choice-button').click()
    })

    cy.get('#poll-creation-form').find('.choice-item-div').should('have.length', extraChoices + 2 - choicesToRemove)
  })
})