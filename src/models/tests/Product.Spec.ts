import Products, { Product } from "../Product";
import Users from "../User";
import { users } from "./User.Spec";

const store = new Products();
const userStore = new Users();

const product_1: Product = {
  name: "Apple",
  price: 4,
  catagory: "fruit",
};
const product_2: Product = {
  name: "Banana",
  price: 3,
  catagory: "fruit",
};
const product_3: Product = {
  name: "Watermelon",
  price: 2,
  catagory: "fruit",
};
const product_4: Product = {
  name: "Lemon",
  price: 5,
  catagory: "veg",
};
const product_5: Product = {
  name: "Tomato",
  price: 1,
  catagory: "veg",
};
let user_id: string = "";
const products = [product_1, product_2, product_3, product_4, product_5];
describe("Test Products model CRUD operatins", () => {
  beforeAll(async () => {
    users[0].user_id = (await userStore.create(users[0])).user_id;
    user_id = users[0].user_id as string;
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      product.user_id = user_id;
    }
  });
  afterAll(async () => {
    await userStore.delete(users[0].user_id as string);
  });
  it("should create products", async () => {
    product_1.product_id = (await store.create(product_1)).product_id;
    product_2.product_id = (await store.create(product_2)).product_id;
    product_3.product_id = (await store.create(product_3)).product_id;
    product_4.product_id = (await store.create(product_4)).product_id;
    product_5.product_id = (await store.create(product_5)).product_id;
    expect(product_1.product_id).toBeTruthy();
    expect(product_2.product_id).toBeTruthy();
    expect(product_3.product_id).toBeTruthy();
    expect(product_4.product_id).toBeTruthy();
    expect(product_5.product_id).toBeTruthy();
  });
  it("should get all products", async () => {
    const result = await store.getAll();
    expect(result[0].product_id).toEqual(products[0].product_id);
  });
  it("should get one product", async () => {
    const result_1 = await store.getOne(product_1.product_id as string);
    expect(result_1.price).toEqual(product_1.price);
    const result_2 = await store.getOne(product_2.product_id as string);
    expect(result_2.product_id).toEqual(product_2.product_id);
    const result_3 = await store.getOne(product_3.product_id as string);
    expect(result_3.name).toEqual(product_3.name);
  });
  it("should update products", async () => {
    product_1.price = 8;
    product_1.name = "beans";
    const result = await store.update(product_1);
    const check = await store.getOne(product_1.product_id as string);
    expect(check.price).toEqual(product_1.price);
    expect(result.name).toEqual(product_1.name);
  });
  it("should delete products", async () => {
    const result = await store.delete(user_id, product_1.product_id as string);
    expect(result.product_id).toEqual(product_1.product_id);
  });
  //   it("should create products", async () => {});
});

export { products };
