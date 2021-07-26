import { FC } from "react";
import { StyleProps } from "components/types";
import { usePaymentApi } from "hooks/usePaymentApi";
import { Wrapper } from "./CashFeeder.styles";

export const CashFeeder: FC<StyleProps> = ({ className }) => {
  const { balance, topup, refund, change } = usePaymentApi();

  const topupClickHandler = (value: string) =>
    topup({ amount: value, currency: "USD" });

  return (
    <Wrapper className={className}>
      <span>Balance: ${balance?.body?.amount || "0.00"}</span>
      <div>
        <button onClick={() => topupClickHandler("0.25")}>$0.25</button>
        <button onClick={() => topupClickHandler("1.00")}>$1</button>
        <button onClick={() => topupClickHandler("5.00")}>$5</button>
        <button
          onClick={() => refund()}
          disabled={balance?.body?.amount === "0.00"}
        >
          Refund
        </button>
      </div>
      {change && <span>Change: ${change?.body?.amount}</span>}
    </Wrapper>
  );
};
