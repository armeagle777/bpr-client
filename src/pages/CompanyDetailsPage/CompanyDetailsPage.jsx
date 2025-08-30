import ScrollTabsLayout from "../../components/ScrollTabsLayout/ScrollTabsLayout";
import CompanyMainTab from "../../components/CompanyMainTab/CompanyMainTab";

const CompanyDetailsPage = () => {
  const sections = [
    { id: "introduction", label: "Introduction", Component: CompanyMainTab },
    // { id: "usage", label: "Usage", Component: TestTwo },
  ];
  return <ScrollTabsLayout sections={sections} />;
};

export default CompanyDetailsPage;
