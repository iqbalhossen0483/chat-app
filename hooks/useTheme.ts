import { useAppDispatch } from "@/store";
import { setTheme } from "@/store/slice/themeSlice";
import { useEffect } from "react";

export function useTheme() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    const isDarkMode = currentTheme === "dark";
    document.documentElement.classList.toggle("dark", isDarkMode);
    dispatch(setTheme(currentTheme));
  }, [dispatch]);
}
