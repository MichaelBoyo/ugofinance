import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { firebase } from "../api/firebase";
import { useNavigate } from "react-router-dom";
import { emailValidator, passwordValidator } from "../utils/validators";

import SendIcon from "@mui/icons-material/Send";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        style={{
          textDecoration: "none",
        }}
        to="/forgot-password"
      >
        UgoFinance
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [emailhelper, setEmailHelper] = React.useState("");
  const [passwordhelper, setPasswordHelper] = React.useState("");
  const [validInputs, setValidInputs] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const validateEmail = (email) => {
    if (emailValidator(email)) {
      setEmailHelper("");
      setValidInputs(true);
    } else {
      setEmailHelper("Invalid Email");
      setValidInputs(false);
    }
  };
  const validatePassword = (email) => {
    if (passwordValidator(email)) {
      setPasswordHelper("");
      setValidInputs(true);
    } else {
      setPasswordHelper(
        "Password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
      );
      setValidInputs(false);
    }
  };
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // setLoading(true);
    if (validInputs) {
      const data = new FormData(event.currentTarget);
      const user = {
        email: data.get("email"),
        password: data.get("password"),
      };

      const res = await firebase
        .post("/accounts:signInWithPassword", {
          ...user,
          returnSecureToken: true,
        })
        .catch((err) => {
          setError(true);
          console.log(err);
          if (err.code === "ERR_NETWORK") {
            setError(!error);
            setErrorMsg("Network error");
          } else {
            setError(!error);
            setErrorMsg("Invalid Credentials");
          }
        });

      if (res.status === 200) {
        navigate("/dashboard");
        localStorage.setItem("user", JSON.stringify(res.data));
      } else {
        setError(!error);
        setErrorMsg("Invalid Credentials");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <div
            style={{
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
                bgColor: "transparent",
              }}
            >
              Welcome Back!
            </Typography>
          </div>
        </AppBar>
      </Box>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            Please login to continue
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, color: "red" }}
                >
                  {error ? errorMsg : ""}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  focused
                  type="text"
                  label="Email or Phone Number"
                  name="email"
                  id="email"
                  autoComplete="example@mail.com"
                  helperText={emailhelper}
                  onChange={(e) => validateEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  focused
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  helperText={passwordhelper}
                  onChange={(e) => validatePassword(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="Trust this device"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              endIcon={<SendIcon />}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  to="/app/forgot-password"
                >
                  Forgot Password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
