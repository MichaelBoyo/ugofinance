import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Popover, Card, Grid, Typography } from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";
const transactionTypeOptions = ["Deposit", "Withdraw"];
const vendor = [
  "Iya Moria",
  "Bits and Byte",
  "Gnome Wears",
  "Kiki Fabics",
  "Joels Exchange",
];
const paymentlink = axios.create({
  baseURL: "https://api.flutterwave.com/v3/payments",
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_FLW_SECRET}`,
  },
});

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
  const handleBClick = async () => {
    console.log(process.env.REACT_APP_FLW_SECRET);
    setLoading(true);
    try {
      const res = await paymentlink
        .post("", {
          tx_ref: "hooli-tx-1920bbtytty",
          amount: formik.values.amount,
          currency: "NGN",
          redirect_url:
            "https://webhook.site/d1d6cacb-82f2-4eb9-b995-1563a927cf71",
          meta: {
            consumer_id: 23,
            consumer_mac: "92a3-912ba-1192a",
          },
          customer: {
            email: formik.values.email,
            phonenumber: formik.values.phone,
            name: formik.values.email,
          },
          customizations: {
            title: "Payment Link",
          },
        })
        .json();
      console.log(res);
    } catch (err) {
      console.log(err.code);
      console.log(err.response.body);
    }
  };

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
              <Grid container spacing={2} sx={{ maxWidth: 420 }}>
                <Grid item xs={12}>
                  <Typography color="textSecondary" variant="text">
                    Bitcoin - 0x0cctr7484bvb647f
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="textSecondary" variant="text">
                    Ethereum - 0ct556e73dff74fdkd
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="textSecondary" variant="text">
                    Wema - 0211370195
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="textSecondary" variant="text">
                    Usdt - 65rrt4637238eg3
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="textSecondary" variant="text">
                    GBP - 09985439245
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="textSecondary" variant="text">
                    USD - 08211370195
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton
                    onClick={handleBClick}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                  >
                    set up crypto wallet
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
