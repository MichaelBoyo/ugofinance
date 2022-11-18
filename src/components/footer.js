import { Box, Container, Typography } from '@mui/material';

export const Footer = () => (
  <Box component="footer">
    <Container maxWidth="lg">
      <Box
        sx={{
          backgroundColor: '#F5F5F5',
          display: 'flex',
          flexDirection: {
            md: 'row',
            xs: 'column'
          },
          marginBottom: 6,
          p: 3,
          '& a': {
            mt: {
              md: 0,
              xs: 2
            }
          }
        }}
      >
        <Typography
          color="textSecondary"
          variant="body2"
        >
         WEBSITE STILL IN DEVELOPMENT
        </Typography>
       
      </Box>
    </Container>
  </Box>
);
