export interface Company {
  id: number | null;
  name: string | null;
}
export interface AuthState {
  status: "IDLE" | "LOADING" | "AUTHENTICATED" | "FAILED";
  isAuthenticated: boolean;
  user: {
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    profile_picture: string | null;
    companies: Company[];
  };
}
export interface UserReadSerializer {
  username: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  profile_picture: string | null;
  companies: Company[];
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

export interface Token {
  access: string | undefined;
  refresh: string | undefined;
}

export interface GoogleCode {
  code: string;
}
