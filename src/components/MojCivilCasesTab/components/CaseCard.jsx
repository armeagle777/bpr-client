import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  Box,
} from "@mui/material";

const CaseCard = ({ caseItem }) => {
  return (
    <Card
      sx={{ borderRadius: 2, boxShadow: 4, maxWidth: 600, mx: "auto", mt: 3 }}
    >
      <CardHeader
        title={
          <Typography variant="h6" color="primary">
            Դատական գործ № {caseItem.case_number}
          </Typography>
        }
        subheader={caseItem.court}
      />

      <Divider />

      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Դատավորներ
          </Typography>
          <Typography
            variant="body2"
            component="div"
            sx={{ whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{ __html: caseItem.judge }}
          />
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            Գործի կողմեր
          </Typography>
          <Typography
            variant="body2"
            component="div"
            sx={{ whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{ __html: caseItem.case_sides }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CaseCard;
