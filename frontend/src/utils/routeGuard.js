import { redirect } from "react-router-dom";
import { isLoggedIn } from "./auth.js";

export const routeLoader = ({ onLoggedIn, noLoggedIn }) => {
  if (isLoggedIn() && onLoggedIn.redirectTo) {
    alert(onLoggedIn.message);
    return redirect(onLoggedIn.redirectTo);
  } else if (!isLoggedIn() && noLoggedIn.redirectTo) {
    alert(noLoggedIn.message);
    return redirect(noLoggedIn.redirectTo);
  }

  return null;
};
