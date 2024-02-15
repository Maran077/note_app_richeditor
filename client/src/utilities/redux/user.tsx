import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isUserLogin: boolean;
  userProfile: {
    name: string;
    profile: string;
  };
}

const initialState: UserState = {
  isUserLogin: false,
  userProfile: {
    name: "",
    profile: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInRedux: (
      state,
      action: PayloadAction<{
        isUserLogin: boolean;
        name: string;
        profile: string;
      }>,
    ) => {
      return {
        isUserLogin: action.payload.isUserLogin,
        userProfile: {
          name: action.payload.name,
          profile: action.payload.profile,
        },
      };
    },
  },
});

export const { setUserInRedux } = userSlice.actions;
