import {
  Avatar,
  Box,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import {
  AccountBalanceWalletOutlined,
  ChevronRightOutlined,
  NotificationsOutlined,
  SecurityOutlined,
  ShieldOutlined,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import styles from "./CardSetting.module.scss";
import type IMenuItem from "@/widgets/CardSettings/model/MenuItem.ts";
import { useNavigate } from "react-router-dom";

const CardSettings = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const { mode: themeMode } = theme.palette;

  const menuList: IMenuItem[] = [
    {
      icon: <AccountBalanceWalletOutlined />,
      primary: t("cardSettings.cardManagement.primary"),
      secondary: t("cardSettings.cardManagement.secondary"),
      onClick: () => {
        navigate("/");
      },
    },
    {
      icon: <ShieldOutlined />,
      primary: t("cardSettings.changePIN.primary"),
      secondary: t("cardSettings.changePIN.secondary"),
      onClick: () => {
        navigate("/");
      },
    },
    {
      icon: <SecurityOutlined />,
      primary: t("cardSettings.security.primary"),
      secondary: t("cardSettings.security.secondary"),
      onClick: () => {
        navigate("/");
      },
    },
    {
      icon: <NotificationsOutlined />,
      primary: t("cardSettings.notifications.primary"),
      secondary: t("cardSettings.notifications.secondary"),
      onClick: () => {
        navigate("/");
      },
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        className={styles.title}
        sx={{ p: { xs: "6px 10px", md: "12px 32px" } }}
      >
        {t("cardSettings.title")}
      </Typography>
      <List className={styles.list}>
        {/* index isn't advised as a key, but it's static, so I think it's ok */}
        {menuList.map((item, index) => (
          <>
            <ListItemButton
              sx={{ p: { xs: "6px 20px", md: "6px 32px" } }}
              key={index}
              onClick={item.onClick}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor:
                      themeMode === "dark"
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(0, 0, 0, 0.06)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {item.icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.primary}
                primaryTypographyProps={{
                  sx: { fontSize: "var(--font-sm)" },
                }}

                secondary={item.secondary}
                secondaryTypographyProps={{
                  sx: {
                    color: "var(--color-text-muted)",
                    display: { xs: "none", md: "block" },
                    fontSize: "var(--font-xs)",
                  },
                }}
              />
              <ChevronRightOutlined />
            </ListItemButton>
            {index !== menuList.length - 1 && <Divider />}
          </>
        ))}
      </List>
    </Box>
  );
};

export default CardSettings;
