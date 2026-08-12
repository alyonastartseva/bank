import { useAppDispatch } from "@/shared/hooks/hooksReducer.ts";
import { addUser, addToken, changeAuthStatus } from "@/app/store/slices/bankSlice.ts";
import type { User } from "@/shared/types/typesReducer.ts";
import { useNavigate } from "react-router-dom";

const useAuth = (login: User) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signIn = () => {
    const token = Math.random().toString(36).substring(2);

    dispatch(addUser(login));
    dispatch(addToken(token));
    dispatch(changeAuthStatus());

    navigate("/home");
  };

  return { signIn };
};

export default useAuth;
