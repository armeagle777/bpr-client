import { useMutation } from "@tanstack/react-query";

import { createLog } from "../api/personsApi";

const useLogs = () => {
  const logMutation = useMutation({
    mutationFn: createLog,
  });

  const createLogHandler = (logData) => logMutation.mutate(logData);

  return { createLogHandler };
};

export default useLogs;
