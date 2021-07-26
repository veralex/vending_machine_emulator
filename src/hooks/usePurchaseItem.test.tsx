import { FC } from "react";
import { usePurchaseItem } from "./usePurchaseItem";
import { renderHook } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider } from "react-query";
import { items } from "mockData.json";

describe("useItemsApi hook test", () => {
  const queryClient = new QueryClient();

  const wrapper: FC = ({ children }) => {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  const { result } = renderHook(() => usePurchaseItem(), {
    wrapper,
  });

  test("expected to throw when item is missing", async () => {
    await expect(result.current.purchaseItem(123)).rejects.toThrow();
  });

  test("expected to throw when insufficient funds", async () => {
    await expect(result.current.purchaseItem(1)).rejects.toThrow();
  });

  test("expected to throw when item is out of stock", async () => {
    const item = items.find(({ quantity }) => !quantity);
    await expect(result.current.purchaseItem(item!.id)).rejects.toThrow();
  });
});
