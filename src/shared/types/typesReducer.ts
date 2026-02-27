export interface User {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface Transaction {
  id: string;
  icon: string;
  name: string;
  category: string;
  price: string;
}

export interface UserState {
  user: User;
  token: string;
  showPassword: boolean;
  isAuth: boolean;
  transactions: Transaction[];
}
