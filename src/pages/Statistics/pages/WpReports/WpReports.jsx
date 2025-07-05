import { Flex } from "antd";

import { FiltersRowSkeleton } from "../../../../statisticsComponents";
import { FilterRow } from "./FilterRow";
import { useState } from "react";

const WpReports = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Flex vertical>
      {isLoading ? <FiltersRowSkeleton /> : <FilterRow />}
      <p>Wp reports</p>
    </Flex>
  );
};

export default WpReports;
