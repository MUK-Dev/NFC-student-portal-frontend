import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Height } from '@mui/icons-material';

// import LanguageIcon from '@material-ui/icons/Language';


const data = [
  {
    title: "Department",
    // subtitle: "adjective",
    description: "Some Info About Department.",
    // icon: <LanguageIcon />,
  },
  {
    title: "Program",
    // subtitle: "adjective",
    description: "Some Info About Program",
    // icon: <LanguageIcon />,
  },
  {
    title: "Session",
    // subtitle: "adjective",
    description: "Some Info About Session",
    // icon: <LanguageIcon />,
  },
  {
    title: "Semester",
    // subtitle: "adjective",
    description: "Some Info About Semester",
    // icon: <LanguageIcon />,
  },
  {
    title: "Subject",
    // subtitle: "adjective",
    description: "Some Info About Subject",
    // icon: <LanguageIcon />,
  },
  {
    title: "Teacher",
    // subtitle: "adjective",
    description: "Some Info About Teacher",
    // icon: <LanguageIcon />,
  },
  // Add more data as needed
];

export default function ExampleComponent() {
  return (
    <Grid container spacing={2} margin={2} rowSpacing={5} columnSpacing={5} marginX = {1} marginY = {5}>
      {data.map((item) => (
        <Grid item xs={6} md={4} key={item.title}>
          <Card sx={{ maxWidth: 300}}>
            <CardContent>
              {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {item.title}
              </Typography> */}
              <Typography variant="h5" component="div" textAlign={"center"}>
                 {item.title}
              </Typography>
              <Typography variant="body2" textAlign={'left'} padding = {2}>
                {item.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Get Started</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
