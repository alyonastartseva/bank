import { Box, Button, List, ListSubheader } from "@mui/material";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";

import NotificationItem from "../notification-item/NotificationItem";
import { useFilter } from "../../shared/hooks/useFilter";

const NotificationsList = () => {
  const { today, yesterday, thisWeek } = useFilter();

  const sections = [
    { label: "Сегодня", items: today },
    { label: "Вчера", items: yesterday },
    { label: "Эта неделя", items: thisWeek },
  ];

  return (
    <List>
      {sections.map(
        ({ label, items }) =>
          items.length > 0 && (
            <>
              <ListSubheader>{label}</ListSubheader>
              {items.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </>
          )
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button variant="text" endIcon={<KeyboardDoubleArrowDownRoundedIcon />}>
          Загрузить еще
        </Button>
      </Box>
    </List>
  );
};

export default NotificationsList;
