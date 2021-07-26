import { Money, PaymentApiResponse, PaymentApiResponseStatus } from "api/types";
import { convert } from "helpers";

export class PaymentGatewayMock {
  private static _instance: PaymentGatewayMock;
  private _balance: number;
  private _currency: string;

  private constructor(options: Money) {
    const { amount, currency } = options;
    this._balance = convert(amount) as number;
    this._currency = currency;
  }

  public static getInstance(
    options: Money = { amount: "0.00", currency: "USD" }
  ): PaymentGatewayMock {
    if (!PaymentGatewayMock._instance) {
      PaymentGatewayMock._instance = new PaymentGatewayMock(options);
    }

    return PaymentGatewayMock._instance;
  }

  private responseOk = (body?: Money) => {
    const response = {
      status: PaymentApiResponseStatus.ok,
    };
    return body ? { ...response, body } : response;
  };

  private responseFail = (message: string) => ({
    status: PaymentApiResponseStatus.fail,
    message,
  });

  public getBalance = (): Promise<PaymentApiResponse> =>
    Promise.resolve(
      this.responseOk({
        amount: convert(this._balance) as string,
        currency: this._currency,
      })
    );

  public topup = (value: Money): Promise<PaymentApiResponse> =>
    new Promise((resolve) => {
      try {
        this._balance += convert(value.amount) as number;
        resolve(this.responseOk());
      } catch (ex) {
        resolve(this.responseFail(ex.message));
      }
    });

  public withdraw = (value: Money): Promise<PaymentApiResponse> =>
    new Promise((resolve) => {
      try {
        const val = convert(value.amount) as number;
        if (val > this._balance) throw new Error("Insufficient funds");
        this._balance -= val;
        resolve(this.responseOk());
      } catch (ex) {
        resolve(this.responseFail(ex.message));
      }
    });
}
