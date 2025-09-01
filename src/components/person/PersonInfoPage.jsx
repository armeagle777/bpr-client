import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import { Box, Button, Chip, Container, Grid, Stack } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Kadastr from "../Kadastr/Kadastr";
import PDFGenerator from "../PDFGenerator/PDFGenerator";
import BusinessTab from "../businessTab/BusinessTab";
import Documents from "../documents/Documents";
import Family from "../family/Family";
import Finances from "../finances/Finances";
import BPR from "../pdf-templates/BPR";
import PhotoSlider from "../photoSlider/PhotoSlider";
import SpeedDialButton from "../speedDial/SpeedDial";
import TabPanel from "../tabPanel/TabPanel";
import PersonalInfoRow from "./PersonalInfoRow";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useLikesData from "../../hooks/useLikesData";
import { permissionsMap } from "../../utils/constants";
import {
  filterImageSrcs,
  formatCountryName,
  formatPersonData,
  isPersonJpk,
  userHasPermission,
} from "../../utils/helperFunctions";
import RoadPoliceTab from "../RoadPoliceTab/RoadPoliceTab";
import WpTab from "../WpTab/WpTab";
import PoliceTab from "../policeTab/PoliceTab";
import WeaponsTab from "../WeaponsTab/WeaponsTab";
import RoadPoliceTransactionsTab from "../RoadPoliceTransactionsTab/RoadPoliceTransactionsTab";
import PropertyTaxesTab from "../PropertyTaxesTab/PropertyTaxesTab";
import MojCesDebtorTab from "../MojCesDebtorTab/MojCesDebtorTab";
import SocialPaymentsTab from "../SocialPaymentsTab/SocialPaymentsTab";

