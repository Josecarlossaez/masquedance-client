// CSS
import "../../css/signup.css"
// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Services Firebase
// import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase'





function Signup() {
  const navigate = useNavigate();


  // input values
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUserId, setNewUserId] = useState("")
  const [isFetching, setIsFetching] = useState(false);

 

  // errorMessages from BE
  const [errorMessage, setErrorMessage] = useState("");
  // Takes user info
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Send the input values to BE
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsFetching(true);
  
    try {
      setIsFetching(true)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario creado recientemente", userCredential.user.uid);
      setNewUserId(userCredential.user.uid);
      console.log("Entrando en el bloque try, ID del nuevo usuario:", userCredential.user.uid);
  
      // Utiliza la referencia a la colección sin incluir la ID del documento en la función collection
      const userRef = collection(db, 'users');
      const newUserRef = doc(userRef, userCredential.user.uid);
  
      await setDoc(newUserRef, {
        username: username,
        id: userCredential.user.uid,
        email: email,
        cart: [],
        orders: [],
        youtubeReproductionList: [],
        role: ""
      });
      setIsFetching(false)
      alert("Usuario añadido correctamente");
      window.location.reload(false);
      navigate("/login");
    } catch (error) {
      console.log('Error al crear el usuario:', error);
    }
  };
  
  if (isFetching === true) {
    return <p>LOading...</p>;
  }

  return (
    <section className="general-container">
      <div className="form-container">
        <form >
          <h3>Sign-Up</h3>

          <div className="input-container">
            <input value={username} onChange={handleUsernameChange} />
            <label className={username && "filled"} htmlFor="username">
              User Name
            </label>
          </div>
          <div className="input-container">
            <input value={email} onChange={handleEmailChange} />
            <label className={email && "filled"} htmlFor="email">
              Email
            </label>
          </div>
          <div className="input-container">
            <input
              value={password}
              type="password"
              onChange={handlePasswordChange}
            />
            <label className={password && "filled"} htmlFor="password">
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