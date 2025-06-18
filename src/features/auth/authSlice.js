import { createSlice } from "@reduxjs/toolkit";
import { users } from "./HardcodedUsers";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const signup = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      // Replace with your API call, e.g., axios.post("/api/signup", formData)
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve({ data: formData }), 2000)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      // Replace with your API call, e.g., axios.post("/api/forgot-password", { email })
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve({ data: { message: "Reset link sent" } }), 2000)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to send reset link");
    }
  }
);
// In authSlice extraReducers
extraReducers: (builder) => {
  builder
    .addCase(signup.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false;
    })
    .addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
};
// Safe localStorage getter with error handling
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

// Safe localStorage setter
const setStoredUser = (user) => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Failed to store user data:", error);
  }
};

// Clear all auth-related localStorage items
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

    login: (state, action) => {
      const { username, password } = action.payload;

      if (!username || !password) {
        state.error = "Username and password are required";
        state.isLoading = false;
        return;
      }

      if (username.trim().length < 3) {
        state.error = "Username must be at least 3 characters long";
        state.isLoading = false;
        return;
      }

      if (password.length < 4) {
        state.error = "Password must be at least 4 characters long";
        state.isLoading = false;
        return;
      }

      // Find user
      const foundUser = users.find(
        (u) => u.username.toLowerCase() === username.toLowerCase().trim() && 
               u.password === password
      );

      if (foundUser) {
        const userWithLoginInfo = {
          ...foundUser,
          lastLoginTime: new Date().toISOString(),
          loginCount: (foundUser.loginCount || 0) + 1,
        };

        state.user = userWithLoginInfo;
        state.isAuthenticated = true;
        state.error = null;
        state.isLoading = false;
        state.lastLoginTime = userWithLoginInfo.lastLoginTime;

        setStoredUser(userWithLoginInfo);
      } else {
        state.user = null;
        state.isAuthenticated = false;
        state.error = "Invalid username or password";
        state.isLoading = false;
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

    changePassword: (state, action) => {
      const { currentPassword, newPassword } = action.payload;

      if (!state.user) {
        state.error = "User not authenticated";
        return;
      }

      if (!currentPassword || !newPassword) {
        state.error = "Current password and new password are required";
        return;
      }

      if (state.user.password !== currentPassword) {
        state.error = "Current password is incorrect";
        return;
      }

      if (newPassword.length < 4) {
        state.error = "New password must be at least 4 characters long";
        return;
      }

      if (currentPassword === newPassword) {
        state.error = "New password must be different from current password";
        return;
      }

      const updatedUser = { ...state.user, password: newPassword };
      state.user = updatedUser;
      state.error = null;
      setStoredUser(updatedUser);
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

    // Set user role (if needed)
    setUserRole: (state, action) => {
      if (state.user) {
        const updatedUser = { ...state.user, role: action.payload };
        state.user = updatedUser;
        setStoredUser(updatedUser);
        
        // Also store role separately if needed
        try {
          localStorage.setItem("userRole", action.payload);
        } catch (error) {
          console.error("Failed to store user role:", error);
        }
      }
    },

    // Reset auth state (useful for testing)
    resetAuthState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;
      state.lastLoginTime = null;
      clearAuthStorage();
    },
  },
});

export const {
  setLoading,
  clearError,
  login,
  logout,
  forceLogout,
  updateUserProfile,
  changePassword,
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