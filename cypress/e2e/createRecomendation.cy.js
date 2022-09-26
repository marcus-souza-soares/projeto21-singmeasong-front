/* eslint-disable no-undef */
/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

beforeEach(() => {
  cy.request("DELETE", "http://localhost:5000/delete", {});
});

describe("Recomendações", () => {

  it("Deve criar uma nova recomendação", () => {
    const recommendation = {
      name: faker.lorem.words(3),
      youtubeLink: "https://www.youtube.com/watch?v=bNsJ3MhhiYQ"
    }
    cy.visit("http://localhost:3000/");
    cy.get('#name').type(recommendation.name);
    cy.get('#link').type(recommendation.youtubeLink);
    cy.intercept('POST', 'http://localhost:5000/recommendations').as('insert');
    cy.get('button').click();
    cy.wait('@insert');
    cy.contains(recommendation.name);
    cy.contains('Top').click();
    cy.url().should('equal', 'http://localhost:3000/top');
  });

})