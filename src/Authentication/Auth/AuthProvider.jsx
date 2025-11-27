import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from './Firebase.init';
const googleProvider=new GoogleAuthProvider()
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  console.log(user);
  
  const [loading ,setLoading]=useState(true)
   const [theme, setTheme] = useState("light")
  const createUser = (Email, Password) => {
     setLoading(true)
     return createUserWithEmailAndPassword(auth, Email, Password)
   }
  const signInUser = (Email, Password) => {
     setLoading(true)
     return signInWithEmailAndPassword(auth, Email, Password)
   }
  const googleLogin = () => {
     setLoading(true)
     return signInWithPopup(auth, googleProvider)
  }
  const LogOut = () => {
    return signOut(auth)
  }
  const userProfileImage = (profile) => {
    return updateProfile(auth.currentUser,profile)
  }
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)

    })
    return () => {
      unSubscribe()

    }
  },[])

    const AuthInfo = {
      setTheme,
      user,
      LogOut,
      theme,
      loading,
      createUser,
      signInUser,
      setLoading,
      googleLogin,
      setUser,
      userProfileImage,
    }
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  )

}

export default AuthProvider;