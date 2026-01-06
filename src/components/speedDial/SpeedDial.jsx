import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import {
  Save as SaveIcon,
  EventNote as EventNoteIcon,
  PictureAsPdf as PictureAsPdfIcon,
} from '@mui/icons-material';
import { PDFDownloadLink } from '@react-pdf/renderer';

const SpeedDialButton = ({
  onLikeToggle,
  handleNoteCreate,
  uid,
  text,
  fileName,
  PDFTemplate,
  data,
  userFullName,
}) => {
  const actions = [
    {
      icon: <SaveIcon />,
      name: 'Պահպանել',
      onClick: () => onLikeToggle({ uid, text }),
    },
    {
      icon: <EventNoteIcon />,
      name: 'Ստեղծել նշում',
      onClick: () => handleNoteCreate(),
    },
    {
      name: 'Արտահանել',
      icon: (
        <PDFDownloadLink
          document={<PDFTemplate data={data} userFullName={userFullName} />}
          fileName={fileName}
        >
          {({ loading }) => (loading ? 'Loading...' : <PictureAsPdfIcon />)}
        </PDFDownloadLink>
      ),
      onClick: () => {},
    },
  ];
  return (
    <SpeedDial
      ariaLabel="Person Page SpeedDial"
      sx={{ position: 'fixed', bottom: 90, right: 100 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </SpeedDial>
  );
};

export default SpeedDialButton;
