import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import HandymanIcon from '@mui/icons-material/Handyman';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import logo from '../assets/images/ace_tech_logo_2.png'

const cards = [
  {
    title: 'Work Performed',
    icon: <HandymanIcon />,
    description: [
      'Track work performed',
      'on customer\'s equipment',
      'by system. Always know',
      'what the last tech did!',
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
    buttonLink: '/signup'
  },
  {
    title: 'Customers',
    icon: <ShoppingCartIcon />,
    description: [
      'Keep track of customer',
      'information and generate',
      'new work orders on the fly',
      'and on site.',
    ],
    buttonText: 'Get started',
    buttonVariant: 'outlined',
    buttonLink: '/signup'
  },
  {
    title: 'Equipment Info',
    icon: <RoomPreferencesIcon />,
    description: [
      'No need to keep writing',
      'down model numbers and',
      'filter sizes. Have all',
      'essential information in reach.',
    ],
    buttonText: 'See Demo',
    buttonVariant: 'outlined',
    buttonLink: '/'
  },
];

export default function Home() {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      {/* Hero unit */}
      <div className='flex-box-container'>
        <div className="row gx-0 justify-content-center w-100 mt-2">
          <div className="col-xs-12 col-lg-10 col-xxl-8">
            <div className='floating-box'>
              <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  HVAC Service Tracking
                </Typography>
                <div className='center mb-2'>
                  <img className='logo' alt='logo' src={logo} />
                </div>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                  Quickly and effectively keep track of your customers and what work was
                  performed at each visit. Have all equipment information and always be
                  prepared for the job.
                </Typography>
              </Container>
              {/* End hero unit */}
              <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignitems="flex-end">
                  {cards.map((tier) => (
                    // Equipment Info card is full width at sm breakpoint
                    <Grid
                      item
                      key={tier.title}
                      xs={12}
                      sm={tier.title === 'Equipment Info' ? 12 : 6}
                      md={4}
                    >
                      <Card className='home-card'>
                        <CardHeader
                          title={tier.title}
                          subheader={tier.subheader}
                          titleTypographyProps={{ align: 'center' }}
                          subheaderTypographyProps={{
                            align: 'center',
                          }}
                          sx={{
                            backgroundColor: (theme) =>
                              theme.palette.mode === 'light'
                                ? theme.palette.grey[200]
                                : theme.palette.grey[700],
                          }}
                        />
                        <CardContent>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignitems: 'center',
                              mb: 2,
                            }}
                          >
                            {tier.icon}
                          </Box>
                          <ul>
                            {tier.description.map((line) => (
                              <Typography
                                component="li"
                                variant="subtitle1"
                                align="center"
                                key={line}
                              >
                                {line}
                              </Typography>
                            ))}
                          </ul>
                        </CardContent>
                        <CardActions>
                          <Button fullWidth variant={tier.buttonVariant}>
                            <Link to={tier.buttonLink} className='text-decoration-none link-dark'>
                              {tier.buttonText}
                            </Link>
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
              {/* Footer */}

            </div>
          </div>
        </div>
      </div>
      {/* End footer */}
    </React.Fragment >
  );
}
