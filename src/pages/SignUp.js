import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import { firebase } from "../api/firebase";
import { emailValidator, passwordValidator } from "../utils/validators";

const theme = createTheme();

export default function SignUp() {
  const [emailhelper, setEmailHelper] = React.useState("");
  const [passwordhelper, setPasswordHelper] = React.useState("");
  const [validInputs, setValidInputs] = React.useState(false);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get("email"),
      password: data.get("password"),
      fullName: data.get("fullName"),
      country: data.get("country"),
      refferalCode: data.get("refferalCode"),
      phoneNumber: data.get("phone"),
    };
    if (validInputs) {
      const res = await firebase
        .post("/accounts:signUp", {
          ...user,
          returnSecureToken: true,
        })
        .catch((err) => {
          console.log(err);
          setError("Email already exists");
        });

      if (res.status === 200) {
        navigate("/app/welcome");
        await firebase.post("/accounts:sendOobCode", {
          requestType: "VERIFY_EMAIL",
          idToken: res.data.idToken,
        });

        await firebase.post("/accounts:update", {
          idToken: res.data.idToken,
          displayName: user.fullName,
          returnSecureToken: true,
        });
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
              sx={{ flexGrow: 1, fontWeight: "bold" }}
            >
              Create A Free account
            </Typography>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              in less than 1 minute
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
                  {error}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  fullWidth
                  focused
                  id="fullName"
                  label="Full Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  focused
                  type="text"
                  label="email"
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
                  name="phone"
                  label="Phone Number"
                  type="text"
                  id="phone"
                  autoComplete="+234000000"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  focused
                  fullWidth
                  name="country"
                  label="Country"
                  type="text"
                  id="country"
                  autoComplete="Nigeria"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  focused
                  name="refferalCode"
                  label="Referral Code (optional)"
                  type="text"
                  id="referralCode"
                  autoComplete="0000"
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
                  label="I agree to Koins&Kash terms of acceptable use"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
