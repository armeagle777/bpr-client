import { useMemo } from "react";
import dayjs from "dayjs";
import { Grid, TextField, Box, Avatar } from "@mui/material";

const PersonalInfoTab = ({ data }) => {
  const {
    claim_id,
    claim_status,
    id,
    passport_number,
    passport_issued,
    passport_valid,
    citizenship_id,
    actual_country_id,
    birthday_day,
    birthday_month,
    birthday_year,
    full_address,
    emplyee_status,
    first_name_am,
    first_name_en,
    last_name_am,
    last_name_en,
    patronymic_am,
    patronymic_en,
    email,
    ssn,
    telephone,
    email_verified_at,
    last_active_at,
    gender_id,
    user_created,
    country_arm,
    country_eng,
    path,
    serial_number,
    card_issued,
    card_valid,
    card_status,
    genderText,
  } = data;

  const middleNameAm = useMemo(() => {
    return patronymic_am && patronymic_am !== "null" ? patronymic_am : "";
  }, [patronymic_am]);

  const middleNameEn = useMemo(() => {
    return patronymic_en && patronymic_en !== "null" ? patronymic_en : "";
  }, [patronymic_en]);

  return (
    <Box>
      <Grid container spacing={4} sx={{ py: 4 }}>
        {/* Left Side: Photo */}
        <Grid item xs={12} sm={4} md={3} sx={{ py: 4 }}>
          <Avatar
            src={path}
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
                  value={first_name_am}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Ազգնուն հայատառ"
                  fullWidth
                  InputProps={{ readOnly: true }}
                  value={last_name_am}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Հայրանուն հայատառ"
                  fullWidth
                  InputProps={{ readOnly: true }}
                  value={middleNameAm}
                />
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Անուն լատինատառ"
                  fullWidth
                  InputProps={{ readOnly: true }}
                  value={first_name_en}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Ազգնուն լատինատառ"
                  fullWidth
                  InputProps={{ readOnly: true }}
                  value={last_name_en}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Հայրանուն լատինատառ"
                  fullWidth
                  InputProps={{ readOnly: true }}
                  value={middleNameEn}
                />
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              <Grid container item sm={4}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="օր"
                    InputProps={{ readOnly: true }}
                    value={birthday_day}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="ամիս"
                    InputProps={{ readOnly: true }}
                    value={birthday_month}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="տարի"
                    InputProps={{ readOnly: true }}
                    value={birthday_year}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Սեռը"
                  fullWidth
                  InputProps={{ readOnly: true }}
                  value={genderText}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="ՀԾՀ"
                  fullWidth
                  InputProps={{ readOnly: true }}
                  value={ssn}
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
                value={`${country_arm ?? ""} / ${country_eng ?? ""}`}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Անձնագիր"
                fullWidth
                InputProps={{ readOnly: true }}
                value={passport_number}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Անձնագիրը տրված է"
                fullWidth
                InputProps={{ readOnly: true }}
                value={passport_issued}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Անձնագիրը վավեր է"
                fullWidth
                InputProps={{ readOnly: true }}
                value={passport_valid}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Քարտ #"
                fullWidth
                InputProps={{ readOnly: true }}
                value={serial_number || ""}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Քարտը տրված է"
                fullWidth
                InputProps={{ readOnly: true }}
                value={card_issued || ""}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Քարտը վավեր է"
                fullWidth
                InputProps={{ readOnly: true }}
                value={card_valid || ""}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Քարտի կարգավիճակ"
                fullWidth
                InputProps={{ readOnly: true }}
                value={card_status}
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
                value={full_address || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Հեռախոսահամար"
                fullWidth
                InputProps={{ readOnly: true }}
                value={telephone || ""}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Էլ.փոստ"
                fullWidth
                InputProps={{ readOnly: true }}
                value={email || ""}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Գրանցման ամսաթիվ"
                fullWidth
                InputProps={{ readOnly: true }}
                value={
                  user_created
                    ? dayjs(user_created).format("YYYY-MM-DD HH:mm:ss")
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Ակտիվացման ամսաթիվ"
                fullWidth
                InputProps={{ readOnly: true }}
                value={
                  email_verified_at
                    ? dayjs(email_verified_at).format("YYYY-MM-DD HH:mm:ss")
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Վերջին ակտիվություն"
                fullWidth
                InputProps={{ readOnly: true }}
                value={
                  last_active_at
                    ? dayjs(last_active_at).format("YYYY-MM-DD HH:mm:ss")
                    : ""
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInfoTab;
