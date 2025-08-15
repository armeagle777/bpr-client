import { PDFDownloadLink } from "@react-pdf/renderer";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import useLogs from "../../hooks/useLogs";

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
  const { createLogHandler } = useLogs();

  return (
    <PDFDownloadLink
      document={<PDFTemplate data={data} userFullName={userFullName} />}
      fileName={fileName}
    >
      {({ blob, url, loading, error }) => {
        const handleClick = () =>
          createLogHandler({
            fileName,
            PNum: data?.PNum || data?.person?.psn,
            hvhh: data?.taxid,
          });

        return iconButton ? (
          <IconButton aria-label="export" onClick={handleClick}>
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
