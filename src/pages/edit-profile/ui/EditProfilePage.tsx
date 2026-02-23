import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import "./EditProfilePage.scss";

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
    <div className="edit-profile">
      <div className="edit-profile__header">
        <IconButton
          className="edit-profile__back"
          onClick={() => navigate(-1)}
          sx={{ width: 42, height: 42, bgcolor: "#f5f5f5" }}
        >
          <ArrowBackIosNewOutlinedIcon />
        </IconButton>
        <h1 className="edit-profile__title">Edit Profile</h1>
        <div className="edit-profile__placeholder" />
      </div>

      <div className="edit-profile__avatar">
        <img src={mockUser.avatar} alt={mockUser.fullName} />
      </div>

      <div className="edit-profile__info">
        <h2>{mockUser.fullName}</h2>
        <p>{mockUser.role}</p>
      </div>

      <div className="edit-profile__form">
        {/* Full Name */}
        <div className="edit-profile__field-group">
          <span className="edit-profile__field-label">Full Name</span>
          <div className="edit-profile__field">
            <AccountCircleOutlinedIcon className="edit-profile__field-icon" />
            <span className="edit-profile__field-value">{mockUser.fullName}</span>
          </div>
        </div>

        {/* Email */}
        <div className="edit-profile__field-group">
          <span className="edit-profile__field-label">Email Address</span>
          <div className="edit-profile__field">
            <EmailOutlinedIcon className="edit-profile__field-icon" />
            <span className="edit-profile__field-value">{mockUser.email}</span>
          </div>
        </div>

        {/* Phone */}
        <div className="edit-profile__field-group">
          <span className="edit-profile__field-label">Phone Number</span>
          <div className="edit-profile__field">
            <PhoneIcon className="edit-profile__field-icon" />
            <span className="edit-profile__field-value">{mockUser.phone}</span>
          </div>
        </div>

        {/* Birth Date */}
        <div className="edit-profile__field-group">
          <span className="edit-profile__field-label">Birth Date</span>
          <div className="edit-profile__field edit-profile__field--date">
            <span className="edit-profile__date-part">28</span>
            <span className="edit-profile__date-spacer"> </span>
            <span className="edit-profile__date-part">September</span>
            <span className="edit-profile__date-spacer"> </span>
            <span className="edit-profile__date-part">2000</span>
          </div>
        </div>
      </div>

      <p className="edit-profile__joined">Joined {mockUser.joinedDate}</p>
    </div>
  );
};

export default EditProfilePage;
