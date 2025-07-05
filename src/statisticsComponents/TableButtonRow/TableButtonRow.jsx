import { useState } from "react";
import { Button, Dropdown, Flex } from "antd";
import { FaGripVertical } from "react-icons/fa";

import ExportExcelButton from "./ExportExcelButton";

const TableButtonRow = ({ filters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setIsOpen(nextOpen);
    }
  };

  return (
    <Flex justify="flex-end">
      <Flex>
        {/* <Dropdown
          menu={{
            items: dropdownOptions,
          }}
          onOpenChange={handleOpenChange}
          placement="bottomRight"
          arrow
          open={isOpen}
        >
          <Button
            type="link"
            icon={<FaGripVertical />}
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
          >
            COLUMNS
          </Button>
        </Dropdown> */}
        <ExportExcelButton filters={filters} />
      </Flex>
    </Flex>
  );
};

export default TableButtonRow;
