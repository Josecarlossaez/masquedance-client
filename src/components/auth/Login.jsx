// React hooks
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.js";
// Axios Services Firebase
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { auth, collUsers, refUser, db } from "../../firebase";
import { collection, getDocs } from 'firebase/firestore'

// Firebase Database
import { setDoc } from "firebase/firestore";
// CSS
import "../../css/login.css";
// Google Button
import GoogleButton from "react-google-button";

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

  let emailExists = false

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // When user press the button send the input value to BE
  const handleLogin = (e) => {
    e.preventDefault();

    // 1. To take credential user info.
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/");
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
      console.log("user en al auth", result.user);
      const userId = result.user.uid;
      const email = result.user.email;
      console.log(`email --> ${email}, id: ${userId}`);

      // user exists??


      // Create user in the DB
      //TODO: Otras recomendaciones no relativas al problema
      /**
       * Yo suelo crear un archivo con todas las referencias a la db.
       * De esta forma no estas repitiendo las referencias en todos lados y si cambias algo
       * no tienes que cambiarlo en millones de partes.
       *
       * Te dejo creadas estas dos referencias de aqui abajo en el archivo de "firebase.js" que ya tenias.
       * Yo a veces creo uno separado que llamo "references" pero realmente no hace falta.
       */
      //TODO: Te dejo esto comentado para mostrarte que lo que te digo del archivo funciona y como se usa. Tu si luego no quieres hacerlo lo descomentas y lo pones como estaba.
      // const userRef = collection(db, "users");
      // const newUserRef = doc(userRef, userId);
      const users = []
      const querySnapshot = await getDocs(collUsers)
      console.log("querySnapshot", querySnapshot)

      querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id })
      })
      console.log("users", users);
      users.forEach((each) => {
        if (each.email === email) {
          emailExists = true
        }

      })
      console.log("emailExists", emailExists);
      if (!emailExists) {
        const newUser = new User(userId, email, [], [], [], "user");
        console.log("fer-newUser: ", newUser);
        await setDoc(refUser(userId), newUser.toJson());

        setIsFetching(false);

        navigate("/");
      }



      // TODO: Aqui deberias comprobar si el usuario existe. Si lo hace no guardas nada, sino lo creas.
      /**
       * En vez de tener dos sistemas de registro deberias tener uno solo. A ti te da igual si el tio tiene cuenta o no.
       * Como debería ser tu flow:
       * - Una sola pagina que pone "Entra o crea una cuenta"
       * - Y las dos opciones que tienes, Google y Correo.
       *
       * Flow de Google:
       * - El tio clica en Google, se autentifica y con el uid lo buscas en la db, si existe no hay que hacer nada.
       * - Sino, lo registras. Si tienes que pedirle mas datos lo mandas a ese flow, pero por lo poco que vi no le pides nada.
       * Asique haces el "SetDoc".
       *
       * Flow de correo:
       * - Cuando el tio ha escrito el correo compruebas si el correo existe en el sistema de auth. Si existe le preguntas la contraseña,
       * sino le preguntas igual la contraseña para crear al user.
       * - Y listo.
       *
       * De esta forma tienes un solo flow. Con solo un par de funciones de auth y todo en el mismo sitio.
       *
       * Al menos esto es lo que mejor me ha ido todos estos años.
       *
       * Como minimo llevate estas funciones a un servicio y en función de un paremtro que le pases creas o solo autentificas al user.
       * 
       * Comentario extra: Revisando algo más veo que guardas el user con SetDoc en tres lugares, debería ser solo uno. Por eso te ha costado pillar el error.
       * Intenta crear un flow unico de auth. Y nada mas.
       * 
       * Tambien algo que me ha pasado siempre es que aunq hago auth y lo hace bien sigo viendo la pagina de login. Si el user esta auth no deberia verla nunca,
       * ni cuando refresca la pagina. ;)
       * 
       * Espero que todo esto te ayude, cualquier cosa o duda me dices crack.
       */

      //TODO: Tambien te recomiendo que uses clases con ES6, de esta forma reduces enormemente tu capacidad de cometer errores en los datos que guardas en firebase.
      /**
       * Te he dejado esta clase creada como ejemplo que está al final de la página. Pero deberias crear una carpeta con todos tus modelos de clases de datos.
       *
       * Ademas asi es mucho mas facil crear objetos y no liarla en el nombre, el orden, etc.
       */
      //TODO: El error estaba aqui, al menos al cambiarlo se ha solucionado.
      // const newUser = new User(userId, email, [], [], [], "user");

      //! Tu codigo antiguo
      // const newUser = {
      //   id: userId,
      //   email: email,
      //   cart: [],
      //   orders: [],
      //   youtubeReproductionList: [],
      //   role: ""
      // };


      //TODO: Esto es usando el nuevo archivo de referencias mencionado arriba
      //TODO: Con la clase nueva que he creado del "User" no puedes meterlo directamente a firebase porque te dice que ese objeto no lo reconoce. Para ello
      /** 
       * creamos un simple metodo que llamamos "toJson" que nos convierte esa info en un json de toda la via. Puedes usar el Json.stringify, pero a mi
       * me gusta hacerlo asi para tener una vision mas clara y mayor control sobre los datos y como se guardan. Ademas el JSon.stringify te va a convertir todo,
       * incluidos los Timestamps que si te los acepta firebase.
       */

    } catch (error) {
      console.log("fer-error:", error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData ? error.customData.email : null;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    }
  };

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
            <input value={password} type="password" onChange={handlePasswordChange} name="password" />
            <label className={password && "filled"} htmlFor="password">
              Password
            </label>
          </div>

          {errorMessage !== "" && <p style={{ color: "red" }}>{errorMessage}</p>}

          <button type="submit" onClick={handleLogin} className="general-btn">
            Login
          </button>
        </form>
        <hr />
        <p>
          Todavía no tientes cuenta |{" "}
          <span>
            {" "}
            <a href="/signup">Regístrate </a>
          </span>
        </p>
        <a href="">¿Olvidaste la Contraseña?</a>
        <br />
        <div>
          <GoogleButton className="google-button" type="dark" label="Entra con Google" onClick={singInWithGoogle} />
        </div>
      </div>
    </section>
  );
}

export default Login;

class User {
  constructor(id, email, cart, orders, youtubeReproductionList, role) {
    this.id = id;
    this.email = email;
    this.cart = cart;
    this.orders = orders;
    this.youtubeReproductionList = youtubeReproductionList;
    this.role = role;
  }

  toJson() {
    return {
      id: this.id,
      email: this.email,
      cart: this.cart,
      orders: this.orders,
      youtubeReproductionList: this.youtubeReproductionList,
      role: this.role,
    };
  }
}