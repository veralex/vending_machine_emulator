import { FC, useContext } from "react";
import { ErrorContext } from "context";
import { StyleProps } from "components/types";
import { Wrapper } from "./ErrorMessage.styles";

export const ErrorMessage: FC<StyleProps> = ({ className }) => {
  const { errorMessage } = useContext(ErrorContext);

  return (
    <Wrapper className={className}>
      <span>{errorMessage}</span>
    </Wrapper>
  );
};
