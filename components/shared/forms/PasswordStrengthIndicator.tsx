import { CheckCircleRounded, Circle } from "@mui/icons-material";
import {
  Box,
  Collapse,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

const CONDITIONS = [
  {
    label: "Mindestens 8 Zeichen",
    regex: /.{8,}/,
  },
  {
    label: "Mindestens ein Symbol (#&*)",
    regex: /^(?=.*\W)/,
  },
  {
    label: "Mindestens eine Zahl",
    regex: /^(?=.*[0-9])/,
  },
  {
    label: "Groß- und Kleinbuchstaben",
    regex: /^(?=.*[a-z])(?=.*[A-Z])/,
  },
];

const COLORMAP = new Map([
  [0, "inherit" as const],
  [25, "error" as const],
  [50, "secondary" as const],
  [75, "warning" as const],
  [100, "success" as const],
]);

const TEXTMAP = new Map([
  [0, "Sehr schwach"],
  [25, "Sehr schwach"],
  [50, "Schwach"],
  [75, "Mittel"],
  [100, "Stark"],
]);

export default function PasswordStrengthIndicator({
  password,
  hideExtended,
}: {
  password: string;
  hideExtended?: boolean;
}) {
  const strength = CONDITIONS.reduce((acc, condition) => {
    return acc + (condition.regex.test(password) ? 25 : 0);
  }, 0);

  const color = COLORMAP.get(strength);

  return (
    <Box
      sx={{
        pt: 2,
      }}
    >
      <Stack spacing="5px">
        <LinearProgress variant="determinate" value={strength} color={color} />
        {password.length === 0 && !hideExtended ? (
          <Typography
            sx={{
              fontWeight: 700,
            }}
          >
            Ihr passwort muss bestehen aus:
          </Typography>
        ) : (
          <Typography>
            Passwortstärke:{" "}
            <strong>
              {password.length === 0 ? "-" : TEXTMAP.get(strength)}
            </strong>
          </Typography>
        )}
      </Stack>
      <Collapse in={!hideExtended}>
        <List sx={{ mt: "15px", py: 0 }}>
          {CONDITIONS.map((condition) => {
            const isFulfilled = condition.regex.test(password);

            return (
              <ListItem key={condition.label} sx={{ p: 0 }}>
                <ListItemIcon
                  sx={{
                    minWidth: "24px",
                    marginRight: "10px",
                  }}
                >
                  {isFulfilled ? (
                    <CheckCircleRounded color="primary" />
                  ) : (
                    <Circle color="primary" sx={{ transform: "scale(0.5)" }} />
                  )}
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    component: isFulfilled ? "s" : "span",
                    color: isFulfilled ? "grey.600" : "text.primary",
                    lineHeight: "24px",
                  }}
                >
                  {condition.label}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </Box>
  );
}
