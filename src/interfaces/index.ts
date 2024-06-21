export interface User {
  id: number;
  name: string;
  lastName: string;
  password: string;
  email: string;
  age: number;
  phoneNumber: string;
}

export interface AuthState {
  users: User[];
  authenticatedUser: null | number;
}
