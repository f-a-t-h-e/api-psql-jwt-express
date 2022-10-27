import Users, { User } from "../User";

const store = new Users();

const user_1: User = {
  email: "fathy1@gm.com",
  first_name: "fathy",
  last_name: "osama",
  password: "password123",
};
const user_2: User = {
  email: "fathy2@gm.com",
  first_name: "fathy",
  last_name: "osama",
  password: "password123",
};
const user_3: User = {
  email: "fathy3@gm.com",
  first_name: "fathy",
  last_name: "osama",
  password: "password123",
};

describe("Test Users model CRUD operations", () => {
  it("Shoud create a user", async () => {
    const result = await store.create(user_1);
    user_3.user_id = (await store.create(user_3)).user_id;
    expect(result.email).toEqual(user_1.email);
    expect(result.password).toBeFalsy();
    user_1.user_id = result.user_id;
  });
  it("Shoud update a user", async () => {
    const result = await store.update(`${user_1.user_id}` as string, user_2);
    expect(result.email).toEqual(user_2.email);
    expect(result.password).toBeFalsy();
  });
  it("should get a user", async () => {
    const result = await store.getOne(`${user_1.user_id}` as string);
    expect(result.email).toBe(user_2.email);
    expect(result.password).toBeFalsy();
  });
  it("should return all the users in the database", async () => {
    const result = await store.getAll();
    expect(result.length).toBeGreaterThan(1);
    expect(result[0].email).toBeTruthy();
  });
  it("should delete user", async () => {
    await store.delete(user_1.user_id as string);
    const result = await store.delete(user_3.user_id as string);
    expect(result.email).toBe(user_3.email);
    expect(result.first_name).toBe(user_3.first_name);
  });
});
