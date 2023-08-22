import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  error: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem("user");
    },
    registerStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
} = authSlice.actions;

export const login = (email, password, navigate) => async (dispatch) => {
  dispatch(loginStart());
  try {
   await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      }).then((response) => {
      console.log(response.data);
      const user = {
        token: response.data.accesstoken,
        name: response.data.name,
      };
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(loginSuccess(user));
      if (response.data.success) {
        navigate("/");
      } else {
        dispatch(loginFailure("Incorrect email or password"));
      }
    });
  } catch (error) {
    console.error("Error logging in:", error);
    dispatch(loginFailure("An error occurred while logging in."));
  }
};

export const register =
  (name, email, password, password_confirmation, navigate) =>
  async (dispatch) => {
    try {
      dispatch(registerStart());
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
        password_confirmation,
      });
      const user = {
        token: response.data.accesstoken,
        name: response.data.name,
      };
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(registerSuccess(user));
      if (response.data) {
        navigate("/");
      } else {
        dispatch(registerFailure("Incorrect email or password"));
      }
    } catch (error) {
      console.error("Error registering user:", error);
      dispatch(
        registerFailure(
          "An error occurred while registering your account. Please try again later."
        )
      );
    }
  };

export default authSlice.reducer;
