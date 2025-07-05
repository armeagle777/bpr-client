import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "antd";
import { useQuery } from "@tanstack/react-query";
import { FaDownload } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

import { getStatisticsFile } from "../../api/personsApi";
import translations from "../../utils/translations/am.json";
import { DOWNLOAD_FILE_TYPES } from "../../utils/constants";

function generateFileName() {
  const timestamp = new Date().toISOString().replace(/[:.-]/g, "");
  const location = useLocation();
  const pathname = location.pathname;
  const segments = pathname.split("/");
  const lastSegment =
    segments[segments.length - 1] || segments[segments.length - 2];
  return `${lastSegment}_${timestamp}`;
}

const ExportExcelButton = ({ filters }) => {
  const { FILES } = translations;
  const fileName = generateFileName();

  const {
    data: fileData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery(
    [DOWNLOAD_FILE_TYPES.EXCEL, filters],
    () => getStatisticsFile(filters, DOWNLOAD_FILE_TYPES.EXCEL),
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
          link.download = `${fileName}.xlsx`;
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

  return (
    <Button
      type="link"
      disabled={isFetching}
      loading={isFetching}
      icon={<FaDownload />}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        outline: 0,
        border: 0,
        color: "purple",
        fontWeight: "bold",
        textAlign: "center",
      }}
      onClick={handleExportExcel}
    >
      {FILES.EXCEL_EXPORT_BTN_TEXT}
    </Button>
  );
};

export default ExportExcelButton;
