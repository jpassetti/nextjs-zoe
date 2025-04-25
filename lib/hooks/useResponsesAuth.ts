import { useState, useEffect } from "react";

const RESPONSES_PASSWORD = process.env.NEXT_PUBLIC_RESPONSES_PASSWORD;

export function useResponsesAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAuthenticated(localStorage.getItem("responsesAuthenticated") === "true");
    }
  }, []);

  const checkPassword = () => {
    if (enteredPassword === RESPONSES_PASSWORD) {
      localStorage.setItem("responsesAuthenticated", "true");
      setAuthenticated(true);
      setError(null);
    } else {
      setError("Incorrect password.");
    }
  };

  const logout = () => {
    localStorage.removeItem("responsesAuthenticated");
    setAuthenticated(false);
    setEnteredPassword("");
  };

  return {
    authenticated,
    enteredPassword,
    setEnteredPassword,
    error,
    checkPassword,
    logout,
  };
}