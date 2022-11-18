import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Box,
  Button,
  Popover,
  Card,
  FormHelperText,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import OneLiquidity from "./OneLiquidity";
const companySizeOptions = ["BTC", "USDT", "ETH", "BNB"];

export default function BasicPopover({ name, myOrders, setMyOrders, setSuccessPay }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const formik = useFormik({
    initialValues: {
      companyName: "",
      companySize: "",
      email: "",
      fullName: "",
      jobTitle: "",
      submit: null,
    },
    validationSchema: Yup.object().shape({
      companyName: Yup.string().max(255).required("Bank name is required"),
      companySize: Yup.string()
        .max(255)
        .oneOf(companySizeOptions)
        .required("Currency is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      fullName: Yup.string().max(255).required("Amount is required"),
      jobTitle: Yup.string().max(255).required("Account No is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        <Typography color="" variant="h6">
          {name}
        </Typography>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Card variant="outlined" sx={{ p: 3 }}>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  pb: 3,
                }}
              >
                <div>
                  <div>
                    <Typography color="textSecondary" variant="text">
                      Enter transaction details
                    </Typography>
                  </div>
                </div>
              </Box>
              <Grid container spacing={2} sx={{ maxWidth: 420 }}>
                <Grid item xs={12}>
                  <TextField
                    error={Boolean(
                      formik.touched.fullName && formik.errors.fullName
                    )}
                    fullWidth
                    helperText={
                      formik.touched.fullName && formik.errors.fullName
                    }
                    label="$ Amount"
                    name="fullName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                    variant="outlined"
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={Boolean(
                      formik.touched.jobTitle && formik.errors.jobTitle
                    )}
                    fullWidth
                    helperText={
                      formik.touched.jobTitle && formik.errors.jobTitle
                    }
                    label="Account No"
                    name="jobTitle"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.jobTitle}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={Boolean(
                      formik.touched.companyName && formik.errors.companyName
                    )}
                    fullWidth
                    helperText={
                      formik.touched.companyName && formik.errors.companyName
                    }
                    label="Bank name"
                    name="companyName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.companyName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={Boolean(
                      formik.touched.companySize && formik.errors.companySize
                    )}
                    fullWidth
                    helperText={
                      formik.touched.companySize && formik.errors.companySize
                    }
                    label="Currency"
                    name="companySize"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    select
                    value={formik.values.companySize}
                    variant="outlined"
                  >
                    {companySizeOptions.map((companySizeOption) => (
                      <MenuItem
                        key={companySizeOption}
                        value={companySizeOption}
                      >
                        {companySizeOption}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                {formik.errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>
                      {formik.errors.submit}
                    </FormHelperText>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Typography color="textSecondary" variant="text">
                    payment details will be sent to your email
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <OneLiquidity
                    myOrders={myOrders}
                    setMyOrders={setMyOrders}
                    name="exchange"
                    amount={formik.values.fullName}
                    setSuccessPay={setSuccessPay}
                    handleClose={handleClose}
                    type="Exchange"
                  />
                </Grid>
              </Grid>
            </div>
          </form>
        </Card>
      </Popover>
    </div>
  );
}
