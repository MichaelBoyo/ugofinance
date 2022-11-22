import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const path = window.location.pathname === "/" ? "/sign-up" : "/";

  return (
    <>
      <Box sx={{ flexGrow: 1, boxShadow: 4 }}>
        <AppBar sx={{ backgroundColor:"#1976d2"  }} position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={()=> navigate("/")} 
            >
              <img
              
                style={{
                  width: "100px",
                }}
                src="https://res.cloudinary.com/dfsn2ob9s/image/upload/v1668165833/K_K_logo_6_cg6ira.png"
                alt="KoinsAndKash"
              />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            
            <Button
              onClick={() =>
                navigate(path)
              }
              style={{
                backgroundColor: "white",
                color: "#1976d2",
              }}
              variant="contained"
            >
              {window.location.pathname === "/" ? "Sign Up" : "Log In"}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
}
