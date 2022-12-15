import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import SemesterDetailTable from "../../Components/Progress/SemesterDetailTable";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StudentDetailProgress = () => {
  return (
    <div>
      <Accordion container gap="2em">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" align="center">
            Semester 1 Details
          </Typography>
        </AccordionSummary>

        <Paper
          sx={{
            padding: "1em",
          }}
        >
          <AccordionDetails>
            <SemesterDetailTable />
          </AccordionDetails>
        </Paper>
      </Accordion>

      <Accordion container gap="2em">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" align="center">
            Semester 2 Details
          </Typography>
        </AccordionSummary>

        <Paper
          sx={{
            padding: "1em",
          }}
        >
          <AccordionDetails>
            <SemesterDetailTable />
          </AccordionDetails>
        </Paper>
      </Accordion>

      <Accordion container gap="2em">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" align="center">
            Semester 3 Details
          </Typography>
        </AccordionSummary>

        <Paper
          sx={{
            padding: "1em",
          }}
        >
          <AccordionDetails>
            <SemesterDetailTable />
          </AccordionDetails>
        </Paper>
      </Accordion>

      <Accordion container gap="2em">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" align="center">
            Semester 4 Details
          </Typography>
        </AccordionSummary>

        <Paper
          sx={{
            padding: "1em",
          }}
        >
          <AccordionDetails>
            <SemesterDetailTable />
          </AccordionDetails>
        </Paper>
      </Accordion>

      <Accordion container gap="2em">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" align="center">
            Semester 5 Details
          </Typography>
        </AccordionSummary>

        <Paper
          sx={{
            padding: "1em",
          }}
        >
          <AccordionDetails>
            <SemesterDetailTable />
          </AccordionDetails>
        </Paper>
      </Accordion>

      <Accordion container gap="2em">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" align="center">
            Semester 6 Details
          </Typography>
        </AccordionSummary>

        <Paper
          sx={{
            padding: "1em",
          }}
        >
          <AccordionDetails>
            <SemesterDetailTable />
          </AccordionDetails>
        </Paper>
      </Accordion>

      <Accordion container gap="2em">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" align="center">
            Semester 7 Details
          </Typography>
        </AccordionSummary>

        <Paper
          sx={{
            padding: "1em",
          }}
        >
          <AccordionDetails>
            <SemesterDetailTable />
          </AccordionDetails>
        </Paper>
      </Accordion>

      <Accordion container gap="2em">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" align="center">
            Semester 8 Details
          </Typography>
        </AccordionSummary>

        <Paper
          sx={{
            padding: "1em",
          }}
        >
          <AccordionDetails>
            <SemesterDetailTable />
          </AccordionDetails>
        </Paper>
      </Accordion>
    </div>
  );
};

export default StudentDetailProgress;
