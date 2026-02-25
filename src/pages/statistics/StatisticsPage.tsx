import StatisticChart from "@/entities/statisticChart/StatisticChart";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import IconButton from "@mui/material/IconButton";


export default function StatisticsPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0B1020", py: 4, width: 375  }}>
        <Container sx={{ width: 375, px: 2 }}>
            <Stack spacing={2} alignItems="center">
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    px: 0,
                    }}>
                        <IconButton
                            sx={{
                            width: 44,
                            height: 44,
                            borderRadius: "50%",
                            bgcolor: "rgba(255,255,255,0.08)",
                            color: "white",
                            "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
                            }}>
                            <ArrowBackIosIcon fontSize="small" sx={{ ml: "5px" }}/>
                        </IconButton>
                        <Typography fontSize={24} fontWeight={500} sx={{color: "white"}}>Statistics</Typography>
                        <IconButton
                            sx={{
                            width: 44,
                            height: 44,
                            borderRadius: "50%",
                            bgcolor: "rgba(255,255,255,0.08)",
                            color: "white",
                            "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
                            }}>
                        <NotificationsNoneIcon />
                        </IconButton>
                </Box>
                <StatisticChart />
            </Stack>
        </Container>
    </Box>
  );
}