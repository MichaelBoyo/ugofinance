import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "./scrollbar";

const statusVariants = [
  {
    label: "Placed",
    value: "placed",
  },
  {
    label: "Processed",
    value: "processed",
  },
  {
    label: "Successful",
    value: "delivered",
  },
  {
    label: "One Liquidity",
    value: "One Liquidity",
  },
  {
    label: "Complete",
    value: "complete",
  },
];

export const OrdersTable = (props) => {
  const { orders, tableHeaders } = props;

  return (
    <div>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            {tableHeaders ? (
              <TableRow>
                {tableHeaders.map((header) => {
                  return (
                    <TableCell key={header}>
                      <Typography color="textPrimary" variant="subtitle2">
                        {header}
                      </Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
            ) : (
              ""
            )}
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              const statusVariant = statusVariants.find(
                (variant) => variant.value === order.status
              );

              return (
                <TableRow key={order.id}>
                  <TableCell>
                    <Chip label={statusVariant.label} variant="outlined" />
                  </TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>{order.type}</TableCell>
                  <TableCell>
                    <Box>
                      <Typography color="inherit" variant="inherit">
                        {format(new Date(order.createdAt), "dd MMM yyyy")}
                      </Typography>
                      <Typography color="textSecondary" variant="inherit">
                        {format(new Date(order.createdAt), "HH:mm")}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography color="inherit" variant="inherit">
                      #{order.id}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
    </div>
  );
};

OrdersTable.propTypes = {
  orders: PropTypes.array.isRequired,
};
