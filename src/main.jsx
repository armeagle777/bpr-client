import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "react-auth-kit/AuthProvider";
import createStore from "react-auth-kit/createStore";

import "./index.css";
import { PersonsProvider } from "./components/context/persons";
import { CompaniesProvider } from "./components/context/companies";
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
        <CompaniesProvider>
          <KadastrCertsProvider>
            <VehicleSearchProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </VehicleSearchProvider>
          </KadastrCertsProvider>
        </CompaniesProvider>
      </PersonsProvider>
    </QueryClientProvider>
  </AuthProvider>
);
