import dayjs from "dayjs";
import { Grid, TextField, Box, Avatar } from "@mui/material";

const PersonalInfoTab = ({ data }) => {
  const {
    personal_id,
    case_id,
    f_name_arm,
    f_name_eng,
    l_name_arm,
    l_name_eng,
    m_name_arm,
    m_name_eng,
    b_day,
    b_month,
    b_year,
    sex,
    previous_residence,
    citizen_adr,
    residence_adr,
    departure_from_citizen,
    departure_from_residence,
    arrival_date,
    doc_num,
    invalid,
    pregnant,
    seriously_ill,
    trafficking_victim,
    violence_victim,
    comment,
    illegal_border,
    transfer_moj,
    deport_prescurator,
    prison,
    image,
    CITIZENSHIP_COUNTRY_NAME,
    PREVIOUS_RESIDENCE_COUNTRY_NAME,
    ETNICITY_NAME,
    RELIGION_NAME,
    ROLE_NAME,
    PERSON_STATUS_NAME,
    contact_email,
    contact_tel,
    STREET_NAME,
    BUILDING_NUMBER,
    APPARTMENT_NUMBER,
    MARZ_NAME,
    COMMUNITY_NAME,
    SETTLEMENT_NAME,
  } = { ...data };

  return (
    <Box>
      <Grid container spacing={4} sx={{ py: 4 }}>
        {/* Left Side: Photo */}
        <Grid item xs={12} sm={4} md={3} sx={{ py: 4 }}>
          <Avatar
            src={image || ""}
            alt="Profile Photo"
            variant="rounded"
            sx={{ width: 150, height: 200, marginLeft: 4 }}
          />
        </Grid>

        {/* Right Side: TextFields */}
        <Grid item xs={12} sm={8} md={9}>
          <Grid container spacing={2}>
            <Grid container item spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Անուն հայատառ"
                  fullWidth
                  InputProps={{ readOnly: true }}
                  value={f_name_arm || ""}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Ազգնուն հայատառ"
                  fullWidth
                  InputProps={{ readOnly: true }}
                  value={l_name_arm || ""}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Հայրանուն հայատառ"
                  fullWidth
                  InputProps={{ readOnly: true }}
                  value={m_name_arm || ""}
                />
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Անուն լատինատառ"
                  fullWidth
                  InputProps={{ readOnly: true }}
                  value={f_name_eng || ""}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Ազգնուն լատինատառ"
                  fullWidth
                  InputProps={{ readOnly: true }}
                  value={l_name_eng || ""}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Հայրանուն լատինատառ"
                  fullWidth
                  InputProps={{ readOnly: true }}
                  value={m_name_eng || ""}
                />
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              <Grid container item sm={4}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="օր"
                    InputProps={{ readOnly: true }}
                    value={b_day || ""}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="ամիս"
                    InputProps={{ readOnly: true }}
                    value={b_month || ""}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="տարի"
                    InputProps={{ readOnly: true }}
                    value={b_year || ""}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Սեռը"
                  fullWidth
                  InputProps={{ readOnly: true }}
                  value={sex === 1 ? "Արական" : "Իգական"}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Դերը"
                  fullWidth
                  InputProps={{ readOnly: true }}
                  value={ROLE_NAME || ""}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Քաղաքացիություն"
                fullWidth
                InputProps={{ readOnly: true }}
                value={CITIZENSHIP_COUNTRY_NAME || ""}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Անձնագիր"
                fullWidth
                InputProps={{ readOnly: true }}
                value={doc_num || ""}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Ազգությունը"
                fullWidth
                InputProps={{ readOnly: true }}
                value={ETNICITY_NAME || ""}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Կրոնը"
                fullWidth
                InputProps={{ readOnly: true }}
                value={RELIGION_NAME || ""}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Մարզ"
                fullWidth
                InputProps={{ readOnly: true }}
                value={MARZ_NAME || ""}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Համայնք"
                fullWidth
                InputProps={{ readOnly: true }}
                value={COMMUNITY_NAME || ""}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Բնակավայր"
                fullWidth
                InputProps={{ readOnly: true }}
                value={SETTLEMENT_NAME || ""}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="ՏՈՒՆ"
                fullWidth
                InputProps={{ readOnly: true }}
                value={BUILDING_NUMBER || APPARTMENT_NUMBER || ""}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Բնակության հասցե"
                fullWidth
                InputProps={{ readOnly: true }}
                value={STREET_NAME || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Հեռախոսահամար"
                fullWidth
                InputProps={{ readOnly: true }}
                value={contact_tel || ""}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Էլ.փոստ"
                fullWidth
                InputProps={{ readOnly: true }}
                value={contact_email || ""}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Ժամանման ամսաթիվ"
                fullWidth
                InputProps={{ readOnly: true }}
                value={arrival_date || ""}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Քաղ։ երկրից մեկնում"
                fullWidth
                InputProps={{ readOnly: true }}
                value={departure_from_citizen || ""}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInfoTab;
