import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import styles from "./EditProfilePage.module.scss";

const mockUser = {
  fullName: "Tanya Myroniuk",
  role: "Senior Designer",
  email: "tanya.myroniuk@gmail.com",
  phone: "+8801712663389",
  birthDate: "28 September 2000",
  joinedDate: "28 Jan 2021",
  avatar: "https://i.pravatar.cc/70?u=1",
};

const EditProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.editProfile}>
      <div className={styles.header}>
        <IconButton
          className={styles.backButton}
          onClick={() => navigate(-1)}
          sx={{ width: 42, height: 42, bgcolor: "#f5f5f5" }}
        >
          <ArrowBackIosNewOutlinedIcon />
        </IconButton>
        <h1 className={styles.title}>Edit Profile</h1>
        <div className={styles.placeholder} />
      </div>

      <div className={styles.avatar}>
        <img src={mockUser.avatar} alt={mockUser.fullName} />
      </div>

      <div className={styles.info}>
        <h2>{mockUser.fullName}</h2>
        <p>{mockUser.role}</p>
      </div>

      <div className={styles.form}>
        {/* Full Name */}
        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>Full Name</span>
          <div className={styles.field}>
            <AccountCircleOutlinedIcon className={styles.fieldIcon} />
            <span className={styles.fieldValue}>{mockUser.fullName}</span>
          </div>
        </div>

        {/* Email */}
        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>Email Address</span>
          <div className={styles.field}>
            <EmailOutlinedIcon className={styles.fieldIcon} />
            <span className={styles.fieldValue}>{mockUser.email}</span>
          </div>
        </div>

        {/* Phone */}
        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>Phone Number</span>
          <div className={styles.field}>
            <PhoneIcon className={styles.fieldIcon} />
            <span className={styles.fieldValue}>{mockUser.phone}</span>
          </div>
        </div>

        {/* Birth Date */}
        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>Birth Date</span>
          <div className={`${styles.field} ${styles.fieldDate}`}>
            <span className={styles.datePart}>28</span>
            <span className={styles.dateSpacer}> </span>
            <span className={styles.datePart}>September</span>
            <span className={styles.dateSpacer}> </span>
            <span className={styles.datePart}>2000</span>
          </div>
        </div>
      </div>

      <p className={styles.joined}>Joined {mockUser.joinedDate}</p>
    </div>
  );
};

export default EditProfilePage;
