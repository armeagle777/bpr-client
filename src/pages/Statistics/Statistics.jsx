import Grid from "@mui/material/Grid";
import { Link, Outlet, useLocation } from "react-router-dom";

import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import { Collapse } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import { Inbox as InboxIcon, Mail as MailIcon, ExpandLess, ExpandMore } from '@mui/icons-material';

const drawerWidth = 240;

const Statistics = () => {
  const [openIndex, setOpenIndex] = React.useState(null);
  const { pathname } = useLocation();
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const menuItems = [
    {
      text: "Քաղաքացիություն",
      icon: <InboxIcon />,
      children: [
        { text: "Ընդհանուր", link: "/statistics/citizenship?type=total" },
        { text: "Շնորհում", link: "/statistics/citizenship" },
        { text: "Դադարեցում", link: "/statistics/citizenship" },
        { text: "Ճանաչում", link: "/statistics/citizenship" },
      ],
    },
    {
      text: "Ապաստան",
      icon: <MailIcon />,
      children: [
        { text: "Ընդհանուր", link: "/statistics/apastan-total" },
        { text: "Դիմումներ", link: "/statistics/apastan-applications" },
        { text: "Որոշումներ", link: "/statistics/apastan-decisions" },
        { text: "Ըստ Տարիների", link: "/statistics/apastan-years" },
      ],
    },
    {
      text: "Կացություն",
      icon: <InboxIcon />,
      children: [
        { text: "ԺԿԿ", link: "" },
        { text: "ՄԿԿ", link: "" },
        { text: "ՀԿԿ", link: "" },
        { text: "WP", link: "/statistics/work-permit" },
      ],
    },
    {
      text: "Սահմանահատում",
      icon: <MailIcon />,
      children: [
        { text: "Ընդհանուր", link: "/statistics/total-bordercross" },
        { text: "Ըստ Երկրների", link: "/statistics/country-bordercross" },
        { text: "Ըստ Ժամանակահատվածի", link: "/statistics/period-bordercross" },
      ],
    },
    {
      text: "Գործարքներ",
      link: "/statistics/deals",
      icon: <MailIcon />,
      children: [],
    },
    {
      text: "Հաշվետվություններ",
      icon: <MailIcon />,
      children: [
        { text: "Ընդհանուր", link: "/statistics/reports?report_type=total" },
        { text: "Ապաստան", link: "/statistics/asylum-reports" },
        {
          text: "Քաղաքացիություն",
          link: "/statistics/reports?report_type=citizenship",
        },
        { text: "Կացություն", link: "/statistics/wp-reports" },
        {
          text: "Սահմանահատում",
          link: "/statistics/reports?report_type=bordercross",
        },
      ],
    },
  ];

  const drawer = (
    <List>
      {menuItems.map((item, index) => {
        const isActive =
          pathname === item.link ||
          item.children.some((child) => pathname === child.link);
        return (
          <React.Fragment key={item.text}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleToggle(index)}
                component={item.link ? Link : undefined}
                to={item.link ?? undefined}
                selected={isActive}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {item.children.length > 0 &&
                  (openIndex === index ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            {item.children.length > 0 && (
              <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child, childIndex) => {
                    const isChildActive = pathname === child.link;
                    return (
                      <ListItem key={childIndex} disablePadding sx={{ pl: 4 }}>
                        <ListItemButton
                          component={Link}
                          to={child.link}
                          selected={isChildActive}
                        >
                          <ListItemText primary={child.text} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
  return (
    <Grid
      container
      spacing={2}
      sx={{ padding: "20px", height: "calc(100vh - 120px)" }}
    >
      {/* <StatisticsHeader /> */}
      <Grid item md={3} sx={{ borderRight: "1px solid #000" }}>
        {/* <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, position: 'relative', 
            height: '100%', },
          }}
          open
        >
          {drawer}
        </Drawer> */}
        <Box>{drawer}</Box>
      </Grid>
      <Grid item md={9} sx={{ overflowX: "auto", height: "100%" }}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Statistics;
