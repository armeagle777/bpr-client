import { Box, Tab, Tabs } from "@mui/material";

import TabPanel from "./TabPanel";
import PersonalInfoTab from "./PersonalInfoTab";
import { Table } from "antd";
import {
  cardsTabColumns,
  claimsTabColumns,
  ticketsTabColumns,
} from "../constants";

const ModalContent = ({ selectedTab, onTabChange, data }) => {
  const { baseInfo, fines, claims, cards, familyMembers } = data;
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={onTabChange}
          aria-label="wp-detailed-info"
        >
          <Tab label="Անձնական տվյալներ" />
          <Tab label="Դիմումներ" />
          <Tab label="Քարտեր" />
          <Tab label="Վարչական" />
        </Tabs>
      </Box>
      <TabPanel
        hidden={selectedTab !== 0}
        id="personal-info-tab"
        ariaLabel="personal-info-tab"
      >
        {baseInfo && <PersonalInfoTab data={baseInfo} />}
      </TabPanel>
      <TabPanel
        hidden={selectedTab !== 1}
        id="claims-tab"
        ariaLabel="claims-tab"
      >
        {claims && (
          <Table
            bordered
            dataSource={claims}
            columns={claimsTabColumns}
            pagination={false}
            rowKey="id"
          />
        )}
      </TabPanel>
      <TabPanel hidden={selectedTab !== 2} id="cards-tab" ariaLabel="cards-tab">
        {cards && (
          <Table
            bordered
            dataSource={cards}
            columns={cardsTabColumns}
            pagination={false}
            rowKey="id"
          />
        )}
      </TabPanel>
      <TabPanel
        hidden={selectedTab !== 3}
        id="tickets-tab"
        ariaLabel="tickets-tab"
      >
        {fines && (
          <Table
            bordered
            dataSource={fines}
            pagination={false}
            columns={ticketsTabColumns}
            onRow={(record, rowIndex) => {
              return {
                style: {
                  backgroundColor:
                    record.status === "pending"
                      ? "red"
                      : record.status === "closed"
                      ? "green"
                      : record.status === "fined"
                      ? "orange"
                      : "inherit",
                },
              };
            }}
            rowKey="id"
          />
        )}
      </TabPanel>
    </Box>
  );
};

export default ModalContent;
