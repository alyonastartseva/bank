import { CircularProgress, Button, Alert } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import EventIcon from "@mui/icons-material/Event";
import { useGetUserQuery } from "../../../entities/user/api/user-api";
import {
  useStartKycMutation,
  useGetKycStatusQuery,
  useUploadDocumentMutation,
} from "../../../entities/kyc/kyc-api";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { InputField } from "@/shared/ui/Input/InputField";
import { DateSelect } from "@/shared/ui/DatePicker/DateSelect";
import styles from "./EditProfilePage.module.css";

const MOCK_USER_ID = 1;

const mockUser = {
  avatar: "https://i.pravatar.cc/70?u=1",
  phone: "+8801712663389",
  birthDate: "28 Сентября 2000",
  joinedDate: "28 Jan 2021",
}

const EditProfilePage = () => {
  const { t } = useTranslation();

  const { data: user, isLoading: isUserLoading } = useGetUserQuery(MOCK_USER_ID);

  // KYC хуки
  const {
    data: kycStatus,
    refetch: refetchKycStatus,
    error: kycError,
  } = useGetKycStatusQuery(MOCK_USER_ID);
  const [startKyc, { isLoading: isStarting }] = useStartKycMutation();
  const [uploadDocument, { isLoading: isUploading }] = useUploadDocumentMutation();

  const [, setSelectedFiles] = useState({
    passport: null,
    utility_bill: null,
    selfie: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    birthDate: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        email: user.email,
        phone: mockUser.phone,
        birthDate: mockUser.birthDate
     });
    }
  }, [user]);

  const handleChange = (field: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCancel = () => {
  if (user) {
    setFormData({
      fullName: user.fullName,
      email: user.email,
      phone: mockUser.phone,
      birthDate: mockUser.birthDate,
    });
  }

  setIsEditing(false);
};

  const handleStartKyc = async () => {
    try {
      await startKyc(MOCK_USER_ID).unwrap();
      refetchKycStatus();
    } catch (err) {
      console.error("Ошибка при старте KYC:", err);
    }
  };

  const handleFileUpload = async (type: string, file: File | null) => {
    if (!file) return;
    try {
      await uploadDocument({ userId: MOCK_USER_ID, type, file }).unwrap();
      refetchKycStatus();
      alert(`Документ ${type} успешно загружен`);
    } catch (err) {
      console.error(`Ошибка при загрузке ${type}:`, err);
      alert(`Ошибка при загрузке ${type}`);
    }
  };

  const handleFileChange =
    (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      setSelectedFiles((prev) => ({ ...prev, [type]: file }));
      if (file) {
        handleFileUpload(type, file);
      }
    };

  if (isUserLoading) {
    return (
      <div className={styles.loader}>
        <CircularProgress />
      </div>
    );
  }

  const isNotFound = kycError && "status" in kycError && kycError.status === 404;

  return (
    <div className={styles.editProfile}>
      <div className={styles.desktopSection}>
        <div className={styles.desktopLayout}>
          <div className={styles.desktopLeft}>
            <div className={styles.avatar}>
              <img src={mockUser.avatar} alt={formData.fullName || "User"} />
            </div>

            <div className={styles.info}>
              <h2>{formData.fullName}</h2>
              <p>{user?.role || "Senior Designer"}</p>
            </div>
            <p className={styles.joined}>
              {t("editProfile.joined", { date: mockUser.joinedDate })}
            </p>
          </div>
          <div className={styles.desktopRight}>
            <div className={styles.form}>
              {/* Full Name - чтение и редактирование */}
              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>{t("editProfile.fullName")}</span>
                <div className={styles.field}>
                  <AccountCircleOutlinedIcon className={`${!isEditing ? styles.fieldIcon : styles.editIcon}`} />
                  <InputField
                    value={formData.fullName}
                    onChange={handleChange("fullName")}
                    readOnly={!isEditing}
                    sx={{width: "100%"}}
                  />
                </div>
              </div>

              {/* Email - чтение и редактирование  */}
              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>{t("editProfile.email")}</span>
                <div className={styles.field}>
                  <EmailOutlinedIcon className={`${!isEditing ? styles.fieldIcon : styles.editIcon}`} />
                  <InputField
                    value={formData.email}
                    onChange={handleChange("email")}
                    readOnly={!isEditing}
                    sx={{width: "100%"}}
                  />
                </div>
              </div>

              {/* Phone - мок, чтение и редактирование  */}
              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>{t("editProfile.phone")}</span>
                <div className={styles.field}>
                  <PhoneIcon className={`${!isEditing ? styles.fieldIcon : styles.editIcon}`} />
                   <InputField
                    value={formData.phone}
                    onChange={handleChange("phone")}
                    readOnly={!isEditing}
                    sx={{width: "100%"}}
                  />
                </div>
              </div>

              {/* Birth Date - мок, чтение и редактирование  */}
              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>{t("editProfile.birthDate")}</span>
                <div className={`${styles.field} ${styles.fieldDate}`}>
                  <EventIcon className={`${!isEditing ? styles.fieldIcon : styles.editIcon}`} />
                  <DateSelect
                    value={formData.birthDate}
                    onChange={handleChange("birthDate")}
                    readOnly={!isEditing}
                  />

                </div>
              </div>

              {/* ========== KYC БЛОК ========== */}
              <div className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>Верификация личности (KYC)</span>

                {/* Если заявки нет */}
                {isNotFound && (
                  <Button
                    variant="contained"
                    onClick={handleStartKyc}
                    disabled={isStarting}
                    sx={{ mt: 1 }}
                  >
                    {isStarting ? "Загрузка..." : "Начать верификацию"}
                  </Button>
                )}

                {/* Если заявка в процессе */}
                {kycStatus?.status === "PENDING" && (
                  <>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      Заявка на рассмотрении. Пожалуйста, загрузите документы.
                    </Alert>

                    {/* Загрузка паспорта */}
                    <div className={styles.uploadField}>
                      <span className={styles.fieldLabel}>Паспорт</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,application/pdf"
                        onChange={handleFileChange("passport")}
                        disabled={isUploading}
                      />
                    </div>

                    {/* Загрузка счёта за коммунальные услуги */}
                    <div className={styles.uploadField}>
                      <span className={styles.fieldLabel}>
                        Счёт за коммунальные услуги
                      </span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,application/pdf"
                        onChange={handleFileChange("utility_bill")}
                        disabled={isUploading}
                      />
                    </div>

                    {/* Загрузка селфи */}
                    <div className={styles.uploadField}>
                      <span className={styles.fieldLabel}>Селфи с паспортом</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={handleFileChange("selfie")}
                        disabled={isUploading}
                      />
                    </div>
                  </>
                )}

                {/* Если заявка одобрена */}
                {kycStatus?.status === "APPROVED" && (
                  <Alert severity="success" sx={{ mt: 1 }}>
                    Верификация успешно пройдена!
                  </Alert>
                )}

                {/* Если заявка отклонена */}
                {kycStatus?.status === "REJECTED" && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    Верификация отклонена. Повторите попытку.
                    <Button
                      variant="outlined"
                      onClick={handleStartKyc}
                      disabled={isStarting}
                      sx={{ ml: 2 }}
                    >
                      Повторить
                    </Button>
                  </Alert>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.desktopButtons}>
        {!isEditing ? (
          <Button variant="contained" onClick={() => setIsEditing(true)}>
            {t("editProfile.edit")}
          </Button>
        ) : (
          <>
            <Button variant="outlined" onClick={handleCancel}>
              {t("editProfile.cancel")}
            </Button>
            <Button variant="contained" onClick={() => setIsEditing(false)}>{t("editProfile.saveChanges")}</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProfilePage;
