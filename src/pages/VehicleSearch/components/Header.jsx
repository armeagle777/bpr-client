import {
  Pin as PinIcon,
  Build as BuildIcon,
  PersonSearch as SearchIcon,
  AccountBox as AccountBoxIcon,
  DirectionsCar as DirectionsCarIcon,
  CreditCard as CreditCardIcon,
  Save as SaveAltIcon,
} from '@mui/icons-material';

import {
  Box,
  Stack,
  Tooltip,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Container,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import { PLACEHOLDERS, SEARCH_BASES } from '../VehicleSearch.constants';
import SavedSearchTag from '../../../components/SavedSearchTag/SavedSearchTag';
import useLikesData from '../../../hooks/useLikesData';
import { likeTypesMap } from '../../../utils/constants';

const Header = ({
  searchBase,
  isFetching,
  certNumberInput,
  handleBaseChange,
  setCertNumberInput,
  handleSubmitSearch,
}) => {
  const {
    onLikeCreate,
    data: likesData,
    isFetchingCreateLike,
  } = useLikesData({
    likeTypeName: likeTypesMap.roadPolice.name,
  });

  const handleSaveButton = () => {
    onLikeCreate({
      likeTypeName: likeTypesMap.roadPolice.name,
      fields: { [searchBase]: certNumberInput },
    });
  };

  const handleSavedTagClick = (searchProps) => {
    if (
      !searchProps ||
      typeof searchProps !== 'object' ||
      Array.isArray(searchProps) ||
      Object.keys(searchProps).length === 0
    ) {
      return;
    }
    const savedItem = Object.entries(searchProps)?.[0];
    setCertNumberInput(savedItem[1]);
    handleBaseChange(null, savedItem[0]);
  };
  const buttonDisabled = !certNumberInput;

  return (
    <Stack
      spacing={2}
      sx={{
        width: '100%',
        alignItems: 'center',
        pt: '20px',
        mb: 2,
      }}
    >
      <Box
        component="form"
        sx={{
          display: 'flex',
          alignItems: 'center',
          '& .MuiTextField-root': { m: 1, width: '24ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label={PLACEHOLDERS[searchBase] || 'Հաշվառման համարանիշ'}
          type="search"
          value={certNumberInput}
          onChange={(e) => setCertNumberInput(e.target.value)}
          autoFocus
        />
        <LoadingButton
          onClick={() => handleSubmitSearch(certNumberInput, SEARCH_BASES[searchBase])}
          variant="contained"
          size="large"
          color="primary"
          sx={{ py: 2 }}
          loading={isFetching}
          disabled={buttonDisabled}
        >
          <SearchIcon />
        </LoadingButton>
        <LoadingButton
          size="large"
          sx={{ py: 2, ml: 1 }}
          color="info"
          title="Պահպանել"
          variant="contained"
          disabled={buttonDisabled}
          onClick={handleSaveButton}
          loading={isFetchingCreateLike}
        >
          <SaveAltIcon />
        </LoadingButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <ToggleButtonGroup
          exclusive
          size="large"
          color="primary"
          value={searchBase}
          aria-label="Search-base"
          onChange={handleBaseChange}
        >
          <Tooltip title="Որոնում ըստ հաշվառման համարանիշի">
            <ToggleButton value="PLATE_NUMBER">
              <PinIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Որոնում ըստ ՀԾՀ-ի/ՀՎՀՀ-ի">
            <ToggleButton value="SSN">
              <AccountBoxIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Որոնում ըստ VIN կոդի">
            <ToggleButton value="VIN_CODE">
              <BuildIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Որոնում ըստ հաշվառման վկայագրի">
            <ToggleButton value="CERTIFICATE_NUMBER">
              <DirectionsCarIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Որոնում ըստ վարորդական վկ.">
            <ToggleButton value="DRIVING_LICENSE">
              <CreditCardIcon />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      </Box>
      {likesData?.length > 0 && (
        <Container>
          <Stack gap={2} direction="row" justifyContent="center" flexWrap="wrap">
            {likesData.map((searchProps, index) => {
              return (
                <SavedSearchTag
                  key={index}
                  {...searchProps.fields}
                  onTagClick={() => handleSavedTagClick(searchProps?.fields)}
                />
              );
            })}
          </Stack>
        </Container>
      )}
    </Stack>
  );
};

export default Header;
