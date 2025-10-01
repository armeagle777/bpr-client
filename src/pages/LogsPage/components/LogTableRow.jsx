import { Chip, TableCell, TableRow } from "@mui/material";

const LogTableRow = ({ log }) => {
  return (
    <TableRow hover>
      <TableCell>
        {log.User.firstName} {log.User.lastName}
      </TableCell>
      <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
      <TableCell>
        <Chip label={log.LogType.name} color="primary" size="small" />
      </TableCell>
      <TableCell>
        <pre style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
          {JSON.stringify(log.fields, null, 2)}
        </pre>
      </TableCell>
    </TableRow>
  );
};

export default LogTableRow;
