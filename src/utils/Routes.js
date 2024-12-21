import { element } from "prop-types";
import { ADMIN_DASHBOARD, HOME_ROUTE, LOGIN_ROUTE, NEWS_ROUTE, REGISTRATION_ROUTE } from "./Consts";
import AdminDashboard from "../pages/admin/components/AdminDashboard";
import Home from "../pages/home/Home";
import Login from "../Authentication/LogIn/LogIn";
import SignUp from "../Authentication/SignUp/SignUp"
import News from '../pages/news/News'





export const adminRoutes = [
    {
        path: ADMIN_DASHBOARD,
        element: <AdminDashboard />
    },
    {
        path: HOME_ROUTE,
        element: <Home />
    },
    {
        path: NEWS_ROUTE,
        element: <News/>
    },
]

export const authRoutes = [
    {
        path: HOME_ROUTE,
        element: <Home />
    },
    {
        path: NEWS_ROUTE,
        element: <News/>
    },
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        element: <Home />
    },
    {
        path: LOGIN_ROUTE,
        element: <Login/>
    },
    {
        path: REGISTRATION_ROUTE,
        element: <SignUp/>
    },
    {
        path: NEWS_ROUTE,
        element: <News/>
    },
]