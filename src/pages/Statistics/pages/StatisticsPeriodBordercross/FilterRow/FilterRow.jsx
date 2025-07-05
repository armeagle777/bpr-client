import { Flex, Button } from "antd";
import { FaFilter } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

import {
  FilterMultySelect,
  FilterSelect,
} from "../../../../../statisticsComponents";
import translations from "../../../../../utils/translations/am.json";
import {
  ANT_BTN_TYPES,
  STATISTICS_FILTERS,
  periodsMap,
} from "../../../../../utils/constants";

const FilterRow = ({
  years,
  periods,
  months,
  onFilter,
  filters,
  onFilterChange,
  isDataLoading,
  onResetFilters,
}) => {
  const { FILTER_ROW } = translations;
  const yearsValue = filters.year ? filters.year : [];

  return (
    <Flex style={{ width: "60%", gap: 10 }}>
      <FilterMultySelect
        options={years}
        value={yearsValue}
        placeholder={FILTER_ROW.YEARS_PLACEHOLDER}
        onChange={(e) =>
          onFilterChange({ name: STATISTICS_FILTERS.YEAR, value: e })
        }
      />
      <FilterSelect
        options={periods}
        value={filters.period}
        placeholder={FILTER_ROW.PERIODS_PLACEHOLDER}
        onChange={(e) =>
          onFilterChange({ name: STATISTICS_FILTERS.PERIOD, value: e })
        }
      />
      {filters.period === periodsMap.MONTHLY && (
        <FilterSelect
          options={months}
          value={filters.month}
          placeholder={FILTER_ROW.MONTHS_PLACEHOLDER}
          onChange={(e) =>
            onFilterChange({ name: STATISTICS_FILTERS.MONTH, value: e })
          }
        />
      )}
      {/* <FilterMultySelect
        placeholder={FILTER_ROW.MULTY_TYPES_PLACEHOLDER}
        options={MOCK_TYPES_OPTIONS}
      /> */}
      {/* <FilterMultySelect
        placeholder={FILTER_ROW.MULTY_POINTS_PLACEHOLDER}
        options={MOCK_POINTS_OPTIONS}
        value={pointsValue}
      /> */}
      <Button
        type={ANT_BTN_TYPES.PRIMARY}
        icon={<FaFilter />}
        onClick={onFilter}
        loading={isDataLoading}
      >
        {FILTER_ROW.FILTER_BTN_TITLE}
      </Button>
      <Button
        type={ANT_BTN_TYPES.DEFAULT}
        icon={<GrPowerReset />}
        onClick={onResetFilters}
      >
        {FILTER_ROW.RESET_BTN_TITLE}
      </Button>
    </Flex>
  );
};

export default FilterRow;
