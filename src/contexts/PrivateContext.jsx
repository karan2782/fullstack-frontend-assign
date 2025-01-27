import { createContext, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Private = createContext();

export default function PrivateContext({ children }) {
  const navigate = useNavigate();

  if (!localStorage.getItem("token")) {
    window.location.href = "/login";
    alert("You need to login first!");
    return;
  }

  

  useEffect(() => {
    const checkToken = () => {
      if (!localStorage.getItem("token")) {
        alert("You need to login");
        navigate("/login");
        return;
      }
      const token = localStorage.getItem("token");
      if (token) {
        if (!jwtDecode(token)) {
          alert(`Invalid Token, Please login again!`);
          navigate("/login");
          return;
        }

        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          alert(`Your token expired , Please login again`);
          return;
        }
      }
    };

    checkToken();

    let timeId;
    timeId = setInterval(() => {
      checkToken();
      console.log("checking");
    }, 5000);

    return () => {
      clearInterval(timeId);
    };
  }, []);

  return <Private.Provider>{children}</Private.Provider>;
}

export function usePrivateContext() {
  const context = useContext(Private);
  if (!context) {
    throw new Error(
      "You are using private content outside of private context provider"
    );
  }
  return context;
}
