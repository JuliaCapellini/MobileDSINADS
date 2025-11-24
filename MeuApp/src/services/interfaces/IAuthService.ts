import { LoginDTO, AuthResponse, RegisterDriverDTO } from '../../types';

export interface IAuthService {
  login(data: LoginDTO): Promise<AuthResponse>;
  register(data: RegisterDriverDTO): Promise<AuthResponse>;
  saveToken(token: string): Promise<void>;
  getToken(): Promise<string | null>;
  saveUser(user: AuthResponse['user']): Promise<void>;
  getUser(): Promise<AuthResponse['user'] | null>;
  logout(): Promise<void>;
}


