// React hooks
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.js";
// Axios Services
import { loginService } from "../../services/auth.services";
// CSS
import "../../css/login.css"

function Login() {

  const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // input States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // ErrorMessage from BE
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // When user press the button send the input value to BE
  const handleLogin = async (e) => {
    e.preventDefault();

    // 1. To take credential user info.
    const userInfo = {
      email: email,
      password: password,
    };

    try {
      // 2. Contact BE To validate it
      const response = await loginService(userInfo);

      // 3. Token received so we save it into localStorage
      localStorage.setItem("authToken", response.data.authToken);

      authenticateUser(); // invoke to validate user
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <section className="general-container">
 

      <div className="form-container">
        <form>
          <h3>Log-In</h3>
          <div className="input-container">
            <input value={email} onChange={handleEmailChange} name="email" />
            <label className={email && "filled"} htmlFor="email">
              Email
            </label>
          </div>
          <div className="input-container">
            <input
              value={password}
              type="password"
              onChange={handlePasswordChange}
              name="password"
            />
            <label className={password && "filled"} htmlFor="password">
              Password
            </label>
          </div>

          {errorMessage !== "" && (
            <p style={{ color: "red" }}>{errorMessage}</p>
          )}

          <button type="submit" onClick={handleLogin} className="general-btn">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;