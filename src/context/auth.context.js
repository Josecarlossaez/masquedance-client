

// React hooks
import { createContext, useState, useEffect } from "react";
// Services
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs,doc,getDoc } from 'firebase/firestore'
import { db } from '../firebase'





const AuthContext = createContext();

function AuthWrapper(props) {
  // * Global States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [isAdmin, setisAdmin] = useState(false)
  const [authUser, setaAthUser] = useState(null)
  const [user, setUser] = useState(null)
  

  useEffect(() => {
    authenticateUser();
    getUserData()
  }, []);
  useEffect(() => {
    getUserData()
  }, [userId]);

  const authenticateUser = async () => {
    setIsFetching(true);
    const auth = getAuth();
    onAuthStateChanged(auth, (authUser) => {
  if (authUser) {
    // authUser is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = authUser;
    console.log("🚀 r uid Firebase", uid.uid)
    setUserId(uid.uid);
    setIsLoggedIn(true);
    if( uid.email === "jcsaez83@gmail.com"){
      setisAdmin(true)
    }


    // ...
    setIsFetching(false)
  } else {
    // User is signed out
    // ...
    setisAdmin(false)

    setIsLoggedIn(false);
    setUserId("");
    setIsFetching(false);
    console.log("no hay usuarios activos");
  }
});
  };
  const getUserData = async () =>{
    if(userId === undefined || userId === ""){
      return
    }else{

      try {
        const userRef = doc(db, 'users', userId)
        const userById = await getDoc(userRef)
        setUser(userById.data())
        setIsFetching(false);
        console.log("usuario proveniente de Database", user)

      } catch (error) {
        console.log("no se ha podido cargar el usuario de la base de datos");
      }
    }
  } 

  




  const passedContext = {
    isAdmin,
    isLoggedIn,
    authUser,
    user,
    authenticateUser,
    setIsLoggedIn,
    setUserId,
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