/// <reference types="cypress" />

describe('burger constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('добавляет ингредиенты в конструктор', () => {
    cy.contains('Краторная булка N-200i')
      .parent()
      .contains('Добавить')
      .click();

    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .contains('Добавить')
      .click();

    cy.get('[data-cy=burger-constructor]').within(() => {
      cy.contains('Краторная булка N-200i (верх)').should('exist');
      cy.contains('Краторная булка N-200i (низ)').should('exist');
      cy.contains('Биокотлета из марсианской Магнолии').should('exist');
    });
  });

  it('открывает и закрывает модальное окно ингредиента', () => {
    cy.contains('Краторная булка N-200i').click();

    cy.get('[data-cy=modal]').within(() => {
      cy.contains('Детали ингредиента').should('exist');
      cy.contains('Краторная булка N-200i').should('exist');
      cy.contains('420').should('exist');
      cy.contains('80').should('exist');
      cy.contains('24').should('exist');
      cy.contains('53').should('exist');
    });

    cy.get('[data-cy=modal-close]').click();

    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('создаёт заказ и очищает конструктор', () => {
    window.localStorage.setItem('refreshToken', 'fake-refresh-token');

    cy.setCookie('accessToken', 'fake-access-token');

    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', '**/api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    cy.reload();

    cy.wait('@getIngredients');
    cy.wait('@getUser');

    cy.contains('Краторная булка N-200i')
      .parent()
      .contains('Добавить')
      .click();

    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .contains('Добавить')
      .click();

    cy.contains('Оформить заказ').click();

    cy.wait('@createOrder');

    cy.contains('12345').should('exist');

    cy.get('[data-cy=modal-close]').click();

    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');

    cy.clearCookie('accessToken');
    cy.clearLocalStorage();
  });
});
