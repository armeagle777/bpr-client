import { Box, Tab, Tabs } from "@mui/material";

import TabPanel from "./TabPanel";
import PersonalInfoTab from "./PersonalInfoTab";
import { Table } from "antd";
import {
  cardsTabColumns,
  famMemberTabColumns,
} from "../AsylumSearch.constants";

const ModalContent = ({ selectedTab, onTabChange, data }) => {
  const { cards, familyMembers, ...baseInfo } = { ...data };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={onTabChange}
          aria-label="refugee-detailed-info"
        >
          <Tab label="Անձնական տվյալներ" />
          <Tab label="Քարտեր" />
          <Tab label="Ընտանիքի անդամներ" />
        </Tabs>
      </Box>
      <TabPanel
        hidden={selectedTab !== 0}
        id="personal-info-tab"
        ariaLabel="personal-info-tab"
      >
        {baseInfo && <PersonalInfoTab data={baseInfo} />}
      </TabPanel>
      <TabPanel hidden={selectedTab !== 1} id="cards-tab" ariaLabel="cards-tab">
        {cards && (
          <Table
            bordered
            dataSource={cards}
            columns={cardsTabColumns}
            pagination={false}
            rowKey="card_id"
          />
        )}
      </TabPanel>
      <TabPanel
        hidden={selectedTab !== 2}
        id="fam-member-tab"
        ariaLabel="fam-member-tab"
      >
        {familyMembers && (
          <Table
            bordered
            dataSource={familyMembers}
            pagination={false}
            columns={famMemberTabColumns}
            rowKey="personal_id"
          />
        )}
      </TabPanel>
    </Box>
  );
};

export default ModalContent;
