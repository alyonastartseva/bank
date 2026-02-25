import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  LineChart,
  lineElementClasses,
  markElementClasses,
  areaElementClasses,
} from "@mui/x-charts/LineChart";

const dataTransaction = [
  { month: "Oct", spendings: 2.2 },
  { month: "Nov", spendings: 5.3 },
  { month: "Dec", spendings: 3.0 },
  { month: "Jan", spendings: 6.8 },
  { month: "Feb", spendings: 4.2 },
  { month: "Mar", spendings: 8.6 },
];

const months = dataTransaction.map((x) => x.month);
const seriesData = dataTransaction.map((x) => x.spendings);

export default function StatisticChart() {
  const [selected, setSelected] = React.useState<string>("Jan");
  const selectedIndex = months.indexOf(selected);

  return (
    <Box
      sx={{
        width: 360,
        bgcolor: "#0B1020",
        borderRadius: 3,
        color: "white",
        overflow: "hidden",
        p: 2,
        pt: 2.5,
      }}>
            <Typography
                variant="body2"
                sx={{ opacity: 0.6, textAlign: "center", fontWeight: 300 }}>
                Current Balance
            </Typography>

            <Typography
                sx={{
                fontSize: 38,
                fontWeight: 500,
                 letterSpacing: -1,
                 textAlign: "center",
                 mt: 0.5,
                 mb: 1.5,
                  }}>
                $8,545.00
            </Typography>
            <Box sx={{ height: 210, width: "100%" }}>
                <LineChart
                    height={210}
                    series={[
                        {
                        type: "line",
                        data: seriesData,
                        curve: "catmullRom",
                        showMark: ({ index }) => index === selectedIndex,
                        area: true,
                        },
                        ]}
                    xAxis={[
                        {
                        scaleType: "point",
                        data: months,
                        tickLabelStyle: { display: "none" },
                        disableTicks: true,
                        disableLine: true,
                        },
                        ]}
                    yAxis={[
                        {
                        min: 0,
                        max: 10,
                        disableLine: true,
                        disableTicks: true,
                        tickLabelStyle: { display: "none" }, 
                        },
                        ]}
                    grid={{ horizontal: false, vertical: true }}
                    margin={{ top: 5, right: 15, bottom: 0, left: -30 }}
                    sx={{
                    [`& .${lineElementClasses.root}`]: {
                    stroke: "#0066FF",
                    strokeWidth: 3.2,
                    },
                    [`& .${markElementClasses.root}`]: {
                    stroke: "#ffffff",
                    strokeWidth: 2.5,
                    fill: "#0066FF",
                    r: 6,
                    },
                    [`& .${areaElementClasses.root}`]: {
                    fill: "rgba(120, 140, 255, 0.14)",
                    opacity: 1,
                    },
                    "& .MuiChartsGrid-verticalLine": {
                    stroke: "rgba(255,255,255,0.08)",
                    },
                    }}
                    />
            </Box>

        <Box
          sx={{
          mt: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 0.75,
          px: 0.5,
         }}>
         {months.map((m) => {
          const isActive = m === selected;
          return (
            <Box
              key={m}
              onClick={() => setSelected(m)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelected(m);
              }}
              sx={{
                cursor: "pointer",
                userSelect: "none",
                px: isActive ? 1.4 : 0.6,
                py: 0.6,
                borderRadius: 2,
                fontSize: 13,
                fontWeight: 500,
                color: isActive ? "white" : "rgba(255,255,255,0.55)",
                bgcolor: isActive ? "#0066FF" : "transparent",
                transition: "0.15s ease",
                "&:hover": {
                  bgcolor: isActive ? "#0066FF" : "rgba(255,255,255,0.06)",
                },
              }}>
              {m}
            </Box>
          );
          })}
        </Box>
    </Box>
  );
}