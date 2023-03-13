export interface IUser {
  email: string;
  name: string;
  role: string;
}

export interface UserState {
  isAuth: boolean;
  user: IUser | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  errorMessages: string | undefined;
  successRegistrationMessage: string;
  role: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

export interface LoginSuccessfulResponse {
  successful: boolean;
  result: string;
  user: IUser;
}

export interface RegisterSuccessfulResponse {
  successful: boolean;
  result: string;
}

export interface CheckAuthSuccessfulResponse {
  successful: boolean;
  result: IUser;
}

export interface LogoutResponse {
  successful: boolean;
}