const PersonInfoPage = ({ personInfo }) => {
  const [value, setValue] = useState(0);
  const { onLikeToggle } = useLikesData();

  const {
    titlePerson: {
      PNum,
      Certificate_Number,
      Citizenship_StoppedDate,
      IsDead,
      DeathDate,
      birthDate,
      birthCountry,
      birthRegion,
      firstName,
      lastName,
      middleName,
      firstNameEng,
      lastNameEng,
      middleNameEng,
      gender,
      NationalityName,
      allCitizenships,
    },

    titleAddress: {
      Apartment,
      Building,
      Building_Type,
      Community,
      Region,
      Residence,
      Street,
      Foreign_Address,
      Foreign_Community,
      Foreign_Country,
      Foreign_Region,
    },
    addresses,
    documents,
  } = formatPersonData(personInfo);
  const sanitizedPNum = PNum?.replace(/\//g, "*");

  const user = useAuthUser();

  const images = filterImageSrcs(documents, gender, birthDate);

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const likeToggleText = middleName
    ? `${firstName} ${lastName} ${middleName}`
    : `${firstName} ${lastName}`;

  const handleReceiverChange = (value) => {
    console.log(`selected ${value}`);
  };

  let index = 0;
  const isJpk = isPersonJpk(documents);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Container>
            <Box>
              <Stack
                direction="row"
                sx={{
                  pt: 4,
                }}
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  onClick={() => navigate(-1)}
                  variant="contained"
                  startIcon={<ArrowBackIosIcon />}
                >
                  Վերադառնալ
                </Button>
                {userHasPermission(
                  [permissionsMap.BPR.uid, permissionsMap.ADMIN.uid],
                  user.permissions
                ) && (
                  <PDFGenerator
                    PDFTemplate={BPR}
                    fileName={`bpr_${firstName}_${lastName}.pdf`}
                    buttonText="Արտահանել"
                    variant="outlined"
                    Icon={PictureAsPdfIcon}
                    data={{
                      addresses,
                      documents,
                      PNum,
                      IsDead,
                      DeathDate,
                      Citizenship_StoppedDate,
                    }}
                    userFullName={`${user.firstName} ${user.lastName}`}
                  />
                )}
              </Stack>
              <Stack direction="row" sx={{ mt: 2 }}>
                <Box
                  sx={{
                    width: "20%",
                    minWidth: 200,
                    maxWidth: 300,
                    padding: 2,
                  }}
                >
                  <PhotoSlider images={images} />
                </Box>
                <Stack direction="row" sx={{ width: "70%", padding: 2 }}>
                  <Stack
                    spacing={2}
                    justifyContent="left"
                    sx={{ width: "50%" }}
                  >
                    <PersonalInfoRow
                      width={35}
                      label="ԱՆՈՒՆ"
                      text={`${firstName} | ${
                        firstNameEng ? firstNameEng : ""
                      }`}
                    />
                    <PersonalInfoRow
                      width={35}
                      label="ԱԶԳԱՆՈՒՆ"
                      text={`${lastName} | ${lastNameEng ? lastNameEng : ""}`}
                    />
                    <PersonalInfoRow
                      width={35}
                      label="ՀԱՅՐԱՆՈՒՆ"
                      text={`${middleName ? middleName : ""} | ${
                        middleNameEng ? middleNameEng : ""
                      }`}
                    />
                    <PersonalInfoRow
                      width={35}
                      label="ԾՆՆԴՅԱՆ ա/թ"
                      text={birthDate}
                    />
                    <PersonalInfoRow
                      width={35}
                      label="ՀԾՀ"
                      text={sanitizedPNum || Certificate_Number || ""}
                    />
                    <PersonalInfoRow
                      width={35}
                      label="ԱԶԳՈՒԹՅՈՒՆ"
                      text={NationalityName}
                    />
                    <PersonalInfoRow width={35} label="ՍԵՌԸ" text={gender} />
                    {IsDead && (
                      <PersonalInfoRow
                        width={40}
                        label="Մահացել է"
                        text={DeathDate}
                      />
                    )}
                  </Stack>
                  <Stack
                    spacing={2}
                    justifyContent="left"
                    sx={{ width: "50%" }}
                  >
                    <PersonalInfoRow
                      width={40}
                      label="ԵՐԿԻՐ"
                      text={
                        Foreign_Country
                          ? formatCountryName(Foreign_Country.CountryName)
                          : "ՀԱՅԱՍՏԱՆ"
                      }
                    />
                    <PersonalInfoRow
                      width={40}
                      label="ՄԱՐԶ"
                      text={Region || Foreign_Region}
                    />
                    <PersonalInfoRow
                      width={40}
                      label="ՀԱՄԱՅՆՔ"
                      text={
                        Community
                          ? `${Community}/${Residence}`
                          : Foreign_Community
                      }
                    />
                    <PersonalInfoRow
                      width={40}
                      label="ՓՈՂՈՑ"
                      text={Street || Foreign_Address}
                    />
                    <PersonalInfoRow
                      width={40}
                      label="ՏՈՒՆ"
                      text={
                        Building &&
                        `${Building_Type} ${Building}, ${
                          Apartment ? Apartment : ""
                        }`
                      }
                    />
                    <PersonalInfoRow
                      width={40}
                      label="ԾՆՆԴԱՎԱՅՐ"
                      text={`${birthCountry}/${
                        birthRegion ? ` \ ${birthRegion}` : ""
                      }`}
                    />
                    <PersonalInfoRow
                      width={40}
                      label="ՔԱՂԱՔԱՑԻՈՒԹՅՈՒՆ"
                      text={allCitizenships}
                    />
                    {Citizenship_StoppedDate && (
                      <PersonalInfoRow
                        width={40}
                        label="Քաղ․ հրաժարվելու ա/թ"
                        text={Citizenship_StoppedDate}
                      />
                    )}
                    {/* <Grid item>
                  <PDFGenerator
                    fileName={`bpr_${firstName}_${lastName}.pdf`}
                    buttonText="Արտահանել"
                    variant="contained"
                    Icon={PictureAsPdfIcon}
                    PDFTemplate={BPR}
                    data={personInfo}
                    userFullName={`${user.firstName} ${user.lastName}`}
                  />
                </Grid> */}
                  </Stack>
                </Stack>
                {isJpk && (
                  <Box
                    sx={{
                      width: "5%",
                    }}
                  >
                    <Chip size="medium" color="warning" label="ԺՊԿ" />
                  </Box>
                )}
              </Stack>
            </Box>
            <Box sx={{ pb: 3 }}>
              {userHasPermission(
                [permissionsMap.BPR.uid, permissionsMap.ADMIN.uid],
                user.permissions
              ) && (
                <TabPanel value={value} index={index++}>
                  <Documents documents={documents} addresses={addresses} />
                </TabPanel>
              )}
              {userHasPermission(
                [permissionsMap.TAX.uid, permissionsMap.ADMIN.uid],
                user.permissions
              ) && (
                <TabPanel value={value} index={index++}>
                  <Finances ssn={sanitizedPNum || Certificate_Number} />
                </TabPanel>
              )}
              {userHasPermission(
                [permissionsMap.ZAQS.uid, permissionsMap.ADMIN.uid],
                user.permissions
              ) && (
                <TabPanel value={value} index={index++}>
                  <Family
                    ssn={sanitizedPNum || Certificate_Number}
                    firstName={firstName}
                    lastName={lastName}
                  />
                </TabPanel>
              )}
              {userHasPermission(
                [permissionsMap.PETREGISTER.uid, permissionsMap.ADMIN.uid],
                user.permissions
              ) && (
                <TabPanel value={value} index={index++}>
                  <BusinessTab ssn={sanitizedPNum || Certificate_Number} />
                </TabPanel>
              )}
              {userHasPermission(
                [permissionsMap.KADASTR.uid, permissionsMap.ADMIN.uid],
                user.permissions
              ) && (
                <TabPanel value={value} index={index++}>
                  <Kadastr ssn={sanitizedPNum || Certificate_Number} />
                </TabPanel>
              )}
              {userHasPermission(
                [permissionsMap.POLICE.uid, permissionsMap.ADMIN.uid],
                user.permissions
              ) && (
                <TabPanel value={value} index={index++}>
                  <PoliceTab pnum={sanitizedPNum} />
                </TabPanel>
              )}
              {userHasPermission(
                [permissionsMap.WP.uid, permissionsMap.ADMIN.uid],
                user.permissions
              ) && (
                <TabPanel value={value} index={index++}>
                  <WpTab pnum={sanitizedPNum} />
                </TabPanel>
              )}
              {userHasPermission(
                [permissionsMap.ROADPOLICE.uid, permissionsMap.ADMIN.uid],
                user.permissions
              ) && (
                <TabPanel value={value} index={index++}>
                  <RoadPoliceTab pnum={sanitizedPNum} />
                </TabPanel>
              )}
              {userHasPermission(
                [permissionsMap.WEAPON.uid, permissionsMap.ADMIN.uid],
                user.permissions
              ) && (
                <TabPanel value={value} index={index++}>
                  <WeaponsTab ssn={sanitizedPNum} />
                </TabPanel>
              )}
              {userHasPermission(
                [
                  permissionsMap.ROADPOLICE_TRANSACTIONS.uid,
                  permissionsMap.ADMIN.uid,
                ],
                user.permissions
              ) && (
                <TabPanel value={value} index={index++}>
                  <RoadPoliceTransactionsTab pnum={sanitizedPNum} />
                </TabPanel>
              )}
              {userHasPermission(
                [
                  permissionsMap.MTA_PROPERTY_TAXES.uid,
                  permissionsMap.ADMIN.uid,
                ],
                user.permissions
              ) && (
                <TabPanel value={value} index={index++}>
                  <PropertyTaxesTab identificatorNumber={sanitizedPNum} />
                </TabPanel>
              )}
              {userHasPermission(
                [permissionsMap.MOJ_CES.uid, permissionsMap.ADMIN.uid],
                user.permissions
              ) && (
                <TabPanel value={value} index={index++}>
                  <MojCesDebtorTab psn={sanitizedPNum} />
                </TabPanel>
              )}
              {userHasPermission(
                [permissionsMap.MLSA.uid, permissionsMap.ADMIN.uid],
                user.permissions
              ) && (
                <TabPanel value={value} index={index++}>
                  <SocialPaymentsTab ssn={sanitizedPNum} />
                </TabPanel>
              )}
            </Box>

            <SpeedDialButton
              onLikeToggle={onLikeToggle}
              uid={PNum}
              text={likeToggleText}
              fileName={`bpr_${firstName}_${lastName}.pdf`}
              PDFTemplate={BPR}
              data={personInfo}
              userFullName={`${user.firstName} ${user.lastName}`}
            />
          </Container>
        </Grid>
        <Grid item xs={2}>
          <Box
            sx={{
              position: "sticky",
              top: 120,
              p: 2,
              height: "100vh",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="personal-info-tabs"
              orientation="vertical"
              sx={{
                borderColor: "divider",
                "& .MuiTabs-indicator": {
                  left: 0,
                  width: "4px",
                  backgroundColor: "#1976d2",
                },
              }}
              TabIndicatorProps={{ style: { left: 0 } }}
            >
              {userHasPermission(
                [permissionsMap.BPR.uid, permissionsMap.ADMIN.uid],
                user.permissions
              ) && (
                // <Tooltip title="ԲՊՌ տվյալներ">
                //   <Tab icon={<CoPresentIcon />} aria-label="documents" />
                // </Tooltip>
                <Tab label="ԲՊՌ տվյալներ" aria-label="documents" />
              )}
              {userHasPermission(
                [permissionsMap.TAX.uid, permissionsMap.ADMIN.uid],
                user.permissions
              ) && <Tab label="ՊԵԿ տվյալներ" aria-label="finances" />}
              {userHasPermission(
                [permissionsMap.ZAQS.uid, permissionsMap.ADMIN.uid],
                user.permissions
              ) && <Tab label="ՔԿԱԳ տվյալներ" aria-label="zaqs" />}
              {userHasPermission(
                [permissionsMap.PETREGISTER.uid, permissionsMap.ADMIN.uid],
                user.permissions
              ) && <Tab label="ԻԱՊՌ տվյալներ" aria-label="petregistre" />}
              {userHasPermission(
                [permissionsMap.KADASTR.uid, permissionsMap.ADMIN.uid],
                user.permissions
              ) && <Tab label="Կադաստրի տվյալներ" aria-label="cadastre" />}
              {userHasPermission(
                [permissionsMap.POLICE.uid, permissionsMap.ADMIN.uid],
                user.permissions
              ) && <Tab label="ԻՑ տվյալներ" aria-label="police" />}
              {userHasPermission(
                [permissionsMap.WP.uid, permissionsMap.ADMIN.uid],
                user.permissions
              ) && (
                <Tab label="Աշխատանքի թույլտվության տվյալներ" aria-label="wp" />
              )}
              {userHasPermission(
                [permissionsMap.ROADPOLICE.uid, permissionsMap.ADMIN.uid],
                user.permissions
              ) && <Tab label="ՃՈ տվյալներ" aria-label="roadpolice" />}
              {userHasPermission(
                [permissionsMap.WEAPON.uid, permissionsMap.ADMIN.uid],
                user.permissions
              ) && <Tab label="Զենքերի տվյալներ" aria-label="weapons" />}
              {userHasPermission(
                [
                  permissionsMap.ROADPOLICE_TRANSACTIONS.uid,
                  permissionsMap.ADMIN.uid,
                ],
                user.permissions
              ) && (
                <Tab label="Տ/մ հաշվառումներ" aria-label="rp-transactions" />
              )}
              {userHasPermission(
                [
                  permissionsMap.MTA_PROPERTY_TAXES.uid,
                  permissionsMap.ADMIN.uid,
                ],
                user.permissions
              ) && (
                <Tab
                  label="Գույքահարկ"
                  aria-label="territorial-ministry-property-taxes"
                />
              )}
              {userHasPermission(
                [permissionsMap.MOJ_CES.uid, permissionsMap.ADMIN.uid],
                user.permissions
              ) && <Tab label="ԴԱՀԿ Որոնում" aria-label="moj-ces-debtor" />}
              {userHasPermission(
                [permissionsMap.MLSA.uid, permissionsMap.ADMIN.uid],
                user.permissions
              ) && <Tab label="Սոց. Վճարումներ" aria-label="mlsa-payments" />}
            </Tabs>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default PersonInfoPage;
