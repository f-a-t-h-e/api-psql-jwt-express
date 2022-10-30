import supertest from "supertest";
import { Order } from "../../models/Order";
import { Product } from "../../models/Product";
import { User } from "../../models/User";
import app from "../../server";
import { products } from "./products.Spec";
import { user_1 } from "./users.Spec";

const request = supertest(app);
// using let to change it throw time

const order: Order = {};

let token: string = "";

describe("Test products endpoints", () => {
  beforeAll(async () => {
    const body = (await request.post("/register").send(user_1)).body;
    token = body.token;
    for (const i in products) {
      if (Object.prototype.hasOwnProperty.call(products, i)) {
        const product = products[i];
        product.product_id = (
          await request
            .post("/api/v1/products")
            .auth(token, { type: "bearer" })
            .send(product)
        ).body.data.product_id as string;
      }
    }
  });
  afterAll(async () => {
    await request.delete("/api/v1/users").auth(token, { type: "bearer" });
  });
  it("create order POST /api/v1/orders", async () => {
    const response = await request
      .post("/api/v1/orders")
      .auth(token, { type: "bearer" });
    expect(response.status).toBe(201);
    order.order_id = response.body.data.order_id;
  });
  it("show order GET /api/v1/orders/:id", async () => {
    const response = await request
      .get(`/api/v1/orders/${order.order_id}`)
      .auth(token, { type: "bearer" });
    expect(response.status).toBe(200);
  });
  it("index all orders GET /api/v1/orders/", async () => {
    const response = await request
      .get(`/api/v1/orders/`)
      .auth(token, { type: "bearer" });
    expect(response.status).toBe(200);
  });
  it("updat an order PATCH /api/v1/orders/:id", async () => {
    order.products = [
      products[0].product_id as string,
      products[1].product_id as string,
    ];
    order.quantity = [2, 4];
    const response = await request
      .patch(`/api/v1/orders/${order.order_id}`)
      .auth(token, { type: "bearer" })
      .send(order);
    expect(response.status).toBe(201);
  });
  it("delete an order DELETE /api/v1/orders/:id", async () => {
    const response = await request
      .delete(`/api/v1/orders/${order.order_id}`)
      .auth(token, { type: "bearer" });
    expect(response.status).toBe(200);
  });
});
