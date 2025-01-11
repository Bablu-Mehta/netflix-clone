import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      const { email, password } = action.payload;

      // Hardcoded authentication logic
      if (email === "admin@gmail.com" && password === "admin@123") {
        state.isAuthenticated = true;
        state.email = email;

        // Save to localStorage
        localStorage.setItem("auth", JSON.stringify({ email, isAuthenticated: true }));
      } else {
        alert("Invalid email or password");
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.email = null;

      // Clear from localStorage
      localStorage.removeItem("auth");
    },
    loadFromStorage(state) {
      const savedAuth = localStorage.getItem("auth");
      if (savedAuth) {
        const parsedAuth = JSON.parse(savedAuth);
        state.isAuthenticated = parsedAuth.isAuthenticated || false;
        state.email = parsedAuth.email || null;
      }
    },
  },
});

export const { login, logout, loadFromStorage } = authSlice.actions;
export default authSlice.reducer;
