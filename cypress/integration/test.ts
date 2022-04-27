["ie11", "esm", "umd"].forEach((file) => {
  describe(file.toLocaleUpperCase(), () => {
    before(() => {
      cy.setup(`./example/${file}.html`);
      cy.wait(1000);
    });

    beforeEach(() => {
      cy.get("#line_1").clear({ force: true });
      cy.get("#line_2").clear({ force: true });
      cy.get("#post_town").clear({ force: true });
      cy.get("#postcode").clear({ force: true });
    });

    describe("Address Lookup", () => {
      it("mouse select", () => {
        cy.get("#line_1")
          .clear({ force: true })
          .type("M L Roberts Ltd", { force: true });
        cy.wait(1000);
        cy.get(".idpc_ul li").first().click();
        cy.wait(1000);
        cy.get("#line_1").should("have.value", "M L Roberts Ltd");
        cy.get("#line_2").should("have.value", "8 Industrial Ln");
        cy.get("#post_town").should("have.value", "Johnston");
        cy.get("#postcode").should("have.value", "02919-3150");
        cy.wait(1000);
      });
      it("key select", () => {
        cy.get("#line_1")
          .clear({ force: true })
          .type("L L Consultancy Ltd", { force: true });
        cy.wait(1000);
        cy.get("#line_1")
          .type("{downarrow}", { force: true })
          .type("{enter}", { force: true });
        cy.wait(1000);
        cy.get("#line_1").should("have.value", "M L Roberts Ltd");
        cy.get("#line_2").should("have.value", "8 Industrial Ln");
        cy.get("#post_town").should("have.value", "Johnston");
        cy.get("#postcode").should("have.value", "02919-3150");
        cy.wait(1000);
      });
    });
  });
});
