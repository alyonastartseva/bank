import { addUser } from "@/entities/slices/bankSlice";
import { useCreateUserMutation } from "@/entities/user/api/user-api";
import { useAppDispatch } from "@/shared/hooks/hooksReducer";
import type { UserBackEnd } from "@/shared/types/typesReducer";
import AuthPage from "@/widgets/auth-page/AuthPage.tsx";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";
import type { SerializedError } from "vitest";
import { mapServerError } from "@/features/errors/map-server-error";
import { mapGenericError } from "@/features/errors/map-generic-error";
import { showToast } from "@/entities/slices/toastSlice";

const SignUpPage = () => {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignUp = async (data: UserBackEnd) => {
    try {
      const response = await createUser(data).unwrap();
      dispatch(
        addUser({
          id: response.userId,
          fullName: response.fullName,
          email: response.email,
          phoneNumber: data.phoneNumber,
        })
      );
      navigate(-1);
    } catch (error) {
      const err = error as FetchBaseQueryError | SerializedError;

      let toastMessage;

      if ("status" in err) {
        const serverError = err as FetchBaseQueryError;
        toastMessage = mapServerError(serverError, navigate);
      } else {
        console.log("Ошибка отправки:", err.message);
        toastMessage = mapGenericError(err);
      }

      if (toastMessage) {
        dispatch(showToast(toastMessage));
      }
    }
  };
  return (
    <div>
      <AuthPage onSubmit={handleSignUp} isLoading={isLoading} />
    </div>
  );
};

export default SignUpPage;
