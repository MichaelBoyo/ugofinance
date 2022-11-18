import axios from "axios";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
const oneLiquidity = axios.create({
  baseURL:
    "https://sandbox-api.oneliquidity.technology/integrator/v1/deposit/float",
  headers: {
    "content-type": "application/json",
    accept: "application/json",
    authorization: `Bearer ${process.env.REACT_APP_ONELIQUIDITY_BEARER_TOKEN}`,
  },
});
const OneLiquidity = ({
  amount,
  myOrders,
  setMyOrders,
  name,
  setSuccessPay,
  handleClose,
  type
}) => {
  const oneLiquidityPay = () => {
    const fetch = async () => {
      const res = await oneLiquidity
        .post("", {
          amount: Number(`${amount}`),
          currency: "USD",
        })
        .catch((err) => console.log(err));
      if (res.status === 201) {
        const data = {
          id: Math.floor(1000 + Math.random() * 9000),
          createdAt: Date.now(),
          status: "One Liquidity",
          totalAmount: amount,
          type
        };

        localStorage.setItem(name, JSON.stringify([...myOrders, data]));
        setMyOrders([...myOrders, data]);
        handleClose();
        setSuccessPay(true);
      }
    };
    fetch();
  };
  const [loading, setLoading] = useState(false);
  async function handleClick() {
    setLoading(true);
    oneLiquidityPay();
  }

  return (
    <LoadingButton
      onClick={handleClick}
      endIcon={<SendIcon />}
      loading={loading}
      loadingPosition="end"
      variant="contained"
    >
      Make Payment
    </LoadingButton>
  );
};

export default OneLiquidity;
