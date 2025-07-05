import { Flex, Button } from "antd";
import { FaFilter } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

import { FilterSelect } from "../../../../../statisticsComponents";
import translations from "../../../../../utils/translations/am.json";
import {
  ANT_BTN_TYPES,
  STATISTICS_FILTERS,
  periodsMap,
} from "../../../../../utils/constants";

const FilterRow = ({
  years,
  types,
  periods,
  months,
  onFilter,
  filters,
  onFilterChange,
  isDataLoading,
  onResetFilters,
}) => {
  const { FILTER_ROW } = translations;

  return (
    <Flex style={{ width: "60%", gap: 10 }}>
      <FilterSelect
        options={types}
        value={filters.borderCross}
        placeholder={FILTER_ROW.BORDERCROSS_TYPES_PLACEHOLDER}
        onChange={(e) =>
          onFilterChange({
            name: STATISTICS_FILTERS.BORDERCROSS_TYPE,
            value: e,
          })
        }
      />
      <FilterSelect
        options={years}
        value={filters.year}
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
