import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase.config";
import { getAuth, signOut } from "firebase/auth";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import AdminScheduleForm from "../pages/admin/components/AdminScheduleForm";
import AdminAddEvent from "../pages/admin/components/AdminAddEvent";
import { CardActionArea } from "@mui/material";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext/AuthProvider";

// const NAVIGATION = [
//   { id: "add-schedule", title: "Добавить расписание", icon: <DashboardIcon /> },
//   { id: "add-event", title: "Мероприятия", icon: <ShoppingCartIcon /> },
//   { id: "write-chat", title: "Высказаться", icon: <BarChartIcon /> },
//   { id: "read-chat", title: "Прочитать чат", icon: <DescriptionIcon /> },
// ];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const StudentPortal = () => {
  const [activePage, setActivePage] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [isMenuCollapsed, setMenuCollapsed] = useState(false);
  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true); 
  const { user } = useAuth(); 
  const auth = getAuth();

  const userNavigation = [
    { title: "Мероприятия", id: "event", icon: <DashboardIcon /> },
    { title: "Расписание", id: "schedule" , icon: <ShoppingCartIcon />},
    { title: "Чат", id: "chat" ,  icon: <BarChartIcon />},
    { title: "Контакты", id: "contacts" },
  ];

  const adminNavigation = [
    { title: "Добавить расписание", id: "add-schedule", icon: <DashboardIcon /> },
    { title: "Добавить Событие", id: "add-event",  icon: <ShoppingCartIcon />},
    { title: "Настройки", id: "settings", icon: <DescriptionIcon /> },
  ];

  const [navigation, setNavigation] = useState(userNavigation); 

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: { main: "#1976d2" },
      background: { default: "#f4f6f8", paper: "#fff" },
      text: { primary: "#000" },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#0056b3" },
      background: { default: "#121212", paper: "#1d1d1d" },
      text: { primary: "#fff" },
    },
  });

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
          setNavigation(userNavigation); 
        }
      } else {
        setRole(null);
        setNavigation(userNavigation); 
      }
      setIsRoleLoading(false);
    };

    fetchRole();
  }, [user]);
  console.log(user)

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      setRole(null); // Сбрасываем роль
      Navigate('/')
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const currentTheme = darkMode ? darkTheme : lightTheme;

  const renderContent = () => {
    switch (activePage) {
      case "add-schedule":
        return <AdminScheduleForm />;
      case "add-event":
        return <AdminAddEvent />;
      case "write-chat":
        return <Typography>Форма для написания сообщений в чате.</Typography>;
      case "read-chat":
        return <Typography>Прочитать сообщения из чата.</Typography>;
      default:
        return <Typography>Добро пожаловать! Выберите пункт меню.</Typography>;
    }
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };



  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <Box display="flex" height="100vh">
        <Box
          sx={{
            width: isMenuCollapsed ? "60px" : "340px",
            transition: "width 0.3s",
            backgroundColor: "background.paper",
            color: "text.primary",
            padding: isMenuCollapsed ? 1 : 2,
          }}
        >
          <Box
            display="flex"
            justifyContent={isMenuCollapsed ? "center" : "space-between"}
            alignItems="center"
            marginBottom={2}
          >
            {isMenuCollapsed ? null : (
              <Typography variant="h6" sx={{ color: "text.primary" }}>
                Меню
              </Typography>
            )}
            <IconButton onClick={() => setMenuCollapsed(!isMenuCollapsed)}>
              {isMenuCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
            </IconButton>
          </Box>

          <List>
            {navigation.map((item) => (
              <CardActionArea
                key={item.id}
                button
                onClick={() => setActivePage(item.id)}
                sx={{
                  display: "flex",
                  "&:hover": { backgroundColor: "primary.mainChannel" },
                  backgroundColor:
                    activePage === item.id ? "primary.main" : "inherit",
                  color: activePage === item.id ? "#fff" : "text.primary",
                  justifyContent: isMenuCollapsed ? "center" : "flex-start",
                  borderRadius: "10px",
                  padding: "10px",
                  width: "100%",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: activePage === item.id ? "#fff" : "text.primary",
                    minWidth: isMenuCollapsed ? "unset" : "40px",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!isMenuCollapsed && <ListItemText primary={item.title} />}
              </CardActionArea>
            ))}
          </List>
        </Box>

        <Box
          sx={{
            flex: 1,
            backgroundColor: "background.default",
            color: "text.primary",
            padding: 3,
            overflowY: "auto",
          }}
        >
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            marginBottom={2}
          >
            <IconButton onClick={() => setDarkMode((prev) => !prev)}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                  <MenuItem  onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                        Profile
                    </Typography>
                  </MenuItem>
                  <MenuItem  onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                        Dashboard
                    </Typography>
                  </MenuItem>
                  <MenuItem  onClick={handleLogout}>
                    <Typography sx={{ textAlign: "center" }}>
                        Log Out
                    </Typography>
                  </MenuItem>
              </Menu>
            </Box>
          </Box>

          {renderContent()}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default StudentPortal;
