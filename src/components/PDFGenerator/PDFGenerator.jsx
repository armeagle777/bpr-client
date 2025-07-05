import { PDFDownloadLink } from "@react-pdf/renderer";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";

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
  return (
    <PDFDownloadLink
      document={<PDFTemplate data={data} userFullName={userFullName} />}
      fileName={fileName}
    >
      {({ blob, url, loading, error }) => {
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
          >
            {buttonText}
          </LoadingButton>
        );
      }}
    </PDFDownloadLink>
  );
};

export default PDFGenerator;
