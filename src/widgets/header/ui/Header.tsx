import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import styles from "./Header.module.css";
import goBackIcon from "@/shared/icons/go-back.svg";
import { headerConfig } from "./constants.ts";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { Stack } from "@mui/material";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const path = location.pathname.replace(/\/$/, "");
  const config = headerConfig[path] || {
    titleKey: "common.title",
    rightIcon: null,
  };

  const handleRightClick = () => {
    if (config.rightAction) {
      config.rightAction();
    } else if (location.pathname === "/my-cards") {
      navigate("/add-new-card");
    }
  };

  return (
    <header className={styles.header}>
      {isMobile ? (
        <>
          <div className={styles.left}>
            <button className={styles.iconButton} onClick={() => navigate(-1)}>
              <img src={goBackIcon} className={styles.icon} alt="back" />
            </button>
          </div>
          <h1 className={styles.title}>{t(config.titleKey)}</h1>
          <div className={styles.right}>
            {config.rightIcon && (
              <button className={styles.iconButton} onClick={handleRightClick}>
                <img src={config.rightIcon} className={styles.icon} alt="action" />
              </button>
            )}
          </div>
        </>
      ) : (
        <Box className={styles.desktopHeader}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
            }}
          >
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIosOutlinedIcon />
            </IconButton>
            <Typography variant="h6" fontWeight={600} color="textPrimary">
              {t(config.titleKey)}
            </Typography>
          </Stack>
          <Box className={styles.actions}>
            <IconButton onClick={() => navigate("/profile")}>
              <PersonOutlineIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={() => navigate("/notifications")}>
              <NotificationsNoneIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      )}
    </header>
  );
}
