// React hooks
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.js";
// Axios Services Firebase
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth } from "../../firebase";
// CSS
import "../../css/login.css"

function Login() {

  const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

const provider = new GoogleAuthProvider();


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
  const handleLogin =  (e) => {
    e.preventDefault();

    // 1. To take credential user info.
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/")
      })
      .catch((error) => {
        console.log(error);
      });


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
        <hr />
        <p>Todavía no tientes cuenta | <span> <a href="/signup">Regístrate </a></span></p>
       <a href="">¿Olvidaste la Contraseña?</a>
      </div>
    </section>
  );
}

export default Login;