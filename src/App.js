import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Preloader from "./Preloader.jsx";
import Header from "./components/header/Header.jsx";
import Footer from './components/footer/Footer.jsx'
import app from "./firebase/Firebase.config.js";
import { authRoutes, publicRoutes, adminRoutes } from "./utils/Routes.js";
import { HOME_ROUTE } from "./utils/Consts.js";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
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
      <Header user={user} role={role} />

      <div className="AppRouter">
        <AppRouter role={role} />
      </div>
      <Footer/>
    </div>
  );
};

const AppRouter = ({ role }) => {
  if (role === "admin") {
    return (
      <Routes>
        {adminRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} exact />
        ))}
        <Route path="*" element={<Navigate to={HOME_ROUTE} />} />
      </Routes>
    );
  }

  if (role === "user") {
    return (
      <Routes>
        {authRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} exact />
        ))}
        <Route path="*" element={<Navigate to={HOME_ROUTE} />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} exact />
      ))}
      <Route path="*" element={<Navigate to={HOME_ROUTE} />} />
    </Routes>
  );
};

export default App;
