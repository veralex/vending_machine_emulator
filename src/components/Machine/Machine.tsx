import { Showcase } from "components/Showcase";
import { CashFeeder } from "components/CashFeeder";
import { Wrapper } from "./Machine.styles";
import { ErrorMessage } from "components/ErrorMessage";
import { ItemPicker } from "components/ItemPicker";

export const Machine = () => {
  return (
    <Wrapper>
      <CashFeeder className="cash-feeder" />
      <Showcase className="showcase" />
      <ItemPicker className="item-picker" />
      <ErrorMessage className="error" />
    </Wrapper>
  );
};
