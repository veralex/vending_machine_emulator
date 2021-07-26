export type Item = {
  id: number;
  name: string;
  quantity: number;
  price: Money;
};

export type Money = {
  amount: string;
  currency: string;
};

export type ApiOptions<T> = {
  type: string;
  initialState?: T;
};

export enum PaymentApiResponseStatus {
  ok = "ok",
  fail = "fail",
}

export type PaymentApiResponse = {
  status: PaymentApiResponseStatus;
  message?: string;
  body?: Money;
};

export interface IPaymentApiAdapter {
  getBalance: () => Promise<PaymentApiResponse>;
  topup: (value: Money) => Promise<PaymentApiResponse>;
  pay: (value: Money) => Promise<PaymentApiResponse>;
  refund: () => Promise<PaymentApiResponse>;
}

export interface IItemAPI {
  get: (id: number) => Promise<Item | null>;
  getList: () => Promise<Item[]>;
}
