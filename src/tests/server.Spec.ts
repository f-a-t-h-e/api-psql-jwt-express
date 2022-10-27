import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe("Server starts", () => {
  it("GET / ", async () => {
    const res = await request.get("/");
    expect(res.status).toBe(200);
  });
});
