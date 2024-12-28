import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Preloader from "./Preloader.jsx";
import Header from "./components/header/Header.jsx";
import app from "./firebase/Firebase.config.js";
import { authRoutes, publicRoutes, adminRoutes } from "./utils/Routes.js";
import { HOME_ROUTE } from "./utils/Consts.js";
import StudentPortal from "./components/StudentPortal.jsx";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  // initial value
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("guest");

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const userDoc = doc(db, "roles", currentUser.email);
        const docSnapshot = await getDoc(userDoc);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setRole(data.role || "user");
        } else {
          setRole("user");
        }
      } else {
        setUser(null);
        setRole("guest"); 
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div>
      
      <div className="AppRouter">
        <AppRouter role={role} user={user}/>
      </div>
    </div>
  );
};

const AppRouter = ({ role, user }) => {
  if (role === "admin") {
    return (
      <div>
        <StudentPortal user={user} role={role}/>
      <Routes>
        
        {adminRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} exact />
        ))}
        <Route path="*" element={<Navigate to={HOME_ROUTE} />} />
      </Routes></div>
    );
  }

  if (role === "user") {
    return (
      <div>
        <StudentPortal user={user} role={role}/>
      <Routes>
        {authRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} exact />
        ))}
        <Route path="*" element={<Navigate to={HOME_ROUTE} />} />
      </Routes></div>
    );
  }

  return (
    <div>
      <Header user={user} role={role} />
    <Routes>
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} exact />
      ))}
      <Route path="*" element={<Navigate to={HOME_ROUTE} />} />
    </Routes></div>
  );
};

export default App;
