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
const transactionTypeOptions = ["Deposit", "Withdraw"];
const assets = [
  "Dollar Savings (BUSD)",
  "US Stocks (equity) - S&P 500",
  "International Commodities (oil, agric, metals) - S&P GSCI",
  "US Real Estate - Various REITs",
  "Nigerian Commodities (gold) - Gold price in ZAR",
  "Nigerian Stocks (equity) - NGX 30",
  "Naira Savings (fixed deposit)",
  "Bitcoin",
  "Ethereum",
];

export default function BasicPopover({
  name,
  myOrders,
  setMyOrders,
  setSuccessPay,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : "";
  const formik = useFormik({
    initialValues: {
      transactionType: "",
      email: "",
      amount: "",
      phone: "",
      assets: "",
      submit: null,
    },
    validationSchema: Yup.object().shape({
      transactionType: Yup.string()
        .max(255)
        .oneOf(transactionTypeOptions)
        .required("Transaction is required"),
      assets: Yup.string()
        .max(255)
        .oneOf(assets)
        .required("assets is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      amount: Yup.string().max(255).required("Amount is required"),
      phone: Yup.string().max(255).required("Phone Number is required"),
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
                      formik.touched.amount && formik.errors.amount
                    )}
                    fullWidth
                    helperText={formik.touched.amount && formik.errors.amount}
                    label="Amount"
                    name="amount"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.amount}
                    variant="outlined"
                    type="number"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    error={Boolean(formik.touched.phone && formik.errors.phone)}
                    fullWidth
                    helperText={formik.touched.phone && formik.errors.phone}
                    label="Phone No Call"
                    name="phone"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={Boolean(formik.touched.phone && formik.errors.phone)}
                    fullWidth
                    helperText={formik.touched.phone && formik.errors.phone}
                    label="Phone No Whatsapp"
                    name="phone"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={Boolean(
                      formik.touched.transactionType &&
                        formik.errors.transactionType
                    )}
                    fullWidth
                    helperText={
                      formik.touched.transactionType &&
                      formik.errors.transactionType
                    }
                    label="Transation type"
                    name="transactionType"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    select
                    value={formik.values.transactionType}
                    variant="outlined"
                  >
                    {transactionTypeOptions.map((transactionTypeOption) => (
                      <MenuItem
                        key={transactionTypeOption}
                        value={transactionTypeOption}
                      >
                        {transactionTypeOption}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    error={Boolean(
                      formik.touched.transactionType &&
                        formik.errors.transactionType
                    )}
                    fullWidth
                    helperText={
                      formik.touched.transactionType &&
                      formik.errors.transactionType
                    }
                    label="Asset"
                    name="assets"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    select
                    value={formik.values.assets}
                    variant="outlined"
                  >
                    {assets.map((asset) => (
                      <MenuItem
                        key={asset}
                        value={asset}
                      >
                        {asset}
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
                    Account details will either be sent to your whatsApp within
                    10 minutes. Kindly ensure you make the transfer within 10
                    minutes once you receive it. The account expires.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <OneLiquidity
                    name="assets"
                    myOrders={myOrders}
                    setMyOrders={setMyOrders}
                    amount={formik.values.amount}
                    setSuccessPay={setSuccessPay}
                    handleClose={handleClose}
                    type={formik.values.transactionType}
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
