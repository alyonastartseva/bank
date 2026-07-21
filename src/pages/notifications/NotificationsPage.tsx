import { Container } from "@mui/material";
import style from "./NotificationsPage.module.css";
import NotificationsList from "@/widgets/notifications-list/NotificationsList";
import NotificationsTabs from "@/widgets/notifications-tabs/NotificationsTabs";

const NotificationsPage = () => {
  return (
    <>
      <Container className={style.container}>
        <NotificationsTabs />
        <NotificationsList />
      </Container>
    </>
  );
};

export default NotificationsPage;
