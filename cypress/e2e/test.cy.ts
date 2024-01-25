["esm", "umd"].forEach((file) => {
  describe(file.toLocaleUpperCase(), () => {

    beforeEach(() => {
      cy.intercept({
        hostname: "api.addresszen.com",
        method: 'GET',
        url: '/v1/keys/*',
      }, (req) => {
        expect(req.url).to.be.eq("https://api.addresszen.com/v1/keys/ak_inf");
        req.continue();
      }).as('apiCheck');
      cy.setup(`./example/${file}.html`);
      cy.get("#line_1").clear({ force: true });
      cy.get("#line_2").clear({ force: true });
      cy.get("#post_town").clear({ force: true });
      cy.get("#postcode").clear({ force: true });
      cy.wait("@apiCheck").then((interception) => {
        expect(interception.response.statusCode).to.be.eq(200);
        expect(interception.response.body.result.available).to.be.true;
      });
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
          .type("M L Roberts Ltd", { force: true });
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
