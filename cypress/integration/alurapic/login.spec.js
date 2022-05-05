describe("Login users", () => {
  beforeEach(() => {
    cy.visit("https://alura-fotos.herokuapp.com");

    cy.intercept("POST", "https://apialurapic.herokuapp.com/user/login", {
      statusCode: 400,
    }).as("stubPost");
  });

  it("login invalid user", () => {
    cy.login("claudia", "1234");
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Invalid user name or password");
    });
  });

  it("login valid user", () => {
    cy.login(Cypress.env("userName"), Cypress.env("password"));
    cy.wait("@stubPost");
    cy.contains("a", "(Logout)").should("be.visible");
  });
});
