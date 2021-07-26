import ItemsApiMock from "./itemsApiMock";
import { items } from "mockData.json";

describe("items mock api test", () => {
  const adapter = ItemsApiMock.getInstance(items);

  test("get expected to return item by id", async () => {
    const item = await adapter.get(1);
    expect(item).toEqual(items.find((i) => i.id === 1));
  });

  test("get expected to return null if item doesn't exist", async () => {
    expect(await adapter.get(10)).toBeNull();
  });

  test("get expected to return null if item is out of stock", async () => {
    expect(await adapter.get(6)).toBeNull();
  });
});
