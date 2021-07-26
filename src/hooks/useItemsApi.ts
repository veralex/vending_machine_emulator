import { useMutation, useQuery } from "react-query";
import { items as mockItems } from "mockData.json";
import itemApiCreator from "api/items";
import { ApiOptions, Item } from "api/types";

export const defaultOptions: ApiOptions<Item[]> = {
  type: "mock",
  initialState: mockItems,
};

export const useItemsApi = (options?: ApiOptions<Item[]>) => {
  const { get, getList } = itemApiCreator({ ...defaultOptions, ...options });

  const { data: items, refetch } = useQuery("items", getList, {
    notifyOnChangeProps: ["data", "dataUpdatedAt"],
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: getItem, isLoading: itemIsLoading } = useMutation(
    (value: number) => get(value),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  return {
    items,
    getItem,
    isLoading: itemIsLoading,
  };
};
