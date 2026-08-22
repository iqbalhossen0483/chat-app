import { useAppDispatch, useAppSelector } from "@/store";
import { toggleTheme } from "@/store/slice/themeSlice";
import { Sun } from "lucide-react";
import Switch from "./Switch";

const ThemeButton = () => {
  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-surface/80">
      <div className="flex items-center gap-3">
        <Sun className="w-4 h-4 text-primary" />
        <span>Theme</span>
      </div>
      <Switch checked={theme === "dark"} onChange={handleThemeToggle} />
    </div>
  );
};

export default ThemeButton;
