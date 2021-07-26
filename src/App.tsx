import { Machine } from "components/Machine/Machine";
import { ErrorContextProvider } from "context";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorContextProvider>
      <QueryClientProvider client={queryClient}>
        <Machine />
      </QueryClientProvider>
    </ErrorContextProvider>
  );
}

export default App;
