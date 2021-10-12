describe('voting', () => {
  beforeEach(() => {
    cy.request('GET', 'http://localhost:3001/api/test/reset')

    cy.request('POST', 'http://localhost:3001/api/polls/create', {
      'title': 'What\'s your favorite animal?',
      'choices': [
        {
          'name': 'Rabbit',
          'color': '#ff0000'
        },
        {
          'name': 'Horse',
          'color': '#008000'
        },
        {
          'name': 'Frog',
          'color': '#0000ff'
        }
      ]
    })

    cy.request('POST', 'http://localhost:3001/api/polls/create', {
      'title': 'Who\'s your favorite author?',
      'choices': [
        {
          'name': 'Dostoyevsky',
          'color': '#ff0000'
        },
        {
          'name': 'Faulkner',
          'color': '#008000'
        },
        {
          'name': 'Pynchon',
          'color': '#0000ff'
        }
      ]
    })

    cy.visit('http://localhost:3001/latest')
  })

  it('works when used as intended', () => {
    cy.contains('What\'s your favorite animal?').click()

    cy.get('#chroma-circle').should('have.css', 'fill', 'rgb(85, 42, 85)')

    cy.get('#vote-box').contains('Rabbit').click()

    cy.get('#vote-box').find('div').find('table').find('tbody').children().eq(0).contains('1')

    cy.get('#vote-box').find('div').find('table').find('tbody').children().eq(1).should('not.contain', '1')

    cy.get('#vote-box').find('div').find('table').find('tbody').children().eq(2).should('not.contain', '1')

    cy.get('#chroma-circle').should('have.css', 'fill', 'rgb(255, 0, 0)')
  })

  it('properly changes the chroma color', () => {
    cy.contains('What\'s your favorite animal?').click()

    cy.get('#chroma-circle').should('have.css', 'fill', 'rgb(85, 42, 85)')

    cy.get('#vote-box').contains('Rabbit').click()

    cy.get('#chroma-circle').should('have.css', 'fill', 'rgb(255, 0, 0)')
  })

  it('does not work if you try to vote twice', () => {
    cy.contains('What\'s your favorite animal?').click()

    cy.get('#vote-box').contains('Rabbit').click()
    
    // Check for the poll ID in the votedIn array in localStorage
    cy.get('#chroma-circle').should('have.css', 'fill', 'rgb(255, 0, 0)').then(() => {
      cy.url().then(url => {
        expect(localStorage.getItem('votedIn')).to.include(url.slice(-24))
      })
    })

    // Just repeat the same click and the color shouldn't change
    cy.get('#vote-box').contains('Rabbit').click()

    cy.get('#chroma-circle').should('have.css', 'fill', 'rgb(255, 0, 0)')
  })

  it('does not let you vote twice after clearing local storage', () => {
    cy.contains('What\'s your favorite animal?').click()

    cy.get('#vote-box').contains('Rabbit').click().then(() => {
      cy.clearLocalStorage().then(() => {
        cy.reload()
      })
    })

    cy.get('#vote-box').contains('Rabbit').click()

    cy.get('#error-popup').contains('already voted')
  })
})