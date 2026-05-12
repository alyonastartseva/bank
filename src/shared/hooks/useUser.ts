import { useAppSelector } from "./hooksReducer";

export const useUser = () => {
  const user = useAppSelector((state) => state.bank.user);

  return {
    fullName: user?.fullName || "Guest",
    email: user?.email,
    phoneNumber: user?.phoneNumber,
  };
};
