import { addUser } from "@/app/store/slices/bankSlice";
import { useCreateUserMutation } from "@/entities/user/api/user-api";
import { useAppDispatch } from "@/shared/hooks/hooksReducer";
import type { User } from "@/shared/types/typesReducer";
import AuthPage from "@/widgets/auth-page/AuthPage.tsx";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";
import type { SerializedError } from "vitest";

const SignUpPage = () => {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignUp = async (data: User) => {
    try {
      const response = await createUser(data).unwrap();
      dispatch(
        addUser({
          id: response.userId,
          fullName: response.fullName,
          email: response.email,
          password: data.password,
          phoneNumber: data.phoneNumber,
        })
      );
      navigate(-1);
    } catch (error) {
      const err = error as FetchBaseQueryError | SerializedError;

      if ("status" in err) {
        console.log("Ошибка сервера, статус:", err.status, err.data);
      } else {
        console.log("Ошибка отправки:", err.message);
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
