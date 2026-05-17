import { useNavigate } from "react-router-dom";
import { IconButton, CircularProgress, Button, Alert } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import { useGetUserQuery } from "../../../entities/user/api/user-api";
import { useStartKycMutation, useGetKycStatusQuery, useUploadDocumentMutation } from "../../../entities/kyc/kyc-api";
import styles from "./EditProfilePage.module.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const MOCK_USER_ID = 1;


const mockUser = {
  avatar: "https://i.pravatar.cc/70?u=1",
  phone: "+8801712663389",
  birthDate: "28 September 2000",
  joinedDate: "28 Jan 2021",
  
};

const EditProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

 
  const { data: user, isLoading: isUserLoading } = useGetUserQuery(MOCK_USER_ID);

  // KYC хуки
  const { data: kycStatus, refetch: refetchKycStatus, error: kycError } = useGetKycStatusQuery(MOCK_USER_ID);
  const [startKyc, { isLoading: isStarting }] = useStartKycMutation();
  const [uploadDocument, { isLoading: isUploading }] = useUploadDocumentMutation();


  const [setSelectedFiles] = useState({
    passport: null,
    utility_bill: null,
    selfie: null,
  });

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

  const handleFileChange = (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFiles(prev => ({ ...prev, [type]: file }));
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


  const isNotFound = kycError && 'status' in kycError && kycError.status === 404;

  return (
    <div className={styles.editProfile}>
      <div className={styles.header}>
        <IconButton
          className={styles.backButton}
          onClick={() => navigate(-1)}
          sx={{ width: 42, height: 42, backgroundColor: "var(--color-item-bg)" }}
        >
          <ArrowBackIosNewOutlinedIcon
            className={styles.icon}
            sx={{ fill: "#1e1e2d", width: 18 }}
          />
        </IconButton>
        <h1 className={styles.title}>{t("editProfile.title")}</h1>
        <div className={styles.placeholder} />
      </div>

      <div className={styles.avatar}>
        <img src={mockUser.avatar} alt={user?.fullName || "User"} />
      </div>

      <div className={styles.info}>
        <h2>{user?.fullName}</h2>
        <p>{user?.role || "Senior Designer"}</p>
      </div>

      <div className={styles.form}>
        {/* Full Name - только чтение */}
        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>{t("editProfile.fullName")}</span>
          <div className={styles.field}>
            <AccountCircleOutlinedIcon className={styles.fieldIcon} />
            <span className={styles.fieldValue}>{user?.fullName}</span>
          </div>
        </div>

        {/* Email - только чтение */}
        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>{t("editProfile.email")}</span>
          <div className={styles.field}>
            <EmailOutlinedIcon className={styles.fieldIcon} />
            <span className={styles.fieldValue}>{user?.email}</span>
          </div>
        </div>

        {/* Phone - мок */}
        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>{t("editProfile.phone")}</span>
          <div className={styles.field}>
            <PhoneIcon className={styles.fieldIcon} />
            <span className={styles.fieldValue}>{mockUser.phone}</span>
          </div>
        </div>

        {/* Birth Date - мок */}
        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>{t("editProfile.birthDate")}</span>
          <div className={`${styles.field} ${styles.fieldDate}`}>
            <span className={styles.datePart}>28</span>
            <span className={styles.dateSpacer}> </span>
            <span className={styles.datePart}>September</span>
            <span className={styles.dateSpacer}> </span>
            <span className={styles.datePart}>2000</span>
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
          {kycStatus?.status === 'PENDING' && (
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
                  onChange={handleFileChange('passport')}
                  disabled={isUploading}
                />
              </div>

              {/* Загрузка счёта за коммунальные услуги */}
              <div className={styles.uploadField}>
                <span className={styles.fieldLabel}>Счёт за коммунальные услуги</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={handleFileChange('utility_bill')}
                  disabled={isUploading}
                />
              </div>

              {/* Загрузка селфи */}
              <div className={styles.uploadField}>
                <span className={styles.fieldLabel}>Селфи с паспортом</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange('selfie')}
                  disabled={isUploading}
                />
              </div>
            </>
          )}

          {/* Если заявка одобрена */}
          {kycStatus?.status === 'APPROVED' && (
            <Alert severity="success" sx={{ mt: 1 }}>
              Верификация успешно пройдена!
            </Alert>
          )}

          {/* Если заявка отклонена */}
          {kycStatus?.status === 'REJECTED' && (
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

      <p className={styles.joined}>
        {t("editProfile.joined", { date: mockUser.joinedDate })}
      </p>
    </div>
  );
};

export default EditProfilePage;