import React from "react";
import { Box, Typography, Avatar, Link, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const AboutMeCard = () => {
  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 4,
        boxShadow: 1,
        borderRadius: 2,
        bgcolor: "background.paper",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" gutterBottom>
        About Me
      </Typography>
      <Avatar
        alt="Mahesh Sivangi"
        src="https://multi-market-hub.s3.us-east-1.amazonaws.com/MyData/Mahesh_linkedIn_profile_pic.jpeg" // Replace with your image path
        sx={{ width: 120, height: 120, margin: "16px auto" }}
      />
      <Typography variant="h6" gutterBottom>
        Mahesh Sivangi
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Full Stack Developer
      </Typography>
      <Typography variant="body2" paragraph>
        I'm a passionate developer who loves building applications that solve
        real-world problems. This virtual trading platform is designed to help
        people learn stock trading without financial risk.
      </Typography>
      <Typography variant="body2" paragraph>
        My expertise includes React,AWS, Node.js and various modern web
        technologies. I'm always excited to learn new technologies and create
        innovative solutions.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
        <IconButton
          component={Link}
          href="https://www.linkedin.com/in/maheshsivangi/"
          target="_blank"
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="https://github.com/Mahesh3000"
          target="_blank"
        >
          <GitHubIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AboutMeCard;
