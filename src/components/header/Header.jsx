import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../Context/AuthContext/AuthProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase.config";
import { getAuth, signOut } from "firebase/auth";
import { ADD_ROUTE, ADDEVENT_ROUTE, ADDSCHEDULE_ROUTE, EVENT_ROUTE } from "../../utils/Consts";
import logo from '../../images/logo.png'
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true); 
  const { user } = useAuth(); 
  const auth = getAuth();

  const userNavigation = [
    { name: "Event", href: EVENT_ROUTE },
    { name: "Расписание", href: "/schedule" },
    { name: "Чат", href: "/chat" },
    { name: "Контакты", href: "/contacts" },
  ];

  const adminNavigation = [
    { name: "Добавить расписание", href: ADDSCHEDULE_ROUTE },
    { name: "Добавить Событие", href: ADDEVENT_ROUTE },
    { name: "Настройки", href: "/admin/settings" },
  ];

  const publicNavigation = [
    { name: "Главная", href: "/" },
    { name: "О нас", href: "/about" },
    { name: "Контакты", href: "/contacts" },
  ];

  const [navigation, setNavigation] = useState(publicNavigation); 

  useEffect(() => {
    const fetchRole = async () => {
      setIsRoleLoading(true);
      if (user?.email) {
        try {
          const roleDocRef = doc(db, "roles", user.email);
          const roleDoc = await getDoc(roleDocRef);

          if (roleDoc.exists()) {
            const userRole = roleDoc.data().role;
            setRole(userRole);

            if (userRole === "admin") {
              setNavigation(adminNavigation);
            } else {
              setNavigation(userNavigation);
            }
          } else {
            console.log("No role found for this user.");
            setRole("user");
            setNavigation(userNavigation);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setNavigation(publicNavigation); 
        }
      } else {
        setRole(null);
        setNavigation(publicNavigation); 
      }
      setIsRoleLoading(false);
    };

    fetchRole();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      setRole(null); // Сбрасываем роль
      setNavigation(publicNavigation); // Возвращаем публичную навигацию
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (isRoleLoading) {
    return (
      <header className=" inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <p className="text-sm text-gray-500">Загрузка...</p>
        </nav>
      </header>
    );
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src={logo}
              className="h-8 w-auto"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900">
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <button
              onClick={handleLogout}
              className="text-sm/6 font-semibold text-gray-900"
            >
              Log out <span aria-hidden="true">&rarr;</span>
            </button>
          ) : (
            <Link to="/login" className="text-sm/6 font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src={logo}
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
