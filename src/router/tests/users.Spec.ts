import supertest from "supertest";
import app from "../../server";
// interfaces
import { User } from "../../models/User";

const user_1: User = {
  email: "fathy@route.user",
  first_name: "fathy",
  last_name: "osama",
  password: "password123",
};
const tokens: string[] = [];
const request = supertest(app);

describe("Test users emndpoint", () => {
  it("registers from POST /register", async () => {
    const response = await request.post("/register").send(user_1);
    user_1.user_id = response.body.user.user_id;
    tokens.push(response.body.token);
    const { email, first_name, last_name } = response.body.user;
    const condition =
      email &&
      first_name &&
      last_name &&
      user_1.user_id &&
      tokens[0] &&
      !response.body.user.password;
    expect(condition).toBeTrue;
  });
  it("indexes all the users from GET /api/v1/users", async () => {
    const response = await request
      .get("/api/v1/users")
      .auth(tokens[0], { type: "bearer" });
    expect(response.status).toBe(200);
  });
  it("shows one user from GET /api/v1/users/:id", async () => {
    const response = await request
      .get(`/api/v1/users/${user_1.user_id}`)
      .auth(tokens[0], { type: "bearer" });
    expect(response.status).toBe(200);
    expect(response.body.data.user.email).toBe(user_1.email);
    expect(response.body.data.user.first_name).toBe(user_1.first_name);
    expect(response.body.data.orders).toEqual([]);
  });
  it("updates a user from PATCH /api/v1/users", async () => {
    user_1.first_name = "Fatthy";
    user_1.password = "complexpassword";
    const response = await request
      .patch(`/api/v1/users/`)
      .auth(tokens[0], { type: "bearer" })
      .send(user_1);
    const token = response.body.token;
    tokens.push(token);
    expect(response.status).toBe(201);
    expect(response.body.data.user.user_id).toBe(user_1.user_id);
  });
  it("deletes a user from DELETE /api/v1/users", async () => {
    const response = await request
      .delete("/api/v1/users")
      .auth(tokens[1], { type: "bearer" });
    expect(response.status).toBe(200);
  });
});

export { user_1 };
