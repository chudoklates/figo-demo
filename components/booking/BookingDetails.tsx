import { Activity } from "@/api/types/activities";
import { getActivityLocationString } from "@/utils/activity";
import { Box, Stack, Typography } from "@mui/material";

export default function BookingDetails({ activity }: { activity: Activity }) {
  const startDate = activity.startDate;
  const endDate = activity.duration
    ? new Date(startDate.getTime() + activity.duration * 60 * 1000)
    : null;

  return (
    <Stack
      spacing={3}
      sx={{
        pt: 2,
      }}
    >
      <Box>
        <Typography variant="h4">{activity.name}</Typography>
        <Typography>{getActivityLocationString(activity)}</Typography>
      </Box>
      <Box>
        <Typography
          variant="h4"
          component="p"
          sx={{
            lineHeight: "46px",
          }}
        >
          {startDate.toLocaleDateString("de-DE", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>
        <Typography variant="h4" component="p">
          {startDate.toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
          })}
          {endDate
            ? ` - ${endDate.toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              })}`
            : ""}
        </Typography>
      </Box>
    </Stack>
  );
}
