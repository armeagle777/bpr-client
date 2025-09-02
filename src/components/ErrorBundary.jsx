import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Alert, Button, Box } from "@mui/material";

function FallbackComponent({ error, resetErrorBoundary }) {
  return (
    <Box sx={{ p: 4 }}>
      <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
        ⚠️ Սխալ տվյալների ցուցադրման ժամանակ:
        <br />
        <small>{error.message}</small>
      </Alert>
      <Button variant="contained" color="primary" onClick={resetErrorBoundary}>
        Կրկին բեռնել
      </Button>
    </Box>
  );
}

const FunctionalErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onReset={() => {
        // Optional: reset app state or reload page
        window.location.reload();
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default FunctionalErrorBoundary;
