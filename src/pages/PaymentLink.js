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
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
const transactionTypeOptions = ["Deposit", "Withdraw"];
const vendor = [
  "Iya Moria",
  "Bits and Byte",
  "Gnome Wears",
  "Kiki Fabics",
  "Joels Exchange",
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
      vendor: "",
      submit: null,
    },
    validationSchema: Yup.object().shape({
      transactionType: Yup.string()
        .max(255)
        .oneOf(transactionTypeOptions)
        .required("Transaction is required"),
      vendor: Yup.string()
        .max(255)
        .oneOf(vendor)
        .required("vendor is required"),
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
  const [loading, setLoading] = React.useState(false);
  const handleBClick = async() => {
    setLoading(true);
    const res = await fetch("https://api.flutterwave.com/v3/payments",{
        method: "POST",
        headers:{
            Authorization: `Bearer ${process.env.REACT_APP_FLW_PUBLIC_KEY}`
        },
        mode: "no-cors",
        body: JSON.stringify({
            tx_ref: "hooli-tx-1920bbtytty",
            amount: formik.values.amount,
            currency: "NGN",
            redirect_url: "https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
            meta: {
                consumer_id: 23,
                consumer_mac: "92a3-912ba-1192a"
            },
            customer: {
                email: formik.values.email,
                phonenumber: formik.values.phone,
                name: formik.values.email
            },
            customizations: {
                title: "Payment Link",
               
            }
        })
    }).catch(err => console.log(err))

    console.log(res)
  }

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
                    label="Vendor"
                    name="vendor"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    select
                    value={formik.values.vendor}
                    variant="outlined"
                  >
                    {vendor.map((transactionTypeOption) => (
                      <MenuItem
                        key={transactionTypeOption}
                        value={transactionTypeOption}
                      >
                        {transactionTypeOption}
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
                    Payment link will be sent to your email and whatsapp in less
                    than 10 minutes
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton
                    size="small"
                    onClick={handleBClick}
                    endIcon={<SendIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                  >
                    Send
                  </LoadingButton>
                </Grid>
              </Grid>
            </div>
          </form>
        </Card>
      </Popover>
    </div>
  );
}
