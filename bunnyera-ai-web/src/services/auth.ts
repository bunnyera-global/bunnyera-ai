// API base url
const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:3001";

console.log("🔗 Auth Service connecting to:", API_BASE_URL);

export interface User {
  id: number;
  email?: string;
  phone?: string;
  points: number;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
  prompt?: string;
}

export const authService = {
  async registerEmail(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Registration failed");
    }

    return response.json();
  },

  async loginEmail(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Login failed");
    }

    return response.json();
  },
};
