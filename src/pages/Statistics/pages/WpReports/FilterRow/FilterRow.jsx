import { Flex, Button } from "antd";
import { FaFileExcel } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { useQuery } from "@tanstack/react-query";

import translations from "../../../../../utils/translations/am.json";
import { FilterSelect } from "../../../../../statisticsComponents";
import { ANT_BTN_TYPES, MOCK_YEARS } from "../../../../../utils/constants";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { DOWNLOAD_FILE_TYPES } from "../../../../../utils/constants";
import { getStatisticsFile } from "../../../../../api/personsApi";
import { MOCK_REPORT_PERIODS } from "../constants";

function generateFileName() {
  const timestamp = new Date().toISOString().replace(/[:.-]/g, "");
  const location = useLocation();
  const pathname = location.pathname;
  const segments = pathname.split("/");
  const lastSegment =
    segments[segments.length - 1] || segments[segments.length - 2];
  return `${lastSegment}_${timestamp}`;
}

const FilterRow = ({}) => {
  const [filters, setFilters] = useState({
    year: undefined,
    period: undefined,
    statisticsType: `wp_1`,
  });
  const { FILTER_ROW } = translations;

  const fileName = generateFileName();

  const {
    data: fileData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery(
    [DOWNLOAD_FILE_TYPES.PDF, filters],
    () => getStatisticsFile(filters, DOWNLOAD_FILE_TYPES.PDF),
    {
      keepPreviousData: false,
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  if (isError) {
    toast.error("Something went wrong", {
      progress: undefined,
    });
  }

  useEffect(() => {
    const downloadExcelFile = async () => {
      if (fileData) {
        try {
          const blob = await fileData;
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `${fileName}.pdf`;
          link.click();
          window.URL.revokeObjectURL(link.href);
        } catch (error) {
          console.error("Error exporting Excel from React:", error.message);
        }
      }
    };

    downloadExcelFile();
  }, [fileData]);

  const handleExportExcel = async () => {
    refetch();
  };

  const handleChangeFilters = (filter) => {
    const { name, value } = filter;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleWpTypeChange = (value) => {
    setFilters((prev) => ({ ...prev, statisticsType: `wp_${value}` }));
  };

  return (
    <Flex style={{ width: "60%", gap: 10 }}>
      <FilterSelect
        placeholder="Wp Type"
        options={[
          {
            label: "Հավելված 1",
            value: "1",
            key: "1",
          },
          {
            label: "Հավելված 2",
            value: "2",
            key: "2",
          },
          {
            label: "Հավելված 3",
            value: "3",
            key: "3",
          },
        ]}
        onChange={handleWpTypeChange}
      />
      <FilterSelect
        placeholder={FILTER_ROW.MULTY_YEARS_PLACEHOLDER}
        options={MOCK_YEARS}
        onChange={(value) => handleChangeFilters({ name: "year", value })}
      />
      <FilterSelect
        placeholder={FILTER_ROW.MULTY_PERIODS_PLACEHOLDER}
        options={MOCK_REPORT_PERIODS}
        onChange={(value) => handleChangeFilters({ name: "period", value })}
      />
      <Button
        type={ANT_BTN_TYPES.PRIMARY}
        icon={<FaFileExcel />}
        onClick={handleExportExcel}
        loading={isFetching}
        disabled={!filters.year || !filters.period}
      >
        {FILTER_ROW.EXPORT_BTN_TITLE}
      </Button>
      <Button type="default" icon={<GrPowerReset />}>
        {FILTER_ROW.RESET_BTN_TITLE}
      </Button>
    </Flex>
  );
};

export default FilterRow;
