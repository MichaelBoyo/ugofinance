import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ApiIcon from "@mui/icons-material/Api";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import { Outlet } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const drawerItems = [
  {
    path: "/",
    name: "Home",
    icon: <HomeIcon />,
  },
  {
    path: "/features",
    name: "Features",
    icon: <FeaturedPlayListIcon />,
  },
  {
    path: "/enterprise",
    name: "EnterPrise",
    icon: <ApiIcon />,
  },
  {
    path: "/support",
    name: "Support",
    icon: <ContactSupportIcon />,
  },
  {
    path: "/store",
    name: "Go Shopping",
    icon: <ShoppingCartIcon />,
  },
];
export default function TemporaryDrawer() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem
          sx={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
          key="home"
          disablePadding
        >
          <ListItemButton>
            <img
              style={{
                height: "50px",
                marginTop: "1%",
              }}
              src="https://res.cloudinary.com/dfsn2ob9s/image/upload/v1668798109/build_your_networth_8_zjoyda.png"
              alt="UgoFinance"
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {drawerItems.map((item) => (
          <ListItem
            onClick={() => navigate(`${item.path}`)}
            key={item.name}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <>
        <Drawer
          anchor="left"
          open={state.left}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </>
      {!window.location.href.includes("dash") ? (
        <>
          <CssBaseline />
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Toolbar sx={{ flexWrap: "wrap" }}>
              <MenuIcon
                onClick={toggleDrawer("left", true)}
                sx={{ mr: "1%", cursor: "pointer" }}
              />
              <Typography
                onClick={() => navigate("/")}
                variant="h5"
                color="inherit"
                sx={{ flexGrow: 1 }}
              >
                <img
                  style={{
                    height: "50px",
                    marginTop: "1%",
                  }}
                  src="https://res.cloudinary.com/dfsn2ob9s/image/upload/v1668798109/build_your_networth_8_zjoyda.png"
                  alt="UgoFinance"
                />
              </Typography>
              {window.location.pathname === "/" ||
              window.location.pathname === "/login" ||
              window.location.pathname === "/register" ? (
                <>
                  <Button
                    sx={{
                      ml: 1,
                    }}
                    onClick={() => {
                      window.location.href =
                        "https://ugofinance.notion.site/VENDORS-5b9a9e336d51498f8d9bf1e235eab516";
                    }}
                    variant="outlined"
                    color="success"
                  >
                    OFFLINE MVP
                  </Button>
                  {/* <Button
                    onClick={() => navigate("/register")}
                    variant="contained"
                    
                  >
                    Sign Up
                  </Button> */}
                  <Button onClick={() => navigate("/login")} variant="outlined">
                    Login
                  </Button>
                </>
              ) : (
                <Button onClick={handleLogout} color="error" variant="outlined">
                  Logout
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </>
      ) : (
        ""
      )}

      <Outlet />
    </>
  );
}
