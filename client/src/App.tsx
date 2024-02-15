import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import Menu from "./component/Menu";
import { Provider } from "react-redux";
import { store } from "./utilities/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditNote from "./pages/EditNote";
const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ToastContainer position="bottom-right" theme="dark" />
          <Menu />
          <div className="h-page overflow-auto bg-color-sixty">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/note/:id" element={<EditNote />} />
              <Route path="/note/create" element={<CreateNote />} />
            </Routes>
          </div>
        </Provider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
