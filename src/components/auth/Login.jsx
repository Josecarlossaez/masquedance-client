// React hooks
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.js";
// Axios Services Firebase
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { auth } from "../../firebase";
// Firebase Database
import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase'
// CSS
import "../../css/login.css"
// Google Button
import GoogleButton from 'react-google-button'

function Login() {

  // const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

const provider = new GoogleAuthProvider();
const authWithGoogle = getAuth();


  // input States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // ErrorMessage from BE
  const [errorMessage, setErrorMessage] = useState("");
  const [isFetching, setIsFetching] = useState(false);



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

const singInWithGoogle = async () => {
  // signInWithPopup(authWithGoogle, provider)
  try {
    const result = await signInWithPopup(authWithGoogle, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log("credenciales en la auth con Google", credential);
    const token = credential.accessToken;
    // The signed-in user info.
    console.log("user en al auth", result.user)
    const userId = result.user.uid;
    const email = result.user.email
    console.log(`email --> ${email}, id: ${userId}`);

    // Create user in the DB
    const userRef = collection(db, 'users');
    const newUserRef = doc(userRef, userId);



    await setDoc(newUserRef, {
      
      id: userId,
      email: email,
      cart: [],
      orders: [],
      youtubeReproductionList: [],
      role: ""
    });
    setIsFetching(false)
   
    navigate("/");


  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData ? error.customData.email : null;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  }
  
}

if (isFetching === true) {
  return <p>LOading...</p>;
}



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
      <div>
      <GoogleButton type="dark" label="Entra con Google" onClick={singInWithGoogle}/>
      </div>
      </div>
    </section>
  );
}

export default Login;