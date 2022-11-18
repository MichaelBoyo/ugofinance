import { Link as RouterLink } from "react-router-dom";
import { AppBar, Box, Toolbar } from "@mui/material";

import Button from "@mui/material/Button";

export const Navbar = () => {
  return (
    <AppBar elevation={0} sx={{ backgroundColor: "#1e212a" }}>
      <Toolbar
        disableGutters
        sx={{
          alignItems: "center",
          display: "flex",
          minHeight: 64,
          px: 3,
          py: 1,
        }}
      >
        <Box
          component={RouterLink}
          to="/"
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            style={{ width: "200px", height: "60px" }}
            alt="icon"
            src="https://res.cloudinary.com/dfsn2ob9s/image/upload/v1668798109/build_your_networth_8_zjoyda.png"
          />
        </Box>

        <Box sx={{ flexGrow: 1 }} />
        <Button
          sx={{
            ml: 1,
          }}
          onClick={() => {
            window.location.href =
              "https://ugofinance.notion.site/VENDORS-5b9a9e336d51498f8d9bf1e235eab516";
          }}
          variant="contained"
        >
          OFFLINE MVP
        </Button>
      </Toolbar>
    </AppBar>
  );
};
