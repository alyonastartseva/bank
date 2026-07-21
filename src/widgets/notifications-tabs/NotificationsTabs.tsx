import { Box, Button, Chip, Stack } from "@mui/material";
import style from "./NotificationsTabs.module.css";
import { useState } from "react";
import { notificationTabs } from "./tabs";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

const NotificationsTabs = () => {
  const [activeTab, setActiveTab] = useState("Все");

  return (
    <Box className={style.box}>
      <Stack spacing={2} direction="row" useFlexGap sx={{ flexWrap: "wrap" }}>
        {notificationTabs.map((tab) => (
          <Chip
            key={tab}
            label={tab}
            color={activeTab === tab ? "primary" : "default"}
            variant={activeTab === tab ? "filled" : "outlined"}
            clickable
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </Stack>

      <Button variant="text" startIcon={<CheckRoundedIcon />}>
        Все прочитано
      </Button>
    </Box>
  );
};

export default NotificationsTabs;
