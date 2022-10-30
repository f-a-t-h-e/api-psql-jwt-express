import supertest from "supertest";
import { Product } from "../../models/Product";
import { User } from "../../models/User";
import app from "../../server";
import { user_1 } from "./users.Spec";

const request = supertest(app);

const product_1: Product = {
  name: "apple",
  price: 10,
  catagory: "fruit",
};
const product_2: Product = {
  name: "banana",
  price: 9,
  catagory: "fruit",
};
const product_3: Product = {
  name: "tomato",
  price: 5,
  catagory: "fruit",
};
const product_4: Product = {
  name: "orange",
  price: 4,
  catagory: "fruit",
};
const product_5: Product = {
  name: "currot",
  price: 6,
  catagory: "veg",
};
const user: User = user_1;
user.email = "fathy@route.products";
const products: Product[] = [
  product_1,
  product_2,
  product_3,
  product_4,
  product_5,
];
let token: string = "";
describe("Test products endpoints", () => {
  beforeAll(async () => {
    const body = (await request.post("/register").send(user)).body;
    user.user_id = body.user.user_id;
    token = body.token;
    await request
      .post("/api/v1/products")
      .auth(token, { type: "bearer" })
      .send(product_2);
    await request
      .post("/api/v1/products")
      .auth(token, { type: "bearer" })
      .send(product_3);
    await request
      .post("/api/v1/products")
      .auth(token, { type: "bearer" })
      .send(product_4);
    await request
      .post("/api/v1/products")
      .auth(token, { type: "bearer" })
      .send(product_5);
  });
  afterAll(async () => {
    await request.delete("/api/v1/users").auth(token, { type: "bearer" });
  });
  it("create product POST /api/v1/products", async () => {
    const response = await request
      .post("/api/v1/products")
      .auth(token, { type: "bearer" })
      .send(product_1);
    expect(response.status).toBe(201);
    product_1.product_id = response.body.data.product_id;
  });
  //   to test this it needs completed orders of that products
  it("shows top products GET /api/v1/products/top/:num", async () => {
    const response = await request.get(`/api/v1/products/top/5`);
    expect(response.status).toBe(200);
  });
  it("shows one product GET /api/v1/products/:id", async () => {
    const response = await request.get(
      `/api/v1/products/${product_1.product_id}`
    );
    expect(response.status).toBe(200);
  });
  it("index products GET /api/v1/products", async () => {
    const response = await request.get(`/api/v1/products`);
    expect(response.status).toBe(200);
  });
  it("updates a product PATCH /api/v1/products/:id", async () => {
    const response = await request
      .patch(`/api/v1/products/${product_1.product_id}`)
      .auth(token, { type: "bearer" })
      .send(product_3);
    expect(response.status).toBe(200);
  });
  it("deletes a product DELETE /api/v1/products/:id", async () => {
    const response = await request
      .delete(`/api/v1/products/${product_1.product_id}`)
      .auth(token, { type: "bearer" });
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe(product_3.name);
  });
});

export { products };
