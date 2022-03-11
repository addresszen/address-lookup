declare var AddressZen: any;
const { AddressLookup } = AddressZen;
const doc = new DOMParser().parseFromString(
  `
    <html>
      <head></head>
      <body><input type="text" id="line_1"/></body>
    </html>
  `,
  "text/html"
);

describe("Address Lookup", () => {
  it("creates address lookup tools", (done) => {
    AddressLookup.setup({
      scope: doc,
      inputField: "#line_1",
      apiKey: "iddqd",
      onLoaded: () => {
        const result = doc.querySelector(".idpc_autocomplete");
        if (result === null) return done(Error("Address lookup not found"));
        done();
      },
    });
  });
});
