import { createSlice } from "@reduxjs/toolkit";

export type ThemeState = {
  theme: "light" | "dark";
};

const initialState: ThemeState = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      const checked = state.theme === "dark";
      document.documentElement.classList.toggle("dark", checked);
      localStorage.setItem("theme", checked ? "dark" : "light");
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      document.documentElement.classList.toggle(
        "dark",
        action.payload === "dark",
      );
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
