describe("Register users", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("check messages validation", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Email is required!").should("be.visible");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "User name is required!").should("be.visible");
    cy.contains("ap-vmessage", "Password is required!").should("be.visible");
    cy.contains("ap-vmessage", "Full name is required!").should("be.visible");
  });

  it("check invalid email messages", () => {
    cy.register("claudia", "Claudia", "claudia", "123456");
    cy.contains("ap-vmessage", "Invalid e-mail").should("be.visible");
  });

  it("check password messages less than 8 characters", () => {
    cy.register("claudia@email.com", "Claudia", "claudia", "123");
    cy.contains("ap-vmessage", "Mininum length is 8").should("be.visible");
  });

  it("check username with less than two characters", () => {
    cy.register("claudia@email.com", "Claudia", "c", "123456");
    cy.contains("ap-vmessage", "Mininum length is 2").should("be.visible");
  });

  it("verify lowercase", () => {
    cy.register("claudia@email.com", "Claudia", "CLAUDIA", "123456");
    cy.contains("ap-vmessage", "Must be lower case").should("be.visible");
  });

  const users = require("../../fixtures/users.json");
  users.forEach((user) => {
    it(`register new user ${user.userName}`, () => {
      cy.register(user.email, user.fullName, user.userName, user.password);
    });
  });
});
