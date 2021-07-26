import { createContext, FC, useState } from "react";

type ErrorMessage = {
  errorMessage: string;
  setErrorMessage: (value: string) => void;
};

const defaultValue: ErrorMessage = {
  errorMessage: "",
  setErrorMessage: () => {},
};

export const ErrorContext = createContext<ErrorMessage>(defaultValue);

export const ErrorContextProvider: FC = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <ErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
      {children}
    </ErrorContext.Provider>
  );
};
