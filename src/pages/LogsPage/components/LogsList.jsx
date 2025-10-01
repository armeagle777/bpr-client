import { Box } from "@mui/material";
import LogItem from "./LogItem";

const LogsList = ({ logs }) => {
  return (
    <Box>
      {logs.map((log, idx) => (
        <LogItem key={idx} log={log} />
      ))}
    </Box>
  );
};

export default LogsList;
