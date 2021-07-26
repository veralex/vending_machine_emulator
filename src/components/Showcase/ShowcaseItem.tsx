import React from "react";
import { Item } from "api/types";
import { ShowcaseItemWrapper } from "./Showcase.styles";

export const ShowcaseItem = ({ item }: { item: Item }) => {
  const { id, name, price, quantity } = item;
  return (
    <ShowcaseItemWrapper>
      <span>{name}</span>
      <span>{`ID ${id}`}</span>
      <span>{`$${price.amount}`}</span>
      <span>{quantity} available</span>
    </ShowcaseItemWrapper>
  );
};
