import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  [key: string]: any;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>) => {
      const { user, accessToken, refreshToken } = action.payload;

      state.user = user;
      state.token = accessToken;
      state.refreshToken = refreshToken;

      if (typeof window !== "undefined") {
        if (accessToken) localStorage.setItem("token", accessToken);
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
        if (user) localStorage.setItem("user", JSON.stringify(user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

