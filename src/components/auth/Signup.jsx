// CSS
import "../../css/signup.css"
// React
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Services Firebase
// import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { collection, doc, setDoc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";


// Google Button
import GoogleButton from 'react-google-button'

function Signup() {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const authWithGoogle = getAuth();


  // input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [activePassword, setActivePassword] = useState(false)

 

  // errorMessages from BE
  const [errorMessage, setErrorMessage] = useState("");
  // Takes user info
  useEffect(() => {
    if(email === ""){
      setActivePassword(false)
    }else{
      setActivePassword(true)
    }
    
  }, [email])


  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);


  // Sign in with Google
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

  const handleSignup = async (e) => {
    e.preventDefault();
  
    try {
    
      // Validacion 1
      const emailFormat =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if (!emailFormat.test(email)) {
      setErrorMessage("formato de email incorrecto")
      setTimeout(() => {
        setErrorMessage("")
      }, 3000)
      return;
    }
      // Validation 2: Password format validation
      const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!passwordFormat.test(password)) {
      setErrorMessage(" La contraseña debe tener al menos 8 caracteres, una mayúscula y un número")
      setTimeout(() => {
        setErrorMessage("")
      }, 3000)
      return;
    }

    // Validation 3: email doesn´t already exist in the DB
    let userExists = false;
    const usersCollection = collection(db, 'users');
    const querySnapshot = await getDocs(usersCollection);

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.email === email) {
        userExists = true;
        console.log("user.email ===>" , userData.email)
      }
    });
    console.log("users exists?===", userExists);
    if(userExists){
      setErrorMessage("Usuario existente")
      setTimeout(() => {
        setErrorMessage("")
      }, 3000)
      return
    }
      setIsFetching(true)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario creado recientemente", userCredential.user.uid);
      console.log("Entrando en el bloque try, ID del nuevo usuario:", userCredential.user.uid);
  
      // Utiliza la referencia a la colección sin incluir la ID del documento en la función collection
      const userRef = collection(db, 'users');
      const newUserRef = doc(userRef, userCredential.user.uid);


  
      await setDoc(newUserRef, {
        id: userCredential.user.uid,
        email: email,
        cart: [],
        orders: [],
        youtubeReproductionList: [],
        role: ""
      });
      setIsFetching(false)
      navigate("/");
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
          <h3>Sign-Up</h3>
      <div>
      <GoogleButton type="dark" label="Regístrate con Google" onClick={singInWithGoogle}/>
      </div>
      <h4>O si prefieres ... </h4>
        <form >
          <div className="input-container">
            <input value={email} onChange={handleEmailChange} />
            <label className={email && "filled"} htmlFor="email">
              Email
            </label>
          </div>
          {activePassword &&
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
          }
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