import { useState } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

import NoResults from "./components/NoResults";
import { permissionsMap } from "../../utils/constants";
import useFetchCompany from "../../hooks/useFetchCompany";
import DataLoader from "../../components/DataLoader/DataLoader";
import CompanyMainTab from "../../components/CompanyMainTab/CompanyMainTab";
import ScrollTabsLayout from "../../components/ScrollTabsLayout/ScrollTabsLayout";
import PropertyTaxesTab from "../../components/PropertyTaxesTab/PropertyTaxesTab";
import { tabsMap } from "./CompanyDetailsPage.constants";

const CompanyDetailsPage = () => {
  const [activeId, setActiveId] = useState("stateRegister");
  const { taxId } = useParams();
  const { data: company, isFetching, isError, error } = useFetchCompany(taxId);
  const sections = [
    {
      id: tabsMap.stateRegister.id,
      label: tabsMap.stateRegister.label,
      Component: CompanyMainTab,
      props: { company: company },
      permissions: [permissionsMap.ADMIN.uid, permissionsMap.PETREGISTER.uid],
    },
    {
      id: tabsMap.propertyTaxes.id,
      label: tabsMap.propertyTaxes.label,
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
