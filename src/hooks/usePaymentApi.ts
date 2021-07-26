import paymentApiCreator from "api/payment";
import { ApiOptions, Money } from "api/types";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const defaultOptions: ApiOptions<Money> = {
  type: "mock",
  initialState: {
    amount: "0.00",
    currency: "USD",
  },
};

export const usePaymentApi = (options?: ApiOptions<Money>) => {
  const { getBalance, pay, topup, refund } = paymentApiCreator({
    ...defaultOptions,
    ...options,
  });
  const queryClient = useQueryClient();

  const mutationOptions = {
    onSuccess: () => {
      queryClient.setQueryData("payment.change", null);
      queryClient.refetchQueries(["payment.balance"]);
    },
  };

  const { data: balance, isLoading: balanceIsLoading } = useQuery(
    "payment.balance",
    getBalance,
    {
      notifyOnChangeProps: ["data"],
      refetchOnWindowFocus: false,
    }
  );

  const { data: change } = useQuery("payment.change", getBalance, {
    notifyOnChangeProps: ["data"],
    refetchOnWindowFocus: false,
  });

  const {
    mutateAsync: paymentMutation,
    isLoading: paymentIsLoading,
  } = useMutation((value: Money) => pay(value), mutationOptions);

  const { mutateAsync: topupMutation, isLoading: topupIsLoading } = useMutation(
    (value: Money) => topup(value).then((res) => res?.body?.amount),
    mutationOptions
  );

  const {
    mutateAsync: refundMutation,
    isLoading: refundIsLoading,
  } = useMutation(refund, {
    onSuccess: () => {
      queryClient.setQueryData("payment.change", balance);
      queryClient.refetchQueries("payment.balance");
    },
  });

  return {
    balance,
    change,
    topup: topupMutation,
    pay: paymentMutation,
    refund: refundMutation,
    isLoading:
      balanceIsLoading || topupIsLoading || paymentIsLoading || refundIsLoading,
  };
};
