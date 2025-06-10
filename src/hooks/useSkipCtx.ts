import { useContext } from "react";
import { SkipPageCtx } from "../ctx/SkipPageCtxProvider";

export const useSkipPageCtx = () => {
  const ctx = useContext(SkipPageCtx);
  if (ctx === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
};
