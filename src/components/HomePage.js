import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

const tiers = [
  {
    title: 'Sell Online',

    price: '15',
    description: [
      'Easily sell your products online',
      'Easy  e-commerce integration',
      'Manage your inventory',
      'Manage your orders',

    ],
    buttonText: 'Apply now',
    buttonVariant: 'outlined',
  },

  {
    title: 'Payments',
    subheader: 'Most popular',
    price: '0',
    description: [
      'Fast and secure payment processing',

      'Receive and make payments in any currency or cryptocurrency',

      'Email support',
      'Fast and secure payment processing',
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'contained',
  },
  {
    title: 'Investment and Savings',

   
    description: [
      
      'Diverse options',
      'High interest rates',
      'Invest and save in any currency or cryptocurrency',
    ],
    buttonText: 'Start now',
    buttonVariant: 'outlined',
  },

  {
    title: 'Business Management',
    price: '30',
    description: [
      'Expert Reviews',
      'Technical Support',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Sign up',
    buttonVariant: 'outlined',
  },
  // {
  //   title: 'Currency Exchange',
  //   price: '30',
  //   description: [
  //     'Swap any kind of currency',
  //     'Fast and Secure Transactions',
  //     '24/7 customer support',
  //     'Phone & email support',
  //   ],
  //   buttonText: 'Contact us',
  //   buttonVariant: 'outlined',
  // },
  {
    title: 'Newsletter',
    price: '30',
    description: [
      'Daily Updates on Finance and the economy',
      'Product launch',
      'Trending market news',
      'General updates',
    ],
    buttonText: 'Sign up',
    buttonVariant: 'outlined',
  },
  // {
  //   title: 'Discover ',
  //   price: '30',
  //   description: [
  //     'New products and Services',
  //     'Fantastic services near you',
  //     'Trending technologies',
     
  //   ],
  //   buttonText: 'Contact us',
  //   buttonVariant: 'outlined',
  // },
];

function PricingContent() {
  const navigate = useNavigate();
  return (
    <>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
      />
      <CssBaseline />

      <Container
        disableGutters
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          The Best Business Services 
          <br />
          {' '}
          Under One Roof
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Ugo Finance provides you with the tools you need
          <br />
          to scale your business and manage your finances.
        </Typography>

        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
          gutterBottom
        >
          <Button
            onClick={() => navigate('/login')}
            variant="contained"
          >
            Set Up your Business
          </Button>
        </Typography>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{ pt: 8 }}
        >
          Our Services
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container component="main">
        <Grid
          container
          spacing={5}
          alignItems="flex-end"
        >
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) => (theme.palette.mode === 'light'
                      ? theme.palette.grey[200]
                      : theme.palette.grey[700]),
                  }}
                />
                <CardContent>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        sx={{ border: 1, borderColor: 'divider', p: 2 }}
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => navigate('/register')}
                    fullWidth
                    variant={tier.buttonVariant}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container
        disableGutters
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        />
      </Container>
    </>
  );
}

export default PricingContent;
