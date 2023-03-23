import { useEffect, useState } from "react";

export function useAuth() {
  const [token, setToken] = useState(window.localStorage.getItem("token") || "")
  useEffect(() => {
    window.localStorage.setItem("token", token);
  }, [token]);
  return { token, setToken };
}