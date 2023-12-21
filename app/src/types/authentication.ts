export interface Company {
  id: number | null;
  name: string | null;
}

export interface Token {
  access: string | undefined | null;
  refresh: string | undefined | null;
}

export interface UserReadSerializer {
  username: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  profile_picture: string | null;
  companies: Company[];
  pk: string | null;
}

interface User extends UserReadSerializer {
  id: string | null;
}

export interface AuthState {
  status: 'IDLE' | 'LOADING' | 'AUTHENTICATED' | 'FAILED';
  isAuthenticated: boolean;
  user: User;
  token: Token;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface AccessToken {
  access: string | undefined;
}

export interface RefreshToken {
  refresh: string | undefined;
}

export interface GoogleCode {
  code: string;
}
