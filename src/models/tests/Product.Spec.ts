import Products, { Product } from "../Product";

const store = new Products();

const product_1: Product = {
  name: "Apple",
  price: 4,
};
const product_2: Product = {
  name: "Banana",
  price: 3,
};
const product_3: Product = {
  name: "Watermelon",
  price: 2,
};
const product_4: Product = {
  name: "Lemon",
  price: 5,
};
const product_5: Product = {
  name: "Tomato",
  price: 1,
};
const products = [product_1, product_2, product_3, product_4, product_5];
fdescribe("Test Products model CRUD operatins", () => {
  beforeAll(async () => {});
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
    expect(result).toEqual(products);
  });
  it("should get one product", async () => {
    const result_1 = await store.getOne(product_1.product_id as string);
    expect(result_1).toEqual(product_1);
    const result_2 = await store.getOne(product_2.product_id as string);
    expect(result_2).toEqual(product_2);
    const result_3 = await store.getOne(product_3.product_id as string);
    expect(result_3).toEqual(product_3);
  });
  it("should update products", async () => {
    product_1.price = 8;
    const result = await store.update(
      product_1.product_id as string,
      product_1
    );
    expect(await store.getOne(product_1.product_id as string)).toEqual(
      product_1
    );
    expect(result).toEqual(product_1);
  });
  it("should delete products", async () => {
    const result = await store.delete(product_1.product_id as string);
    expect(result).toEqual(product_1);
    expect(await store.getAll()).not.toContain(product_1);
  });
  //   it("should create products", async () => {});
});
