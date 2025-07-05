import { Flex } from "antd";

import { FiltersRowSkeleton } from "../../../../statisticsComponents";
import { FilterRow } from "./FilterRow";
import { useState } from "react";

const AsylumReports = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Flex vertical>
      {isLoading ? <FiltersRowSkeleton /> : <FilterRow />}
      <p>Asylum reports"</p>
    </Flex>
  );
};

export default AsylumReports;
