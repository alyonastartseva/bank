import { Box, Button, List, ListSubheader } from "@mui/material";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";

import NotificationItem from "../notification-item/NotificationItem";
import { notifications } from "../../entities/notifications/notifications";

const NotificationsList = () => {
  return (
    <List>
      {/* Сегодня */}
      {today.length > 0 && (
        <>
          <ListSubheader>Сегодня</ListSubheader>
          {today.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </>
      )}

      {/* Вчера */}
      {yesterday.length > 0 && (
        <>
          <ListSubheader>Вчера</ListSubheader>
          {yesterday.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </>
      )}

      {/* Эта неделя */}
      {thisWeek.length > 0 && (
        <>
          <ListSubheader>Эта неделя</ListSubheader>
          {thisWeek.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </>
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

// Фильтрация списка по дате
const today = notifications.filter((notification) => notification.date === "today");
const yesterday = notifications.filter(
  (notification) => notification.date === "yesterday"
);
const thisWeek = notifications.filter((notification) => notification.date === "thisWeek");
