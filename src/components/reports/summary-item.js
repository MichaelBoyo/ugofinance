import PropTypes from "prop-types";
import { Box, Card, Typography } from "@mui/material";

export const SummaryItem = (props) => {
  const { content, button, ...other } = props;

  return (
    <Card sx={{ height: "100%" }} variant="outlined" {...other}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          p: 2,
        }}
      >
        {button ? (
          <Typography color="textPrimary" variant="h6">
            {button}
          </Typography>
        ) : (
          <Typography color="textPrimary" variant="h6">
            {content}
          </Typography>
        )}
      </Box>
    </Card>
  );
};

SummaryItem.propTypes = {
  content: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  label: PropTypes.string.isRequired,
};
