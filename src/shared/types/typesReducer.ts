export interface User {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
}



export interface UserState {
    user: User;
    token: string;
}

