export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phoneNumber?: string;
  addressInfo?: {
    streetAddress?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}
