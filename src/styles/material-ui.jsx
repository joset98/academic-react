 import { createMuiTheme } from "@material-ui/core/styles";

const themeMaterial = (theme) => createMuiTheme({
  typography: {
    fontFamily: theme.fonts.primary,
  },
  palette: {
    primary: {
      main: theme.colors.primary,
    },
    secondary: {
      main: theme.colors.secondary,
    },
  },

  overrides: {
    MuiContainer: {
      maxWidthLg: {
        maxWidth: "1340px !important",
      },
    },
    MuiButton: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        borderRadius: "3px",
        border: 0,
        textTransform: "none",
        fontFamily: theme.fonts.primary,
      },
      containedPrimary: {
        color: "white",
      },
    },
    MuiOutlinedInput: {
      root: {
        ":hover": {
          backgrund: "red",
        },
        adornedStart: {
          MuiSvgIcon: {
            fill: "red",
          },
        },
      },
    },
    MuiList: {
      root: {
        "& .Mui-selected": {
          "& :after": {
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            content: "",
            height: "100px",
            width: "2px",
          },
        },
      },
    },
    MuiFilledInput: {
      root: {
        backgroundColor: "#dcdcdc4f",
        "&$focused": {
          backgroundColor: "#dcdcdc4f",
        }
      },
    },
    MuiIconButton: {
      label: {
        "& .MuiCheckbox-root > .MuiSvgIcon-root": {
          color: "red",
        },
        "& .Mui-checked": {
          color: `${theme.colors.secondary}`,
        },
      },
    },
    MuiInputAdornment: {
      root: {
        "& .MuiSvgIcon-root": {
          fill: theme.colors.gray,
        },
      },
    },
    MuiFormHelperText: {
      root: {
        marginLeft: 0,
      },
      contained: {
        marginLeft: 0,
      },
    },
    MuiTableCell: {
      root: {
        padding: "0",
        borderBottom: "1px solid #ebedf3",
        "& .MuiTableCell-paddingCheckbox": {
          padding: 0,
        },
      },
    },
    MuiCheckbox: {
      root: {
        color: theme.colors.gray500,
      },
    },
    MuiTableRow: {
      root: {
        "&:hover": {
          "& .MuiTableCell-root": {
            // background: theme.colors.gray300,
          },
        },
      },
    },
    MuiTableHead: {
      root: {
        "& .MuiTableCell-root": {
          paddingTop: "10px",
          paddingBottom: "10px",
          fontWeight: 600,
          textTransform: "uppercase",
        },
        "& .MuiTableRow-root": {
          "&:first-child": {
            display: "none",
          },
        },
      },
    },
    MuiFormControlLabel: {
      root: {
        fontFamily: theme.fonts.primary,
      },
    },
  },
});

export default themeMaterial;
