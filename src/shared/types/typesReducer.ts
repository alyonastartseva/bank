export interface User {
  id: number | "";
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface UserBackEnd extends User {
  password: string;
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
