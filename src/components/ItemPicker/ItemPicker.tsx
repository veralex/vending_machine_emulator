import { StyleProps } from "components/types";
import { ErrorContext } from "context";
import { usePurchaseItem } from "hooks";
import { useState, FC, useContext } from "react";
import { Wrapper } from "./ItemPicker.styles";

export const ItemPicker: FC<StyleProps> = ({ className }) => {
  const { setErrorMessage } = useContext(ErrorContext);
  const [itemId, setItemId] = useState<number>(1);
  const [itemName, setItemName] = useState<string>("");

  const { purchaseItem, isLoading } = usePurchaseItem();

  const purchaseClickHandler = async () => {
    setItemName("");
    setErrorMessage("");
    try {
      const item = await purchaseItem(itemId);
      setItemName(item!.name);
    } catch (ex) {
      setErrorMessage(ex.message);
    }
  };

  return (
    <Wrapper className={className}>
      <span>Item ID</span>
      <div>
        <input
          type="number"
          min={1}
          defaultValue={1}
          name="item-picker"
          onChange={(e) => setItemId(parseInt(e.target.value))}
        />
        <button onClick={purchaseClickHandler} disabled={isLoading}>
          Purchase
        </button>
      </div>
      <span>{itemName && `You bought ${itemName}`}</span>
    </Wrapper>
  );
};
