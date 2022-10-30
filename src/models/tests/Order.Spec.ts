import Orders, { Order } from "../Order";
import Products, { Product } from "../Product";
import Users, { User } from "../User";
import { products } from "./Product.Spec";
import { users } from "./User.Spec";

const orderStore = new Orders();
const userStore = new Users();
const productStore = new Products();

const order_1: Order = {
  products: [],
  quantity: [],
};
const order_2: Order = {};
const order_3: Order = {};
const order_4: Order = {};
const order_5: Order = {};

const orders: Order[] = [order_1, order_2, order_3, order_4, order_5];
let user_id: string = "";
describe("Test Orders model CRUD operations", () => {
  // CREATE TEST ROWS
  beforeAll(async () => {
    users[0].user_id = (await userStore.create(users[0])).user_id;
    user_id = users[0].user_id as string;
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const order = orders[i];
      product.user_id = user_id;
      order.user_id = user_id;
    }
    products[0].product_id = (
      await productStore.create(products[0])
    ).product_id;
    products[1].product_id = (
      await productStore.create(products[1])
    ).product_id;
    products[2].product_id = (
      await productStore.create(products[2])
    ).product_id;
    products[3].product_id = (
      await productStore.create(products[3])
    ).product_id;
    products[4].product_id = (
      await productStore.create(products[4])
    ).product_id;
  });
  // DELETE TEST ROWS
  afterAll(async () => {
    await userStore.delete(user_id);
  });
  it("should create orders", async () => {
    const result = await orderStore.create(user_id);
    expect(result.user_id).toBe(user_id);
    expect(result.order_id).toBeTruthy();
    expect(result.status).toBe("active");

    order_1.order_id = result.order_id;
    order_1.status = "active";
  });
  it("should get current order for a user", async () => {
    const result = await orderStore.getOne(user_id as string);
    expect(result.status).toBe("active");
    expect(result.user_id).toBe(user_id);
    expect(result.order_id).toBe(order_1.order_id);
  });
  it("should update orders", async () => {
    order_1.products?.push(products[0].product_id as string);
    order_1.quantity?.push(3);
    const result = await orderStore.update(order_1);

    expect(result.products).toEqual(order_1.products);
  });
  it("should get Completed orders for current user", async () => {
    const result = await orderStore.getComplete(users[0].user_id as string);
    expect(result).toEqual([]);
  });
  it("should delete Orders", async () => {
    const result = await orderStore.delete(
      order_1.user_id as string,
      order_1.order_id as string
    );
    expect(result.order_id).toBe(order_1.order_id);
    expect(result.user_id).toBe(order_1.user_id);
  });
});
