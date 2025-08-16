import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";

import "./index.css";
import { PersonsProvider } from "./components/context/persons";
import { KadastrCertsProvider } from "./components/context/kadastrCerts";
import { VehicleSearchProvider } from "./components/context/vehicleSearch";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const store = createStore({
  authName: "_auth",
  authType: "localstorage",
  refresh: true,
  cookieDomain: window.location.hostname,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <PersonsProvider>
        <KadastrCertsProvider>
          <VehicleSearchProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </VehicleSearchProvider>
        </KadastrCertsProvider>
      </PersonsProvider>
    </QueryClientProvider>
  </AuthProvider>
);
