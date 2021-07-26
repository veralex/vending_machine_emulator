import { PaymentApiResponseStatus } from "api/types";
import { useItemsApi } from "./useItemsApi";
import { usePaymentApi } from "./usePaymentApi";

export const usePurchaseItem = () => {
  const { pay, refund } = usePaymentApi();
  const { getItem, items, isLoading } = useItemsApi();

  const purchase = async (id: number) => {
    const item = items?.find((item) => item.id === id);
    if (!item) {
      throw Error("Wrong item ID");
    } else {
      if (!item.quantity) {
        throw Error("Item is out of stock");
      } else {
        const transaction = await pay(item.price);
        if (transaction.status === PaymentApiResponseStatus.ok) {
          const i = await getItem(item.id);
          refund();
          return i;
        } else {
          throw Error(transaction.message);
        }
      }
    }
  };

  return { purchaseItem: purchase, isLoading };
};
