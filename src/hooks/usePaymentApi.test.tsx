import { usePaymentApi, defaultOptions } from "./usePaymentApi";
import { renderHook, cleanup } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider } from "react-query";
import { FC } from "react";
import { waitFor } from "@testing-library/dom";
import { PaymentApiResponseStatus } from "api/types";

describe("usePayment hook test", () => {
  const queryClient = new QueryClient();

  const wrapper: FC = ({ children }) => {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  test("topup expected to add value to balance", async () => {
    const { result } = renderHook(() => usePaymentApi(defaultOptions), {
      wrapper,
    });
    const value = { amount: "2.25", currency: "USD" };
    await result.current.topup(value);
    expect(result.current.balance?.body).toEqual(value);
    await result.current.refund();
  });

  test("refund expected to withdraw all the money and show change", async () => {
    const value = { amount: "2.75", currency: "USD" };
    const { result, waitForNextUpdate } = renderHook(() => usePaymentApi(), {
      wrapper,
    });
    result.current.topup(value);
    await waitForNextUpdate();
    await result.current.refund();
    expect(result.current.balance?.body).toEqual(defaultOptions.initialState);
    expect(result.current.change?.body).toEqual(value);
  });

  test("pay expected to return status fail when amount is more than balace", async () => {
    const value = { amount: "3.00", currency: "USD" };
    const { result, waitForNextUpdate } = renderHook(() => usePaymentApi(), {
      wrapper,
    });
    result.current.topup(value);
    const response = await result.current.pay({
      amount: "100500.00",
      currency: "USD",
    });
    expect(response).toEqual({
      status: PaymentApiResponseStatus.fail,
      message: "Insufficient funds",
    });
    expect(result.current.balance?.body).toEqual(value);
  });
});
