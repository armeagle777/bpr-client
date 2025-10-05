import { Stack, Typography } from '@mui/material';
import CompanyTooltip from './CompanyTooltip';

const TableHeader = ({ companyData, taxpayerid, taxpayerName, legalTypeName }) => {
  return (
    <Stack direction="row" sx={{ alignItems: 'center' }}>
      <Typography variant="body2" component="span">
        {`${taxpayerName || companyData?.name_am || ''} ${
          legalTypeName || companyData?.company_type || ''
        } | ${taxpayerid}`}
      </Typography>
      {companyData && (
        <CompanyTooltip
          name_en={companyData?.name_am}
          name_ru={companyData?.name_ru}
          company_type={companyData?.company_type}
          address={companyData?.address}
          executive={companyData?.executive}
        />
      )}
    </Stack>
  );
};

export default TableHeader;
