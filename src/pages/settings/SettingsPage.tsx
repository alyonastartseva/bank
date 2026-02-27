import { Link, useNavigate } from "react-router-dom";
import styles from "./SettingsPage.module.css";
import goBackIcon from "@/shared/icons/go-back.svg";
import logoutIcon from "@/shared/icons/out.svg";

const SettingsPage = () => {
  const handleLanguageClick = () => {
    console.log("Language clicked");
  };

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.iconButton} onClick={() => navigate(-1)}>
          <img src={goBackIcon} alt="Go back" />
        </button>
        <h1 className={styles.title}>Settings</h1>
        <button className={styles.iconButton}>
          <img src={logoutIcon} alt="Logout" />
        </button>
      </header>

      <div className={styles.wrapper}>
        <section className={styles.block}>
          <p className={styles.sectionTitle}>General</p>

          <Link to="#" onClick={handleLanguageClick} className={styles.row}>
            <span>Language</span>
            <span className={styles.value}>English</span>
          </Link>

          <Link to="/profile" className={styles.row}>
            <span>My Profile</span>
          </Link>

          <Link to="/contact-us" className={styles.row}>
            <span>Contact Us</span>
          </Link>
        </section>

        <section className={styles.block}>
          <p className={styles.sectionTitle}>Security</p>

          <Link to="/change-password" className={styles.row}>
            <span>Change Password</span>
          </Link>

          <Link to="/privacy-policy" className={styles.row}>
            <span>Privacy Policy</span>
          </Link>

          <p className={styles.helperText}>Choose what data you share with us</p>

          <div className={styles.row}>
            <span>Biometric</span>
            <label className={styles.switch}>
              <input type="checkbox" />
              <span className={styles.slider} />
            </label>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
