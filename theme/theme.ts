import { createTheme, ThemeOptions } from "@mui/material/styles";
import { deDE as datePickerDE } from "@mui/x-date-pickers/locales";
import { deDE as dataGridDE } from "@mui/x-data-grid/locales";
import type {} from "@mui/x-data-grid/themeAugmentation";
import { arima, poppins } from "./fonts";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
// import { deDE } from "@mui/material/locale";

// Extend MUI theme palette
declare module "@mui/material/styles" {
  interface SimplePaletteColorOptions {
    lighter?: string;
  }
  interface PaletteColor {
    lighter?: string;
  }
  interface PaletteOptions {
    degrade: {
      mainGradient: string;
    };
    borderColor: {
      main: string;
    };
    beige: SimplePaletteColorOptions;
  }
  interface Palette {
    degrade: {
      mainGradient: string;
    };
    borderColor: {
      main: string;
    };
    beige: PaletteColor;
  }
  interface TypographyVariants {
    h0: React.CSSProperties;
    h4new: React.CSSProperties;
    bodyLarge: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    h0: React.CSSProperties;
    h4new: React.CSSProperties;
    bodyLarge?: React.CSSProperties;
  }
  interface BreakpointOverrides {
    ss: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h0: true;
    h4new: true;
    bodyLarge: true;
  }
}

// Extend MUI theme button variants
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    secondary: true;
    white: true;
  }
}

// Extend MUI theme chip variants
declare module "@mui/material/Chip" {
  interface ChipPropsVariantOverrides {
    grey: true;
    seats: true;
  }
}

const primaryMain = "#0067BE";
const primarySecond = "#3385CB";
const primaryLight = "#80B3DF";

const textPrimary = "#0D1138";
const textSecondary = "#9795B5";

const borderColor = "#CCCCCC";

const secondaryMain = "#FB9266";
const secondaryLight = "#FFC998";
const secondaryLighter = "#FFF5EC";

const beigeLight = "#FCFBF8";
const beigeMain = "#F3EEE3";

