

// React hooks
import { createContext, useState, useEffect } from "react";
// Services
import { verifyService } from "../services/auth.services";

const AuthContext = createContext();

function AuthWrapper(props) {
  // * Global States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    setIsFetching(true);
    try {
      const response = await verifyService();
      console.log("🚀 r", response)

      setIsLoggedIn(true);
      setUser(response.data);
      setIsFetching(false);
    } catch (error) {
  
      setIsLoggedIn(false);
      setUser(null);
      setIsFetching(false);
    }
  };

  




  const passedContext = {
    isLoggedIn,
    user,
    authenticateUser,
    setIsLoggedIn,
    setUser,
  };

  if (isFetching === true) {
    return (
      <div className="centered-container">
        <h3>... Validating User ...</h3>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };