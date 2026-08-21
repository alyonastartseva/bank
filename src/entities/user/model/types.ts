// Из account-service
export interface Registration {
  userId: number;
  email: string;
  fullName: string;
  registeredAt: string;
  message: string;
}
export interface CreateRegistrationRequest {
  fullName: string;
  email: string;
  password: string;
}
export interface User {
  id: number;
  fullName: string;
  email: string;
  role: "USER" | "ADMIN";
}

export interface MockUserData {
  avatar: string;
  phone: string;
  birthDate: string;
  joinedDate: string;
}

export interface UserProfile extends User {
  avatar: string;
  phone: string;
  birthDate: string;
  joinedDate: string;
}
