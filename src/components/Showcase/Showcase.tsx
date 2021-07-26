import { FC } from "react";
import { ShowcaseWrapper } from "./Showcase.styles";
import { ShowcaseItem } from "./ShowcaseItem";
import { StyleProps } from "components/types";
import { useItemsApi } from "hooks/useItemsApi";

export const Showcase: FC<StyleProps> = ({ className }) => {
  const { items } = useItemsApi();

  return (
    <ShowcaseWrapper className={className}>
      {items?.map((item) => (
        <ShowcaseItem key={item.id} item={item} />
      ))}
    </ShowcaseWrapper>
  );
};
