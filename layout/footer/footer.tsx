import { Box, Container, Typography, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1E293B",
        color: "white",
        padding: "20px 0",
        marginTop: "40px",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Anuradha Adhikari | All Rights Reserved
        </Typography>

        <Box display="flex" justifyContent="center" mt={2} gap={2}>
          <IconButton
            color="inherit"
            onClick={() => window.open("https://github.com/Ramsey99", "_blank")}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/anuradha-adhikari/",
                "_blank"
              )
            }
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => window.open("https://x.com/RaniAdhikari1", "_blank")}
          >
            <TwitterIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
