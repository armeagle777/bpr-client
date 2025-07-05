import { DataTable } from "../../../../../statisticsComponents";
import { MOCK_COLUMNS } from "../WorkPermitStats.constants";

const Volunteer = ({ data, isLoading, filters }) => {
  return (
    <DataTable
      filters={filters}
      isLoading={isLoading}
      modifiedData={data}
      controlledColumns={MOCK_COLUMNS}
    />
  );
};

export default Volunteer;
