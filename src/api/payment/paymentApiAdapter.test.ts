import PaymentApiAdapter from "./paymentApiAdapter";

describe("payment api tests", () => {
  const adapter = PaymentApiAdapter.getInstance({
    amount: "0.00",
    currency: "USD",
  });

  beforeEach(adapter.refund);

  test("get balance expected to return balance after topup", async () => {
    await adapter.topup({ amount: "1.00", currency: "USD" });
    await adapter.topup({ amount: "2.25", currency: "USD" });
    expect(await adapter.getBalance()).toEqual({
      status: "ok",
      body: { amount: "3.25", currency: "USD" },
    });
  });

  test("get balance expected to return balance after withdraw", async () => {
    await adapter.topup({ amount: "5.00", currency: "USD" });
    await adapter.pay({ amount: "1.25", currency: "USD" });
    expect(await adapter.getBalance()).toEqual({
      status: "ok",
      body: { amount: "3.75", currency: "USD" },
    });
  });

  test("get balance expected to return 0.00 after refund", async () => {
    await adapter.topup({ amount: "2.00", currency: "USD" });
    await adapter.refund();
    expect(await adapter.getBalance()).toEqual({
      status: "ok",
      body: { amount: "0.00", currency: "USD" },
    });
  });

  test("topup expect to return error message when amount has wrong format", async () => {
    const { status, message } = await adapter.topup({
      amount: "some number",
      currency: "USD",
    });
    expect(status).toBe("fail");
    expect(message).toBeDefined();
  });

  test("pay expect to return error message when amount has wrong format", async () => {
    const { status, message, body } = await adapter.pay({
      amount: "some number",
      currency: "USD",
    });
    expect(status).toBe("fail");
    expect(message).toBeDefined();
    expect(body).toBeUndefined();
  });
});
