import { useEffect, useRef, useState } from "react";
import {
  Box,
  List,
  Divider,
  Container,
  ListItemText,
  ListItemButton,
} from "@mui/material";

const ScrollTabsLayout = ({ sections = [] }) => {
  const [activeId, setActiveId] = useState(sections[0].id);
  const sectionRefs = useRef({});

  // scroll listener
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => {
      if (sectionRefs.current[s.id]) {
        observer.observe(sectionRefs.current[s.id]);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleTabClick = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box display="flex">
      {/* Main content */}
      <Container>
        <Box flex={1} pr={4}>
          {sections?.map(({ id, Component, props }) => (
            <Box
              key={id}
              id={id}
              ref={(el) => (sectionRefs.current[id] = el)}
              sx={{
                minHeight: "100vh",
                scrollMarginTop: "64px",
              }}
            >
              <Divider sx={{ my: 2 }} />
              <Component isActive={activeId === id} {...props} />
            </Box>
          ))}
        </Box>
      </Container>

      {/* Right sidebar */}
      <Box
        sx={{
          pl: 2,
          top: 80,
          width: 240,
          overflowY: "auto",
          position: "sticky",
          height: "calc(100vh - 80px)",
          borderLeft: "1px solid #ddd",
        }}
      >
        <List>
          {sections.map(({ id, label }) => (
            <ListItemButton
              key={id}
              selected={activeId === id}
              onClick={() => handleTabClick(id)}
            >
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ScrollTabsLayout;
