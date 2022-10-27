import supertest from "supertest";
import { Order } from "../../models/Order";
import { Product } from "../../models/Product";
import { User } from "../../models/User";
import app from "../../server";

const request = supertest(app);

const user: User = {
  email: "fathy@gm.com",
  first_name: "fathy",
  last_name: "osama",
  password: "password123",
};

let token: string = "";
let user_id: string = "";
let products: string[] = [];
let quantity: string[] = [];

describe("register & login", () => {
  afterAll(async () => {
    await request.delete("/api/v1/users").auth(token, { type: "bearer" });
  });
  it("register", async () => {
    const res = await request.post("/register").send(user);
    expect(res.status).toBe(201);
    expect(res.body.user.email).toEqual(user.email);
    expect(res.body.user.first_name).toEqual(user.first_name);
    expect(res.body.user.last_name).toEqual(user.last_name);
    expect(res.body.token).toBeTruthy();
  });
  it("login", async () => {
    const res = await request.post("/login").send(user);
    expect(res.status).toBe(200);
    expect(res.body.user.email).toEqual(user.email);
    expect(res.body.user.first_name).toEqual(user.first_name);
    expect(res.body.user.last_name).toEqual(user.last_name);
    expect(res.body.user.id).toBeTruthy();
    expect(res.body.token).toBeTruthy();
    token = res.body.token;
  });
});

describe("with token", () => {
  describe("Test /api/v1/users routes", () => {
    beforeAll(async () => {
      const res = await request.post("/register").send(user);
      user_id = res.body.user.id;
      token = res.body.token;
    });
    afterAll(async () => {
      await request.delete("/api/v1/users").auth(token, { type: "bearer" });
    });
    it("GET /api/v1/users should get all users", async () => {
      const res = await request
        .get("/api/v1/users")
        .auth(token, { type: "bearer" });

      expect(res.status).toBe(200);
      expect(res.body.data[0]).toBeTruthy();
    });
    it("GET /api/v1/users/:id", async () => {
      const res = await request
        .get(`/api/v1/users/${user_id}`)
        .auth(token, { type: "bearer" });
      expect(res.status).toBe(200);
      expect(res.body.data.email).toEqual(user.email);
      expect(res.body.data.first_name).toEqual(user.first_name);
      expect(res.body.data.last_name).toEqual(user.last_name);
    });
    it("PATCH /api/v1/users", async () => {
      const res = await request
        .patch("/api/v1/users")
        .auth(token, { type: "bearer" })
        .send({
          email: "fathy1@gm.com",
          first_name: "fathy1",
          last_name: "osama1",
          password: "password321",
        });
      expect(res.status).toBe(201);
      expect(res.body.data.id).toBeTruthy();
      expect(res.body.data).toEqual({
        id: user_id,
        email: "fathy1@gm.com",
        first_name: "fathy1",
        last_name: "osama1",
      });
      token = res.body.token;
    });
    it("DELETE /api/v1/users", async () => {
      const res = await request
        .delete("/api/v1/users")
        .auth(token, { type: "bearer" });
      expect(res.status).toBe(200);

      expect(res.body.data).toEqual({
        id: user_id,
        email: "fathy1@gm.com",
        first_name: "fathy1",
        last_name: "osama1",
      });
    });
  });

  describe("Test /api/v1/products routes", () => {
    beforeAll(async () => {
      const res = await request.post("/register").send(user);
      user_id = res.body.user.id;
      token = res.body.token;
    });
    afterAll(async () => {
      await request.delete("/api/v1/users").auth(token, { type: "bearer" });
    });
    const product_1: Product = {
      name: "apple",
      price: "18$",
    };
    it("POST /api/v1/products create products", async () => {
      const res = await request
        .post("/api/v1/products")
        .auth(token, { type: "bearer" })
        .send(product_1);
      expect(res.status).toBe(201);
      expect(res.body.data.name).toEqual(product_1.name);
      expect(res.body.data.price).toEqual(product_1.price);
      expect(res.body.data.id).toBeTruthy();
      products.push(res.body.data.id);
      product_1.id = res.body.data.id;
    });
    it("GET /api/v1/products get all products", async () => {
      const res = await request.get("/api/v1/products");
      expect(res.status).toBe(200);
      expect(res.body.data).toContain(product_1);
    });
    it("GET /api/v1/products/:id get specific product", async () => {
      const res = await request.get(`/api/v1/products/${product_1.id}`);
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(product_1);
    });
    it("DELETE /api/v1/products/:id delete specific product", async () => {
      const res = await request
        .delete(`/api/v1/products/${product_1.id}`)
        .auth(token, { type: "bearer" });
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(product_1);
    });
  });
  // Orders tests
  describe("Test /api/v1/orders route Orders", () => {
    beforeAll(async () => {
      const res = await request.post("/register").send(user);
      user_id = res.body.user.id;
      token = res.body.token;
    });
    afterAll(async () => {
      await request.delete("/api/v1/users").auth(token, { type: "bearer" });
    });
    const order: Order = {
      products: ["asda", "sada"],
      quantity: ["ASDA", "ASda"],
    };
    it("GET /api/v1/orders should get no orders for current user", async () => {
      const res = await request
        .get("/api/v1/orders")
        .auth(token, { type: "bearer" });
      expect(res.status).toBe(200);
      expect(res.body.data[0]).toBeFalsy();
    });
    it("POST /api/v1/orders create order", async () => {
      const res = await request
        .post("/api/v1/orders")
        .auth(token, { type: "bearer" })
        .send(order);
      expect(res.status).toBe(201);
      expect(res.body.data.id).toBeTruthy();
      expect(res.body.data.status).toBeTruthy();

      order.id = res.body.data.id;
      order.status = res.body.data.status;
      order.user_id = res.body.data.user_id;
      console.log(order);
      console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    });
    it("GET /api/v1/orders/:id get specific order", async () => {
      const res = await request
        .get(`/api/v1/orders/${order.id}`)
        .auth(token, { type: "bearer" });
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(order);
      console.log(res.body.data);
    });
    it("PATCH /api/v1/orders/:id Update order", async () => {
      order.products.push("abc-asd-khj");
      order.quantity.push("58");
      const res = await request
        .patch(`/api/v1/orders/${order.id}`)
        .auth(token, { type: "bearer" })
        .send(order);
      expect(res.status).toBe(201);
      expect(res.body.data).toEqual(order);
    });
    it("DELETE /api/v1/orders/:id", async () => {
      const res = await request
        .delete(`/api/v1/orders/${order.id}`)
        .auth(token, { type: "bearer" });
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(order);
    });
  });
});
