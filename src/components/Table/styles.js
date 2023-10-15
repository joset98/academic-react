/* eslint-disable no-unused-vars */
import styled from "styled-components";
import {
  Grid,
  Paper,
  TableCell as TemplateTableCell,
  TableRow as TemplateTableRow,
} from "@mui/material";
import css from "@styled-system/css";
import { variant } from "styled-system";

export const TableTop = styled(Grid)`
  ${(props) =>
    css({
      padding: ["16px 1em"],
      background: props.theme.colors.gray300,
    })}
`;

export const Pagination = styled(Grid)`
  ${(props) =>
    css({
      padding: ["16px 1em"],
      p: {
        fontSize: ["12px"],
        color: props.theme.colors.gray600,
      },
    })}
`;

export const TableRow = styled(TemplateTableRow)`
  ${(props) =>
    variant({
      variants: {
        selectedOne: {
          "&:hover": {
            cursor: "pointer",
            td: {
              background: `${props.theme.colors.tableSelectHover}`,
            },
          },
        },
      },
    })}

  ${(props) =>
    css({
      "&.selected": {
        td: {
          color: `${props.theme.colors.tableSelectColor}`,
          background: `${props.theme.colors.tableSelectActive}`,
        },
      },
    })}
`;

export const TableCell = styled(TemplateTableCell)`
  ${css({
    padding: "0.5em 0",
    paddingTop: "0px",
    paddingBottom: "0px",
    lineHeight: "44px",
    "&.MuiTableCell-paddingCheckbox": {},
  })}
  ${(props) =>
    variant({
      variants: {
        selectedOne: {
          padding: ["0.8em 0"],
        },
      },
    })}
`;

export const ContainerLoading = styled(TemplateTableCell)`
  overflow: hidden;
  position: relative;
  height: 200px;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Empty = styled(Grid)`
  ${css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "200px",
    width: "100%",
  })}
`


export const WrappperMobile = styled.div`
  ${css({
    width: 'calc(100% - 32px)',
    marginLeft: '16px',
  })}
`

export const CardMobile = styled.div`
  ${props => css({
    border: `1px solid ${props.theme.colors.gray400}`,
    width: '100%',
    marginTop: '8px',
    marginBottom: '8px',
    borderRadius: '4px',
    padding: '8px 0px 0px 0px',
  })}

  ${(props) =>
    css({
      "&.selected": {
        color: `${props.theme.colors.tableSelectColor}`,
        background: `${props.theme.colors.tableSelectActive}`,
      },
    })}
`

export const CellMobile = styled.p`
  ${props => css({
    fontSize: ["12px"],
    padding: '4px 8px',
    color: props.theme.colors.gray800,
    strong: {
      color: props.theme.colors.gray600,
    },
    '.MuiButtonBase-root': {
      padding: '6px'
    }
  })}
`