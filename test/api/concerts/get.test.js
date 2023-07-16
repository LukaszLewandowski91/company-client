const chai = require("chai");
const chaiHTTP = require("chai-http");
const Concert = require("../../../models/concert.model");
const server = require("../../../server");
chai.use(chaiHTTP);

const expect = chai.expect;
const request = chai.request;

describe("GET api/concerts", () => {
  before(async () => {
    const testConOne = new Concert({
      _id: "64af0bc9bbbb1754e77b9111",
      performer: "Marcin Lewandowski",
      genre: "POP",
      price: 34,
      day: 2,
      image: "Image One",
    });
    await testConOne.save();
    const testConTwo = new Concert({
      _id: "64af0bc9bbbb1754e77b9222",
      performer: "Robert Lewandowski",
      genre: "Rock",
      price: 21,
      day: 3,
      image: "Image Two",
    });
    await testConTwo.save();
  });

  after(async () => {
    await Concert.deleteMany();
  });

  it("/:performer should return concerts by performer", async () => {
    const res = await request(server).get(
      "/api/concerts/performer/Marcin Lewandowski"
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body).to.not.be.null;
  });
  it("/:genre should return concerts by genre", async () => {
    const res = await request(server).get("/api/concerts/genre/Rock");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body).to.not.be.null;
  });
  it("/:price_min/:price_max should return concerts by price", async () => {
    const res = await request(server).get("/api/concerts/price/20/30");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body).to.not.be.null;
  });
  it("/:day should return concerts by day", async () => {
    const res = await request(server).get("/api/concerts/day/3");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body).to.not.be.null;
  });
});
