import { ApiOptions, IPaymentApiAdapter, Money } from "api/types";
import PaymentApiAdapter from "./paymentApiAdapter";

function paymentApiCreator(options: ApiOptions<Money>): IPaymentApiAdapter {
  const { type, initialState } = options;
  switch (type) {
    case "mock":
      return PaymentApiAdapter.getInstance(initialState);
    default:
      // there should be something different like production server but since
      // we don't have any of those here's the samre instance of payment API
      return PaymentApiAdapter.getInstance(initialState);
  }
}

export default paymentApiCreator;
