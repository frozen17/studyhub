import React, { useState } from "react";
import './SignUp.css'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc , getDoc} from "firebase/firestore";
import app from "../../firebase/Firebase.config";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../../utils/Consts";
const db = getFirestore(app);
const auth = getAuth(app);

const checkUniqueStudentID = async (studentID) => {
  const studentRef = doc(db, "students", studentID);
  const studentSnap = await getDoc(studentRef);

  return !studentSnap.exists(); // Возвращает true, если StudentID уникален
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentID, setStudentID] = useState("");
  const auth = getAuth(app);
  const db = getFirestore(app);
  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {

    
    e.preventDefault();
    const isStudentIDUnique = await checkUniqueStudentID(studentID);
  if (!isStudentIDUnique) {
    alert("Этот StudentID уже занят. Пожалуйста, используйте другой.");
    return;
  }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(db, "students", user.uid), {
        email,
        studentID,
      });
  
      alert("Регистрация успешна!");
      navigate(HOME_ROUTE)
    } catch (error) {
      alert("Ошибка регистрации: " + error.message);
    }
  
  };

  return (
    

  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign Up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email} id="email" onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="/#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  StudentID
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="studentID"
                  name="studentID"
                  type="studentID"
                  required

                  value={studentID} onChange={(e) => setStudentID(e.target.value)}
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Зарегистрироваться
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Уже есть аккаунт{' '}
            <a href="login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Войти
            </a>
          </p>
        </div>
      </div>
  );
};

export default Register;
