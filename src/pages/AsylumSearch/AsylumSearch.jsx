import { Table } from "antd";

import { memo } from "react";
import Modal from "../../components/Modal/Modal";
import useAsylumPerson from "../../hooks/useAsylumPerson";
import Filters from "./components/Filters";
import { Box } from "@mui/material";
// import ModalContent from "./components/ModalContent";

const AsylumSearch = () => {
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
    countriesOptions,
    ethnicOptions,
    religionOptions,
  } = useAsylumPerson();

  const { data: persons, pagination } = { ...data };

  return (
    <>
      <Filters
        filters={filters}
        isFetching={isFetching}
        handleReset={handleReset}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        ethnicOptions={ethnicOptions}
        religionOptions={religionOptions}
        countriesOptions={countriesOptions}
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
            {/* <ModalContent
              selectedTab={selectedTab}
              onTabChange={handleTabChange}
              data={fullData}
            /> */}
          </Modal>
        </>
      )}
    </>
  );
};

export default memo(AsylumSearch);
