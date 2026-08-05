import { useCreateUserMutation } from "@/entities/user/api/user-api";
import AuthPage from "@/widgets/auth-page/AuthPage.tsx";

const SignUpPage = () => {
  const obj = useCreateUserMutation();
  console.log(obj);

  // if (isLoading) {
  //   return <div>Загрузка истории транзакций...</div>;
  // }

  // if (error) {
  //   return <div>Не удалось загрузить транзакции</div>;
  // }
  return (
    <div>
      <AuthPage />
    </div>
  );
};

export default SignUpPage;
