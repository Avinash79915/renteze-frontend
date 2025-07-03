import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// REMOVE THIS: import { users } from "./HardcodedUsers";

// Signup thunk (keep only if your backend supports custom signup; otherwise you can remove)
export const signup = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      // Replace with your real signup API call
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve({ data: formData }), 2000)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// Forgot password thunk (keep only if your backend supports password reset)
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      // Replace with your real forgot password API call
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve({ data: { message: "Reset link sent" } }), 2000)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to send reset link");
    }
  }
);

// Safe localStorage helpers
const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to parse stored user data:", error);
    localStorage.removeItem("user");
    return null;
  }
};

const setStoredUser = (user) => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Failed to store user data:", error);
  }
};

const clearAuthStorage = () => {
  try {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("refreshToken");
  } catch (error) {
    console.error("Failed to clear auth storage:", error);
  }
};

const storedUser = getStoredUser();

const initialState = {
  user: storedUser,
  isAuthenticated: !!storedUser,
  error: null,
  isLoading: false,
  lastLoginTime: storedUser?.lastLoginTime || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    // NEW reducer: store Auth0 user info
    setAuth0User: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.error = null;
      state.isLoading = false;
      state.lastLoginTime = action.payload ? new Date().toISOString() : null;

      if (action.payload) {
        setStoredUser(action.payload);
      } else {
        clearAuthStorage();
      }
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;
      state.lastLoginTime = null;
      clearAuthStorage();
    },

    forceLogout: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload?.reason || "Session expired";
      state.isLoading = false;
      state.lastLoginTime = null;
      clearAuthStorage();
    },

    updateUserProfile: (state, action) => {
      if (state.user) {
        const updatedUser = { ...state.user, ...action.payload };
        state.user = updatedUser;
        setStoredUser(updatedUser);
      }
    },

    refreshUserData: (state) => {
      const storedUser = getStoredUser();
      if (storedUser) {
        state.user = storedUser;
        state.isAuthenticated = true;
        state.lastLoginTime = storedUser.lastLoginTime;
      } else {
        state.user = null;
        state.isAuthenticated = false;
        state.lastLoginTime = null;
      }
    },

    setUserRole: (state, action) => {
      if (state.user) {
        const updatedUser = { ...state.user, role: action.payload };
        state.user = updatedUser;
        setStoredUser(updatedUser);

        try {
          localStorage.setItem("userRole", action.payload);
        } catch (error) {
          console.error("Failed to store user role:", error);
        }
      }
    },

    resetAuthState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;
      state.lastLoginTime = null;
      clearAuthStorage();
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setLoading,
  clearError,
  setAuth0User,
  logout,
  forceLogout,
  updateUserProfile,
  refreshUserData,
  setUserRole,
  resetAuthState,
} = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectUserRole = (state) => state.auth.user?.role;
export const selectLastLoginTime = (state) => state.auth.lastLoginTime;

export default authSlice.reducer;
