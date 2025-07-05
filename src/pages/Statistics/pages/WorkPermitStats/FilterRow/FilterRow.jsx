import { Flex, Button } from "antd";
import { FaFilter } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

import translations from "../../../../../utils/translations/am.json";
import { FilterSelect } from "../../../../../statisticsComponents";
import {
  MOCK_CLAIM_TYPES,
  MOCK_REPORT_TYPES,
  WP_DEC_TYPES,
} from "../WorkPermitStats.constants";
import {
  ANT_BTN_TYPES,
  MOCK_PERIODS,
  MOCK_MONTHS,
  STATISTICS_FILTERS,
  periodsMap,
} from "../../../../../utils/constants";

const FilterRow = ({
  years,
  filters,
  onFilter,
  isDataLoading,
  onFilterChange,
  onResetFilters,
}) => {
  const { FILTER_ROW } = translations;

  return (
    <Flex style={{ width: "60%", gap: 10 }}>
      <FilterSelect
        options={MOCK_REPORT_TYPES}
        value={filters.report_type}
        placeholder={FILTER_ROW.TYPE_PLACEHOLDER}
        onChange={(e) =>
          onFilterChange({
            name: STATISTICS_FILTERS.REPORT_TYPE,
            value: e,
          })
        }
      />
      {filters.report_type === 2 && (
        <FilterSelect
          options={WP_DEC_TYPES}
          onChange={(e) =>
            onFilterChange({
              name: STATISTICS_FILTERS.DECISION_TYPE,
              value: e,
            })
          }
          value={filters.decType}
          placeholder={FILTER_ROW.MULTY_DECTYPES_PLACEHOLDER}
        />
      )}
      <FilterSelect
        options={years}
        onChange={(e) =>
          onFilterChange({
            name: STATISTICS_FILTERS.YEAR,
            value: e,
          })
        }
        value={filters.year}
        placeholder={FILTER_ROW.YEARS_PLACEHOLDER}
      />
      <FilterSelect
        options={MOCK_PERIODS}
        onChange={(e) =>
          onFilterChange({
            name: STATISTICS_FILTERS.PERIOD,
            value: e,
          })
        }
        value={filters.period}
        placeholder={FILTER_ROW.PERIODS_PLACEHOLDER}
      />
      {filters.period === periodsMap.MONTHLY && (
        <FilterSelect
          options={MOCK_MONTHS}
          onChange={(e) =>
            onFilterChange({
              name: STATISTICS_FILTERS.MONTH,
              value: e,
            })
          }
          value={filters.month}
          placeholder={FILTER_ROW.MONTHS_PLACEHOLDER}
        />
      )}
      <FilterSelect
        options={MOCK_CLAIM_TYPES}
        onChange={(e) =>
          onFilterChange({
            name: STATISTICS_FILTERS.CLAIM_TYPE,
            value: e,
          })
        }
        value={filters.claim_type}
        placeholder={FILTER_ROW.CLAIM_TYPES_PLACEHOLDER}
      />
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
