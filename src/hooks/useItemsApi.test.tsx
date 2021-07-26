import { FC } from "react";
import { useItemsApi, defaultOptions } from "./useItemsApi";
import { renderHook } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider } from "react-query";

describe("useItemsApi hook test", () => {
  const queryClient = new QueryClient();

  const wrapper: FC = ({ children }) => {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  const { result } = renderHook(() => useItemsApi(defaultOptions), {
    wrapper,
  });

  test("items expected to return items list", () => {
    const { items } = result.current;
    expect(items).toEqual(defaultOptions.initialState);
  });

  test("getItem expected to return item and to modify items list", async () => {
    const { items, getItem } = result.current;
    const item = await getItem(1);
    expect(item).toEqual(items![0]);
  });

  test("getItem expected to return null when item is not available or out of stock", async () => {
    const { getItem } = result.current;
    const missingItem = await getItem(111);
    const outOfStockItem = await getItem(6);
    expect(missingItem).toBeNull();
    expect(outOfStockItem).toBeNull();
  });

  test("isLoading expected to be true when getting item", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useItemsApi(defaultOptions),
      {
        wrapper,
      }
    );
    result.current.getItem(1);
    await waitForNextUpdate();
    expect(result.current.isLoading).toBe(true);
  });
});
