import { useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Tab, Tabs, Box, Container, Grid } from "@mui/material";

import { permissionsMap } from "../../../utils/constants";
import { userHasPermission } from "../../../utils/helperFunctions";

import CompanyHeader from "./CompanyHeader";
import TabPanel from "../../../components/tabPanel/TabPanel";
import WeaponsTab from "../../../components/WeaponsTab/WeaponsTab";
import CompanyMainTab from "../../../components/CompanyMainTab/CompanyMainTab";
import TaxEmployeesTab from "../../../components/TaxEmloyeesTab/TaxEmployeesTab";
import MojCesDebtorTab from "../../../components/MojCesDebtorTab/MojCesDebtorTab";
import PropertyTaxesTab from "../../../components/PropertyTaxesTab/PropertyTaxesTab";
import TaxObligationsTab from "../../../components/TaxObligationsTab/TaxObligationsTab";

const CompanyInfoPage = ({ company, taxId }) => {
  const [value, setValue] = useState(0);

  const user = useAuthUser();

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  let index = 0;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Container>
            <Box>
              {/* Company Header */}
              <CompanyHeader company={company} />
            </Box>
            {userHasPermission(
              [permissionsMap.ADMIN.uid, permissionsMap.PETREGISTER.uid],
              user.permissions
            ) && (
              <TabPanel value={value} index={index++}>
                <CompanyMainTab company={company} />
              </TabPanel>
            )}
            {userHasPermission(
              [permissionsMap.ADMIN.uid, permissionsMap.WEAPON.uid],
              user.permissions
            ) && (
              <TabPanel value={value} index={index++}>
                <WeaponsTab tax_id={taxId} />
              </TabPanel>
            )}
            {userHasPermission(
              [permissionsMap.ADMIN.uid, permissionsMap.MTA_PROPERTY_TAXES.uid],
              user.permissions
            ) && (
              <TabPanel value={value} index={index++}>
                <PropertyTaxesTab
                  identificatorNumber={taxId}
                  personType="LEGAL"
                />
              </TabPanel>
            )}
            {userHasPermission(
              [permissionsMap.ADMIN.uid, permissionsMap.MOJ_CES.uid],
              user.permissions
            ) && (
              <TabPanel value={value} index={index++}>
                <MojCesDebtorTab tax_id={taxId} />
              </TabPanel>
            )}
            {userHasPermission(
              [
                permissionsMap.ADMIN.uid,
                permissionsMap.TAX_COMPANY_OBLIGATIONS.uid,
              ],
              user.permissions
            ) && (
              <TabPanel value={value} index={index++}>
                <TaxObligationsTab tin={taxId} />
              </TabPanel>
            )}
            {userHasPermission(
              [
                permissionsMap.ADMIN.uid,
                permissionsMap.TAX_COMPANY_EMPLOYEES.uid,
                permissionsMap.TAX.uid,
              ],
              user.permissions
            ) && (
              <TabPanel value={value} index={index++}>
                <TaxEmployeesTab taxId={taxId} />
              </TabPanel>
            )}
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
              aria-label="company-info-tabs"
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
                [permissionsMap.ADMIN.uid, permissionsMap.PETREGISTER.uid],
                user.permissions
              ) && <Tab label="ԻԱՊՌ Տվյալներ" aria-label="base-info" />}
              {userHasPermission(
                [permissionsMap.ADMIN.uid, permissionsMap.WEAPON.uid],
                user.permissions
              ) && <Tab label="Զենքերի Տվյալներ" aria-label="weapons-info" />}
              {userHasPermission(
                [
                  permissionsMap.ADMIN.uid,
                  permissionsMap.MTA_PROPERTY_TAXES.uid,
                ],
                user.permissions
              ) && <Tab label="Գույքահարկ" aria-label="property-tax-info" />}
              {userHasPermission(
                [permissionsMap.ADMIN.uid, permissionsMap.MOJ_CES.uid],
                user.permissions
              ) && <Tab label="ԴԱՀԿ" aria-label="moj-ces-info" />}
              {userHasPermission(
                [
                  permissionsMap.ADMIN.uid,
                  permissionsMap.TAX_COMPANY_OBLIGATIONS.uid,
                ],
                user.permissions
              ) && (
                <Tab label="Պարտավորություններ" aria-label="obligations-info" />
              )}
              {userHasPermission(
                [
                  permissionsMap.ADMIN.uid,
                  permissionsMap.TAX_COMPANY_EMPLOYEES.uid,
                  permissionsMap.TAX.uid,
                ],
                user.permissions
              ) && <Tab label="Աշխատակիցներ" aria-label="employees-info" />}
            </Tabs>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CompanyInfoPage;
