import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Alert,
  Box,
  Card,
  Container,
  Divider,
  Typography,
} from "@mui/material";

import { OrdersTable } from "../components/orders-table";
import { SummaryItem } from "../components/reports/summary-item";
import { Grid } from "@mui/material";
import VendorPay from "./VendorPay";
const tableHeaders = ["Gateway", "Amount ($)", "Vendor", "Date", "Order Id"];
const stats = [
  {
    content: "Pay vendor",
  },
  {
    content: "Create Payment Link",
  }
];
export const Vendor = () => {
  const data = JSON.parse(localStorage.getItem("vendor"))
    ? JSON.parse(localStorage.getItem("vendor"))
    : [];
  const [myOrders, setMyOrders] = useState(data);
  const [successPay, setSuccessPay] = useState(false);

  useEffect(() => {
    if (successPay) {
      setTimeout(() => {
        setSuccessPay(false);
      }, 3000);
    }
  });

  return (
    <>
      <Helmet>
        <title>Pay A Vendor | Koins&Kash</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          pb: 3,
          pt: 8,
        }}
      >
        <Container maxWidth="lg">
          {successPay && (
            <Alert severity="success">
              Payment details sent to your Whatsapp
            </Alert>
          )}
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              mb: 3,
            }}
          >
            {stats.map((item) => (
              <Grid item key={item.label} md={4} xs={12}>
                <SummaryItem
                  content={item.content}
                  icon={item.icon}
                  label={item.label}
                  button={
                    <VendorPay
                      myOrders={myOrders}
                      setMyOrders={setMyOrders}
                      name={item.content}
                      setSuccessPay={setSuccessPay}
                    />
                  }
                />
              </Grid>
            ))}
          </Box>

          <Card variant="outlined">
            <Typography sx={{ ml: 2, mt: 1 }} color="textPrimary" variant="h4">
              Payment History
            </Typography>

            <Divider />
            <OrdersTable tableHeaders={tableHeaders} orders={myOrders} />
          </Card>
        </Container>
      </Box>
    </>
  );
};
