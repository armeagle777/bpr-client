import React from "react";
import { DataTable } from "../../../../../statisticsComponents";
import { MOCK_COLUMNS } from "../../WorkPermitStats/WorkPermitStats.constants";

const EATMPersons = ({ isLoading, data, filters }) => {
  return (
    <DataTable
      isLoading={isLoading}
      modifiedData={data}
      controlledColumns={MOCK_COLUMNS}
      filters={filters}
    />
  );
};

export default EATMPersons;