const successMain = "#25D366";
const errorMain = "#EB1118";
const warningMain = "#F0DA12";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: primaryMain,
      light: primaryLight,
    },
    success: {
      main: successMain,
    },
    error: {
      main: errorMain,
    },
    info: {
      main: primarySecond,
    },
    warning: {
      main: warningMain,
    },
    beige: {
      light: beigeLight,
      main: beigeMain,
    },
    secondary: {
      main: secondaryMain,
      light: secondaryLight,
      lighter: secondaryLighter,
    },
    text: {
      primary: textPrimary,
      secondary: textSecondary,
    },
    grey: {
      "300": "#FCFCFC",
      "400": "#F4F4F4",
      "500": "#DCDCDC",
      "600": "#CCCCCC",
      "700": "#BBBBC0",
      "800": "#616274",
      "900": "#3F415C",
    },
    degrade: {
      mainGradient:
        "linear-gradient(90deg, rgba(0, 103, 190, 0.77) 8%, rgba(115, 110, 218, 0.50) 33%, rgba(210, 98, 212, 0.50) 44.5%, rgba(255, 148, 48, 0.71) 62%)",
    },
    borderColor: {
      main: borderColor,
    },
  },
  typography: {
    allVariants: {
      color: textPrimary,
    },
    subtitle1: {
      color: textSecondary,
    },
    subtitle2: {
      color: textSecondary,
    },
    fontFamily: poppins.style.fontFamily,
    h0: {
      fontSize: 70,
      lineHeight: "70px",
      fontWeight: 700,
      fontFamily: arima.style.fontFamily,
    },
    h1: {
      fontSize: 50,
      lineHeight: "55px",
      fontWeight: 700,
      fontFamily: arima.style.fontFamily,
    },
    h2: {
      fontSize: 40,
      lineHeight: "45px",
      fontWeight: 700,
      fontFamily: arima.style.fontFamily,
    },
    h3: {
      fontSize: 32,
      lineHeight: "42px",
      fontWeight: 700,
      fontFamily: arima.style.fontFamily,
    },
    h4new: {
      fontSize: 28,
      lineHeight: "33px",
      fontWeight: 700,
      fontFamily: arima.style.fontFamily,
    },
    h4: {
      fontSize: 24,
      lineHeight: "34px",
      fontWeight: 600,
    },
    h5: {
      fontSize: 22,
      lineHeight: "28px",
      fontWeight: 600,
    },
    h6: {
      fontSize: 18,
      lineHeight: "24px",
      fontWeight: 600,
    },
    body1: {
      fontSize: 18,
      lineHeight: "30px",
      fontWeight: 400,
    },
    body2: {
      fontSize: 16,
      lineHeight: "20px",
    },
    bodyLarge: {
      fontSize: 22,
      lineHeight: "36px",
      fontWeight: 400,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      ss: 400,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: beigeLight,
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "secondary" },
          style: {
            backgroundColor: secondaryMain,
            color: "white",
            borderRadius: 4,
            ":hover": {
              backgroundColor: secondaryLight,
            },
          },
        },
        {
          props: { variant: "white" },
          style: {
            backgroundColor: "white",
            color: primaryMain,
            ":hover": {
              backgroundColor: borderColor,
            },
          },
        },
        {
          props: { variant: "text" },
          style: {
            textDecoration: "none",
            gap: 8,
            "&:hover": {
              textDecoration: "none",
            },
            "& .MuiButton-startIcon": {
              marginRight: 0,
            },
          },
        },
        {
          props: { variant: "outlined", size: "large" },
          style: {
            borderWidth: 2,
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: 20,
          gap: 16,
          ":hover": {
            opacity: 1,
          },
          textTransform: "none",
        },
        containedSecondary: {
          color: "#fff",
        },
        sizeLarge: {
          padding: "16px 48px",
          fontSize: 18,
          lineHeight: "18px",
          borderRadius: "40px",
          fontWeight: 700,
        },
        text: {
          ":hover": {
            textDecoration: "underline",
            backgroundColor: "transparent",
            opacity: 0.7,
          },
          textDecoration: "underline",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorTransparent: {
          backgroundColor: "transparent",
          borderBottom: "none",
        },
        colorDefault: {
          backgroundColor: "white",
          borderBottom: `2px solid ${borderColor}`,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          ":hover": {
            opacity: 0.7,
          },
        },
      },
      defaultProps: {
        underline: "none",
      },
    },
    MuiPagination: {
      defaultProps: {
        color: "secondary",
        shape: "rounded",
        size: "large",
      },
    },
    MuiPaginationItem: {
      defaultProps: {
        slots: {
          previous: ArrowBackIosNew,
          next: ArrowForwardIos,
        },
      },
      styleOverrides: {
        root: {
          border: `1px solid ${borderColor}`,
          backgroundColor: "white",
          fontSize: 18,
          margin: "0 6px",
          "&.MuiPaginationItem-ellipsis": {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            height: 40,
          },
          "&.MuiPaginationItem-previousNext": {
            borderRadius: "50%",
          },
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        horizontal: {
          gap: 10,
          justifyContent: "center",
        },
      },
    },
    MuiStep: {
      styleOverrides: {
        horizontal: {
          padding: 0,
          height: 15,
          width: 15,
          borderRadius: 12,
          backgroundColor: "#E7E6F2",
          "&.Mui-completed": {
            backgroundColor: secondaryMain,
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          fill: primaryMain,
          width: 60,
          height: 60,
          fontWeight: 700,
        },
        text: {
          fontFamily: arima.style.fontFamily,
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
        disableAnimation: true,
      },
      styleOverrides: {
        root: {
          color: textPrimary,
          fontSize: 18,
          lineHeight: "18px",
          fontWeight: 600,
          transform: "none",
          position: "relative",
          marginBottom: 12,
          overflowX: "clip",
          overflowY: "unset",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 48,
          height: 48,
          border: `1px solid #CCCCCC`,
          fontWeight: 600,
          color: "#CCCCCC",
          backgroundColor: "#F7F7F7",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0,
          paddingRight: 9,
        },
      },
    },
    MuiChip: {
      variants: [
        {
          props: { variant: "filled" },
          style: {
            color: "white",
            backgroundColor: secondaryMain,
            "& svg": {
              fill: "white",
            },
            ":hover": {
              backgroundColor: secondaryLight,
            },
          },
        },
        {
          props: { variant: "grey" },
          style: {
            color: "#FFF",
            backgroundColor: primarySecond,
            borderRadius: "4px",
            ".MuiChip-label": {
              overflow: "visible",
            },
          },
        },
        {
          props: { variant: "seats" },
          style: {
            border: "none",
            borderRadius: "10px",
            padding: "4px 10px",
            "&.MuiChip-colorError": {
              color: errorMain,
              backgroundColor: secondaryLighter,
            },
            "&.MuiChip-colorWarning": {
              color: secondaryMain,
              backgroundColor: secondaryLighter,
            },
            "&.MuiChip-colorInfo": {
              color: primarySecond,
              backgroundColor: "#F7F7F7",
            },
            "& .MuiChip-label": {
              fontSize: 18,
              fontWeight: 700,
              lineHeight: "30px",
              overflow: "visible",
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          padding: "4px 8px",
          ".MuiChip-label": {
            fontSize: 18,
            lineHeight: "24px",
          },
          "& svg": {
            fill: textPrimary,
            width: 18,
            height: 18,
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
        },
      },
      defaultProps: {
        slotProps: {
          paper: {
            elevation: 1,
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        row: {
          "&.Mui-hovered": {
            backgroundColor: "inherit",
          },
          ":hover": {
            backgroundColor: "inherit",
          },
        },
        cell: {
          ":focus": {
            outline: "none",
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected.MuiToggleButton-primary": {
            borderColor: primaryMain,
            color: "white",
            backgroundColor: primaryMain,
          },
          borderRadius: 20,
          borderWidth: `2px`,
          padding: "18px 60px",
          textTransform: "none",
          fontSize: 20,
          fontWeight: 700,
          lineHeight: "18px",
          whiteSpace: "nowrap",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h0: "h1",
          h4new: "h4",
          bodyLarge: "p",
        },
      },
    },
  },
};

const theme = createTheme(themeOptions, datePickerDE, dataGridDE);

theme.components!.MuiStepIcon!.styleOverrides!.root = {
  ...((theme?.components?.MuiStepIcon?.styleOverrides?.root as object) || {}),
  [theme.breakpoints.down("sm")]: {
    width: 43,
    height: 43,
  },
};

theme.components!.MuiToggleButton!.styleOverrides!.root = {
  ...((theme?.components?.MuiToggleButton?.styleOverrides?.root as object) ||
    {}),
  [theme.breakpoints.down("sm")]: {
    padding: "8px 16px",
    fontSize: 16,
    fontWeight: 400,
  },
};

export default theme;
