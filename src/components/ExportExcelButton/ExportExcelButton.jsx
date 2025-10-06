import { memo, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { FaDownload } from 'react-icons/fa6';

import { getExcelFile } from '../../api/personsApi';
import { Button } from '@mui/material';

function generateFileName() {
  const timestamp = new Date().toISOString().replace(/[:.-]/g, '');

  return `logs_${timestamp}`;
}

const ExportExcelButton = ({ filters }) => {
  const fileName = generateFileName();

  const {
    data: fileData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery([filters], () => getExcelFile(filters), {
    keepPreviousData: false,
    enabled: false,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    toast.error('Ինչ-որ բան այնպես չէ:', {
      progress: undefined,
    });
  }

  useEffect(() => {
    const downloadExcelFile = async () => {
      if (fileData) {
        try {
          const blob = await fileData;
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `${fileName}.xlsx`;
          link.click();
          window.URL.revokeObjectURL(link.href);
        } catch (error) {
          console.error('Error exporting Excel from React:', error.message);
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
      variant="outlined"
      disabled={isFetching}
      loading={isFetching}
      icon={<FaDownload />}
      style={{
        color: 'purple',
        fontWeight: 'bold',
        height: '100%',
      }}
      onClick={handleExportExcel}
    >
      Արտահանել
    </Button>
  );
};

export default memo(ExportExcelButton);
