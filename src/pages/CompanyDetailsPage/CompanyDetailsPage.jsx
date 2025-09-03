import { useState } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

import NoResults from "./components/NoResults";
import { permissionsMap } from "../../utils/constants";
import useFetchCompany from "../../hooks/useFetchCompany";
import { tabsMap } from "./CompanyDetailsPage.constants";
import DataLoader from "../../components/DataLoader/DataLoader";
import WeaponsTab from "../../components/WeaponsTab/WeaponsTab";
import CompanyMainTab from "../../components/CompanyMainTab/CompanyMainTab";
import MojCesDebtorTab from "../../components/MojCesDebtorTab/MojCesDebtorTab";
import ScrollTabsLayout from "../../components/ScrollTabsLayout/ScrollTabsLayout";
import PropertyTaxesTab from "../../components/PropertyTaxesTab/PropertyTaxesTab";
import TaxObligationsTab from "../../components/TaxObligationsTab/TaxObligationsTab";

const CompanyDetailsPage = () => {
  const [activeId, setActiveId] = useState("stateRegister");
  const { taxId } = useParams();
  const { data: company, isFetching, isError, error } = useFetchCompany(taxId);
  const sections = [
    {
      id: tabsMap.stateRegister.id,
      label: tabsMap.stateRegister.label,
      tabTitle: tabsMap.stateRegister.tabTitle,
      Component: CompanyMainTab,
      props: { company: company },
      permissions: [permissionsMap.ADMIN.uid, permissionsMap.PETREGISTER.uid],
    },
    {
      id: tabsMap.weaponsInfo.id,
      label: tabsMap.weaponsInfo.label,
      tabTitle: tabsMap.weaponsInfo.tabTitle,
      Component: WeaponsTab,
      props: {
        tax_id: taxId,
        isTabActive: activeId === tabsMap.weaponsInfo.id,
      },
      permissions: [permissionsMap.ADMIN.uid, permissionsMap.WEAPON.uid],
    },
    {
      id: tabsMap.propertyTaxes.id,
      label: tabsMap.propertyTaxes.label,
      tabTitle: tabsMap.propertyTaxes.tabTitle,
      Component: PropertyTaxesTab,
      props: {
        identificatorNumber: taxId,
        personType: "LEGAL",
        isTabActive: activeId === tabsMap.propertyTaxes.id,
      },
      permissions: [
        permissionsMap.ADMIN.uid,
        permissionsMap.MTA_PROPERTY_TAXES.uid,
      ],
    },
    {
      id: tabsMap.mojCesDebtor.id,
      label: tabsMap.mojCesDebtor.label,
      tabTitle: tabsMap.mojCesDebtor.tabTitle,
      Component: MojCesDebtorTab,
      props: {
        tax_id: taxId,
        isTabActive: activeId === tabsMap.mojCesDebtor.id,
      },
      permissions: [permissionsMap.ADMIN.uid, permissionsMap.MOJ_CES.uid],
    },
    {
      id: tabsMap.taxObligations.id,
      label: tabsMap.taxObligations.label,
      tabTitle: tabsMap.taxObligations.tabTitle,
      Component: TaxObligationsTab,
      props: {
        tin: taxId,
        isTabActive: activeId === tabsMap.taxObligations.id,
      },
      permissions: [
        permissionsMap.ADMIN.uid,
        permissionsMap.TAX_COMPANY_OBLIGATIONS.uid,
      ],
    },
  ];

  return (
    <Box p={3}>
      {!isError && !isFetching && !company && (
        <NoResults
          message="Տվյալներ Չեն Գտնվել"
          onBack={() => window.history.back()}
        />
      )}
      {!company && isFetching && <DataLoader />}
      {company && (
        <>
          <ScrollTabsLayout
            sections={sections}
            activeId={activeId}
            setActiveId={setActiveId}
          />
        </>
      )}
    </Box>
  );
};

export default CompanyDetailsPage;
