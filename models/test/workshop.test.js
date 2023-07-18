const expect = require("chai").expect;
const Workshop = require("../workshop.model");

describe("Workshop", () => {
  it("should throw an error if no args", () => {
    const work = new Workshop({});

    work.validate((err) => {
      expect(err.errors.name).to.exist;
      expect(err.errors.concertId).to.exist;
    });
  });
  it("should throw an error if args is not a string", () => {
    const name = [{}, []];
    const concertId = [{}, []];

    const work = new Workshop({ name, concertId });

    work.validate((err) => {
      expect(err.errors.name).to.exist;
      expect(err.errors.concertId).to.exist;
    });
  });
  it("should not throw an error if args is okey", () => {
    const work = new Workshop({
      name: "New test",
      concertId: "askclaksdas1123",
    });
    work.validate((err) => {
      expect(err).to.not.exist;
    });
  });
});
