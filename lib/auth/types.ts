export type AuthUser = {
  id: string;
  email: string;
  createdAt: string;
};

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: AuthUser;
};

export type AuthState = {
  user: AuthUser | null;
  session: AuthSession | null;
  signedIn: boolean;
};

export type SignInInput = {
  email: string;
  password: string;
};

export type SignUpInput = SignInInput & {
  passwordConfirm?: string;
};

export type AuthResult = {
  session: AuthSession | null;
  user: AuthUser | null;
  message?: string;
};
