import {
  CheckAuthSuccessfulResponse,
  LoginSuccessfulResponse,
  LoginUserData,
  LogoutResponse,
  RegisterSuccessfulResponse,
  RegisterUserData,
} from 'types/user.types';
import { $authHost, $host } from 'http/index';

export const loginRequest = async (userData: LoginUserData) => {
  const { data } = await $host.post<LoginSuccessfulResponse>('login', userData);

  return data;
};

export const registerRequest = async (userData: RegisterUserData) => {
  const { data } = await $host.post<RegisterSuccessfulResponse>('register', userData);

  return data;
};

export const checkAuthRequest = async () => {
  const { data } = await $authHost.get<CheckAuthSuccessfulResponse>(
    'http://localhost:4000/users/me',
  );

  return data.result;
};

export const logoutRequest = async () => {
  return $authHost.delete<LogoutResponse>('logout');
};
