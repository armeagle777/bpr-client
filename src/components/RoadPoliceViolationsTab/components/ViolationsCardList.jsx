import {
  Article as ArticleIcon,
  CalendarToday as CalendarTodayIcon,
  DirectionsCar as DirectionsCarIcon,
  ExpandMore as ExpandMoreIcon,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { formatAmount } from "../../../utils/helperFunctions";
import ViolationsCard from "./ViolationsCard";

const ViolationsCardList = ({ violations }) => {
  const [expandedId, setExpandedId] = useState(null);
  return (
    <Grid container spacing={2}>
      {violations.map((row) => {
        const speed = Number(row.rp_violation_speed || 0);
        const isHighSpeed = row.rp_violation_type === "speed" && speed > 60;
        return <ViolationsCard row={row} isHighSpeed={isHighSpeed} />;
      })}
    </Grid>
  );
};

export default ViolationsCardList;
