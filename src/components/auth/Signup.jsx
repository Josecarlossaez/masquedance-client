// CSS
import "../../css/signup.css"
// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Services Firebase
// import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { collection, doc, setDoc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'





function Signup() {
  const navigate = useNavigate();


  // input values
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    // setIsFetching(true);
  
    try {
      // setIsFetching(true)
      // Validación 1
      if (username === "" || email === "" || password === "") {
        setErrorMessage("Todos los campos tienen que estar rellenos")
        setTimeout(() => {
          setErrorMessage("")
        }, 2000)
        return;
      }
      // Validación 2
      if (username.length < 4) {
        setErrorMessage("El usuario tiene que tener al menos 4 caracteres")
        setTimeout(() => {
          setErrorMessage("")
        }, 3000)
        return;
      }
      // Validacion 3
      const emailFormat =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if (!emailFormat.test(email)) {
      setErrorMessage("formato de email incorrecto")
      setTimeout(() => {
        setErrorMessage("")
      }, 3000)
      return;
    }
      // Validation 4: Password format validation
      const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!passwordFormat.test(password)) {
      setErrorMessage(" La contraseña debe tener al menos 8 caracteres, una mayúscula y un número")
      setTimeout(() => {
        setErrorMessage("")
      }, 3000)
      return;
    }

    // Validation 5: email doesn´t already exist in the DB
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