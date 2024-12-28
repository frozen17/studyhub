import { element } from "prop-types";
import { ADDEVENT_ROUTE, ADDSCHEDULE_ROUTE, ADMIN_DASHBOARD, EVENT_ROUTE, HOME_ROUTE, LOGIN_ROUTE, NEWS_ROUTE, REGISTRATION_ROUTE, SCHEDULE_ROUTE, USER_DASHBOARD } from "./Consts";
import AdminDashboard from "../pages/admin/components/AdminDashboard";
import Home from "../pages/home/Home";
import Login from "../Authentication/LogIn/LogIn";
import SignUp from "../Authentication/SignUp/SignUp"
import News from '../pages/news/News'
import UserDashboard from "../pages/auth/components/UserDashboard";
import Schedule from "../pages/Schedule";
import AdminScheduleForm from "../pages/admin/components/AdminScheduleForm";
import UserEvent from "../pages/auth/components/UserEvent";
import AdminEventForm from "../pages/admin/components/AdminAddEvent";





export const adminRoutes = [
    {
        path: ADMIN_DASHBOARD,
        element: <AdminDashboard />
    },
    {
        path: NEWS_ROUTE,
        element: <News/>
    },
    {
        path: SCHEDULE_ROUTE,
        element: <Schedule/>
    },
    {
        path: ADDSCHEDULE_ROUTE,
        element: <AdminScheduleForm/>
    },
    {
        path: ADDEVENT_ROUTE,
        element: <AdminEventForm/>
    },

]

export const authRoutes = [
    {
        path: NEWS_ROUTE,
        element: <News/>
    },
    {
        path: USER_DASHBOARD,
        element: <UserDashboard/>
    },
    {
        path: SCHEDULE_ROUTE,
        element: <Schedule/>
    },
    {
        path: EVENT_ROUTE,
        element: <UserEvent/>
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