import { Paper, Typography, Grid, Box, Chip } from "@mui/material";
const fakeOwner = {
  full_name: "Աննա Գրիգորյան",
  address: {
    addr_descr: "Երևան, Մաշտոցի 45",
    email: "anna.grigoryan@mail.am",
    mobile: "+37477123456",
    phone: "+37410223344",
    website: "https://anna.am",
  },
  id_info: {
    birth_date: "1988-05-12",
    sex: "Ի", // Ի = Female, Ա = Male
    ssn: "123456789",
    taxid: "987654321",
    passport_no: "AM9876543",
  },
  is_founder: true,
  is_legal_entity: false,
  joined_date: "2020-05-15",
  left_date: "",
  shares: "40%",
  share_info: "40% հիասթափվող բաժնեմաս",
};

const OwnerRow = ({ ownerInfo }) => {
  const {
    full_name = "",
    address: { addr_descr, email, mobile, phone, website } = {},
    id_info: { birth_date, sex, ssn, taxid, passport_no } = {},
    is_founder,
    is_legal_entity,
    joined_date,
    left_date,
    shares,
    share_info: {
      share_value,
      share_count,
      share_percent,
      share_fraction,
    } = {},
  } = ownerInfo || {};

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Grid container spacing={2}>
        {/* Name and Type */}
        <Grid item xs={12} sm={6}>
          <Typography fontWeight={600}>Անուն՝ Ազգանուն</Typography>
          <Typography>{full_name}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography fontWeight={600}>Տիպ</Typography>
          <Box>
            {is_founder && (
              <Chip label="Հիմնադիր" size="small" sx={{ mr: 1 }} />
            )}
            {is_legal_entity && <Chip label="Իրավաբանական անձ" size="small" />}
          </Box>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} sm={6}>
          <Typography fontWeight={600}>Հասցե</Typography>
          <Typography>{addr_descr || "-"}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography fontWeight={600}>Էլ․ հասցե</Typography>
          <Typography>{email || "-"}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography fontWeight={600}>Հեռախոս</Typography>
          <Typography>{mobile || phone || "-"}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography fontWeight={600}>Վեբ կայք</Typography>
          <Typography>{website || "-"}</Typography>
        </Grid>

        {/* Identification */}
        <Grid item xs={12} sm={6}>
          <Typography fontWeight={600}>ՀԾՀ</Typography>
          <Typography>{ssn || taxid || "-"}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography fontWeight={600}>Անձնագիր</Typography>
          <Typography>{passport_no || "-"}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography fontWeight={600}>Ծննդ․ ա/թ</Typography>
          <Typography>{birth_date || "-"}</Typography>
        </Grid>

        {/* Shares & Dates */}
        <Grid item xs={12} sm={6}>
          <Typography fontWeight={600}>Բաժնեմաս</Typography>
          <Typography>{shares || share_percent || "-"}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography fontWeight={600}>Միանալու / Հեռանալու ամսաթիվ</Typography>
          <Typography>
            {joined_date || "-"} /{" "}
            {left_date && left_date !== "0000-00-00" ? left_date : " "}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OwnerRow;
