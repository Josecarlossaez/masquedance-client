// CSS
import "../../css/signup.css"
// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Services
import { singupService } from "../../services/auth.services";

function Signup() {
  const navigate = useNavigate();

 // input values
  const [usernameInput, setUsername] = useState("");
  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");

// errorMessages from BE
  const [errorMessage, setErrorMessage] = useState("");
// Takes user info
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

// Send the input values to BE
  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = {
      username: usernameInput,
      email: emailInput,
      password: passwordInput,
    
    };

    try {
      await singupService(newUser);
      navigate("/login");
    } catch (error) {
      if (
        (error.response && error.response.status === 406) ||
        (error.response && error.response.status === 400)
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <section className="general-container">
      <div className="form-container">
        <form >
          <h3>Sign-Up</h3>

          <div className="input-container">
            <input value={usernameInput} onChange={handleUsernameChange} />
            <label className={usernameInput && "filled"} htmlFor="username">
              User Name
            </label>
          </div>
          <div className="input-container">
            <input value={emailInput} onChange={handleEmailChange} />
            <label className={emailInput && "filled"} htmlFor="email">
              Email
            </label>
          </div>
          <div className="input-container">
            <input
              value={passwordInput}
              type="password"
              onChange={handlePasswordChange}
            />
            <label className={passwordInput && "filled"} htmlFor="password">
              Password
            </label>
          </div>

         

          <button
            type="submit"
            onClick={handleSignup}
           className="general-btn"
          >
            Register
          </button>
          {errorMessage !== "" && (
            <p className="error-message"> * {errorMessage}</p>
          )}

        </form>
      </div>

    
    </section>
  );
}

export default Signup;