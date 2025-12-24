import React, { useMemo, useState } from 'react';
import {
  Box,
  Fade,
  Menu,
  Slide,
  Paper,
  Stack,
  Button,
  Dialog,
  AppBar,
  Divider,
  Toolbar,
  MenuItem,
  IconButton,
  Typography,
} from '@mui/material';
import {
  Close as CloseIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Language as LanguageIcon,
  Visibility as VisibilityIcon,
  FileDownload as FileDownloadIcon,
  AssignmentInd as AssignmentIndIcon,
} from '@mui/icons-material';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useLogs from '../../hooks/useLogs';
import OwnerRow from './components/OwnerRow';
import PdfViewer from '../pdfViewer/PdfViewer';
import { companyDocumentNames } from '../../utils/constants';
import PDFGenerator from '../PDFGenerator/PDFGenerator';
import CompanyMainReport from '../pdf-templates/CompanyMainReport';

const CompanyMainTab = ({ company }) => {
  const [documentName, setDocumentName] = useState(undefined);
  const [showDialog, setShowDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { createLogHandler } = useLogs();
  const user = useAuthUser();
  const userFullName = useMemo(() => {
    if (!user) {
      return '';
    }
    return [user.firstName, user.lastName].filter(Boolean).join(' ');
  }, [user]);

  const open = Boolean(anchorEl);

  const handleClick = (event, doc) => {
    setAnchorEl(event.currentTarget);
    setDocumentName(doc);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const { taxid, executive, docs = {}, owners = [], sole_proprietor = {} } = company || {};

  const {
    ssn,
    full_name,
    id_info = {},
    exec_position,
    address: executiveAddress = {},
  } = executive || sole_proprietor || {};

  const ownersArray = Array.isArray(owners) ? owners : Object.values(owners);
  const exportFileName = useMemo(() => {
    const safeTaxId = typeof taxid === 'string' ? taxid.replace(/[^\w-]/g, '_') : 'report';
    return `company_${safeTaxId || 'report'}.pdf`;
  }, [taxid]);
  const handleViewDocument = () => {
    setAnchorEl(null);
    setShowDialog(true);
  };

  return (
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h5" color="primary" fontWeight="bold">
          Ընկերության տվյալներ
        </Typography>
        {ownersArray.length > 0 && (
          <PDFGenerator
            PDFTemplate={CompanyMainReport}
            fileName={exportFileName}
            buttonText="Արտահանել"
            variant="outlined"
            Icon={PictureAsPdfIcon}
            data={company}
            userFullName={userFullName}
          />
        )}
      </Stack>
      {/* Executive */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <PersonIcon />
          <Typography variant="h6">{exec_position || 'Անհատ Ձեռնարկատեր'}</Typography>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        <Typography>{full_name}</Typography>
        <Typography variant="body2">ՀԾՀ: {id_info?.ssn}</Typography>
        <Typography variant="body2">Անձնագիր: {id_info?.passport_no || ''}</Typography>
        <Typography variant="body2">Ծննդ․ ա/թ: {id_info?.birth_date || ''}</Typography>
        <Typography variant="body2">
          Հեռ: {executiveAddress?.phone || executiveAddress?.mobile || ''}
        </Typography>
        <Typography variant="body2">Հասցե: {executiveAddress?.addr_descr || ''}</Typography>
      </Paper>

      {/* Owners */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <PersonIcon />
          <Typography variant="h6">Բաժնետերեր</Typography>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        {ownersArray.length === 0
          ? 'Բաժնետերեր չկան գրանցված'
          : ownersArray.map((own, index) => <OwnerRow key={index} ownerInfo={own} />)}
      </Paper>

      {/* Documents */}
      <Paper sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <AssignmentIndIcon />
          <Typography variant="h6">Փաստաթղթեր</Typography>
        </Stack>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          {Object.keys(docs).map((doc) => (
            <React.Fragment key={doc}>
              <Button
                startIcon={companyDocumentNames[doc].icon || companyDocumentNames.unknown.icon}
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(e) => handleClick(e, doc)}
              >
                {companyDocumentNames[doc].title || companyDocumentNames.unknown.title}
              </Button>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={handleViewDocument}>
                  <VisibilityIcon sx={{ mr: 1 }} />
                  Դիտել
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <FileDownloadIcon sx={{ mr: 1 }} />
                  <a
                    href={`data:application/pdf;base64,${docs[documentName]}`}
                    download={`${companyDocumentNames[documentName]?.title}.pdf`}
                    style={{
                      textDecoration: 'none',
                      color: 'black',
                    }}
                    onClick={() => {
                      createLogHandler({
                        fileName: `${companyDocumentNames[documentName]?.title}.pdf`,
                        hvhh: taxid,
                      });
                    }}
                  >
                    Ներբեռնել
                  </a>
                </MenuItem>
              </Menu>
            </React.Fragment>
          ))}
        </Stack>
      </Paper>

      {/* PDF Dialog */}
      {showDialog && (
        <Dialog
          fullScreen
          open={showDialog}
          onClose={() => setShowDialog(false)}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setShowDialog(false)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <PdfViewer string={docs[documentName]} />
        </Dialog>
      )}
    </Box>
  );
};

export default CompanyMainTab;
