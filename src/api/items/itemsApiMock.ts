import { IItemAPI, Item } from "api/types";

// Machine delay emulator
const delay = <T>(payload: T): Promise<T> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(payload), Math.random() * 1000)
  );

export class ItemAPIMock implements IItemAPI {
  private _initialState: Item[];
  private static _instance: ItemAPIMock;

  private constructor(initialState: Item[]) {
    this._initialState = initialState;
  }

  static getInstance(initialState?: Item[]) {
    if (!ItemAPIMock._instance) {
      ItemAPIMock._instance = new ItemAPIMock(initialState || []);
    }

    return ItemAPIMock._instance;
  }

  get = (id: number) => {
    const item = this._initialState.find(({ id: itemId }) => itemId === id);
    if (item?.quantity) {
      item.quantity -= 1;
      return delay(item);
    }
    return delay(null);
  };

  getList = () => Promise.resolve(this._initialState);
}

export default ItemAPIMock;
