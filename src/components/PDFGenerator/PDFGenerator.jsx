import { PDFDownloadLink } from "@react-pdf/renderer";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import { useMutation } from "@tanstack/react-query";
import { createLog } from "../../api/personsApi";

const PDFGenerator = ({
  PDFTemplate,
  fileName,
  buttonText,
  variant,
  Icon,
  iconButton,
  data,
  userFullName,
}) => {
  const logMutation = useMutation({
    mutationFn: createLog,
  });

  return (
    <PDFDownloadLink
      document={<PDFTemplate data={data} userFullName={userFullName} />}
      fileName={fileName}
    >
      {({ blob, url, loading, error }) => {
        const handleClick = () => {
          logMutation.mutate({
            fileName,
            userFullName,
          });
        };

        return iconButton ? (
          <IconButton aria-label="export">
            <Icon color="error" />
          </IconButton>
        ) : (
          <LoadingButton
            loading={loading}
            variant={variant}
            color="error"
            endIcon={<Icon />}
            onClick={handleClick}
          >
            {buttonText}
          </LoadingButton>
        );
      }}
    </PDFDownloadLink>
  );
};

export default PDFGenerator;
