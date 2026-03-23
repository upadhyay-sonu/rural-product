/// <reference types="cypress" />

describe("Real Rural Products App", () => {

  it("should load advanced products page", () => {
    cy.visit("http://localhost:3000/advanced-products");

    cy.contains("Advanced Products").should("exist");
  });

  it("should add product to cart", () => {
    cy.visit("http://localhost:3000/advanced-products");

    cy.contains("Add to Cart").first().click();

    cy.contains("₹").should("exist");
  });

});