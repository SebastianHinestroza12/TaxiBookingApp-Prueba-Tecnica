export interface User {
  id: number;
  name: string;
  password: string;
  email: string;
  age: number;
  phoneNumber: string;
}

export interface AuthState {
  users: User[];
  authenticated: boolean;
}
