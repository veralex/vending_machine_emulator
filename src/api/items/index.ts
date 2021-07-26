import { ApiOptions, IItemAPI, Item } from "api/types";
import ItemAPIMock from "./itemsApiMock";

function itemApiCreator(options: ApiOptions<Item[]>): IItemAPI {
  const { type, initialState } = options;
  switch (type) {
    case "mock":
      return ItemAPIMock.getInstance(initialState);
    default:
      return ItemAPIMock.getInstance();
  }
}

export default itemApiCreator;
