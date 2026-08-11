import {
  Avatar,
  Badge,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import styles from "./NotificationItem.module.css";
import { type Notification } from "../../entities/notifications/types";

type NotificationItemProps = {
  notification: Notification;
};

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const { title, description, time, isRead, icon } = notification;

  return (
    <>
      <ListItemButton divider={true}>
        <ListItemAvatar className={styles.icon}>
          <Avatar>
            <img src={icon} />
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={title}
          secondary={description}
          className={styles.textSecondary}
        />
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
          }}
        >
          <ListItemText secondary={time} className={styles.textTime} />
          {!!isRead && <Badge color="primary" variant="dot" />}
        </Stack>
      </ListItemButton>
    </>
  );
};

export default NotificationItem;
