import { Button } from "@mui/material";
import { message, Table } from "antd";

import { memo, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import useWpPerson from "../../hooks/useWpPerson";
import Filters from "./components/Filters";
import ModalContent from "./components/ModalContent";

const WpPersonSearch = () => {
  const {
    data,
    filters,
    isFetching,
    handleReset,
    columns,
    isModalOpen,
    handleSubmit,
    handleChange,
    handlePageChange,
    selectedTab,
    handleTabChange,
    handleModalClose,
    isFiltersChanged,
    isSubmitBtnLoading,
    fullData,
  } = useWpPerson();

  const { data: persons, pagination } = { ...data };

  return (
    <>
      <Filters
        filters={filters}
        isFetching={isFetching}
        handleReset={handleReset}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isFiltersChanged={isFiltersChanged}
        isSubmitBtnLoading={isSubmitBtnLoading}
      />
      {persons && (
        <>
          <Table
            bordered
            columns={columns}
            loading={isFetching}
            dataSource={persons}
            pagination={{
              showSizeChanger: false,
              total: pagination.total,
              current: pagination.page,
              onChange: handlePageChange,
              pageSize: pagination.pageSize,
            }}
          />
          <Modal
            isOpen={isModalOpen && !!fullData}
            onClose={handleModalClose}
            centered={false}
          >
            <ModalContent
              selectedTab={selectedTab}
              onTabChange={handleTabChange}
              data={fullData}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default memo(WpPersonSearch);
