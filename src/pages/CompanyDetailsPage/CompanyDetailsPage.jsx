import { useParams } from "react-router-dom";

import ScrollTabsLayout from "../../components/ScrollTabsLayout/ScrollTabsLayout";
import CompanyMainTab from "../../components/CompanyMainTab/CompanyMainTab";

const CompanyDetailsPage = () => {
  const { taxId } = useParams();

  const sections = [
    { id: "introduction", label: "Introduction", Component: CompanyMainTab },
    // { id: "usage", label: "Usage", Component: TestTwo },
  ];
  return <ScrollTabsLayout sections={sections} />;
};

export default CompanyDetailsPage;
