import { IPaymentApiAdapter, Money } from "api/types";
import { PaymentGatewayMock } from "./paymentGatewayMock";

class PaymentApiAdapter implements IPaymentApiAdapter {
  private static _instance: PaymentApiAdapter;
  private _gateway: PaymentGatewayMock;

  private constructor(options: Money) {
    this._gateway = PaymentGatewayMock.getInstance(options);
  }

  public static getInstance(
    options: Money = { amount: "0.00", currency: "USD" }
  ): PaymentApiAdapter {
    if (!PaymentApiAdapter._instance) {
      PaymentApiAdapter._instance = new PaymentApiAdapter(options);
    }

    return PaymentApiAdapter._instance;
  }

  getBalance = () => this._gateway.getBalance();
  topup = (value: Money) => this._gateway.topup(value);
  pay = (value: Money) => this._gateway.withdraw(value);
  refund = async () => {
    const balance = (await this._gateway.getBalance()).body!;
    return this._gateway.withdraw(balance);
  };
}

export default PaymentApiAdapter;
